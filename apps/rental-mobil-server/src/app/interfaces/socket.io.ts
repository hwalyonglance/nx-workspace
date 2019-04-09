export interface SocketIOStatic {
	(param?: any): Server;
	// (srv: any, opts?: ServerOptions): SocketIO.Server;
	// (port: string | number, opts?: ServerOptions): SocketIO.Server;
	// (opts: ServerOptions): SocketIO.Server;
	listen: SocketIOStatic;
}
export interface Server {
	engine: { ws: any };
	nsps: {[namespace: string]: Namespace};
	nsp: string;
	sockets: Namespace;
	json: Server;
	checkRequest( req: any, fn: ( err: any, success: boolean ) => void ): void;
	serveClient(): boolean;
	serveClient( v: boolean ): Server;
	path(): string;
	path( v: string ): Server;
	adapter(): any;
	adapter( v: any ): Server;
	origins(): string;
	origins( v: string ): Server;
	attach(srv: any, opts?: ServerOptions ): Server;
	// attach( port: number, opts?: ServerOptions ): Server;
	listen( srv: any, opts?: ServerOptions ): Server;
	// listen( port: number, opts?: ServerOptions ): Server;
	bind( srv: any ): Server;
	onconnection( socket: any ): Server;
	of( nsp: string ): Namespace;
	close( fn ?: () => void ): void;
	on(event: 'connection' | 'connect', listener: (socket: Socket) => void): Namespace;
	on(event: string, listener: Function): Namespace;
	to(room: string): Namespace;
	in(room: string): Namespace;
	use( fn: ( socket: Socket, fn: ( err?: any ) => void ) => void ): Namespace;
	emit(event: string, ...args: any[]): Namespace;
	send( ...args: any[] ): Namespace;
	write( ...args: any[] ): Namespace;
	clients( ...args: any[] ): Namespace;
	compress(...args: any[]): Namespace;
}
export interface ServerOptions {
	path?: string;
	serveClient?: boolean;
	adapter?: Adapter;
	origins?: string;
	pingTimeout?: number;
	pingInterval?: number;
	maxHttpBufferSize?: number;
	allowRequest?: (request: any, callback: (err: number, success: boolean) => void) => void;
	transports?: string[];
	allowUpgrades?: boolean;
	perMessageDeflate?: Object | boolean;
	httpCompression?: Object | boolean;
	cookie?: string | boolean;
}
export interface Namespace extends EventEmitter {
	name: string;
	server: Server;
	sockets: { [id: string]: Socket };
	connected: { [id: string]: Socket };
	adapter: Adapter;
	json: Namespace;
	use(fn: (socket: Socket, fn: (err?: any) => void) => void): Namespace;
	to(room: string): Namespace;
	in(room: string): Namespace;
	send(...args: any[]): Namespace;
	write(...args: any[]): Namespace;
	on(event: 'connection' | 'connect', listener: (socket: Socket) => void): this;
	on(event: string, listener: Function): this;
	clients(fn: Function): Namespace;
	compress(compress: boolean): Namespace;
}
export interface Socket extends EventEmitter {
	nsp: Namespace;
	server: Server;
	adapter: Adapter;
	id: string;
	request: any;
	client: Client;
	conn: EngineSocket;
	rooms: { [id: string]: string };
	connected: boolean;
	disconnected: boolean;
	handshake: {
		headers: any;
		time: string;
		address: string;
		xdomain: boolean;
		secure: boolean;
		issued: number;
		url: string;
		query: any;
	};
	json: Socket;
	volatile: Socket;
	broadcast: Socket;
	to(room: string): Socket;
	in(room: string): Socket;
	send(...args: any[]): Socket;
	write(...args: any[]): Socket;
	join(name: string, fn?: (err?: any) => void): Socket;
	leave(name: string, fn?: Function): Socket;
	leaveAll(): void;
	disconnect(close?: boolean): Socket;
	listeners(event: string): Function[];
	compress(compress: boolean): Socket;
}
export interface Adapter extends EventEmitter {
	nsp: Namespace;
	rooms: { [room: string]: { sockets: { [id: string]: boolean }, length: number } };
	sids: { [id: string]: { [room: string]: boolean } };
	add(id: string, room: string, callback?: (err?: any) => void): void;
	del(id: string, room: string, callback?: (err?: any) => void): void;
	delAll(id: string): void;
	broadcast(packet: any, opts: { rooms?: string[]; except?: string[]; flags?: { [flag: string]: boolean } }): void;
}
interface Client {
	server: Server;
	conn: EngineSocket;
	id: string;
	request: any;
	sockets: { [id: string]: Socket };
	nsps: { [nsp: string]: Socket };
}
interface EngineSocket extends EventEmitter {
	id: string;
	server: any;
	readyState: string;
	remoteAddress: string;
	upgraded: boolean;
	request: any;
	transport: any;
}
interface EventEmitter {
	addListener(event: string | symbol, listener: Function): this;
	on(event: string | symbol, listener: Function): this;
	once(event: string | symbol, listener: Function): this;
	removeListener(event: string | symbol, listener: Function): this;
	removeAllListeners(event?: string | symbol): this;
	setMaxListeners(n: number): this;
	getMaxListeners(): number;
	listeners(event: string | symbol): Function[];
	emit(event: string | symbol, ...args: any[]): boolean;
	listenerCount(type: string | symbol): number;
	// Added in Node 6...
	prependListener(event: string | symbol, listener: Function): this;
	prependOnceListener(event: string | symbol, listener: Function): this;
	eventNames(): (string | symbol)[];
}
