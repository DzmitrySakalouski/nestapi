import { AccessTokenData } from "./accessTokenData.interface";

export interface LoginStatus {
    email: string;
    token: AccessTokenData,
}