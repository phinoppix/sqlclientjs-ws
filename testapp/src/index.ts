import {Command, flags} from '@oclif/command';
const config = require('dotenv').config();

import * as Test from './sqltests';


class Testapp extends Command {
  static description = 'describe the command here';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  };

  // static args = [{name: 'file'}];

  async run() {
    const {flags} = this.parse(Testapp);

    const name = flags.name ?? 'world';
    this.log(`hello ${name} from ./src/index.ts`);
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }

    await Test.execStoredProcWithInsertAndResultset();
  }
}

export = Testapp
