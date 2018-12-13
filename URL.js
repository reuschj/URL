'use strict';

// Constants
const http = 'http://';
const https = 'https://';

/**
 * Class to define a URL and break down component parts
 */
class URL {
    /**
     * @constructor
     * @param {string} url
     * @param {number|null} port - Set port... use null (or omit) if no port
     * @param {boolean} isSecure - true for HTTPS, false for HTTP
     */
    constructor(url, port = null, isSecure = true) {
        this.setSecure(isSecure);
        this.setURL(url);
        this.setPort(port);
    }

    /**
     * Sets security on or off
     * Secure = Use https
     * Not secure = Use http
     * @param {boolean} isSecure
     */
    setSecure(isSecure = true) {
        this.secure = typeof isSecure === 'boolean' ? isSecure : true;
    }

    /**
     * Secure = Uses https
     * Not secure = Uses http
     * @return {boolean}
     */
    isSecure() {
        return this.secure;
    }

    getProtocol() {
        return this.isSecure() ? 'HTTPS' : 'HTTP';
    }

    /**
     * Sets the service URL
     * Cleans http or https off if given and sets secure property
     * @param {string} url
     * @throws {Error}
     */
    setURL(url) {
        if (typeof url === 'string') {
            let cleanURL = url;
            if (url.includes(http)) {
                cleanURL = url.substr(http.length);
                this.setSecure(false);
            }
            if (url.includes(https)) {
                cleanURL = url.substr(https.length);
                this.setSecure(true);
            }
            const splitURL = cleanURL.split('/');
            const hostName = splitURL.shift();
            const host = hostName.split('.');
            this.setDomain(host.pop());
            this.setName(host.pop());
            this.setSubDomain(host.join('.'));
            this.setPath(splitURL);
        } else {
            throw new Error(`Expected URL to be a string, but received a ${typeof url}`);
        }
    }

    /**
     * Getter for url
     * Adds the appropriate HTTP or HTTPS prefix and optionally, the port
     * @return {string}
     */
    getURL(addPort = false, addPrefix = true) {
        const prefix = this.isSecure() ? https : http;
        const prefixString = addPrefix ? prefix : '';
        const hasPath = this.path.length > 0;
        const pathString = hasPath ? `/${this.getPathString()}` : ''
        const port = this.getPort() !== null ? this.getPort() : null;
        const portString = addPort && port !== null ? `:${port}` : '';
        return `${prefixString}${this.getHostName()}${pathString}${portString}`;
    }

    /**
     * Getter for full URL
     * Shortcut to get full URL with prefix and port
     * @return {string}
     */
    getFullURL() {
        return this.getURL(true, true);
    }

    /**
     * Setter for port
     * @param {number} port
     */
    setPort(port) {
        const canUsePort = (typeof port === 'number') || (typeof port === 'string' && !isNaN(parseInt(port)));
        if (canUsePort) {
            this.port = parseInt(port);
        } else {
            this.port = null;
        }
    }

    /**
     * Getter for port
     * @return {number|null}
     */
    getPort() {
        return this.port;
    }

    /**
     * Setter for domain
     * @param {string} domain
     */
    setDomain(domain) {
        this.domain = domain;
    }

    /**
     * Getter for domain
     * @return {string}
     */
    getDomain() {
        return this.domain;
    }

    /**
     * Setter for name
     * @param {string} name
     */
    setName(name) {
        this.name = name;
    }

    /**
     * Getter for name
     * @return {string}
     */
    getName() {
        return this.name;
    }

    /**
     * Setter for sub-domain
     * @param {string} subDomain
     */
    setSubDomain(subDomain) {
        this.subDomain = subDomain;
    }

    /**
     * Getter for sub-domain
     * @return {string}
     */
    getSubDomain() {
        return this.subDomain;
    }

    /**
     * Getter for domain name
     * @return {string}
     */
    getDomainName() {
        return `${this.getName()}.${this.getDomain()}`;
    }

    /**
     * Getter for host name
     * @return {string}
     */
    getHostName() {
        const subDomain = this.getSubDomain();
        const subDomainString = subDomain.length > 0 ? `${subDomain}.` : '';
        return `${subDomainString}${this.getDomainName()}`;
    }

    /**
     * Setter for path (set with array)
     * @param {Array} path
     */
    setPath(path) {
        this.path = path instanceof Array ? path : this.setPathFromString(path);
    }

    /**
     * Setter for path (set with string)
     * @param {string} path
     */
    setPathFromString(path) {
        this.path = typeof path === 'string' ? path.split('/') : [];
    }

    /**
     * Getter for path (array)
     * @return {Array}
     */
    getPath() {
        return this.path;
    }

    /**
     * Getter for path string
     * @return {string}
     */
    getPathString() {
        return this.path.join('/');
    }
}

// Export
module.exports = URL;