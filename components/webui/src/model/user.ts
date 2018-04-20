import { apiCall } from "../model/api";

export interface IUser {
    name: string;
    email: string;
}

/**
 * Gets the current user according to the JWT token pass.
 */
export function getCurrentUser() {
    return apiCall<IUser>("user/me");
}
