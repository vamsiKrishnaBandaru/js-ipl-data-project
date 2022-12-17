const fs = require("fs");
const csv = require('csvtojson')
const path = require("path")

const matchesFilePath = path.join(__dirname, "../data/matches.csv");
const outputFilePath = path.join(__dirname, '../public/output/2-matches-won-per-team-per-year.json');

csv()
  .fromFile(matchesFilePath)
  .then((matchesData) => {
    try {
      function matchesWonPerTeamPerYear(matchesData = []) {
        let teamWon = {}
        if (Array.isArray(matchesData) && matchesData != undefined) {
          matchesData.map((matchesData) => {

            if (teamWon[matchesData.season] != undefined && teamWon[matchesData.season][matchesData.winner] != undefined) {
              teamWon[matchesData.season][matchesData.winner] += 1

            } else if (teamWon[matchesData.season] == undefined) {
              teamWon[matchesData.season] = {}
              teamWon[matchesData.season][matchesData.winner] = 1

            } else {
              teamWon[matchesData.season][matchesData.winner] = 1
            }
          })
        }
        return teamWon;
      }
      fs.writeFileSync(outputFilePath, JSON.stringify(matchesWonPerTeamPerYear(matchesData)))
    } catch (err) {
      console.log(err);
    }
  })