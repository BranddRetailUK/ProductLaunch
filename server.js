// server.js
const serve = require("serve");
const port = process.env.PORT || 8000;

serve(".", { port });
