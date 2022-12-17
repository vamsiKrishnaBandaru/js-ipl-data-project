const fs = require("fs");
const csv = require('csvtojson')
const path = require("path")

const matchesFilePath = path.join(__dirname, "../data/matches.csv");
const outputFilePath = path.join(__dirname, '../public/output/1-matches-per-year.json');
csv()
    .fromFile(matchesFilePath)
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

            fs.writeFileSync(outputFilePath, JSON.stringify(matchesPerYear(matchesData)))
        } catch (err) {
            console.log(err);
        }
    })