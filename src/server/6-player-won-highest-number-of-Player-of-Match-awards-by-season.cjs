function playerOwnMostMatchAwardsBySeason(matchesData = []) {
  
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

  let sortedAwardsDataData = Object.fromEntries(Object.entries(awardsDataBySeason).map((data) => {
    return [data[0], Object.entries(data[1]).sort((player1, player2) => {
      return player2[1] - player1[1]
    })[0]];
  }))

  return sortedAwardsDataData
}

module.exports = playerOwnMostMatchAwardsBySeason