function matchesWonPerTeamPerYear(matchesData = []) {
  let teamWon = {}
  if (Array.isArray(matchesData) && matchesData != undefined) {
    matchesData.map((matchesData) => {

      if (teamWon[matchesData.season] != undefined && teamWon[matchesData.season][matchesData.winner] != undefined) {
        teamWon[matchesData.season][matchesData.winner] += 1

      } else if (teamWon[matchesData.season] == undefined) {
        teamWon[matchesData.season] = {}
        teamWon[matchesData.season][matchesData.winner] = 1

      } else {
        teamWon[matchesData.season][matchesData.winner] = 1
      }
    })
  }
  return teamWon;
}
module.exports = matchesWonPerTeamPerYear;