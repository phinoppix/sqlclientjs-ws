import { CommandType, SqlCommand, SqlConnection } from 'sqlclientjs';

import { connectionConfig } from './connectionConfig';

const createConnection = () => {
  console.log('connectionConfig', connectionConfig);
  return new SqlConnection(connectionConfig);
};

export const simpleInlineSelect = async () => {
  const con = createConnection();
  // const cmd = new SqlCommand({
  //   connection: con,
  //   commandText: `
  //   select t.* from vis.territory t
  //   inner join vis.divisionTerritory dt on dt.division_id = @divisionId and dt.territory_id = t.id`,
  //   parameters: [{ name: 'divisionId', value: 'ca-heartlake-tag' }]
  // });
  const cmd = new SqlCommand({
    connection: con,
    commandText: `
    select * from employee;`
  });

  try {
    await con.open();
    const result = await cmd.executeReader();
    console.log('simpleInlineSelect', result);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const execStoredProcWithInsertAndResultset = async () => {
  const connection = createConnection();
  const cmd = new SqlCommand({
    connection,
    commandText: 'usp_InsertEmployee',
    commandType: CommandType.StoredProcedure,
    parameters: [
      { name: "employeeName", value: "Aris" },
      { name: "salary", value: 4000 }
    ]
  });
  try {
    await connection.open();
    return await cmd.executeReader();
  } catch (e) {
    console.error(e);
    throw e;
  }
};
