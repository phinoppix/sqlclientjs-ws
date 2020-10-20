import { DataType } from 'tedious';

export enum ParameterDirection {
  Input,
  Output,
}

export default interface SqlParameter {
  name: string;
  value: any;
  type?: DataType;
  direction?: ParameterDirection;
}
