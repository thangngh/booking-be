import * as argon2 from "argon2";

export enum TokenType {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum RoleType {
    USER = 'USER',
    DOCTOR = 'DOCTOR',
    PATIENT = 'PATIENT'
}

export enum Order {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum EProviderType {
    ACCOUNT = 'ACCOUNT',
    GOOGLE = 'GOOGLE'
}

export enum EGender {
    FEMALE = 'FEMALE',
    MALE = 'MALE'
}

export interface IAddress {
    city: string;
    district: string;
    street: string;
}

export interface IBody {
    [key: string]: string
}

export const LIMIT = 1;
export const LIMIT_QUERY = 10;
export const PAGE = 1;

export enum EActive {
    ACTIVE = 1,
    DE_ACTIVE = 0
}

export async function hashValue(value: string) {
    const hash = await argon2.hash(value)

    return hash
}

export async function validateHash(hashValue: string, value: string): Promise<boolean> {
    const isMatch = await argon2.verify(hashValue, value);
    return isMatch;
}