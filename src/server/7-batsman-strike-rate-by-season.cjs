function batsmanStrikeRateBySeason(matchesData = [], deliveriesData = [], batsmanName) {
    //season and Ids
    if (Array.isArray(matchesData) && Array.isArray(deliveriesData) && typeof(batsmanName) == "string") {
        let matchIds = matchesData.reduce((output, matchsData) => {

            if (output[matchsData.season]) {
                output[matchsData.season].push(matchsData.id)
            }
            else {
                output[matchsData.season] = [matchsData.id];
            }
            return output;
        }, {})

        // Filtered 
        let playerDataBySeason = Object.keys(matchIds).reduce((playerDetails, matchsData) => {

            playerDetails[matchsData] = deliveriesData.filter((batingData) => {
                return matchIds[matchsData].includes(batingData.match_id);
            })
                .reduce((result, batingData) => {

                    if (result[batingData.batsman]) {
                        result[batingData.batsman]['totalRuns'] += Number(batingData.batsman_runs);
                        result[batingData.batsman]['totalBalls'] += 1;
                        result[batingData.batsman]['strikeRate'] = Number(((result[batingData.batsman]['totalRuns'] / result[batingData.batsman]['totalBalls']) * 100).toFixed(2));
                    }
                    else {
                        result[batingData.batsman] = {
                            'totalRuns': Number(batingData.batsman_runs),
                            'totalBalls': 1,
                            'strikeRate': Number(batingData.batsman_runs)
                        }
                    }
                    if (Number(batingData.wide_runs) > 0) {
                        result[batingData.batsman]['totalBalls'] -= 1;
                    }

                    return result;
                }, {})

            return playerDetails;
        }, {})

        let batsmanDataBySeason = Object.entries(playerDataBySeason).map((data) => {
            return {
                'season': data[0], 'playerData': Object.entries(data[1]).reduce((output, data) => {

                    if (data[0] == batsmanName) {
                        output[data[0]] = data[1]
                    }
                    return output
                })
            }
        })
        return batsmanDataBySeason
    }
    return []
}


module.exports = batsmanStrikeRateBySeason;