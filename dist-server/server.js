"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.js
const http_1 = require("http");
const url_1 = require("url");
const next_1 = __importDefault(require("next"));
const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
// If you want to use a custom Next.js configuration, you can import it here
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    (0, http_1.createServer)((req, res) => {
        const parsedUrl = (0, url_1.parse)(req.url || "", true);
        handle(req, res, parsedUrl);
    }).listen(port, () => {
        console.log(`> Server ready at http://localhost:${port} in ${dev ? "development" : "production"} mode`);
    });
});
