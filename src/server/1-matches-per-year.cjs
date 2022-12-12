function matchesPerYear(matchesData = []) {
    let matchesPlayedPerYear = {}
    if (Array.isArray(matchesData) && matchesData != undefined) {
        
        for (let year of matchesData) {
            let season = year.season

            if (matchesPlayedPerYear[season]) {
                matchesPlayedPerYear[season] += 1
            } else {
                matchesPlayedPerYear[season] = 1
            }
        }
    }
    return matchesPlayedPerYear;
}
module.exports = matchesPerYear;