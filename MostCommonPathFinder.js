"use strict";

var fsp = require('fs-promise');

var MostCommonPathFinder = (() => {
  return {
    findPath: (path) => {
      return fsp.readFile(path, 'utf8').then((logfileString) => {
        let pathList = {};
        let userList = {};
        let mostCommonYet = 0;
        let mostCommonPath = '';
        
        logfileString.split('\n').forEach((line) => {
          let arr = line.split(' ');
          let id = arr[0];
          let path = arr[1];
          if(!userList[id]) userList[id] = [path];
          if(!userList[id].find((i) => i===path)) userList[id].push(path);
          if(userList[id].length === 3){
            let pathToPush = userList[id].join('"');
            userList[id].shift();
            if(pathList.hasOwnProperty(pathToPush)) {
              pathList[pathToPush] = pathList[pathToPush] + 1;
            } else {
              pathList[pathToPush] = 1;
            }
            if(pathList[pathToPush] > mostCommonYet) {
              mostCommonYet = pathList[pathToPush];
              mostCommonPath = pathToPush;
            }
          }
        })
        return mostCommonPath.split('"');
      })
    }
  };
})();

module.exports = MostCommonPathFinder;
