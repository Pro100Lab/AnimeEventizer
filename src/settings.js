
const SCHEMA = 'http';
export const DEBUG_SERVER_VADUA = '25.55.44.201:8000';
export const DEBUG_SERVER_ILMIR = '25.55.29.124:8080';

export function makeURL(uri, money=false) {
    return `${SCHEMA}://${money ? DEBUG_SERVER_ILMIR : DEBUG_SERVER_VADUA}/${uri}`;
}