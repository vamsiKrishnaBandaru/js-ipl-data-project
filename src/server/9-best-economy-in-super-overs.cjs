
function bestEconomyInSuperOvers(deliveriesData) {

  if (Array.isArray(deliveriesData)) {

    let superOverMatchsData = deliveriesData.reduce((output, delivery) => {

      if (delivery.is_super_over != 0) {

        if (output[delivery.bowler]) {
          output[delivery.bowler].total_balls += 1
          output[delivery.bowler].total_runs += Number(delivery.total_runs)
          output[delivery.bowler]['economy'] = Number((output[delivery.bowler].total_runs / (output[delivery.bowler].total_balls / 6)).toFixed(2))

        } else {
          output[delivery.bowler] = {
            'total_balls': Number(delivery.ball),
            'total_runs': Number(delivery.total_runs)
          }
        }
      }
      return output
    }, {})
    let bestEconomyPlayersData = Object.entries(superOverMatchsData).sort(([, bowler1], [, bowler2],) => {
      return bowler1.economy - bowler2.economy
    });

    return bestEconomyPlayersData[0];
  }
  return [];
}

module.exports = bestEconomyInSuperOvers;