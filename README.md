# Web Dev Tool
Web Dev Tool is a slimmed down clone of [Chromium developer tools](https://chromium.googlesource.com/devtools/devtools-frontend/) for headless browsers that do not come with their own developer tools. Web Dev Tool does not support all the features of traditional developer tools but faithfully imitates the primary features.

Please review the [KNOWN ISSUES](./pages/known-issues.md) page before submitting new issues.

### Seeing is Believing!
Check out the [live demo](https://caboodle-tech.github.io/web-dev-tool/index.html) to see Web Dev Tool in action.

### Installation for Production
You will need to include or inject the `web-dev-tool.min.js` file into every web page you wish Web Dev Tool to be available on. If possible this should be the first script loaded by the page.

### Installation for Development
You can follow the same process as a production installation but use the `web-dev-tool.js` file instead. If you will need to add elements that require new CSS you should see the [live demo](https://caboodle-tech.github.io/web-dev-tool/index.html) for a better example.

### Repository Source Map
A handy table of what-is-what in the Web Dev Tool repository:

File | Where is it? | What is it?
---|---|---
web-dev-tool.js | ./ | This is the Web Dev Tool app.
web-dev-tool.min.js | ./ | This is the minified Web Dev Tool app.
LICENSE-Font-Awesome.md | ./ | The license file for the free Font Awesome<br>SVG icons Web Dev Tool uses.
LICENSE | ./ | Web Dev Tool license file.
docs* | ./docs | The live demo of Web Dev Tool and<br>the files you will need for development.
pages* | ./pages | Important files you should read if you<br>plan to submit an issue or contribute to<br>Web Dev Tool.

### Can I Help?
Yes you can! Web Dev Tool was developed with the mindset of helping teach University programming classes online. If you share that vision, please help me grow and maintain Web Dev Tool.

If you have other use cases for Web Dev Tool please feel free to add them and submit a pull request. As long as the changes don't make it hard for students to use Web Dev Tool it will probably get merged.

You can also help me keep the lights on:<br>
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/P5P41NDNT)
