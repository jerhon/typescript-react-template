
import rp from "request-promise";

/**
 * Get's the URL to issue requests against based on the current window's location.
 */
export function getUrl(apiPath: string) {
    return window.location.origin + "/api/" + apiPath;
}

export async function apiCall<T>(apiPath: string) {
    // TODO: need to add auth
    const url = getUrl(apiPath);
    const res = await rp({ uri: url, json: true });
    return res as T;
}
