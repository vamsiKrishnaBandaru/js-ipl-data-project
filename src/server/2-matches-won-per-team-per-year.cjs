function matchesWonPerTeamPerYear(matchesData = []) {
  let teamWon = {}
  if (Array.isArray(matchesData) && matchesData != undefined) {
    matchesData.map((matchesData) => {

      if (teamWon[matchesData.winner] != undefined && teamWon[matchesData.winner][matchesData.season] != undefined) {
        teamWon[matchesData.winner][matchesData.season] += 1

      } else if (teamWon[matchesData.winner] == undefined) {
        teamWon[matchesData.winner] = {}
        teamWon[matchesData.winner][matchesData.season] = 1

      } else {
        teamWon[matchesData.winner][matchesData.season] = 1
      }
    })
  }
  return teamWon;
}
module.exports = matchesWonPerTeamPerYear;