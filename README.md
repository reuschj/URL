# URL
Class to define/hold a URL and break down component parts

## Create a new URL instance

To create a new `URL`, initialize with the following parameters:

Parameter | Type | Required | Default Value | Notes
----| ---- | ---- | ---- | ----
url | string | Yes |  | Specify the URL as a string. The 'http://' or 'https://' prefix is optional. If omitted, the `isSecure` parameter will determine http or https. If not omitted, it will determine the `secure` property (and override the `isSecure` parameter).
port | number | No | `null` | Specifies the port. Omit or specify `null` if there is no port.
isSecure | boolean | No | `true` | Sets the `secure` property. Determines http (`false`) or https (`true`)

For example:

```
// No port, secure will be false
const url = new URL('http://www.google.com');

// No port, secure will be false
const url = new URL('www.google.com', null, false);

// Port 8080, secure will be true
const url = new URL('www.secureServer.com', 8080);
```