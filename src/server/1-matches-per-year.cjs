function matchesPerYear(matchesData = []) {
    if (Array.isArray(matchesData)) {

        let matchesPlayedPerYear = matchesData.reduce((totalMatches, match) => {
            totalMatches[match.season] ? totalMatches[match.season]++ : totalMatches[match.season] = 1
            return totalMatches
        }, {})

        return matchesPlayedPerYear;
    }
    return []
}

module.exports = matchesPerYear;