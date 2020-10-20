import { SqlConnection } from '../src';

it('SqlConnection ctor should create a new Connection object with default configuration', () => {
  const con = new SqlConnection();
  expect(con.config.server).toBe('localhost');
});
