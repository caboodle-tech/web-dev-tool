# Known Issues
These are the current known issues with Web Dev Tool. Please do not submit a new issue for an issue already listed in this table. If you have a fix for an issue listed here please submit a merge request with the fix.

---

### mouse double click event

**Description:**<br>
Headless browsers do not seem to consistently support the double click event so you should not use `addEventListener` to listen for `dblclick`.

**Fixable:**<br>
No. Because of browser inconsistencies this should be avoided.

---

### can not load source file / CORS error

**Description:**<br>
Because Web Dev Tool is essentially just another JavaScript file loaded on the page, the source page will not let you view the source of a remote file. This is normal [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) behavior.

**Fixable:**<br>
No. This is built into browsers as a security protection.

---

### console page prints functions / objects wrong

**Description:**<br>
Printing a function or object to the console in Web Dev Tool looks terrible or otherwise breaks the output.

**Fixable:**<br>
Yes. A merge request will be accepted as long as the output fits the current theme with collapsing sections (rows).
