/*!
 * Web Dev Tool
 * https://github.com/caboodle-tech/web-dev-tool
 *
 * Version: 0.6.0
 *
 * Copyright Christopher Keers (Caboodle Tech Inc)
 * https://github.com/blizzardengle (https://github.com/caboodle-tech)
 *
 * Released under the MIT license.
 * Date: 2020-05-05
 *
 * Icons licensed separately:
 *  - Font Awesome (https://github.com/caboodle-tech/whiteboard/FontAwesomeLicense.md)
 */

/**
 * Slimmed down developer tools for headless browsers and embedded web based applications.
 *
 * @author Christopher Keers <source@caboodle.tech>
 * @version 0.6.0
 */
var WebDevTool = ( function(){

    // A place to store all the references to the elements we need to add to the page.
    var elems = {};

    // The SVG icons we use in the interface and console messages.
    var icons = {
        caretRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"/></svg>',
        caretDown: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"/></svg>',
        close: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>',
        cloud: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"/></svg>',
        error: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>',
        file: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"/></svg>',
        folder: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48z"/></svg>',
        warn: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>',
        terminal: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M257.981 272.971L63.638 467.314c-9.373 9.373-24.569 9.373-33.941 0L7.029 444.647c-9.357-9.357-9.375-24.522-.04-33.901L161.011 256 6.99 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L257.981 239.03c9.373 9.372 9.373 24.568 0 33.941zM640 456v-32c0-13.255-10.745-24-24-24H312c-13.255 0-24 10.745-24 24v32c0 13.255 10.745 24 24 24h304c13.255 0 24-10.745 24-24z"/></svg>'
    };

    // A place to store all the status' and states.
    var status = {
        consoleMethods: [
            'error', 'log', 'warn'
        ],
        consoleOpen: false,
        consoleStack: [],
        keyStack: [],
        resizeCallback: null,
        resizeElement: null,
        sourceWidth: 300,
        toolsHeight: 250,
        version: '0.6.0'
    };

    // Web Dev Tool's styles to be injected into the page.
    var styles = "#_web-dev-tool{display:none;position:fixed;bottom:0;left:0;right:0;border-top:1px solid #000;font-family:monospace;font-size:16px;line-height:24px}#_web-dev-tool #_wdt-tools-resizer{position:absolute;top:-10px;left:0;right:0;height:10px;background-color:rgba(255,255,255,0);cursor:ns-resize}#_web-dev-tool #_wdt-toolbar{position:absolute;top:0;left:0;right:0;height:30px;color:#d8d8d8;background-color:#333;padding:0 15px;border-top:1px solid #4c4c4c;border-bottom:1px solid #4c4c4c;z-index:5000;font-family:monospace}#_web-dev-tool #_wdt-toolbar ._wdt-tab{display:inline-block;height:30px;max-height:30px;font-size:15px;line-height:30px;padding:0 15px;overflow:hidden;cursor:pointer}#_web-dev-tool #_wdt-toolbar ._wdt-tab._wdt-active{color:#fff;background-color:#1f1f1f}#_web-dev-tool #_wdt-toolbar ._wdt-tab:hover{color:#fff;background-color:#1f1f1f}#_web-dev-tool #_wdt-toolbar #_wdt-console-counts{float:right;display:inline-block;height:28px;line-height:28px;cursor:pointer}#_web-dev-tool #_wdt-toolbar #_wdt-console-counts ._wdt-error-icon{position:relative;display:inline-block}#_web-dev-tool #_wdt-toolbar #_wdt-console-counts ._wdt-error-icon svg{margin-bottom:-2px;fill:#ff8080;width:15px;height:15px}#_web-dev-tool #_wdt-toolbar #_wdt-console-counts ._wdt-warn-icon{position:relative;display:inline-block}#_web-dev-tool #_wdt-toolbar #_wdt-console-counts ._wdt-warn-icon svg{margin-bottom:-2px;fill:#fedc9d;width:15px;height:15px}#_web-dev-tool #_wdt-toolbar #_wdt-console-counts ._wdt-count{display:inline-block;padding:0 10px 0 5px}#_web-dev-tool #_wdt-toolbar #_wdt-version{float:right}#_web-dev-tool #_wdt-toolbar #_wdt-version a,#_web-dev-tool #_wdt-toolbar #_wdt-version a:visited{color:#d8d8d8}#_web-dev-tool #_wdt-toolbar #_wdt-version:hover a{color:#fff}#_web-dev-tool #_wdt-toolbar #_wdt-closeButton{display:flex;align-items:center;float:right;height:28px;max-height:28px;line-height:28px;padding:0 15px;cursor:pointer}#_web-dev-tool #_wdt-toolbar #_wdt-closeButton svg{height:18px;width:18px;fill:#d8d8d8}#_web-dev-tool #_wdt-toolbar #_wdt-closeButton:hover{background-color:#1f1f1f}#_web-dev-tool #_wdt-toolbar #_wdt-closeButton:hover svg{color:#fff}#_web-dev-tool #_wdt-page{position:absolute;top:30px;left:0;right:0;bottom:0;overflow-y:auto;background-color:#232323;color:#71aed5;font-family:monospace}#_web-dev-tool #_wdt-page ._wdt-hidden{display:none}#_web-dev-tool #_wdt-page #_wdt-elementPage{flex-direction:column;padding:.5rem .5rem .5rem 0;font-family:monospace}#_web-dev-tool #_wdt-page #_wdt-elementPage ._wdt-row ._wdt-close-arrow,#_web-dev-tool #_wdt-page #_wdt-elementPage ._wdt-row ._wdt-open-arrow{position:absolute;display:block;margin:2px 0 0 -20px;width:18px;height:18px;cursor:pointer}#_web-dev-tool #_wdt-page #_wdt-elementPage ._wdt-row ._wdt-close-arrow svg,#_web-dev-tool #_wdt-page #_wdt-elementPage ._wdt-row ._wdt-open-arrow svg{fill:#aaa;width:18px;height:18px;cursor:pointer}#_web-dev-tool #_wdt-page #_wdt-elementPage ._wdt-row ._wdt-close-arrow:after,#_web-dev-tool #_wdt-page #_wdt-elementPage ._wdt-row ._wdt-open-arrow:after{content:'';display:block;position:absolute;top:-3px;left:-6px;width:25px;height:25px}#_web-dev-tool #_wdt-page #_wdt-elementPage ._wdt-row ._wdt-close-arrow{display:none}#_web-dev-tool #_wdt-page #_wdt-elementPage ._wdt-row._wdt-open{position:relative}#_web-dev-tool #_wdt-page #_wdt-elementPage ._wdt-row._wdt-open>._wdt-open-arrow{display:none}#_web-dev-tool #_wdt-page #_wdt-elementPage ._wdt-row._wdt-open>._wdt-more{display:none}#_web-dev-tool #_wdt-page #_wdt-elementPage ._wdt-row._wdt-open>._wdt-close-arrow{display:block}#_web-dev-tool #_wdt-page #_wdt-elementPage ._wdt-row:hover{background-color:#252c36;cursor:default}#_web-dev-tool #_wdt-page #_wdt-elementPage .attribute{display:inline-block;color:#9bb6c7}#_web-dev-tool #_wdt-page #_wdt-elementPage .value{display:inline-block;color:#d38643}#_web-dev-tool #_wdt-page #_wdt-elementPage .white{display:inline-block;color:#fff}#_web-dev-tool #_wdt-page #_wdt-consolePage{flex-direction:column;height:100%;font-family:monospace}#_web-dev-tool #_wdt-page #_wdt-consolePage a,#_web-dev-tool #_wdt-page #_wdt-consolePage a:visited{color:#71aed5;text-decoration:none}#_web-dev-tool #_wdt-page #_wdt-consolePage a:hover{text-decoration:underline}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-row{display:flex;padding:3px 10px}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-row ._wdt-msg{flex:1;text-align:left}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-row ._wdt-msg ._wdt-row{cursor:default}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-row ._wdt-msg ._wdt-row ._wdt-close-arrow,#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-row ._wdt-msg ._wdt-row ._wdt-open-arrow{margin:2px 0 0 -9px;width:18px;height:18px;cursor:pointer}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-row ._wdt-msg ._wdt-row ._wdt-close-arrow svg,#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-row ._wdt-msg ._wdt-row ._wdt-open-arrow svg{fill:#aaa;width:18px;height:18px}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-row ._wdt-msg ._wdt-row ._wdt-close-arrow{display:none}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-row ._wdt-msg ._wdt-row ._wdt-symbol{display:inline-block;color:#209cee;font-style:italic;font-weight:700}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-row ._wdt-msg ._wdt-row ._wdt-more{display:inline-block}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-row ._wdt-msg ._wdt-row._wdt-open>._wdt-open-arrow{display:none}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-row ._wdt-msg ._wdt-row._wdt-open>._wdt-more{display:none}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-row ._wdt-msg ._wdt-row._wdt-open>._wdt-close-arrow{display:block}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-row ._wdt-source{text-align:right}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-consume,#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-error{color:#ff8080;border-top:1px solid #5c0000;border-bottom:1px solid #5c0000;background-color:#290000}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-consume ._wdt-error-icon,#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-error ._wdt-error-icon{position:relative;display:inline-block;width:16px;height:16px;margin:0 10px 0 0}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-consume ._wdt-error-icon svg,#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-error ._wdt-error-icon svg{position:absolute;top:2px;fill:#ff8080;width:16px;height:16px}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-warn{color:#fedc9d;border-top:1px solid #650;border-bottom:1px solid #650;background-color:#332b00}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-warn ._wdt-warn-icon{position:relative;display:inline-block;width:16px;height:16px;margin:0 10px 0 0}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-warn ._wdt-warn-icon svg{position:absolute;top:2px;fill:#fedc9d;width:16px;height:16px}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-messages ._wdt-log{color:#d8d8d8;border-top:1px solid #3a3a3a;border-bottom:1px solid #3a3a3a}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-input{display:flex;flex-direction:row;flex:1;min-height:60px;padding:10px}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-input ._wdt-icon{margin:0 7px 0 0;width:18px;height:18px}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-input ._wdt-icon svg{fill:#209cee;width:18px;height:18px}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-input ._wdt-input-wrapper{flex:1}#_web-dev-tool #_wdt-page #_wdt-consolePage #_wdt-console-input ._wdt-input-wrapper ._wdt-input{width:100%;height:100%;padding:2px;font-size:16px;line-height:16px;font-family:monospace;color:#d8d8d8;background-color:rgba(255,255,255,0);border:0;outline:0;resize:none}#_web-dev-tool #_wdt-page #_wdt-sourcePage{flex-direction:row;height:100%;font-family:monospace}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-tree{position:relative;width:300px;padding:.5rem 0;background-color:#333;color:#d8d8d8;overflow-y:auto;white-space:nowrap}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-tree ._wdt-row{position:relative;cursor:default}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-tree ._wdt-row ._wdt-icon{position:relative;display:inline-block;width:18px;height:18px;margin:0 .5rem 0 0}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-tree ._wdt-row ._wdt-icon svg{margin-bottom:-2px;width:18px;height:18px}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-tree ._wdt-row ._wdt-close-arrow,#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-tree ._wdt-row ._wdt-open-arrow{position:absolute;margin:1px 0 0 -20px;width:18px;height:18px;cursor:pointer}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-tree ._wdt-row ._wdt-close-arrow svg,#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-tree ._wdt-row ._wdt-open-arrow svg{fill:#aaa;width:18px;height:18px}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-tree ._wdt-row ._wdt-close-arrow{display:none}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-tree ._wdt-row._wdt-site ._wdt-icon svg{fill:#fff}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-tree ._wdt-row._wdt-folder ._wdt-icon svg{fill:#9bb6c7}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-tree ._wdt-row._wdt-file ._wdt-icon svg{fill:#d38643}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-tree ._wdt-row._wdt-open>._wdt-open-arrow{display:none}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-tree ._wdt-row._wdt-open>._wdt-close-arrow{display:block}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-tree ._wdt-row:hover{background-color:#252c36;cursor:default}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-resizer{position:relative;height:100%;width:1px;background-color:#333;cursor:ew-resize}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-resizer:after{content:'';position:absolute;top:0;bottom:0;left:0;width:10px;background-color:rgba(255,255,255,0);z-index:9000}#_web-dev-tool #_wdt-page #_wdt-sourcePage #_wdt-source-code{flex:1;position:relative;border-left:1px solid #4c4c4c;overflow:auto}";

    // HTML elements that will receive text (white) highlighting on the Elements page.
    var textContent = [ 'a', 'abbr', 'acronym', 'b', 'cite', 'del', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'kbd', 'label', 'li', 'mark', 'p', 'progress', 'q', 's', 'samp', 'small', 'span', 'strong', 'time', 'u', 'var', 'wbr' ];

    // A place to store the HTML that made up this page before Web Dev Tool was injected.
    var pageHTML = '';

    /**
     * When we build the HTML for the Elements page the head and body tags are hidden, unhide them.
     */
    var activateElements = function(){
        var unhide = elems.elementPage.querySelectorAll('[data-depth="2"] ._wdt-open-arrow');
        unhide.forEach( function( item ){
            item.parentElement.style.display = 'block';
        } );
    };

    /**
     * Web Dev Tool is injected very early so print to the console any saved messages.
     */
    var addConsoleStack = function(){
        status.consoleStack.forEach( function( item ){
            elems.consoleMessages.appendChild( item );
        } );
        status.consoleStack = [];
    };

    /**
     * Add all the HTML elements for Web Dev Tool to the page.
     */
    var addTools = function(){

        // Add our stylesheet to the page.
        elems.style = document.createElement('STYLE');
        elems.style.innerText = styles;

        // Add the dev tools container.
        elems.tools = document.createElement('DIV');
        elems.tools.id = '_web-dev-tool';
        elems.body.appendChild( elems.style );
        elems.body.appendChild( elems.tools );

        // Add a resizing bar for the Tools.
        elems.toolsResizer = document.createElement('DIV');
        elems.toolsResizer.id = "_wdt-tools-resizer";
        elems.tools.appendChild( elems.toolsResizer );

        // Add the top (tab bar) and bottom (page) areas.
        elems.toolbar = document.createElement('DIV');
        elems.toolbar.id = "_wdt-toolbar";
        elems.tools.appendChild( elems.toolbar );
        elems.page = document.createElement('DIV');
        elems.page.id = "_wdt-page";
        elems.tools.appendChild( elems.page );

        // Add the Elements tab.
        elems.elementTab = document.createElement('DIV');
        elems.elementTab.id = "_wdt-elementTab";
        elems.elementTab.dataset.page = "_wdt-elementPage";
        elems.elementTab.classList.add('_wdt-tab');
        elems.elementTab.classList.add('_wdt-active');
        elems.elementTab.innerHTML = 'Elements';
        elems.toolbar.appendChild( elems.elementTab );

        // Add the Elements page.
        elems.elementPage = document.createElement('DIV');
        elems.elementPage.id = "_wdt-elementPage";
        elems.elementPage.classList.add('_wdt-page');
        elems.elementPage.innerHTML = pageHTML;
        elems.page.appendChild( elems.elementPage );

        // Unhide the head and body element rows in our console.
        activateElements();

        // Add the Console tab.
        elems.consoleTab = document.createElement('DIV');
        elems.consoleTab.id = "_wdt-consoleTab";
        elems.consoleTab.dataset.page = "_wdt-consolePage";
        elems.consoleTab.classList.add('_wdt-tab');
        elems.consoleTab.innerHTML = 'Console';
        elems.toolbar.appendChild( elems.consoleTab );

        // Add the Console page.
        elems.consolePage = document.createElement('DIV');
        elems.consolePage.id = "_wdt-consolePage";
        elems.consolePage.classList.add('_wdt-page');
        elems.consolePage.classList.add('_wdt-hidden');
        elems.page.appendChild( elems.consolePage );

        // Add the Console message area to the console page.
        elems.consoleMessages = document.createElement('DIV');
        elems.consoleMessages.id = '_wdt-console-messages';
        elems.consolePage.appendChild( elems.consoleMessages );

        // Add the Console input area to the console page.
        elems.consoleInputArea = document.createElement('DIV');
        elems.consoleInputArea.id = '_wdt-console-input';
        elems.consolePage.appendChild( elems.consoleInputArea );

        // Add the actual Console input in a lazy way and then keep a reference to it.
        var html = '<div class="_wdt-icon">' + icons.terminal + '</div>';
        html += '<div class="_wdt-input-wrapper"><textarea class="_wdt-input"></textarea>';
        elems.consoleInputArea.innerHTML = html;
        elems.consoleInput = elems.consoleInputArea.querySelector('textarea');

        // Add the Source tab.
        elems.sourceTab = document.createElement('DIV');
        elems.sourceTab.id = "_wdt-sourceTab";
        elems.sourceTab.dataset.page = "_wdt-sourcePage";
        elems.sourceTab.classList.add('_wdt-tab');
        elems.sourceTab.innerHTML = 'Sources';
        elems.toolbar.appendChild( elems.sourceTab );

        // Add the Source page.
        elems.sourcePage = document.createElement('DIV');
        elems.sourcePage.id = "_wdt-sourcePage";
        elems.sourcePage.classList.add('_wdt-page');
        elems.sourcePage.classList.add('_wdt-hidden');
        elems.page.appendChild( elems.sourcePage );

        // Add the Source tree area to the Source page.
        elems.sourceTree = document.createElement('DIV');
        elems.sourceTree.id = "_wdt-source-tree";
        elems.sourcePage.appendChild( elems.sourceTree );

        // Add a resizing bar for the Source tree.
        elems.sourceResizer = document.createElement('DIV');
        elems.sourceResizer.id = "_wdt-source-resizer";
        elems.sourcePage.appendChild( elems.sourceResizer );

        // Add the Source code area of the Source page.
        elems.sourceCode = document.createElement('DIV');
        elems.sourceCode.id = "_wdt-source-code";
        elems.sourcePage.appendChild( elems.sourceCode );

        // Add the close button to the toolbar.
        elems.closeButton = document.createElement('DIV');
        elems.closeButton.id = '_wdt-closeButton';
        elems.closeButton.innerHTML = icons.close;
        elems.toolbar.appendChild( elems.closeButton );

        // Add the version to the toolbar.
        elems.version = document.createElement('DIV');
        elems.version.id = '_wdt-version';
        elems.version.classList.add('_wdt-tab');
        elems.version.innerHTML = 'Ver. '+ status.version;
        elems.toolbar.appendChild( elems.version );

        // Add the Console error and warning counts to the toolbar.
        elems.consoleCounts = document.createElement('DIV');
        elems.consoleCounts.id = '_wdt-console-counts';
        elems.toolbar.appendChild( elems.consoleCounts );
    };

    /**
     * Hook up all the event listeners Web Dev Tool needs. Some listeners
     * will call other functions to handle the event and some will be
     * handled by anonymous functions created here.
     */
    var attachListeners = function(){

        // Turn on the Tools resize bar.
        elems.toolsResizer.addEventListener( 'mousedown', nsResizeStart.bind( null, elems.toolsResizer, resizeWebTools ) );

        // Hook up all the tab buttons in the toolbar.
        elems.elementTab.addEventListener( 'click', changeTab );
        elems.consoleTab.addEventListener( 'click', changeTab );
        elems.sourceTab.addEventListener( 'click', changeTab );

        // Hook up all the info or control buttons in the toolbar.
        elems.version.addEventListener( 'click', versionMessage );
        elems.closeButton.addEventListener( 'click', closeTools );
        elems.consoleCounts.addEventListener( 'click', function(){
            elems.consoleTab.click();
        } );

        // Monitor and respond to key presses when the Console input has focus.
        elems.consoleInput.addEventListener( 'keyup', respondToConsole );
        elems.consoleInput.addEventListener( 'keydown', function(){
            if( event.key != 'Enter' ){
                status.previousKey = event.key;
            }
            if( event.key == 'Enter' ){
                // Don't let enter place a newline into the command on submission.
                event.preventDefault();
            }
        } );

        // Turn on the Source tree resize bar.
        elems.sourceResizer.addEventListener( 'mousedown', ewResizeStart.bind( null, elems.sourceResizer, resizeSourceTree ) );

        // Add a listener to all rows on the Elements page.
        var openArrows = elems.elementPage.querySelectorAll('._wdt-row ._wdt-open-arrow');
        openArrows.forEach( function( item ){
            item.addEventListener( 'click', toggleElement );
        } );
        var closeArrows = elems.elementPage.querySelectorAll('._wdt-row ._wdt-close-arrow');
        closeArrows.forEach( function( item ){
            item.addEventListener( 'click', toggleElement );
        } );

        // Listen for the open and close commands.
        document.addEventListener( 'keydown', toggleDevTools );
    };

    /**
     * Once the Source tree has been created add listeners to make it interactive.
     */
    var attachSourceTreeListeners = function(){

        var sites = elems.sourceTree.querySelectorAll('._wdt-site');
        sites.forEach( function( item ){
            item.addEventListener( 'click', toggleRow );
        } );

        var folders = elems.sourceTree.querySelectorAll('._wdt-folder');
        folders.forEach( function( item ){
            item.addEventListener( 'click', toggleRow );
        } );

        var files = elems.sourceTree.querySelectorAll('._wdt-file');
        files.forEach( function( item ){
            item.addEventListener( 'click', loadSource );
        } );
    };

    /**
     * Switch pages based on which tab was clicked on.
     */
    var changeTab = function(){

        var elem = event.target || event.srcElement;
        if( ! elem.classList.contains('_wdt-tab') ){
            elem = elem.closest('._wdt-tab');
        }
        var activeTab = elems.toolbar.querySelector('._wdt-active');

        // Switch the active element with the _wdt-active class.
        activeTab.classList.remove('_wdt-active');
        elem.classList.add('_wdt-active');

        // Switch the active page now.
        document.getElementById( activeTab.dataset.page ).classList.add( '_wdt-hidden' );
        document.getElementById( activeTab.dataset.page ).style.display = 'none';
        document.getElementById( elem.dataset.page ).classList.remove( '_wdt-hidden' );
        document.getElementById( elem.dataset.page ).style.display = 'flex';

        // If we switched to the console make sure its at the bottom.
        if( elem.dataset.page == '_wdt-consolePage' ){
            scrollConsole();
        }
    };

    /**
     * Close the dev tools.
     */
    var closeTools = function(){
        elems.tools.style.display = 'none';
        var height = document.documentElement.clientHeight;
        document.documentElement.style.overflowY = 'auto';
        document.body.style.maxHeight = height + 'px';
    };

    /**
     * Generic function to allow East West resizing of an element.
     * Triggered when the user clicks down on the resizing element.
     *
     * @param  {Element}  elem     The Element that we are resizing.
     * @param  {Function} callback The function to call that does the actual work.
     */
    var ewResizeStart = function( elem, callback ){
        elem.dataset.resizing = true;
        status.resizeElement = elem;
        status.resizeCallback = callback;
        document.addEventListener( 'mousemove', nsResizing );
        document.addEventListener( 'mouseup', nsResizeStop );
        event.preventDefault();
    };

    /**
     * Generic function to allow East West resizing of an element.
     * Triggered when the user releases the down click on the resizing element.
     *
     * @param  {Element}  elem     The Element that we are resizing.
     * @param  {Function} callback The function to call that does the actual work.
     */
    var ewResizeStop = function( elem, callback ){
        if( status.resizeElement != null ){
            // Clear the listeners so we don't polute memory.
            document.removeEventListener( 'mousemove', nsResizing );
            document.removeEventListener( 'mouseup', nsResizeStop );
            status.resizeElement.dataset.resizing = false;
            status.resizeElement = null;
            status.resizeCallback = null;
            event.preventDefault();
        }
    };

    /**
     * Generic function to allow East West resizing of an element.
     * Triggered as the user drags the mouse East and West.
     *
     * @param  {Element}  elem     The Element that we are resizing.
     * @param  {Function} callback The function to call that does the actual work.
     */
    var ewResizing = function( elem, callback ){
        if( status.resizeElement.dataset.resizing == 'true' ){
            status.resizeCallback( event );
            event.preventDefault();
        }
    };

    /**
    * Turn the pages HTML into strings and then reproduces the layout
    * into collapsible rows for the Elements page.
     *
     * @return {HTML} The rows that make up the document for the Elements page.
     */
    var getPageElements = function(){

        // Build the doctype tag.
        var html = '___R[1]___<!doctype ' + document.doctype.name;
        if( document.doctype.publicId ){
            html += ' PUBLIC "' + document.doctype.publicId + '"';
        } else if ( document.doctype.systemId ) {
            html += ' SYSTEM "' + document.doctype.systemId + '"';
        }

        // Add the opening HTML element.
        html += '>___/R______R[1]___<html>___/R___';

        // Recursively build the head and body of the page.
        var page = document.documentElement.children;
        for( var x = 0; x < page.length; x++ ){
            html += recursiveElements( page[x], 2, textContent );
        }

        // Add the closing HTML element.
        html += '___R[1]___</html>___/R___';

        // How many pixles a tab is worth; each level is "tabbed" in based on it's depth.
        var pad = 15;

        // Replace all < and > with their HTML entity so the page doesn't treat this as actual HTML.
        html = html.replace( /</g, '&lt;' ).replace( />/g, '&gt;');

        // Wrap all HTML attributes in key value paired divs so we can color highlight them.
        html = html.replace( /([\w\d\-_]*?)="([\w\d\s\/\.=\-&_,;:]*?)"/g, '<div class="attribute">$1</div>="<div class="value">$2</div>"' );

        // Replace all row start tags (___R___) with the row div and appropriate padding for this rows depth.
        html = html.replace( /___R\[([0-9]*?)\]___/g, function( match, depth ){
            if( depth > 1 ){
                return '<div class="_wdt-row" data-depth="' + depth + '" style="padding-left: ' + ( pad * depth ) + 'px; display:none;">';
            } else {
                return '<div class="_wdt-row" data-depth="' + depth + '" style="padding-left: ' + ( pad * depth ) + 'px;">';
            }
        } );

        // Replace all closing row tags (___/R___) with the end of row div.
        html = html.replace( /___\/R___/g, '</div>' );
        // Replace all arrow tags (___A___) with the open and close divs.
        html = html.replace( /___A___/g, '<div class="_wdt-open-arrow">' + icons.caretRight + '</div><div class="_wdt-close-arrow">' + icons.caretDown + '</div>' );
        // Replace all ellipses tags (___E___) with the more div followed by the appropriate closing tag.
        html = html.replace( /___E\[(.*?)\]___/g, function( match, tag ){
            return '<span class="more">...&lt;/' + tag + '&gt;</span>';
        } );
        // Not every ellipses tag belongs to an element that needed a closing tag so replace what we missed.
        html = html.replace( /___E___/g, '<span class="more">...</span>' );
        // Replace all line break tags (___B___) with an HTML line break.
        html = html.replace( /___B___/g, '<br>' );
        // Replace all text content tags (___T___) with the opening text content div.
        html = html.replace( /___T___/g, '<div class="white">' );
        // Replace all closing text content tags (___/T___) with the closing text content div.
        html = html.replace( /___\/T___/g, '</div>' );

        // Send the result back.
        return html;
    };

    /**
     * Build the Source tree as an array of nested array objects.
     */
    var getSources = function(){

        // The start of the "tree".
        var sources = {
            '__sites': []
        };

        var site, path, backref;

        // Loop through every resource the page loaded and place it in the tree.
        var resources = window.performance.getEntriesByType("resource");
        resources.forEach( function ( resource ) {

            // Get the site URL this resource came from.
            site = resource.name.match( /\/\/(.*?)\// );
            site = site[1].replace( /\//g, '' );

            // Add this site to our root if it has not been added already.
            if( ! sources.__sites.includes( site ) ){
                sources.__sites.push( site );
                sources[ site ] = {
                    '__dirs': [],
                    '__files': []
                };
            }

            // Get the path to this resource; remove and parameters added to the URL.
            path = resource.name.replace( /.*?\/\/.*?\//, '' );
            if( path.indexOf( '#' ) > -1 ){
                path = path.substr( 0, path.indexOf( '#' ) );
            }
            if( path.indexOf( '?' ) > -1 ){
                path = path.substr( 0, path.indexOf( '?' ) );
            }

            // Add the path as needed and record this file.
            path = path.split('/');
            path.forEach( function( item, index ) {
                // Is this the file or a directory?
                if( (index + 1) != path.length ){
                    // Directory. We combine empty directories so do not make a new branch if this is empty.
                    if( backref ){
                        // Add this new directory to the back reference (pervious nested array; "node") if it hasn't been added already.
                        if( ! backref.__dirs.includes( item ) ){
                            backref.__dirs.push( item );
                            backref[ item ] = {
                                '__dirs': [],
                                '__files': []
                            };
                        }
                        // Keep track of the back reference (pervious nested array; "node").
                        backref = backref[ item ];
                    } else {
                        // Add this new directory if it hasn't been added already.
                        if( ! sources[ site ].__dirs.includes( item ) ){
                            sources[ site ].__dirs.push( item );
                            sources[ site ][ item ] = {
                                '__dirs': [],
                                '__files': []
                            };
                        }
                        // Keep track of the back reference (pervious nested array; "node").
                        backref = sources[ site ][ item ];
                    }
                } else {
                    // File.
                    if( backref ){
                        backref.__files.push( [ item, resource.name ] );
                    } else {
                        sources[ site ].__files.push( [ item, resource.name ] );
                    }
                }
            } );

            // Clear the back reference.
            backref = null;
        } );

        return sources;
    };

    /**
     * Turn on the lights once the DOM has finished loading.
     */
    var initialize = function(){
        pageHTML = getPageElements();
        elems.body = document.body;
        addTools();
        attachListeners();
        addConsoleStack();
        updateConsoleCounts();
        showSources();
    };

    /**
     * Load the source code for the selected file and display it in the Source code area.
     */
    var loadSource = function(){

        event.preventDefault();

        var elem = event.target || event.srcElement;
        if( ! elem.classList.contains('_wdt-file') ){
            elem = elem.closest('._wdt-file');
        }

        // Do not continue unless we have a URL to load.
        if( elem.dataset.url ){

            // Is this file on our current domain?
            if( elem.dataset.url.indexOf( window.location ) > -1 ){

                // Yes. Load the source code.
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(){

                    // Wait until the request has finished then process the response.
                    if ( this.readyState === 4 && this.status === 200 ) {

                        // Take the response and alter it to display properly as a string, don't let the browser treat it as HTML.
                        var html = xhr.responseText;
                        html = html.replace( /</g, '&lt;' );
                        html = html.replace( />/g, '&gt;' );
                        html = html.replace( /\n/g, '<br>' );
                        html = html.replace( /\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;' );
                        html = html.replace( / /g, '&nbsp;' );

                        // Show the user the code.
                        elems.sourceCode.innerHTML = html;
                    }

                    if( this.readyState === 4 && this.status >= 400 ){
                        // TODO: log an error to our console and put a message into the source code area.
                    };
                };

                // Send the request.
                xhr.open( 'GET', elem.dataset.url, true );
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.send();

            } else {
                // No. Show the CORS warning.
                elems.sourceCode.innerHTML = 'The source code for this file can not be loaded because of CORS. This is a browser limitation and not a limitaion of Web Dev Tools.';
            }
        }
    };

    /**
     * Generic function to allow North South resizing of an element.
     * Triggered when the user clicks down on the resizing element.
     *
     * @param  {Element}  elem     The Element that we are resizing.
     * @param  {Function} callback The function to call that does the actual work.
     */
    var nsResizeStart = function( elem, callback ){
        elem.dataset.resizing = true;
        status.resizeElement = elem;
        status.resizeCallback = callback;
        document.addEventListener( 'mousemove', nsResizing );
        document.addEventListener( 'mouseup', nsResizeStop );
        event.preventDefault();
    };

    /**
     * Generic function to allow  North South resizing of an element.
     * Triggered when the user releases the down click on the resizing element.
     *
     * @param  {Element}  elem     The Element that we are resizing.
     * @param  {Function} callback The function to call that does the actual work.
     */
    var nsResizeStop = function( elem, callback ){
        if( status.resizeElement != null ){
            document.removeEventListener( 'mousemove', nsResizing );
            document.removeEventListener( 'mouseup', nsResizeStop );
            status.resizeElement.dataset.resizing = false;
            status.resizeElement = null;
            status.resizeCallback = null;
            event.preventDefault();
        }
    };

    /**
     * Generic function to allow North South resizing of an element.
     * Triggered as the user drags the mouse North and West.
     *
     * @param  {Element}  elem     The Element that we are resizing.
     * @param  {Function} callback The function to call that does the actual work.
     */
    var nsResizing = function( elem, callback ){
        if( status.resizeElement.dataset.resizing == 'true' ){
            status.resizeCallback( event );
            event.preventDefault();
        }
    };

    /**
     * Open (show) the Web Dev Tool.
     */
    var openTools = function(){

        var height = document.documentElement.clientHeight;

        document.documentElement.style.overflowY = 'hidden';
        document.body.style.overflowY = 'auto';
        document.body.style.maxHeight = ( height - status.toolsHeight ) + 'px';

        elems.tools.style.display = 'block';
        elems.tools.style.height = status.toolsHeight + 'px';
    };

    /**
     * As soon as Web Dev Tool is added to the page run some setup tasks.
     */
    var preInitialize = function(){

        // Get ready to consume the console.
        status.console = {};
        status.console.errrorCount = 0;
        status.console.warnCount = 0;
        status.console.commands = [];
        status.console.commandIndex = -1;

        // Load the previous command history if there is one.
        if( localStorage.getItem('_wdt-command-history') ){
            status.console.commands = JSON.parse( localStorage.getItem('_wdt-command-history') );
        }

        // Load the previous visual settings if there are any.
        if( localStorage.getItem('_wdt-visual-settings') ){
            var settings = JSON.parse( localStorage.getItem('_wdt-visual-settings') );
        }

        /**
         * Loop through console methods we want to consume and if it's supported consume them.
         * Idea from {@link https://github.com/andrejewski/console-hook/blob/master/index.js|Chris Andrejewski}
         */
        status.consoleMethods = status.consoleMethods.filter( function( m ) { return typeof console[m] === 'function'; } );
        status.consoleMethods.forEach( function( val ){
            status.console[ val ] = window.console[ val ];
            window.console[ val ] = sendToConsole.bind( null, val );
        } );

        // Consume any thrown errors and process them ourselves.
        window.onerror = sendToConsole.bind( null, 'consume' );
    };

    /**
     * Print the result of the users command to the our Console.
     *
     * @param  {*}      result The result after running the users command from our Console.
     * @return {String}        The result turned into a String (or HTML) that can be added (printed) to the console.
     */
    var printResult = function( result ){

        var output = '';

        switch( typeOf( result ) ){
            case 'FUNCTION':

                var name = result.name;
                result = result.toString();
                var func = result.substring( result.indexOf('{') + 1 );
                func = func.replace( / /g, '&nbsp;' ).replace( /\n/g, '<br>' );
                if( func.substring( 0,4 ) == '<br>' ){
                    func = func.substring( 4 );
                }

                output = '<div class="_wdt-row" data-depth="1"><div class="_wdt-open-arrow">' + icons.caretRight + '</div>';
                output += '<div class="_wdt-close-arrow">' + icons.caretDown + '</div>';
                output += '<div class="_wdt-symbol" title="function">&#402;</div>&nbsp;' + name + '(';
                output += result.substring( result.indexOf('(') + 1, result.indexOf(')') );
                output += '){<div class="_wdt-more">...}</div></div>';
                output += '<div class="_wdt-row" data-depth="2" style="display:none;">' + func + '</div>';

                break;
            case 'OBJECT':
            case 'LOCATION':
                var ary = Object.entries( result );
                var name, func;

                output = '<div class="_wdt-row" data-depth="1"><div class="_wdt-open-arrow">' + icons.caretRight + '</div>';
                output += '<div class="_wdt-close-arrow">' + icons.caretDown + '</div>';
                output += '<div class="_wdt-symbol" title="object">{}</div>&nbsp;{';
                output += '<div class="_wdt-more">...}</div></div>';
                output += '<div class="_wdt-row" data-depth="2" style="display:none;">';

                ary.forEach( function( item ){

                    output += '&nbsp;&nbsp;&nbsp;&nbsp;' + item[0] + ': ';
                    switch( typeOf( item[1] ) ){
                        case 'FUNCTION':
                            name = item[1].name;
                            item[1] = item[1].toString();

                            var func = item[1].substring( item[1].indexOf('{') + 1 );
                            func = func.replace( / /g, '&nbsp;' ).replace( /\n/g, '<br>' );
                            if( func.substring( 0,4 ) == '<br>' ){
                                func = func.substring( 4 );
                            }

                            output += '&#402;&nbsp;' + name;

                            if( item[1].indexOf('function()') > -1 ){
                                output += '()';
                            } else {
                                output += item[1].substring( item[1].indexOf('(') + 1, item[1].indexOf(')') );
                            }
                            output += '{<br>' + func + ',<br>';
                            break;
                        case 'OBJECT':
                            output += '{},<br>'
                            break;
                        default:
                            output += '"' +  + '"';
                    }
                } );
                output = output.substring( 0, output.length - 5 ); // Remove the last comma.
                output += '<br>}</div>';
                break;
            default:
                output = result + '';
        }
        return output;
    };

    /**
     * Recursively build the HTML for getPageElements().
     *
     * @param  {Element} elem        The current element from the DOW we are injesting.
     * @param  {Number}  level       The nested level this element is at.
     * @param  {Array}   textContent An array of HTML tags that should have their content wrapped for text highlighting.
     * @return {String}              The processed element converted to a string that getPageElements() understands.
     */
    var recursiveElements = function( elem, level, textContent ){

        var parentHTML = '';
        var childrenHTML = '';
        var name = elem.nodeName.toLowerCase(); // Needed to check against textContent.

        // Does this element have children?
        if( elem.children.length > 0 ){

            // Yes. Recursively process the children and this element (parent).
            parentHTML += '___R[' + level + ']______A___' + elem.outerHTML.replace( elem.innerHTML || '', '___E[' + name + ']______/R______C______R[' + level + ']___' );
            for( var x = 0; x < elem.children.length; x++ ){
                childrenHTML += recursiveElements( elem.children[x], level + 1, textContent );
            }
            parentHTML = parentHTML.replace( '___C___', childrenHTML ) + '___/R___';
        } else {

            // No. This is a child at the end of a branch.
            indent = '';
            for( var x = 0; x < level; x++ ){
                indent += '&nbsp;';
            }

            childrenHTML = elem.innerText.trim();

            // Does this element have an innerText value?
            if( childrenHTML ){

                // Yes. This means this element has a closing tag. Does this innerText run over multiple lines?
                if( childrenHTML.indexOf( '\n' ) > -1  ){

                    // Yes. Format all the innerText text properly and wrap for highlighting if we need to.
                    parentHTML = '___R[' + level + ']______A___';
                    parentHTML += elem.outerHTML.replace( elem.innerHTML || '', '___E[' + name + ']______/R______R[' + (level+1) + ']______T______C______/T______/R______R[' + level + ']___' );
                    parentHTML += '___/R___';
                } else {

                    // No. If we need to highlight the innerText.
                    var index = textContent.indexOf( elem.nodeName.toLowerCase() );
                    if( index > -1 ){
                        childrenHTML = elem.outerHTML.replace( '</' + textContent[index] + '>', '___/T___</' + textContent[index] + '>' ).replace( '>', '>___T___' );
                    } else{
                        childrenHTML = elem.outerHTML;
                    }
                    parentHTML = '___R[' + level + ']______C______/R___';
                }
            } else{

                // No. This means this element does not have a closnig tag, use the outerHTML value.
                childrenHTML = elem.outerHTML || '';
                parentHTML = '___R[' + level + ']______C______/R___';
            }

            // Replace all newlines with the line break tag (___B___) and add indenting based on the current depth (level).
            childrenHTML = childrenHTML.replace( /\n/g, '___B___' + indent );

            // Replace any spaces with their HTML entity.
            childrenHTML = childrenHTML.replace( / /g, '&nbsp;' );

            // Replace our children tag placeholder (___C___) with the actual content.
            parentHTML = parentHTML.replace( '___C___', childrenHTML );
        }

        // This element is done return it and any other elements generated by recursion.
        return parentHTML;
    };

    /**
     * Using the current mouse location resize the dev tools left or right.
     *
     * @param {Event} e The Event object for the event that triggered this function.
     */
    var resizeSourceTree = function( e ){

        // Get page dimensions.
        var x = e.clientX;
        var pageWidth = document.documentElement.clientWidth;

        // Resize the source tree but insure it is always 150px wide or greater.
        if( x > 150 && ( pageWidth - x ) > 300 ){
            elems.sourceTree.style.width = x + 'px';
        }
    };

    /**
     * Using the current mouse location resize the dev tools up or down.
     *
     * @param {Event} e The Event object for the event that triggered this function.
     */
    var resizeWebTools = function( e ){

        // Get page dimensions.
        var y = e.clientY;
        var pageHeight = document.documentElement.clientHeight;

        // Resize the dev tools but insure the tools and page are always at least 150px in height.
        if( y > 150 && ( pageHeight - y ) > 150 ){
            elems.tools.style.height = ( pageHeight - y ) + 'px';
            document.body.style.maxHeight = y + 'px';
        }
    };

    /**
     * Listen to key presses in the Console and trigger appropriate actions.
     */
    var respondToConsole = function(){

        // Check of we need to run this command or allow a new line through.
        if( event.key == 'Enter' ){
            if( status.previousKey != 'Shift' ){
                runCommand();
            } else {
                // Clear the shift.
                status.previousKey = '';
            }
        }

        // Show previous command from the command history.
        if( event.key == 'ArrowUp' ){
            if( status.console.commandIndex < 49 ){
                status.console.commandIndex++;
            }
            if( status.console.commands[ status.console.commandIndex ] ){
                elems.consoleInput.value = status.console.commands[ status.console.commandIndex ];
            } else {
                status.console.commandIndex--;
            }
        }

        // Show next command from the command history.
        if( event.key == 'ArrowDown' ){
            if( status.console.commandIndex == 0 ){
                status.console.commandIndex = -1;
                elems.consoleInput.value = '';
            } else {
                if( status.console.commandIndex > 0 ){
                    status.console.commandIndex--;
                }
                if( status.console.commands[ status.console.commandIndex ] ){
                    elems.consoleInput.value = status.console.commands[ status.console.commandIndex ];
                } else {
                    status.console.commandIndex++;
                }
            }
        }
    };

    /**
     * Run the users command from the Console.
     */
    var runCommand = function(){

        // Create the message div.
        var message = document.createElement('DIV');
        message.classList.add('_wdt-row');

        // Grab the users command and attempt to run it; add its class accordingly.
        var command = elems.consoleInput.value.trim();
        var result, type, source = ':1:';

        // Check if we need to process this command differently.
        var alt = true;
        switch( command ){
            case 'clear':
            case 'clear;':
            case 'clear()':
            case 'clear();':
                result = '<i>Console was cleared</i>';
                elems.consoleMessages.innerHTML = '';
                message.classList.add('_wdt-log');
                type = 'log';
                source = '';
                break;
            default:
                // This is not a special command change the flag.
                alt = false;
        }

        // Was this command already processed?
        if( ! alt ){
            // No. Process it now with a Function call, the safer alternative to eval().
            try {
                result = Function('return (' + command + ')')();
                message.classList.add('_wdt-log');
                type = 'log';
            } catch( e ){
                result = e;
                message.classList.add('_wdt-error');
                type = 'error';
                status.console.errrorCount++;
            }

            // Is this a command that created something and will not have any return value?
            if( result == undefined ){
                // Yes. Remove the soure (line) from this message.
                source = '';
            }
        }

        // Add this to the command history and reset the index.
        status.console.commands.unshift( command );
        status.console.commandIndex = -1;

        // Limit history to 50 commands.
        if( status.console.commands.length > 50 ){
            status.console.commands.pop();
        }

        // Write out the new history to localStorage.
        localStorage.setItem( '_wdt-command-history', JSON.stringify( status.console.commands ) );

        // Build the messages HTML.
        var html = '<div class="_wdt-msg">' + printResult( result ) + '</div>';
        html += '</div><div class="_wdt-source">' + source + '</div>';
        message.innerHTML = html;

        // Add this to our console and pass on to the actual console.
        elems.consoleMessages.appendChild( message );
        status.console[ type ].apply( null, [ result ] );

        // Add listeners to new console rows that need them.
        var rows = elems.consoleMessages.querySelectorAll('._wdt-msg ._wdt-row > ._wdt-more');
        rows.forEach( function( item ){
            item = item.parentElement;
            if( ! item.dataset.processed ){
                item.dataset.processed = true;
                item.addEventListener( 'click', toggleRow );
            }
        } );

        // Clear our console input, scroll down if needed, and check if we need to update counts.
        elems.consoleInput.value = '';
        scrollConsole();
        updateConsoleCounts();
    };

    /**
     * Scroll the console page to the very bottom and place focus on the textarea.
     */
    var scrollConsole = function(){
        if( elems.consoleTab.classList.contains('_wdt-active') ){
            elems.consoleInputArea.scrollIntoView( { alignToTop: false, behavior: 'auto', block: 'end' } )
            elems.consoleInput.focus();
        }
    };

    /**
     * Capture any calls to consumed console methods and print them to our own console.
     *
     * @param {String} type Optional string to alter this functions normal process.
     */
    var sendToConsole = function( type ){

        // Turn the arguments into an actual array and remove our type from it.
        var args = Array.prototype.slice.call( arguments );
        args.shift();

        // Attempt to get the script and line number.
        var source = '';
        try {
            source = Error().stack;
            // Any commands run directly in the console should not have the script line number.
            if( source.indexOf( '<anonymous>' ) > -1 ){
                source = ':1:';
            } else {
                source = source.split( '\n' );
                // The third line from the error stack should have the proper line number.
                if( source.length > 2 ){
                    source = source[ 2 ].replace( 'at ', '' );
                } else {
                    // There was less than 3 lines so use the last one.
                    source = source[ source.length - 1 ].replace( 'at ', '' );
                }
                // Check if the source comes from this page.
                source = source.substr( source.lastIndexOf( '/' ) + 1 );
                source = source.substr( 0, source.length - 1 );
                if( source[0] == ':' ){
                    source = '(index)' + source;
                }
            }
        } catch(e){
            // If there was an error just leave source empty.
        }

        // This is a thrown error we need to comsume. Alter the args and source to fit this different structure.
        if( type == 'consume' ){
            source = args[1];
            // Is this error coming from this current page itslef?
            if( window.location.href == source ){
                // Yes.
                if( window.location.pathname != '/' ){
                    source = '(' + window.location.pathname.substr( 1 ) + '):' + args[2];
                } else {
                    source = '(index):' + args[2];
                }
                args = [ args[0] + '\n&nbsp;&nbsp;&nbsp;&nbsp;at ' + source ];
            } else {
                // No.
                source = source.substr( source.lastIndexOf( '/' ) + 1 ) + ':' + args[2];
                args = [ args[0] + '\n&nbsp;&nbsp;&nbsp;&nbsp;at ' + source ];
            }
        }

        // Pass on to the actual console or inspector; thrown errors go straight to the console we don't need to do it again.
        if( type != 'consume' ){
            status.console[ type ].apply( null, args );
        }

        // Log to our console.
        args = args.join( ' ' );
        args = args.replace( /\n/g, '<br>' );
        switch( type ){
            case 'error':
            case 'consume':
                status.console.errrorCount += 1;
                args = '<div class="_wdt-error-icon">' + icons.error + '</div>' + args;
                break;
            case 'warn':
                status.console.warnCount += 1;
                args = '<div class="_wdt-warn-icon">' + icons.warn + '</div>' + args;
                break;
        }
        var message = document.createElement( 'DIV' );
        message.classList.add( '_wdt-' + type );
        message.classList.add( '_wdt-row' );
        message.innerHTML = '<div class="_wdt-msg">' + args + '</div><div class="_wdt-source">' + source + '</div>';

        // We hook in early so stack messages if our console does not exist yet.
        if( elems.consolePage ){
            elems.consoleMessages.appendChild( message );
            updateConsoleCounts();
        } else {
            status.consoleStack.push( message );
        }
    };

    /**
     * Loop through the array of nested array objects from getSources()
     * and build the HTML for the source tree.
     */
    var showSources = function(){

        var sources = getSources();

        var html = '';

        // Loop through every site (tree).
        sources.__sites.forEach( function( site ){

            var prepend = '';

            // Start at the root.
            html += '<div data-depth="2" class="_wdt-row _wdt-site" style="padding-left: 30px;"><div class="_wdt-open-arrow">' + icons.caretRight + '</div><div class="_wdt-close-arrow">' + icons.caretDown + '</div><div class="_wdt-icon">' + icons.cloud + '</div>' + site + '</div>';

            // Add the files (leafs) from this level.
            sources[ site ].__files.forEach( function( file ){
                prepend += '<div data-depth="3" data-url="' + file[1] + '" class="_wdt-row _wdt-file" style="padding-left: 45px; display: none;"><div class="_wdt-icon">' + icons.file + '</div>' + file[0] + '</div>';
            } );

            // Add the directories (branches) from this level; then recurse down and build all the branches and leafs.
            sources[ site ].__dirs.forEach( function( dir ) {
                html += '<div data-depth="3" class="_wdt-row _wdt-folder" style="padding-left: 45px; display: none;"><div class="_wdt-open-arrow">' + icons.caretRight + '</div><div class="_wdt-close-arrow">' + icons.caretDown + '</div><div class="_wdt-icon">' + icons.folder + '</div>' + dir + '</div>';
                html += showSourcesRecursive( sources[ site ][ dir ], '', 4 );
            } );

            // Place files after directories.
            html += prepend;
        } );

        elems.sourceTree.innerHTML = html;

        attachSourceTreeListeners();
    };

    /**
     * Recursively build out a source tree.
     *
     * @param  {Object} obj   The object that represents this current level; has files and directories.
     * @param  {String} merge The current directory path; if present the previous recursion was an empty object.
     * @param  {Number} level What level (depth) is this object at.
     * @return {String}       The HTML that makes up this part of the source tree.
     */
    var showSourcesRecursive = function( obj, merge, level ){

        var html = '';
        var prepend = '';

        // Add the files (leafs) from this level.
        obj.__files.forEach( function( file ){
            prepend += '<div data-depth="' + level + '" data-url="' + file[1] + '" class="_wdt-row _wdt-file" style="padding-left: ' + ( level * 15 )+ 'px; display: none;"><div class="_wdt-icon">' + icons.file + '</div>' + file[0] + '</div>';
        } );

        // Add the directories (branches) from this level; then recurse down and build all the branches and leafs.
        obj.__dirs.forEach( function( dir ) {
            // Is the current level missing files?
            if( obj[ dir ].__files.length < 1 ){
                // Yes. Add this directory as part of the merge path.
                html += showSourcesRecursive( obj[ dir ], dir + '/', level );
            } else {
                // No. Process this branch.
                html += '<div data-depth="' + level + '" class="_wdt-row _wdt-folder" style="padding-left: ' + ( level * 15 )+ 'px; display: none;"><div class="_wdt-open-arrow">' + icons.caretRight + '</div><div class="_wdt-close-arrow">' + icons.caretDown + '</div><div class="_wdt-icon">' + icons.folder + '</div>' + merge + dir + '</div>';
                html += showSourcesRecursive( obj[ dir ], '', level + 1 );
            }
        } );

        // Place files after directories.
        return prepend + html;
    };

    /**
     * Listen for key presses that indicate we should toggle dev tools open or closed.
     */
    var toggleDevTools = function(){

        var toggle = false;

        // Pressing F12.
        if( event.key == 'F12' ){
            toggle = true;
            event.preventDefault();
        }

        // Pressing Ctrl + Shift + I.
        if( event.key == 'I' ){
            if( status.keyStack.indexOf( 'Shift') > -1 ){
                if( status.keyStack.indexOf( 'Control') > -1 ){
                    toggle = true;
                    event.preventDefault();
                }
            }
        }

        // Do we need to toggle dev tools?
        if( toggle ){
            // Yes. Now check if we need to open or close dev tools.
            status.keyStack = [];
            if( status.consoleOpen ){
                closeTools();
                status.consoleOpen = false;
            } else {
                openTools();
                status.consoleOpen = true;
            }
        } else {
            // No. Keep the key stack size low to preserve memory.
            status.keyStack.push( event.key );
            if( status.keyStack.length > 2 ){
                status.keyStack.shift();
            }
        }
    };

    /**
     * Toggle a row on the Elements page open or closed,
     */
    var toggleElement = function(){

        event.preventDefault();
        var elem = event.target || event.srcElement;
        elem = elem.closest('._wdt-row');

        var original = parseInt(elem.dataset.depth);
        var limit = parseInt(elem.dataset.depth) + 1;
        var depth, skip = false;
        if( elem.classList.contains('_wdt-open') ){
            elem.classList.remove('_wdt-open');
            while( elem != null ){
                elem = elem.nextElementSibling;
                depth = parseInt( elem.dataset.depth );
                if( depth > original ){
                    elem.style.display = 'none';
                }
                if( depth == original ) {
                    elem.style.display = 'none';
                    elem = null;
                    return;
                }
            }
        } else {
            elem.classList.add('_wdt-open');
            while( elem != null ){
                elem = elem.nextElementSibling;
                depth = parseInt( elem.dataset.depth );
                if( depth == limit ){
                    if( ! skip ){
                        if( elem.querySelector('._wdt-open') ){
                            skip = true;
                        }
                        elem.style.display = 'block';
                    } else {
                        skip = false;
                    }
                    continue;
                }
                if( depth == original ) {
                    elem.style.display = 'block';
                    elem = null;
                    return;
                }
            }
        }
    };

    /**
     * Generic function that will toggle a row open or clossed. Used in the source
     * tree and in console messages when objects or functions are printed.
     */
    var toggleRow = function(){

        event.preventDefault();
        var elem = event.target || event.srcElement;
        if( ! elem.classList.contains('_wdt-row') ){
            elem = elem.closest('._wdt-row');
        }

        var original = parseInt( elem.dataset.depth );
        var depth = original + 1;
        var current = elem.nextElementSibling;

        if( elem.classList.contains('_wdt-open') ){
            elem.classList.remove('_wdt-open');
            while( current != null ){
                if( parseInt( current.dataset.depth ) == original ){
                    break;
                }
                if( current.dataset.depth >= depth ){
                    current.style.display = 'none';
                    current.classList.remove('_wdt-open');
                }
                current = current.nextElementSibling;
            }
        } else {
            elem.classList.add('_wdt-open');
            while( current != null ){
                if( parseInt( current.dataset.depth ) == original ){
                    break;
                }
                if( current.dataset.depth == depth ){
                    current.style.display = 'block';
                }
                current = current.nextElementSibling;
            }
        }
    };

    /**
     * Get the literal type of an object.
     *
     * @param  {*} unknown Anything you want to check the literal type of.
     * @return {String}    Uppercase string of the literal type for unknown.
     */
    var typeOf = function( unknown ){
        return ({}).toString.call( unknown ).match( /\s([^\]]+)/ )[1].toUpperCase()
    };

    /**
     * Check and show if needed the error and/or warning count.
     */
    var updateConsoleCounts = function(){
        var html = '';
        var title = [];
        if( status.console.errrorCount > 0 ){
            html += '<div class="_wdt-error-icon">' + icons.error + '</div><div class="_wdt-count">' + status.console.errrorCount + '</div>';
            title.push( status.console.errrorCount + ' error' );
        }
        if( status.console.warnCount > 0 ){
            html += '<div class="_wdt-warn-icon">' + icons.warn + '</div><div class="_wdt-count">' + status.console.warnCount + '</div>';
            title.push( status.console.warnCount + ' warning' );
        }
        elems.consoleCounts.innerHTML = html;
        elems.consoleCounts.title = title.join( ', ' );
    };

    /**
     * Print the version info to the console for the user.
     */
    var versionMessage = function(){
        var html = '<div class="_wdt-msg">';
        html += 'Web Developer Tool for headless browsers. Version: ' + status.version + '<br>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;repository at <a href="https://github.com/caboodle-tech/web-dev-tool">https://github.com/caboodle-tech/web-dev-tool</a><br>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;donations at <a href="https://ko-fi.com/caboodletech">https://ko-fi.com/caboodletech</a>';
        html += '</div><div class="_wdt-source">:1:</div>';

        var message = document.createElement('DIV');
        message.classList.add('_wdt-log');
        message.classList.add('_wdt-row');
        message.innerHTML = html;

        elems.consoleMessages.appendChild( message );
        elems.consoleTab.click();
        status.console.log.apply( null, [ message.innerText.replace( ':1:', '' ) ] );
    };

    // Load Web Dev Tool when the DOM is ready.
    window.addEventListener( 'load', initialize );

    // Run setup tasks immediately.
    preInitialize();

    /**
     * Expose public methods.
     *
     * @public
     */
    return {
        status: status,
        open: openTools
    };

})();
