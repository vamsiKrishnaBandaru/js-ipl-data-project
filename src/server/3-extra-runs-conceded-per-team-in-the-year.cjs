const fs = require("fs");
const csv = require('csvtojson')
const matches = '../data/matches.csv'
const deliveries = '../data/deliveries.csv'

csv()
  .fromFile(matches)
  .then((matchesData) => {
    csv()
      .fromFile(deliveries)
      .then((deliveriesData) => {
        try {
          function extraRunsConcededPerTeamInTheYear(matchesData = [], deliveriesData = [], year) {
            let yearIds = []
            if (Number(year) && Array.isArray(matchesData) && Array.isArray(deliveriesData)) {
              // Stored all Ids in the year 2016
              matchesData.map((matches) => {
                if (matches.season == year) {
                  yearIds.push(matches.id)
                }
              })
              // using the yearIds deliveriesData gathered
              const yearDeliveriesData = deliveriesData.filter(delivery => yearIds.includes(delivery.match_id))

              let result = yearDeliveriesData.reduce((output, deliveries) => {

                if (output[deliveries.bowling_team]) {
                  output[deliveries.bowling_team] += Number(deliveries.extra_runs)

                } else {
                  output[deliveries.bowling_team] = Number(deliveries.extra_runs)
                }
                return output
              }, {})

              return result;
            }
            return [];
          } let extraRunsConcededPerTeamInTheYearOutputData = extraRunsConcededPerTeamInTheYear(matchesData, deliveriesData, 2016)
          fs.writeFileSync('../public/output/3-extra-runs-conceded-per-team-in-the-year.json', JSON.stringify(extraRunsConcededPerTeamInTheYearOutputData))
        } catch (err) {
          console.log(err);
        }
      })
  })
