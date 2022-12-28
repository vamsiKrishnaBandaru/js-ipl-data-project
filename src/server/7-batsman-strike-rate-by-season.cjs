function batsmanStrikeRateBySeason(matchesData = [], deliveriesData = [], batsmanName) {

    if (Array.isArray(matchesData) && Array.isArray(deliveriesData) && typeof (batsmanName) == "string") {

        let matchIds = matchesData.reduce((output, matchsData) => {
            output[matchsData.season] ? output[matchsData.season].push(matchsData.id) : output[matchsData.season] = [matchsData.id]
            return output;
        }, {})

        let playerDataBySeason = Object.keys(matchIds).reduce((bySeason, season) => {
            bySeason[season] = deliveriesData.reduce((output, data) => {
                if (matchIds[season].includes(data.match_id) && data.batsman == batsmanName) {

                    if (output[data.batsman]) {
                        output[data.batsman]["totalBalls"] += 1
                        output[data.batsman]["totalRuns"] += Number(data.batsman_runs)
                        output[data.batsman]["economy"] = Number(output[data.batsman]["totalRuns"] / (output[data.batsman]["totalBalls"]) * 6).toFixed(2)

                    } else {
                        output[data.batsman] = {
                            "totalRuns": Number(data.batsman_runs),
                            "totalBalls": 1,
                            "economy": Number(data.batsman_runs)
                        }
                    }
                }
                return output
            }, {})
            return bySeason
        }, {})
        return playerDataBySeason
    }
    return []
}


module.exports = batsmanStrikeRateBySeason;