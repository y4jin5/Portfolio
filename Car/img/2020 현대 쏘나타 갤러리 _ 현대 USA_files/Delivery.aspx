var createSafeSameSiteCookie = function (cookieName, cookieValue, expires, path = undefined, domain = undefined) {

    if (path === undefined) {
        path = 'path=/';
    }

    if (domain === undefined) {
        domain = "";
    }

    var userAgent = navigator.userAgent;
    var cookie = cookieName + '=' + cookieValue + ';' + expires + ';' + path + ";" + domain + ';Secure';

    cookie = cookie.replace(/;;/g, ";");

    if (userAgent.indexOf('CPU iPhone OS 12') !== -1 || userAgent.indexOf('iPad; CPU OS 12') !== -1) {
        return cookie;
    }

    // macOS 10.14 Mojave browsers don't support SameSite=None.
    if (userAgent.indexOf('Macintosh; Intel Mac OS X 10_14') !== -1 && userAgent.indexOf('Version/') && userAgent.indexOf('Safari') !== -1) {
        return cookie;
    }

    // Old versions of Chrome don't support SameSite=None.
    if (userAgent.indexOf('Chrome/5') !== -1 || userAgent.indexOf('Chrome/6') !== -1) {
        return cookie;
    }

    return cookie + ';SameSite=None';
};

var createSafeSameSiteJSONCookie = function (cookieName, cookieValue, expires, path = undefined) {

    if (path === undefined) {
        path = 'path=/';
    }

    var userAgent = navigator.userAgent;
    var cookie = cookieName + '=' + JSON.stringify(cookieValue) + ';' + expires + ';' + path + ';Secure';

    cookie = cookie.replace(/;;/g, ";");

    if (userAgent.indexOf('CPU iPhone OS 12') !== -1 || userAgent.indexOf('iPad; CPU OS 12') !== -1) {
        return cookie;
    }

    // macOS 10.14 Mojave browsers don't support SameSite=None.
    if (userAgent.indexOf('Macintosh; Intel Mac OS X 10_14') !== -1 && userAgent.indexOf('Version/') && userAgent.indexOf('Safari') !== -1) {
        return cookie;
    }

    // Old versions of Chrome don't support SameSite=None.
    if (userAgent.indexOf('Chrome/5') !== -1 || userAgent.indexOf('Chrome/6') !== -1) {
        return cookie;
    }

    return cookie + ';SameSite=None';
}

