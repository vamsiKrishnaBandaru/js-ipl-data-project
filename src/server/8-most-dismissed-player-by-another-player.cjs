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

  let sortedAwardsDataData = Object.entries(playerDismissalData).reduce((output, data) => {

    let playerData = Object.entries(data[1]).sort(([, player1], [, player2]) => {
      return player2 - player1
    })[0]

    output[data[0]] = {
      "dismissedPlayer": playerData[0],
      "numberOfdismissals": playerData[1]
    }
    return output

  }, {})
  return sortedAwardsDataData
}

module.exports = mostDismissedPlayerByAnother;