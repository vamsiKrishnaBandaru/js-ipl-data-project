const fs = require("fs");
const csv = require('csvtojson')
const path = require("path")

const matchesFilePath = path.join(__dirname, "../data/matches.csv");
const outputFilePath = path.join(__dirname, '../public/output/5-team-won-toss-and-also-match.json');

csv()
  .fromFile(matchesFilePath)
  .then((matchesData) => {
    try {
      function teamWonTossAndMatch(matchesData = []) {

        let teamBothWon = matchesData.reduce((result, matchData) => {

          if (matchData.toss_winner == matchData.winner) {

            if (result[matchData.winner]) {
              result[matchData.winner] += 1

            } else {
              result[matchData.winner] = 1
            }
          }
          return result
        }, {})
        return teamBothWon
      }
      let teamWonTossAndMatchOutputData = teamWonTossAndMatch(matchesData)
      fs.writeFileSync(outputFilePath, JSON.stringify(teamWonTossAndMatchOutputData))
    } catch (err) {
      console.log(err);
    }
  })