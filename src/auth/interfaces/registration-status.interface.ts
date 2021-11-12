import { AccessTokenData } from "./accessTokenData.interface";

export interface RegistrationStatus {
    success: boolean;
    message: string;
    token?: AccessTokenData;
}