import {JSDOM} from "jsdom";

const {document} = (new JSDOM(`<body></body>`)).window;
global.document = document;

const mapElement = global.document.createElement(`div`);
mapElement.setAttribute(`id`, `map`);
global.document.body.appendChild(mapElement);
