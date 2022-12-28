
function top10EconomicalBowlersInyear(matchesData = [], deliveriesData = [], year) {

  if (Number(year) && Array.isArray(matchesData) && Array.isArray(deliveriesData)) {
    // Stored all Ids in the year 2015
    let yearIds = matchesData.reduce((yearId, matches) => {
      if (matches.season == year) {
        yearId.push(matches.id)
      }
      return yearId
    }, [])
    // using the yearIds deliveriesData gathered
    const playersEconomyData = deliveriesData.reduce((output, deliveries) => {

      if (yearIds.includes(deliveries.match_id)) {

        if (output[deliveries.bowler]) {

          output[deliveries.bowler]['total_balls'] += 1
          output[deliveries.bowler]['total_runs'] += Number(deliveries.total_runs)
          output[deliveries.bowler]['economy'] = Number((output[deliveries.bowler]['total_runs'] / (output[deliveries.bowler]['total_balls'] / 6)).toFixed(2))

        } else {
          output[deliveries.bowler] = {}
          output[deliveries.bowler]['total_balls'] = Number(deliveries.ball)
          output[deliveries.bowler]['total_runs'] = Number(deliveries.total_runs)
        }
      }
      return output
    }, {})

    const top10EconomicalBowlersInyearData = Object.fromEntries(Object.entries(playersEconomyData).sort(([, player1], [, player2]) => {
      return player1.economy - player2.economy
    }).slice(0, 10))

    return top10EconomicalBowlersInyearData
  }
  return [];
}

module.exports = top10EconomicalBowlersInyear