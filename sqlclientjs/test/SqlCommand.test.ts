import { CommandType, SqlCommand } from '../src';

describe('SqlCommand', () => {
  it('should show the correct commandText and commandType for the most basic instantiation', () => {
    const qry = 'select * from foo;';
    const cmd = new SqlCommand({
      commandText: qry,
    });
    expect(cmd.commandText).toBe(qry);
    expect(cmd.commandType).toBe(CommandType.Text);
  });
});
