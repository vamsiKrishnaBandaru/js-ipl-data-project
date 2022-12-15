const fs = require("fs");
const csv = require('csvtojson')
const deliveries = '../data/deliveries.csv'

csv()
  .fromFile(deliveries)
  .then((deliveriesData) => {
    try {
      function mostDismissedPlayerByAnother(deliveriesData) {
        const playerDismissalData = deliveriesData.reduce((result, player) => {
          if (player.player_dismissed) {

            if ((result[player.player_dismissed] && result[player.player_dismissed][player.bowler])) {
              result[player.player_dismissed][player.bowler] += 1;

            } else if (result[player.player_dismissed] == undefined) {
              result[player.player_dismissed] = {}
              result[player.player_dismissed][player.bowler] = 1
            } else {
              result[player.player_dismissed][player.bowler] = 1
            }
          }
          return result
        }, {})
        let sortedAwardsDataData = Object.entries(playerDismissalData).map((data) => {
          return {
            'playerName': data[0],
            'dismissedBy': (Object.entries(data[1])
              .sort(([, bowler1], [, bowler2]) => bowler2 - bowler1)[0])[0],
            'numberOfTimesDismissed': (Object.entries(data[1])
              .sort(([, bowler1], [, bowler2]) => bowler2 - bowler1)[0])[1]
          }

        })
        return sortedAwardsDataData
      } 
      let mostDismissedPlayerByAnotherOutputData = mostDismissedPlayerByAnother(deliveriesData)
      fs.writeFileSync('../public/output/8-most-dismissed-player-by-another-player.json', JSON.stringify(mostDismissedPlayerByAnotherOutputData))
    } catch (err) {
      console.log(err);
    }
  })