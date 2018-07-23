global.window = global;
global.assert = require("chai").assert;
// MockFirebase.override();

require('mockfirebase');
require("../src/data/mockFirebase.js");
require("../src/data/data.js");
require("./mockFirebase.spec.js");
require("./data.spec.js");




