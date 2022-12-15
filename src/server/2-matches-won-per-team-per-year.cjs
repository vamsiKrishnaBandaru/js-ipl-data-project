const fs = require("fs");
const csv = require('csvtojson')
const matches = '../data/matches.csv'

csv()
  .fromFile(matches)
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
      let matchesWonPerTeamPerYearOutputData = matchesWonPerTeamPerYear(matchesData)
      fs.writeFileSync('../public/output/2-matches-won-per-team-per-year.json', JSON.stringify(matchesWonPerTeamPerYearOutputData))
    } catch (err) {
      console.log(err);
    }
  })