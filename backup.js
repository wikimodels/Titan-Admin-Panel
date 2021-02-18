const fs = require("fs");
const fromDir = "D:/GitHub/Titan-Health-Report";
const toDir = "C:/Users/Vitali/Google Drive/Projects/Titan-Health-Report";
const files = [
  {
    pathToFile: fromDir + "/src/environments/environment.prod.ts",
    pathToNewDestination: toDir + "/src/environments/production.prod.ts",
  },
  {
    pathToFile: fromDir + "/src/environments/environment.ts",
    pathToNewDestination: toDir + "/src/environments/production.ts",
  },
  {
    pathToFile: fromDir + "/consts/urls.consts.ts",
    pathToNewDestination: toDir + "/consts/urls.consts.ts",
  },
  {
    pathToFile: fromDir + "/consts/chart-url.consts.ts",
    pathToNewDestination: toDir + "/consts/chart-url.consts.ts",
  },
  {
    pathToFile: fromDir + "/consts/pristin-questionnaire.ts",
    pathToNewDestination: toDir + "/consts/pristin-questionnaire.ts",
  },
  {
    pathToFile: fromDir + "/consts/routes.consts.ts",
    pathToNewDestination: toDir + "/consts/routes.consts.ts",
  },
  {
    pathToFile: fromDir + "/consts/test-ip-data.ts",
    pathToNewDestination: toDir + "/consts/test-ip-data.ts",
  },
];

for (let i = 0; i < files.length; i++) {
  fs.copyFile(
    files[i].pathToFile,
    files[i].pathToNewDestination,
    function (err) {
      if (err) {
        throw err;
      } else {
        console.log("Successfully copied and moved the file!");
      }
    }
  );
}
