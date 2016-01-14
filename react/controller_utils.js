"use strict";

var fs = require("fs");
var path = require("path");

var utils = {
    readConfigJson: function(fileName, encoded)
    {
        return fs.readFileSync(fileName, encoded);
    }
};

module.exports = utils;