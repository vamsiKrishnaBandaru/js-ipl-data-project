function bestEconomyInSuperOvers(deliveriesData) {
  if (Array.isArray(deliveriesData)) {
    let superOverMatchsData = deliveriesData.filter((matchsData) => matchsData.is_super_over != 0)

      .reduce((output, delivery) => {

        if (output[delivery.bowler]) {
          output[delivery.bowler]['total_balls'] += 1
          output[delivery.bowler]['total_runs'] += Number(delivery.total_runs)
          output[delivery.bowler]['economy'] = Number((output[delivery.bowler]['total_runs'] / (output[delivery.bowler]['total_balls'] / 6)).toFixed(2))

        } else {
          output[delivery.bowler] = {
            'total_balls': Number(delivery.ball),
            'total_runs': Number(delivery.total_runs)
          }
        }
        return output
      }, {})
    let bestEconomyPlayersData = Object.entries(superOverMatchsData).sort(([a, { economy: bowler1 }], [b, { economy: bowler2 }]) => bowler1 > bowler2 ? 1 : -1);

    return bestEconomyPlayersData[0];
  }
  return [];
}


module.exports = bestEconomyInSuperOvers;