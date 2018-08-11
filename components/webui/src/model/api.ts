import { getAccessToken } from "./auth";

/**
 * Get's the URL to issue requests against based on the current window's location.
 */
export function getUrl(apiPath: string) {
    return window.location.origin + "/api/" + apiPath;
}

export async function apiCall<T>(apiPath: string) {
    // TODO: need to add auth
    const jwt = getAccessToken();
    const url = getUrl(apiPath);

    let request = new Request(url, {
        headers: {
            "Authorization": "Bearer " + jwt
        }
    });

    const res = await fetch(request);
    return await res.json() as T;
}
