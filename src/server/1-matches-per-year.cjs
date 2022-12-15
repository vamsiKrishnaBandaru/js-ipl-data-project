const fs = require("fs");
const csv = require('csvtojson')
const matches = '../data/matches.csv'

csv()
    .fromFile(matches)
    .then((matchesData) => {
        try {
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

            let matchesPerYearOutput = matchesPerYear(matchesData)
            fs.writeFileSync('../public/output/1-matches-per-year.json', JSON.stringify(matchesPerYearOutput))
        } catch (err) {
            console.log(err);
        }
    })
