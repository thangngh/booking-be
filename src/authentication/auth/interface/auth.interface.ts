
export interface ILogin {
	username: string;
	password: string;
}

export interface IRegister {
	username: string;
	firstName: string;
	lastName: string;
	password: string;
	email: string;
}

export interface IToken {
	id: string;
	access_token: string;
	refresh_token: string
}

export interface IJwtPayload {
	id?: number;
	username?: string;
	sub?: string;
	iat?: number;
	exp?: number;
}