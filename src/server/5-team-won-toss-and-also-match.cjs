function teamWonTossAndMatch(matchesData = []) {

  let teamBothWon = matchesData.reduce((result, matchData) => {

    if (matchData.toss_winner == matchData.winner) {

      result[matchData.winner] ? result[matchData.winner] += 1 : result[matchData.winner] = 1

    }
    return result
  }, {})
  return teamBothWon
}

module.exports = teamWonTossAndMatch;