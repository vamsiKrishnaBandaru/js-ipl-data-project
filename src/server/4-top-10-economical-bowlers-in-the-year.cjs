function top10EconomicalBowlersInyear(matchesData = [], deliveriesData = [], year) {
  if (Number(year) && Array.isArray(matchesData) && Array.isArray(deliveriesData)) {
    // Stored all Ids in the year 2015
    const yearIds = []
    matchesData.map((matches) => {
      if (matches.season == year) {
        yearIds.push(matches.id)
      }
    })
    // using the yearIds deliveriesData gathered
    const playersEconomyData = deliveriesData
      .filter(delivery => yearIds.includes(delivery.match_id))
      .reduce((output, deliveries) => {

        if (output[deliveries.bowler] && output[deliveries.bowler]['total_balls'] && output[deliveries.bowler]['total_runs']) {

          output[deliveries.bowler]['total_balls'] += 1
          output[deliveries.bowler]['total_runs'] += Number(deliveries.total_runs)
          output[deliveries.bowler]['economy'] = Number((output[deliveries.bowler]['total_runs'] / (output[deliveries.bowler]['total_balls'] / 6)).toFixed(2))

        } else {
          output[deliveries.bowler] = {}
          output[deliveries.bowler]['total_balls'] = Number(deliveries.ball)
          output[deliveries.bowler]['total_runs'] = Number(deliveries.total_runs)
        }
        return output
      }, {})

    const sortedPlayersEconomyData = Object.entries(playersEconomyData).sort(([a, { economy: bowler1 }], [b, { economy: bowler2 }]) => {
      return bowler1 > bowler2 ? 1 : -1;
    });

    const sortedBowlersData = sortedPlayersEconomyData.reduce((player, each) => {
      let bowlerData = {}
      bowlerData['bowler_name'] = each[0]
      bowlerData['economy'] = each[1].economy
      player.push(bowlerData)
      return player
    }, [])

    return sortedBowlersData.slice(0, 10)
  }
  return [];
}

module.exports = top10EconomicalBowlersInyear;