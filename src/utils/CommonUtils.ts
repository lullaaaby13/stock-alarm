export function getAppRootPath () : string {
    const appRootPath = process.env.INIT_CWD;
    if (appRootPath !== undefined) {
        return appRootPath;
    } else {
        return '';
    }
}