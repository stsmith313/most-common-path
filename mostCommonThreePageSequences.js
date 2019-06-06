"use strict";
let MostCommonPathFinder = require("./MostCommonPathFinder");
MostCommonPathFinder.findPath("./dragon.log")
  .then(console.log)
  .catch(console.error);
