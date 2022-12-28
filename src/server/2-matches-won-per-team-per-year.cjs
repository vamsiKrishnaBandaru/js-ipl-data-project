function matchesWonPerTeamPerYear(matchesData = []) {

  if (Array.isArray(matchesData)) {
    let mathesWonByYearData = matchesData.reduce((teamWon, matchesData) => {

      if (teamWon[matchesData.season] != undefined && teamWon[matchesData.season][matchesData.winner] != undefined) {
        teamWon[matchesData.season][matchesData.winner] += 1

      } else if (!teamWon[matchesData.season]) {
        teamWon[matchesData.season] = {}
        teamWon[matchesData.season][matchesData.winner] = 1

      } else {
        teamWon[matchesData.season][matchesData.winner] = 1
      }
      return teamWon
    }, {})
    return mathesWonByYearData;
  }
  return []
}

module.exports = matchesWonPerTeamPerYear;