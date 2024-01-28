import ephemeris from "ephemeris";

const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

function getSign(longitude) {
    return signs[Math.floor((longitude - 1) / 30)];
}

export default {
    getPlanetaryAlignments: ()=> {
    const dateObj = new Date('1989-10-06T17:09:01.000+08:00');
 
    // parameters: ephemeris.getAllPlanets(dateObj, longitude, latitude, height);
    var result = ephemeris.getAllPlanets(dateObj, 10.0014, 53.5653, 0);
    console.log(result)
    },

    getHouses: (dateObj, longitude, latitude) => {
        const houses = ephemeris.getHouses(dateObj, longitude, latitude);
        console.log(houses);
    },

    getPlanetInSign: (planet, dateObj) => {
        const allPlanets = ephemeris.getAllPlanets(dateObj);
        const planetPosition = allPlanets.observed[planet];
        console.log('planetPosition', planetPosition);
        const sign = getSign(planetPosition.apparentLongitudeDd);
        console.log(`${planet} is in ${sign}`);
    },

    getBirthChart: (dateObj) => {
        const allPlanets = ephemeris.getAllPlanets(dateObj);
        let alignments = []
        for (let planet in allPlanets.observed) {
            const planetPosition = allPlanets.observed[planet];
            const sign = getSign(planetPosition.apparentLongitudeDd);
            alignments.push(`${planet} is in ${sign}`)
        }
        return alignments.join('\n')
    },

    getYearlyAlignments: () => {
        let alignments = {};
        let dateObj = new Date();
        for (let i = 0; i < 365; i++) {
            let dateStr = dateObj.toISOString().split('T')[0].replace(/-/g, '');
            alignments[dateStr] = getBirthChart(dateObj);
            dateObj.setDate(dateObj.getDate() + 1);
        }
        return alignments;
    }
}
 
