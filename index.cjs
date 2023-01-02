const fs = require("fs");
const csv = require('csvtojson')
const path = require("path")
const express = require("express");

const matches = './src/data/matches.csv'
const deliveries = './src/data/deliveries.csv'

// All problems file paths
const matchesPerYear = require('./src/server/1-matches-per-year.cjs')
const matchesWonPerTeamPerYear = require('./src/server/2-matches-won-per-team-per-year.cjs')
const extraRunsConcededPerTeamInTheYear = require('./src/server/3-extra-runs-conceded-per-team-in-the-year.cjs')
const top10EconomicalBowlersInyear = require('./src/server/4-top-10-economical-bowlers-in-the-year.cjs');
const teamWonTossAndMatch = require('./src/server/5-team-won-toss-and-also-match.cjs')
const playerOwnMostMatchAwardsBySeason = require('./src/server/6-player-won-highest-number-of-Player-of-Match-awards-by-season.cjs')
const batsmanStrikeRateBySeason = require('./src/server/7-batsman-strike-rate-by-season.cjs')
const mostDismissedPlayerByAnother = require('./src/server/8-most-dismissed-player-by-another-player.cjs')
const bestEconomyInSuperOvers = require('./src/server/9-best-economy-in-super-overs.cjs')

// All output file paths
const problem1Output = path.join(__dirname, './src/public/output/1-matches-per-year.json');
const problem2Output = path.join(__dirname, './src/public/output/2-matches-won-per-team-per-year.json');
const problem3Output = path.join(__dirname, './src/public/output/3-extra-runs-conceded-per-team-in-the-year.json');
const problem4Output = path.join(__dirname, './src/public/output/4-top-10-economical-bowlers-in-the-year.json');
const problem5Output = path.join(__dirname, './src/public/output/5-team-won-toss-and-also-match.json');
const problem6Output = path.join(__dirname, './src/public/output/6-player-won-highest-number-of-Player-of-Match-awards-by-season.json')
const problem7Output = path.join(__dirname, './src/public/output/7-batsman-strike-rate-by-season.json');
const problem8Output = path.join(__dirname, './src/public/output/8-most-dismissed-player-by-another-player.json')
const problem9Output = path.join(__dirname, './src/public/output/9-best-economy-in-super-overs.json');

csv()
  .fromFile(matches)
  .then((matchesData) => {
    csv()
      .fromFile(deliveries)
      .then((deliveriesData) => {

        // 1

        let matchesPerYearOutput = matchesPerYear(matchesData);
        try {
          fs.writeFileSync(problem1Output, JSON.stringify(matchesPerYearOutput))
        } catch (err) {
          console.log(err);
        }

        // 2

        let matchesWonPerTeamPerYearOutputData = matchesWonPerTeamPerYear(matchesData)
        try {
          fs.writeFileSync(problem2Output, JSON.stringify(matchesWonPerTeamPerYearOutputData))
        } catch (err) {
          console.log(err);
        }

        // 3

        let extraRunsConcededPerTeamInTheYearOutputData = extraRunsConcededPerTeamInTheYear(matchesData, deliveriesData, 2016)
        try {
          fs.writeFileSync(problem3Output, JSON.stringify(extraRunsConcededPerTeamInTheYearOutputData))
        } catch (err) {
          console.log(err);
        }

        // 4

        let top10EconomicalBowlersInyearOutputData = top10EconomicalBowlersInyear(matchesData, deliveriesData, 2015)
        try {
          fs.writeFileSync(problem4Output, JSON.stringify(top10EconomicalBowlersInyearOutputData))
        } catch (err) {
          console.log(err);
        }

        // 5 Find the number of times player team won the toss and also won the match


        let teamWonTossAndMatchOutputData = teamWonTossAndMatch(matchesData)
        try {
          fs.writeFileSync(problem5Output, JSON.stringify(teamWonTossAndMatchOutputData))
        } catch (err) {
          console.log(err);
        }

        // 6 Find a player who has won the highest number of Player of the Match awards for player season.

        let playerOwnMostMatchAwardsBySeasonOutputData = playerOwnMostMatchAwardsBySeason(matchesData)
        try {
          fs.writeFileSync(problem6Output, JSON.stringify(playerOwnMostMatchAwardsBySeasonOutputData))
        } catch (err) {
          console.log(err);
        }

        //  7 Find the strike rate of a batsman for player season.

        let batsmanStrikeRateBySeasonOutputData = batsmanStrikeRateBySeason(matchesData, deliveriesData, "MS Dhoni")
        try {
          fs.writeFileSync(problem7Output, JSON.stringify(batsmanStrikeRateBySeasonOutputData))
        } catch (err) {
          console.log(err);
        }

        // 8 Find the highest number of times one player has been dismissed by another player

        let mostDismissedPlayerByAnotherOutputData = mostDismissedPlayerByAnother(deliveriesData)
        try {
          fs.writeFileSync(problem8Output, JSON.stringify(mostDismissedPlayerByAnotherOutputData))
        } catch (err) {
          console.log(err);
        }

        // 9 Find the bowler with the best economy in super overs

        let bestEconomyInSuperOversOutputData = bestEconomyInSuperOvers(deliveriesData)
        try {
          fs.writeFileSync(problem9Output, JSON.stringify(bestEconomyInSuperOversOutputData))
        } catch (err) {
          console.log(err);
        }

      })
  })


const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {

  let AllFiles = {
    "problem1": "1-matches-per-year.cjs",
    "problem2": "2-matches-won-per-team-per-year.cjs",
    "problem3": "3-extra-runs-conceded-per-team-in-the-year.cjs",
    "problem4": "4-top-10-economical-bowlers-in-the-year.json",
    "problem5": "5-team-won-toss-and-also-match.json",
    "problem6": "6-player-won-highest-number-of-Player-of-Match-awards-by-season.json",
    "problem7": "7-batsman-strike-rate-by-season.json",
    "problem8": "8-most-dismissed-player-by-another-player.json",
    "problem9": "9-best-economy-in-super-overs.json"
  }
  res.send(AllFiles)
})


app.get('/:name', (req, res) => {
  let route = req.params.name

  let filePaths = {
    problem1: problem1Output,
    problem2: problem2Output,
    problem3: problem3Output,
    problem4: problem4Output,
    problem5: problem5Output,
    problem6: problem6Output,
    problem7: problem7Output,
    problem8: problem8Output,
    problem9: problem9Output
  }

  if (filePaths[route]) {
    res.sendFile(filePaths[route])
  } else {
    res.status(400)
    res.send("404 Error")
  }
})


app.listen(port, () => {
  console.log(`Running on ${port}...`);
});