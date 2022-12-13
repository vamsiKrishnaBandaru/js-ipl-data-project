function extraRunsConcededPerTeamInTheYear(matchesData = [], deliveriesData = [], year) {
  let yearIds = []
  if (Number(year) && Array.isArray(matchesData) && Array.isArray(deliveriesData)) {
    // Stored all Ids in the year 2016
    matchesData.map((matches) => {
      if (matches.season == year) {
        yearIds.push(matches.id)
      }
    })
    // using the yearIds deliveriesData gathered
    const yearDeliveriesData = deliveriesData.filter(delivery => yearIds.includes(delivery.match_id))

    let result = yearDeliveriesData.reduce((output, deliveries) => {

      if (output[deliveries.bowling_team]) {
        output[deliveries.bowling_team] += Number(deliveries.extra_runs)

      } else {
        output[deliveries.bowling_team] = Number(deliveries.extra_runs)
      }
      return output
    }, {})

    return result;
  }
  return [];
}

module.exports = extraRunsConcededPerTeamInTheYear;