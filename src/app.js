const express = require("express");
require("./models/associations");

const app = express();    

require("./start/modules")(app, express);
require("./start/run")(app);            