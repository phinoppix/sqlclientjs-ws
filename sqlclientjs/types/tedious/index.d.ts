declare module 'tedious' {


	export interface DataType {
		type: string;
		name: string;
	}

	export interface TediousTypes {
		BigInt: DataType;
		Binary: DataType;
		Bit: DataType;
		Char: DataType;
		Date: DataType;
		DateTime2: DataType;
		DateTime: DataType;
		DateTimeOffset: DataType;
		Decimal: DataType;
		Float: DataType;
		Image: DataType;
		Int: DataType;
		Money: DataType;
		NChar: DataType;
		NText: DataType;
		NVarChar: DataType;
		Null: DataType;
		Numeric: DataType;
		Real: DataType;
		SmallDateTime: DataType;
		SmallInt: DataType;
		SmallMoney: DataType;
		TVP: DataType;
		Text: DataType;
		Time: DataType;
		TinyInt: DataType;
		UDT: DataType;
		UniqueIdentifier: DataType;
		VarBinary: DataType;
		VarChar: DataType;
		Xml: DataType;
	}

	export declare var TYPES: TediousTypes;

	interface Collation {
		lcid: number;
		flags: number;
		version: number;
		sortId: number;
		codepage: string;
	}

	interface XmlSchema {
		dbname: string;
		owningSchema: string;
		xmlSchemaCollection: string;
	}

	interface UdtInfo {
		maxByteSize: number;
		dbname: string;
		owningSchema: string;
		typeName: string;
		assemblyName: string;
	}

	export interface Metadata {
		userType: number;

		flags: number;
		/**
		 * The column's type, such as VarChar, Int or Binary.
		 */
		type: DataType;

		collation: Collation | undefined;
		/**
		 * The precision. Only applicable to numeric and decimal.
		 */
		precision: number | undefined;

		/**
		 * The scale. Only applicable to numeric, decimal, time, datetime2 and datetimeoffset.
		 */
		scale: number | undefined;

		/**
		 * The length, for char, varchar, nvarchar and varbinary.
		 */
		dataLength: number | undefined;

		schema: XmlSchema | undefined;

		udtInfo: UdtInfo | undefined;
	}

	interface ColumnMetadata extends Metadata {
		/**
		 * The column's name。
		 */
		colName: string;
		tableName?: string | string[];
	}

	interface ConnectionOptions {
		abortTransactionOnError?: boolean;
		appName?: string | undefined;
		camelCaseColumns?: boolean;
		cancelTimeout?: number;
		columnNameReplacer?: (colName: string, index: number, metadata: Metadata) => string;
		connectionRetryInterval?: number;
		connectTimeout?: number;
		connectionIsolationLevel?: number;
		cryptoCredentialsDetails?: {};
		database?: string | undefined;
		datefirst?: number;
		dateFormat?: string;
		debug?: any; //DebugOptions;
		enableAnsiNull?: boolean;
		enableAnsiNullDefault?: boolean;
		enableAnsiPadding?: boolean;
		enableAnsiWarnings?: boolean;
		enableArithAbort?: boolean;
		enableConcatNullYieldsNull?: boolean;
		enableCursorCloseOnCommit?: boolean | null;
		enableImplicitTransactions?: boolean;
		enableNumericRoundabort?: boolean;
		enableQuotedIdentifier?: boolean;
		encrypt: boolean;
		fallbackToDefaultDb?: boolean;
		instanceName?: string | undefined;
		isolationLevel?: number;
		language?: string;
		localAddress?: string | undefined;
		maxRetriesOnTransientErrors?: number;
		multiSubnetFailover?: boolean;
		packetSize?: number;
		port?: number;
		readOnlyIntent?: boolean;
		requestTimeout?: number;
		rowCollectionOnDone?: boolean;
		rowCollectionOnRequestCompletion?: boolean;
		tdsVersion?: string;
		textsize?: string;
		trustServerCertificate?: boolean;
		useColumnNames?: boolean;
		useUTC?: boolean;
		validateBulkLoadParameters?: boolean;
		workstationId?: string | undefined;
		lowerCaseGuids?: boolean;
	}

	interface AzureActiveDirectoryMsiAppServiceAuthentication {
		type: 'azure-active-directory-msi-app-service';
		options: {
			/**
			 * If you user want to connect to an Azure app service using a specific client account
			 * they need to provide `clientId` asscoiate to their created idnetity.
			 *
			 * This is optional for retrieve token from azure web app service
			 */
			clientId?: string;
			/**
			 * A msi app service environment need to provide `msiEndpoint` for retriving the accesstoken.
			 */
			msiEndpoint?: string;
			/**
			 * A msi app service environment need to provide `msiSecret` for retriving the accesstoken.
			 */
			msiSecret?: string;
		};
	}

	interface AzureActiveDirectoryMsiVmAuthentication {
		type: 'azure-active-directory-msi-vm';
		options: {
			/**
			 * If you user want to connect to an Azure app service using a specific client account
			 * they need to provide `clientId` asscoiate to their created idnetity.
			 *
			 * This is optional for retrieve token from azure web app service
			 */
			clientId?: string;
			/**
			 * A user need to provide `msiEndpoint` for retriving the accesstoken.
			 */
			msiEndpoint?: string;
		};
	}

	interface AzureActiveDirectoryAccessTokenAuthentication {
		type: 'azure-active-directory-access-token';
		options: {
			/**
			 * A user need to provide `token` which they retrived else where
			 * to forming the connection.
			 */
			token: string;
		};
	}

	interface AzureActiveDirectoryPasswordAuthentication {
		type: 'azure-active-directory-password';
		options: {
			/**
			 * A user need to provide `userName` asscoiate to their account.
			 */
			userName: string;
			/**
			 * A user need to provide `password` asscoiate to their account.
			 */
			password: string;
		};
	}

	interface AzureActiveDirectoryServicePrincipalSecret {
		type: 'azure-active-directory-service-principal-secret';
		options: {
			/**
			 * Application (`client`) ID from your registered Azure application
			 */
			clientId: string;
			/**
			 * The created `client secret` for this registered Azure application
			 */
			clientSecret: string;
			/**
			 * Directory (`tenant`) ID from your registered Azure application
			 */
			tenantId: string;
		};
	}

	interface NtlmAuthentication {
		type: 'ntlm';
		options: {
			/**
			 * User name from your windows account.
			 */
			userName: string;
			/**
			 * Password from your windows account.
			 */
			password: string;
			/**
			 * Once you set domain for ntlm authentication type, driver will connect to SQL Server using domain login.
			 *
			 * This is necessary for forming a connection using ntlm type
			 */
			domain: string;
		};
	}

	interface DefaultAuthentication {
		type: 'default';
		options: {
			/**
			 * User name to use for sql server login.
			 */
			userName?: string;
			/**
			 * Password to use for sql server login.
			 */
			password?: string;
		};
	}

	declare type Authentication =
		DefaultAuthentication |
		NtlmAuthentication |
		AzureActiveDirectoryPasswordAuthentication |
		AzureActiveDirectoryMsiAppServiceAuthentication |
		AzureActiveDirectoryMsiVmAuthentication |
		AzureActiveDirectoryAccessTokenAuthentication |
		AzureActiveDirectoryServicePrincipalSecret;
	declare type AuthenticationType = Authentication['type'];

	interface AuthenticationOptions {
		/**
		 * Type of the authentication method, valid types are `default`, `ntlm`,
		 * `azure-active-directory-password`, `azure-active-directory-access-token`,
		 * `azure-active-directory-msi-vm`, `azure-active-directory-msi-app-service`,
		 * or `azure-active-directory-service-principal-secret`
		 */
		type?: AuthenticationType;
		/**
		 * Different options for authentication types:
		 *
		 * * `default`: [[DefaultAuthentication.options]]
		 * * `ntlm` :[[NtlmAuthentication]]
		 * * `azure-active-directory-password` : [[AzureActiveDirectoryPasswordAuthentication.options]]
		 * * `azure-active-directory-access-token` : [[AzureActiveDirectoryAccessTokenAuthentication.options]]
		 * * `azure-active-directory-msi-vm` : [[AzureActiveDirectoryMsiVmAuthentication.options]]
		 * * `azure-active-directory-msi-app-service` : [[AzureActiveDirectoryMsiAppServiceAuthentication.options]]
		 * * `azure-active-directory-service-principal-secret` : [[AzureActiveDirectoryServicePrincipalSecret.options]]
		 */
		options?: any;
	}

	export interface ConnectionConfiguration {
		server: string;
		options?: ConnectionOptions;
		authentication?: AuthenticationOptions;
	}

	interface ParameterOptions {
		output?: boolean;
		length?: number;
		precision?: number;
		scale?: number;
	}

	type CompletionCallback =
	/**
	 * @param error
	 *   If an error occured, an error object.
	 *
	 * @param rowCount
	 *   The number of rows emitted as result of executing the SQL statement.
	 *
	 * @param rows
	 *   Rows as a result of executing the SQL statement.
	 *   Will only be available if [[ConnectionOptions.rowCollectionOnRequestCompletion]] is `true`.
	 */
	// TODO: Figure out how to type the `rows` parameter here.
		(error: Error | null | undefined, rowCount?: number, rows?: any) => void;

	export class Request extends events.EventEmitter {
		/**
		 * This event, describing result set columns, will be emitted before row
		 * events are emitted. This event may be emited multiple times when more
		 * than one recordset is produced by the statement.
		 *
		 * An array like object, where the columns can be accessed either by index
		 * or name. Columns with a name that is an integer are not accessible by name,
		 * as it would be interpreted as an array index.
		 */
		on(event: 'columnMetadata', listener: (columns: ColumnMetadata[] | {
			[key: string]: ColumnMetadata;
		}) => void): this;
		/**
		 * The request has been prepared and can be used in subsequent calls to execute and unprepare.
		 */
		on(event: 'prepared', listener: () => void): this;
		/**
		 * The request encountered an error and has not been prepared.
		 */
		on(event: 'error', listener: (err: Error) => void): this;
		/**
		 * A row resulting from execution of the SQL statement.
		 */
		on(event: 'row', listener:
			/**
			 * An array or object (depends on [[ConnectionOptions.useColumnNames]]), where the columns can be accessed by index/name.
			 * Each column has two properties, `metadata` and `value`：
			 *
			 * * `metadata`
			 *
			 *    The same data that is exposed in the `columnMetadata` event.
			 *
			 * * `value`
			 *
			 *    The column's value. It will be `null` for a `NULL`.
			 *    If there are multiple columns with the same name, then this will be an array of the values.
			 */
			(columns: any) => void): this;
		/**
		 * All rows from a result set have been provided (through `row` events).
		 *
		 * This token is used to indicate the completion of a SQL statement.
		 * As multiple SQL statements can be sent to the server in a single SQL batch, multiple `done` can be generated.
		 * An `done` event is emited for each SQL statement in the SQL batch except variable declarations.
		 * For execution of SQL statements within stored procedures, `doneProc` and `doneInProc` events are used in place of `done`.
		 *
		 * If you are using [[Connection.execSql]] then SQL server may treat the multiple calls with the same query as a stored procedure.
		 * When this occurs, the `doneProc` and `doneInProc` events may be emitted instead. You must handle both events to ensure complete coverage.
		 */
		on(event: 'done', listener:
			/**
			 * @param rowCount
			 *   The number of result rows. May be `undefined` if not available.
			 *
			 * @param more
			 *   If there are more results to come (probably because multiple statements are being executed), then `true`.
			 *
			 * @param rst
			 *   Rows as a result of executing the SQL statement.
			 *   Will only be avaiable if Connection's [[ConnectionOptions.rowCollectionOnDone]] is `true`.
			 */
			(rowCount: number | undefined, more: boolean, rows?: any[]) => void): this;
		/**
		 * `request.on('doneInProc', function (rowCount, more, rows) { });`
		 *
		 * Indicates the completion status of a SQL statement within a stored procedure. All rows from a statement
		 * in a stored procedure have been provided (through `row` events).
		 *
		 * This event may also occur when executing multiple calls with the same query using [[execSql]].
		 */
		on(event: 'doneInProc', listener:
			/**
			 * @param rowCount
			 *   The number of result rows. May be `undefined` if not available.
			 *
			 * @param more
			 *   If there are more results to come (probably because multiple statements are being executed), then `true`.
			 *
			 * @param rst
			 *   Rows as a result of executing the SQL statement.
			 *   Will only be avaiable if Connection's [[ConnectionOptions.rowCollectionOnDone]] is `true`.
			 */
			(rowCount: number | undefined, more: boolean, rst?: any[]) => void): this;
		/**
		 * Indicates the completion status of a stored procedure. This is also generated for stored procedures
		 * executed through SQL statements.\
		 * This event may also occur when executing multiple calls with the same query using [[execSql]].
		 */
		on(event: 'doneProc', listener:
			/**
			 * @param rowCount
			 *   The number of result rows. May be `undefined` if not available.
			 *
			 * @param more
			 *   If there are more results to come (probably because multiple statements are being executed), then `true`.
			 *
			 * @param rst
			 *   Rows as a result of executing the SQL statement.
			 *   Will only be avaiable if Connection's [[ConnectionOptions.rowCollectionOnDone]] is `true`.
			 */
			(rowCount: number | undefined, more: boolean, procReturnStatusValue: number, rst?: any[]) => void): this;
		/**
		 * A value for an output parameter (that was added to the request with [[addOutputParameter]]).
		 * See also `Using Parameters`.
		 */
		on(event: 'returnValue', listener:
			/**
			 * @param parameterName
			 *   The parameter name. (Does not start with '@'.)
			 *
			 * @param value
			 *   The parameter's output value.
			 *
			 * @param metadata
			 *   The same data that is exposed in the `columnMetaData` event.
			 */
			(parameterName: string, value: unknown, metadata: Metadata) => void): this;
		/**
		 * This event gives the columns by which data is ordered, if `ORDER BY` clause is executed in SQL Server.
		 */
		on(event: 'order', listener:
			/**
			 * @param orderColumns
			 *   An array of column numbers in the result set by which data is ordered.
			 */
			(orderColumns: number[]) => void): this;
		on(event: 'requestCompleted', listener: () => void): this;
		on(event: 'cancel', listener: () => void): this;

		/**
		 * @param sqlTextOrProcedure
		 *   The SQL statement to be executed
		 *
		 * @param callback
		 *   The callback to execute once the request has been fully completed.
		 */
		constructor(sqlTextOrProcedure: string | undefined, callback: CompletionCallback);

		/**
		 * @param name
		 *   The parameter name. This should correspond to a parameter in the SQL,
		 *   or a parameter that a called procedure expects. The name should not start with `@`.
		 *
		 * @param type
		 *   One of the supported data types.
		 *
		 * @param value
		 *   The value that the parameter is to be given. The Javascript type of the
		 *   argument should match that documented for data types.
		 *
		 * @param options
		 *   Additional type options. Optional.
		 */
		addParameter(name: string, type: DataType, value: unknown, options?: ParameterOptions): void;

		/**
		 * @param name
		 *   The parameter name. This should correspond to a parameter in the SQL,
		 *   or a parameter that a called procedure expects.
		 *
		 * @param type
		 *   One of the supported data types.
		 *
		 * @param value
		 *   The value that the parameter is to be given. The Javascript type of the
		 *   argument should match that documented for data types
		 *
		 * @param options
		 *   Additional type options. Optional.
		 */
		addOutputParameter(name: string, type: DataType, value?: unknown, options?: ParameterOptions): void;

		/**
		 * Temporarily suspends the flow of data from the database. No more `row` events will be emitted until [[resume] is called.
		 * If this request is already in a paused state, calling [[pause]] has no effect.
		 */
		pause(): void;

		/**
		 * Resumes the flow of data from the database.
		 * If this request is not in a paused state, calling [[resume]] has no effect.
		 */
		resume(): void;

		/**
		 * Cancels a request while waiting for a server response.
		 */
		cancel(): void;

		/**
		 * Sets a timeout for this request.
		 *
		 * @param timeout
		 *   The number of milliseconds before the request is considered failed,
		 *   or `0` for no timeout. When no timeout is set for the request,
		 *   the [[ConnectionOptions.requestTimeout]] of the [[Connection]] is used.
		 */
		setTimeout(timeout?: number): void;
	}

	declare class Connection extends EventEmitter {
		constructor(config: ConnectionConfiguration);

		/**
		 * The server has reported that the charset has changed.
		 */
		on(event: 'charsetChange', listener: (charset: string) => void): this;
		/**
		 * The attempt to connect and validate has completed.
		 */
		on(event: 'connect',
			 /**
				* @param err If successfully connected, will be falsey. If there was a
				*   problem (with either connecting or validation), will be an [[Error]] object.
				*/
			 listener: (err: Error | undefined) => void): this;
		/**
		 * The server has reported that the active database has changed.
		 * This may be as a result of a successful login, or a `use` statement.
		 */
		on(event: 'databaseChange', listener: (databaseName: string) => void): this;
		/**
		 * A debug message is available. It may be logged or ignored.
		 */
		on(event: 'debug', listener: (messageText: string) => void): this;
		/**
		 * Internal error occurs.
		 */
		on(event: 'error', listener: (err: Error) => void): this;
		/**
		 * The server has issued an error message.
		 */
		on(event: 'errorMessage', listener: (message: import('./token/token').ErrorMessageToken) => void): this;
		/**
		 * The connection has ended.
		 *
		 * This may be as a result of the client calling [[close]], the server
		 * closing the connection, or a network error.
		 */
		on(event: 'end', listener: () => void): this;
		/**
		 * The server has issued an information message.
		 */
		on(event: 'infoMessage', listener: (message: import('./token/token').InfoMessageToken) => void): this;
		/**
		 * The server has reported that the language has changed.
		 */
		on(event: 'languageChange', listener: (languageName: string) => void): this;
		/**
		 * A secure connection has been established.
		 */
		on(event: 'secure', listener: (cleartext: import('tls').TLSSocket) => void): this;

		// private emit(event: 'charsetChange', charset: string): boolean;
		// private emit(event: 'connect', error?: Error): boolean;
		// private emit(event: 'databaseChange', databaseName: string): boolean;
		// private emit(event: 'debug', messageText: string): boolean;
		// private emit(event: 'error', error: Error): boolean;
		// private emit(event: 'errorMessage', message: import('./token/token').ErrorMessageToken): boolean;
		// private emit(event: 'end'): boolean;
		// private emit(event: 'infoMessage', message: import('./token/token').InfoMessageToken): boolean;
		// private emit(event: 'languageChange', languageName: string): boolean;
		// private emit(event: 'secure', cleartext: import('tls').TLSSocket): boolean;
		// private emit(event: 'rerouting'): boolean;
		// private emit(event: 'resetConnection'): boolean;
		// private emit(event: 'retry'): boolean;
		// private emit(event: 'rollbackTransaction'): boolean;
		// private emit(event: 'sspichallenge', token: import('./token/token').SSPIToken): boolean;
		/**
		 * Closes the connection to the database.
		 *
		 * The [[Event_end]] will be emitted once the connection has been closed.
		 */
		close(): void;

		// /**
		//  * @private
		//  */
		// initialiseConnection(): void;
		// /**
		//  * @private
		//  */
		// cleanupConnection(cleanupType: typeof CLEANUP_TYPE[keyof typeof CLEANUP_TYPE]): void;
		// /**
		//  * @private
		//  */
		// createDebug(): Debug;
		connect(connectListener?: (err?: Error) => void): void;

		// /**
		//  * @private
		//  */
		// createTokenStreamParser(): TokenStreamParser;
		// connectOnPort(port: number, multiSubnetFailover: boolean): void;
		// /**
		//  * @private
		//  */
		// closeConnection(): void;
		// /**
		//  * @private
		//  */
		// createConnectTimer(): void;
		// /**
		//  * @private
		//  */
		// createCancelTimer(): void;
		// /**
		//  * @private
		//  */
		// createRequestTimer(): void;
		// /**
		//  * @private
		//  */
		// createRetryTimer(): void;
		// /**
		//  * @private
		//  */
		// connectTimeout(): void;
		// /**
		//  * @private
		//  */
		// cancelTimeout(): void;
		// /**
		//  * @private
		//  */
		// requestTimeout(): void;
		// /**
		//  * @private
		//  */
		// retryTimeout(): void;
		// /**
		//  * @private
		//  */
		// clearConnectTimer(): void;
		// /**
		//  * @private
		//  */
		// clearCancelTimer(): void;
		// /**
		//  * @private
		//  */
		// clearRequestTimer(): void;
		// /**
		//  * @private
		//  */
		// clearRetryTimer(): void;
		// /**
		//  * @private
		//  */
		// transitionTo(newState: State): void;
		// /**
		//  * @private
		//  */
		// getEventHandler<T extends keyof State['events']>(eventName: T): NonNullable<State['events'][T]>;
		// /**
		//  * @private
		//  */
		// dispatchEvent<T extends keyof State['events']>(eventName: T, ...args: Parameters<NonNullable<State['events'][T]>>): void;
		// /**
		//  * @private
		//  */
		// socketError(error: Error): void;
		// /**
		//  * @private
		//  */
		// socketConnect(): void;
		// /**
		//  * @private
		//  */
		// socketEnd(): void;
		// /**
		//  * @private
		//  */
		// socketClose(): void;
		// /**
		//  * @private
		//  */
		// sendPreLogin(): void;
		// /**
		//  * @private
		//  */
		// emptyMessageBuffer(): void;
		// /**
		//  * @private
		//  */
		// addToMessageBuffer(data: Buffer): void;
		// /**
		//  * @private
		//  */
		// sendLogin7Packet(): void;
		// /**
		//  * @private
		//  */
		// sendFedAuthTokenMessage(token: string): void;
		// /**
		//  * Returns false to apply backpressure.
		//  *
		//  * @private
		//  */
		// sendDataToTokenStreamParser(data: Buffer): boolean;
		// /**
		//  * This is an internal method that is called from [[Request.pause]].
		//  * It has to check whether the passed Request object represents the currently
		//  * active request, because the application might have called [[Request.pause]]
		//  * on an old inactive Request object.
		//  *
		//  * @private
		//  */
		// pauseRequest(request: Request | BulkLoad): void;
		// /**
		//  * This is an internal method that is called from [[Request.resume]].
		//  *
		//  * @private
		//  */
		// resumeRequest(request: Request | BulkLoad): void;
		// /**
		//  * Returns true if the passed request is the currently active request of the connection.
		//  *
		//  * @private
		//  */
		// isRequestActive(request: Request | BulkLoad): boolean;
		// /**
		//  * @private
		//  */
		// sendInitialSql(): void;
		// /**
		//  * @private
		//  */
		// getInitialSql(): string;
		// /**
		//  * @private
		//  */
		// processedInitialSql(): void;
		// /**
		//  * Execute the SQL batch represented by [[Request]].
		//  * There is no param support, and unlike [[Request.execSql]],
		//  * it is not likely that SQL Server will reuse the execution plan it generates for the SQL.
		//  *
		//  * In almost all cases, [[Request.execSql]] will be a better choice.
		//  *
		//  * @param request A [[Request]] object representing the request.
		//  */
		// execSqlBatch(request: Request): void;
		/**
		 *  Execute the SQL represented by [[Request]].
		 *
		 * As `sp_executesql` is used to execute the SQL, if the same SQL is executed multiples times
		 * using this function, the SQL Server query optimizer is likely to reuse the execution plan it generates
		 * for the first execution. This may also result in SQL server treating the request like a stored procedure
		 * which can result in the [[Event_doneInProc]] or [[Event_doneProc]] events being emitted instead of the
		 * [[Event_done]] event you might expect. Using [[execSqlBatch]] will prevent this from occurring but may have a negative performance impact.
		 *
		 * Beware of the way that scoping rules apply, and how they may [affect local temp tables](http://weblogs.sqlteam.com/mladenp/archive/2006/11/03/17197.aspx)
		 * If you're running in to scoping issues, then [[execSqlBatch]] may be a better choice.
		 * See also [issue #24](https://github.com/pekim/tedious/issues/24)
		 *
		 * @param request A [[Request]] object representing the request.
		 */
		execSql(request: Request): void;
		// /**
		//  * Creates a new BulkLoad instance.
		//  *
		//  * @param table The name of the table to bulk-insert into.
		//  * @param options A set of bulk load options.
		//  */
		// newBulkLoad(table: string, callback: BulkLoadCallback): BulkLoad;
		// newBulkLoad(table: string, options: BulkLoadOptions, callback: BulkLoadCallback): BulkLoad;
		// /**
		//  * Execute the SQL batch represented by [[Request]] .
		//  * There is no param support, and unlike [[execSql]],
		//  * it is not likely that SQL Server will reuse the execution plan it generates for the SQL.
		//  *
		//  * In almost all cases, [[execSql]] will be a better choice.
		//  *
		//  * @param bulkLoad A previously prepared [[Request]] .
		//  */
		// execBulkLoad(bulkLoad: BulkLoad): void;
		// /**
		//  * Prepare the SQL represented by the request.
		//  *
		//  * The request can then be used in subsequent calls to
		//  * [[execute]] and [[unprepare]]
		//  *
		//  * @param request A [[Request]] object representing the request.
		//  *   Parameters only require a name and type. Parameter values are ignored.
		//  */
		// prepare(request: Request): void;
		// /**
		//  * Release the SQL Server resources associated with a previously prepared request.
		//  *
		//  * @param request A [[Request]] object representing the request.
		//  *   Parameters only require a name and type.
		//  *   Parameter values are ignored.
		//  */
		// unprepare(request: Request): void;
		// /**
		//  * Execute previously prepared SQL, using the supplied parameters.
		//  *
		//  * @param request A previously prepared [[Request]].
		//  * @param parameters  An object whose names correspond to the names of
		//  *   parameters that were added to the [[Request]] before it was prepared.
		//  *   The object's values are passed as the parameters' values when the
		//  *   request is executed.
		//  */
		// execute(request: Request, parameters: {
		// 	[key: string]: unknown;
		// }): void;
		/**
		 * Call a stored procedure represented by [[Request]].
		 *
		 * @param request A [[Request]] object representing the request.
		 */
		callProcedure(request: Request): void;
		// /**
		//  * Start a transaction.
		//  *
		//  * @param callback
		//  * @param name A string representing a name to associate with the transaction.
		//  *   Optional, and defaults to an empty string. Required when `isolationLevel`
		//  *   is present.
		//  * @param isolationLevel The isolation level that the transaction is to be run with.
		//  *
		//  *   The isolation levels are available from `require('tedious').ISOLATION_LEVEL`.
		//  *   * `READ_UNCOMMITTED`
		//  *   * `READ_COMMITTED`
		//  *   * `REPEATABLE_READ`
		//  *   * `SERIALIZABLE`
		//  *   * `SNAPSHOT`
		//  *
		//  *   Optional, and defaults to the Connection's isolation level.
		//  */
		// beginTransaction(callback: BeginTransactionCallback, name?: string, isolationLevel?: number): void;
		// /**
		//  * Commit a transaction.
		//  *
		//  * There should be an active transaction - that is, [[beginTransaction]]
		//  * should have been previously called.
		//  *
		//  * @param callback
		//  * @param name A string representing a name to associate with the transaction.
		//  *   Optional, and defaults to an empty string. Required when `isolationLevel`is present.
		//  */
		// commitTransaction(callback: CommitTransactionCallback, name?: string): void;
		// /**
		//  * Rollback a transaction.
		//  *
		//  * There should be an active transaction - that is, [[beginTransaction]]
		//  * should have been previously called.
		//  *
		//  * @param callback
		//  * @param name A string representing a name to associate with the transaction.
		//  *   Optional, and defaults to an empty string.
		//  *   Required when `isolationLevel` is present.
		//  */
		// rollbackTransaction(callback: RollbackTransactionCallback, name?: string): void;
		// /**
		//  * Set a savepoint within a transaction.
		//  *
		//  * There should be an active transaction - that is, [[beginTransaction]]
		//  * should have been previously called.
		//  *
		//  * @param callback
		//  * @param name A string representing a name to associate with the transaction.\
		//  *   Optional, and defaults to an empty string.
		//  *   Required when `isolationLevel` is present.
		//  */
		// saveTransaction(callback: SaveTransactionCallback, name: string): void;
		// /**
		//  * Run the given callback after starting a transaction, and commit or
		//  * rollback the transaction afterwards.
		//  *
		//  * This is a helper that employs [[beginTransaction]], [[commitTransaction]],
		//  * [[rollbackTransaction]], and [[saveTransaction]] to greatly simplify the
		//  * use of database transactions and automatically handle transaction nesting.
		//  *
		//  * @param cb
		//  * @param isolationLevel
		//  *   The isolation level that the transaction is to be run with.
		//  *
		//  *   The isolation levels are available from `require('tedious').ISOLATION_LEVEL`.
		//  *   * `READ_UNCOMMITTED`
		//  *   * `READ_COMMITTED`
		//  *   * `REPEATABLE_READ`
		//  *   * `SERIALIZABLE`
		//  *   * `SNAPSHOT`
		//  *
		//  *   Optional, and defaults to the Connection's isolation level.
		//  */
		// transaction(cb: (err: Error | null | undefined, txDone?: <T extends TransactionDoneCallback>(err: Error | null | undefined, done: T, ...args: CallbackParameters<T>) => void) => void, isolationLevel?: typeof ISOLATION_LEVEL[keyof typeof ISOLATION_LEVEL]): void;
		// /**
		//  * @private
		//  */
		// makeRequest(request: BulkLoad, packetType: number): void;
		// makeRequest(request: Request, packetType: number, payload: Iterable<Buffer> & {
		// 	toString: (indent?: string) => string;
		// }): void;
		// /**
		//  * Cancel currently executed request.
		//  */
		// cancel(): boolean;
		// /**
		//  * Reset the connection to its initial state.
		//  * Can be useful for connection pool implementations.
		//  *
		//  * @param callback
		//  */
		// reset(callback: ResetCallback): void;
		// /**
		//  * @private
		//  */
		// currentTransactionDescriptor(): Buffer;
		// /**
		//  * @private
		//  */
		// getIsolationLevelText(isolationLevel: typeof ISOLATION_LEVEL[keyof typeof ISOLATION_LEVEL]): "read uncommitted" | "repeatable read" | "serializable" | "snapshot" | "read committed";
	}
}