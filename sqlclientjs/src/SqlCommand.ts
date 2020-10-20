import { ColumnMetadata, DataType, Request, TYPES } from 'tedious';

import SqlConnection from './SqlConnection';
import SqlParameter, { ParameterDirection } from './SqlParameter';
import { CommandType, DataRow, DataSet } from './types';
import { isBool, isFloat, isInteger } from './utilities';

const reservedColumnName = new RegExp(
  '^JSON_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
);

function jsTypeToTediousType(value: any): DataType {
  if (isFloat(value)) {
    return TYPES.Decimal;
  } else if (isInteger(value)) {
    return TYPES.Int;
  } else if (isBool(value)) {
    return TYPES.Bit;
  } else {
    return TYPES.NVarChar;
  }
}

type ReturnColumnMetadataAsObject = {
  [key: string]: ColumnMetadata;
};

const tdsRowToDataRow: (rows: any[]) => DataRow = rows =>
  rows.map((r: any) => ({
    name: r.metadata.colName,
    value: r.value,
  }));

export default class SqlCommand {
  connection?: SqlConnection;
  commandText: string;
  commandType?: CommandType;
  parameters?: SqlParameter[];

  constructor(options: {
    connection?: SqlConnection;
    commandText: string;
    commandType?: CommandType;
    parameters?: SqlParameter[];
  }) {
    const { commandText, connection, commandType, parameters } = options;
    this.connection = connection;
    this.commandText = commandText;
    this.commandType = commandType || CommandType.Text;
    this.parameters = parameters || [];
  }

  executeReader(): Promise<DataSet> {
    return new Promise((res, rej) => {
      let rowsBuffer: DataRow[] = [];
      let streamBuffer: string = '';
      let colsBuffer: ColumnMetadata[] = [];
      let concatRows = false;

      const request = new Request(this.commandText, err => {
        if (err) {
          rej(err);
        }
      });

      request.on('columnMetadata', columns => {
        if (!columns.length) {
          const columnsDictionary = columns as ReturnColumnMetadataAsObject;
          colsBuffer = Object.keys(columnsDictionary).map(
            (col: string) => columnsDictionary[col]
          );
        }
        colsBuffer = columns as ColumnMetadata[];
        concatRows =
          columns.length === 1 &&
          reservedColumnName.test(colsBuffer[0].colName);
      });
      // request.on('prepared', () => {
      // 	console.log('event:prepared');
      // });
      // request.on('error', err => {
      // 	console.log('event:prepared', { err });
      // });
      request.on('row', columns => {
        if (concatRows) {
          streamBuffer += columns[0].value;
        } else {
          rowsBuffer.push(tdsRowToDataRow(columns));
        }
      });
      // request.on('done', (rowCount, more, rows) => {
      // 	console.log('event:row', { rowCount, more, rows });
      // });
      // request.on('doneProc', (rowCount, more, rows) => {
      // 	console.log('event:doneProc', { rowCount, more, rows });
      // });
      // request.on('returnValue', (parameterName, value, metadata) => {
      // 	console.log('event:returnValue', { parameterName, value, metadata });
      // });
      // request.on('order', orderColumns => {
      // 	console.log('event:order', { orderColumns });
      // });
      // request.on('order', orderColumns => {
      // 	console.log('event:order', { orderColumns });
      // });
      // request.on('cancel', () => {
      // 	console.log('event:cancel');
      // });
      // request.on('doneInProc', (rowCount: number | undefined, more: boolean, rows?: any[]) => {
      // 	console.log('Request.doneInProc', {
      // 		rowCount,
      // 		more,
      // 		rows
      // 	});
      // });
      request.on('requestCompleted', () => {
        if (concatRows) {
          rowsBuffer = JSON.parse(streamBuffer);
          colsBuffer = [];
        }
        const dataset: DataSet = {
          tables: [
            {
              rows: rowsBuffer,
              columns: colsBuffer,
            },
          ],
        };
        console.log('Request.requestCompleted', {
          bufferSize: rowsBuffer.length,
          tablesCount: dataset.tables.length,
          tableSample: dataset.tables[0],
        });
        res(dataset);
      });

      this.setupParameters(request);
      this.executeRequest(request);
    });
  }

  executeNonQuery(): Promise<number> {
    if (!this.connection) {
      throw new Error('Connection not defined.');
    }
    return new Promise((res, rej) => {
      const request = new Request(this.commandText, err => {
        if (err) {
          rej(err);
        }
      });

      // request.on(
      //   'done',
      //   (rowCount: number | undefined, more: boolean, rows?: any[]) => {
      //   console.log('Request.done', {
      //     rowCount,
      //     more,
      //     rows,
      //   });
      // });

      // request.on('doneInProc', (rowCount: number | undefined, more: boolean, rows?: any[]) => {
      //   // triggered by execSql
      //   console.log('Request.doneInProc', {
      //     rowCount,
      //     more,
      //     rows,
      //   });
      // });
      //
      // request.on('doneProc', (rowCount: number | undefined, more: boolean, returnStatus: any, rows?: any[]) => {
      //   console.log('Request.doneProc', {
      //     rowCount,
      //     more,
      //     returnStatus,
      //     rows,
      //   });
      // });
      //
      // request.on('returnValue', (parameterName: string, value: unknown, metadata: Metadata) => {
      //   console.log('Request.returnValue', {
      //     parameterName,
      //     value,
      //     metadata,
      //   });
      // });

      request.on('requestCompleted', () => {
        res(0);
      });

      this.setupParameters(request);
      this.executeRequest(request);
    });
  }

  private setupParameters(request: Request) {
    this.parameters &&
      this.parameters.forEach(par => {
        let type = par.type || jsTypeToTediousType(par.value);
        request[
          par.direction === ParameterDirection.Output
            ? 'addOutputParameter'
            : 'addParameter'
        ](par.name, type, par.value === undefined ? null : par.value);
      });
  }

  private executeRequest(request: Request) {
    if (this.commandType === CommandType.StoredProcedure) {
      this.connection?.driver?.callProcedure(request);
    } else {
      this.connection?.driver?.execSql(request);
    }
  }
}
