# sqlclientjs

A .NET SqlClient-like library to access MSSQL databases, using `tedious` [https://github.com/tediousjs/tedious](https://github.com/tediousjs/tedious) under the hood.

As of current, there are only 2 classes available, with super basic functions:
- SqlConnection
- SqlCommand

The SqlCommand class can execute inline queries and stored procedures and return single recordset and scalar values.

There is no transaction support yet, and has limitations inherited from `tedious`.
