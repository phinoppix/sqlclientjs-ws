import { ColumnMetadata } from 'tedious';

export enum CommandType {
  Text,
  StoredProcedure,
}

export type DataRow = { name: string; value: any }[];

export interface DataTable {
  rows: DataRow[];
  columns: ColumnMetadata[];
}

export interface DataSet {
  tables: DataTable[];
}
