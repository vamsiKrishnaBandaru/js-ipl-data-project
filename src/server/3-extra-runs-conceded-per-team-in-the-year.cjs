
function extraRunsConcededPerTeamInTheYear(matchesData = [], deliveriesData = [], year) {

  if (Number(year) && Array.isArray(matchesData) && Array.isArray(deliveriesData)) {

    const yearIds = matchesData.reduce((yearId, match) => {
      if (match.season == year) {
        yearId.push(match.id)
      }
      return yearId
    }, [])

    let extraRunsConcededPerTeamData = deliveriesData.reduce((output, deliveries) => {

      if (yearIds.includes(deliveries.match_id)) {
        output[deliveries.bowling_team] ? output[deliveries.bowling_team] += Number(deliveries.extra_runs) : output[deliveries.bowling_team] = Number(deliveries.extra_runs)

      }
      return output
    }, {})

    return extraRunsConcededPerTeamData;
  }
  return [];
}

module.exports = extraRunsConcededPerTeamInTheYear;