import { Connection, ConnectionConfiguration } from 'tedious';
import * as R from './ramda';

const DEFAULT_CONFIG: ConnectionConfiguration = {
  server: 'localhost',
  authentication: {
    type: 'default',
    options: {},
  },
  options: {
    database: 'master',
    trustServerCertificate: false,
    encrypt: false,
    validateBulkLoadParameters: true,
  },
};

export enum ConnectionStatus {
  Closed,
  Opening,
  Open,
}

export default class SqlConnection {
  config: ConnectionConfiguration;
  driver?: Connection;
  status: ConnectionStatus = ConnectionStatus.Closed;

  constructor(config?: ConnectionConfiguration) {
    const tmpConfig = config || DEFAULT_CONFIG;
    this.config =
      tmpConfig !== DEFAULT_CONFIG
        ? (R.mergeDeepRight(
            DEFAULT_CONFIG,
            tmpConfig!
          ) as ConnectionConfiguration)
        : tmpConfig;
    this.driver = new Connection(this.config);
  }

  open = () =>
    new Promise((res, rej) => {
      this.status = ConnectionStatus.Opening;
      this.driver!.connect((err?: Error) => {
        if (err) {
          this.status = ConnectionStatus.Closed;
          rej(err);
        } else {
          this.status = ConnectionStatus.Open;
          res(this);
        }
      });
    });

  close() {
    if (this.driver) {
      this.driver.close();
      this.status = ConnectionStatus.Closed;
    }
  }
}
