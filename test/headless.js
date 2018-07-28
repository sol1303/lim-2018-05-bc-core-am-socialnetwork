global.window = global;
global.assert = require("chai").assert;
// MockFirebase.override();

require('mockfirebase');
require("../src/data/data.js");
require("../src/data/mockFirebase.js");
require("./data.spec.js");
