export const connectionConfig = {
  server: process.env.SQLHOST,
  authentication: {
    options: {
      userName: process.env.SQLUSER,
      password: process.env.SQLPASSWORD
    }
  },
  options: {
    appName: process.env.SQLAPPNAME,
    database: process.env.SQLINITDB
  }
};
