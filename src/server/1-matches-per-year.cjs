function matchesPerYear(matchesData = []) {
    if (Array.isArray(matchesData) && matchesData != undefined) {

        let matchesPlayedPerYear = matchesData.reduce((totalMatches, eachItem) => {
            if (totalMatches[eachItem.season]) {
                totalMatches[eachItem.season] += 1
            } else {
                totalMatches[eachItem.season] = 1
            }
            return totalMatches
        }, {})
        
        return matchesPlayedPerYear;
    }
    return []
}
module.exports = matchesPerYear;