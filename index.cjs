const fs = require("fs");
const csv = require('csvtojson')
const matches = './src/data/matches.csv'
const deliveries = './src/data/deliveries.csv'
const matchesPerYear = require('./src/server/1-matches-per-year.cjs')
const matchesWonPerTeamPerYear = require('./src/server/2-matches-won-per-team-per-year.cjs')
const extraRunsConcededPerTeamInTheYear = require('./src/server/3-extra-runs-conceded-per-team-in-the-year.cjs')
const top10EconomicalBowlersInyear = require('./src/server/4-top-10-economical-bowlers-in-the-year.cjs');
const teamWonTossAndMatch = require('./src/server/5-team-won-toss-and-also-match.cjs')
const playerOwnMostMatchAwardsBySeason = require('./src/server/6-player-won-highest-number-of-Player-of-Match-awards-by-season.cjs')
const batsmanStrikeRateBySeason = require('./src/server/7-batsman-strike-rate-by-season.cjs')

csv()
  .fromFile(matches)
  .then((matchesData) => {
    csv()
      .fromFile(deliveries)
      .then((deliveriesData) => {

        // 1

        let matchesPerYearOutput = matchesPerYear(matchesData);
        try {
          fs.writeFileSync('./src/public/output/1-matches-per-year.json', JSON.stringify(matchesPerYearOutput))
        } catch (err) {
          console.log(err);
        }

        // 2

        let matchesWonPerTeamPerYearOutputData = matchesWonPerTeamPerYear(matchesData)
        try {
          fs.writeFileSync('./src/public/output/2-matches-won-per-team-per-year.json', JSON.stringify(matchesWonPerTeamPerYearOutputData))
        } catch (err) {
          console.log(err);
        }

        // 3

        let extraRunsConcededPerTeamInTheYearOutputData = extraRunsConcededPerTeamInTheYear(matchesData, deliveriesData, 2016)
        try {
          fs.writeFileSync('./src/public/output/3-extra-runs-conceded-per-team-in-the-year.json', JSON.stringify(extraRunsConcededPerTeamInTheYearOutputData))
        } catch (err) {
          console.log(err);
        }

        // 4

        let top10EconomicalBowlersInyearOutputData = top10EconomicalBowlersInyear(matchesData, deliveriesData, 2015)
        try {
          fs.writeFileSync('./src/public/output/4-top-10-economical-bowlers-in-the-year.json', JSON.stringify(top10EconomicalBowlersInyearOutputData))
        } catch (err) {
          console.log(err);
        }

        // 5 Find the number of times each team won the toss and also won the match


        let teamWonTossAndMatchOutputData = teamWonTossAndMatch(matchesData)
        try {
          fs.writeFileSync('./src/public/output/5-team-won-toss-and-also-match.json', JSON.stringify(teamWonTossAndMatchOutputData))
        } catch (err) {
          console.log(err);
        }

        // 6 Find a player who has won the highest number of Player of the Match awards for each season.

        let playerOwnMostMatchAwardsBySeasonOutputData = playerOwnMostMatchAwardsBySeason(matchesData)
        try {
          fs.writeFileSync('./src/public/output/6-player-won-highest-number-of-Player-of-Match-awards-by-season.json', JSON.stringify(playerOwnMostMatchAwardsBySeasonOutputData))
        } catch (err) {
          console.log(err);
        }

        //  7 Find the strike rate of a batsman for each season.

        let batsmanStrikeRateBySeasonOutputData = batsmanStrikeRateBySeason(matchesData, deliveriesData, "MS Dhoni")
        try {
          fs.writeFileSync('./src/public/output/7-batsman-strike-rate-by-season.json', JSON.stringify(batsmanStrikeRateBySeasonOutputData))
        } catch (err) {
          console.log(err);
        }
      })
  })