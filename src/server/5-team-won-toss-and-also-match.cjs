function teamWonTossAndMatch(matchesData = []) {

  let teamBothWon = matchesData.reduce((result, matchData) => {

    if (matchData.toss_winner == matchData.winner) {

      if (result[matchData.winner]) {
        result[matchData.winner] += 1

      } else {
        result[matchData.winner] = 1
      }
    }
    return result
  }, {})
  return teamBothWon
}

module.exports = teamWonTossAndMatch;