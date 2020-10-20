import { mocked } from 'ts-jest/utils';
import { SqlConnection } from '../src';
import { Connection } from 'tedious';

jest.mock('tedious');
const MockedConnection = mocked(Connection);

// let MockSqlConnection = mocked(SqlConnection, true);

beforeEach(() => {
  MockedConnection.mockClear();
});

it('should call Connection.connect()', () => {
  expect(MockedConnection).not.toHaveBeenCalled();
  const con = new SqlConnection();
  expect(MockedConnection).toHaveBeenCalled();
  con.open();
  expect(MockedConnection.mock.instances[0].connect).toHaveBeenCalled();
});

it('should call Connection.close()', () => {
  expect(MockedConnection).not.toHaveBeenCalled();
  const con = new SqlConnection();
  expect(MockedConnection).toHaveBeenCalled();
  con.close();
  expect(MockedConnection.mock.instances[0].close).toHaveBeenCalled();
});
