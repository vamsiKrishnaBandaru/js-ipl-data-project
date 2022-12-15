const fs = require("fs");
const csv = require('csvtojson')
const matches = '../data/matches.csv'

csv()
  .fromFile(matches)
  .then((matchesData) => {
    try {
      function playerOwnMostMatchAwardsBySeason(matchesData) {
        let awardsDataBySeason = matchesData.reduce((output, awardsData) => {

          if (output[awardsData.season] && output[awardsData.season][awardsData.player_of_match]) {
            output[awardsData.season][awardsData.player_of_match] += 1

          } else if (!output[awardsData.season]) {
            output[awardsData.season] = {}
            output[awardsData.season][awardsData.player_of_match] = 1

          } else {
            output[awardsData.season][awardsData.player_of_match] = 1
          }
          return output
        }, {})

        let sortedAwardsDataData = Object.entries(awardsDataBySeason).map((data) => {
          return [data[0], Object.entries(data[1]).sort((player1, player2) => player2[1] - player1[1])[0]];
        })

        return sortedAwardsDataData
      }
      let playerOwnMostMatchAwardsBySeasonOutputData = playerOwnMostMatchAwardsBySeason(matchesData)
      fs.writeFileSync('../public/output/6-player-won-highest-number-of-Player-of-Match-awards-by-season.json', JSON.stringify(playerOwnMostMatchAwardsBySeasonOutputData))
    } catch (err) {
      console.log(err);
    }
  })