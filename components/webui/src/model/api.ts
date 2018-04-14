
/**
 * Get's the URL to issue requests against based on the current window's location.
 */
export function getUrl(apiPath: string) {
    return window.location.origin + "/api/" + apiPath;
}

export async function requestApi(apiPath: string) {
    // todo: need to add jwt token

    const request = new Request(getUrl(apiPath));

    await fetch(request);
}
