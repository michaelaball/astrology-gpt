import ephemeris from "ephemeris";

const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

function getSign(longitude) {
    return signs[Math.floor((longitude - 1) / 30)];
}

getYearlyAlignments: () => {
    const alignments = {};
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    for (let month = 0; month < 12; month++) {
        for (let day = 1; day <= 31; day++) {
            const date = new Date(currentYear, month, day);
            if (date.getMonth() === month) {
                const dateStamp = `${currentYear}${String(month + 1).padStart(2, '0')}${String(day).padStart(2, '0')}`;
                alignments[dateStamp] = getBirthChart(date);
            }
        }
    }

    return alignments;
},

export default {
    getPlanetaryAlignments: ()=> {
    getYearlyAlignments,
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
    }
}
 
