import ephemeris from "ephemeris";

const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

function getSign(longitude) {
    return signs[Math.floor((longitude - 1) / 30)];
}

export function getPlanetaryAlignments() {
    const dateObj = new Date('1989-10-06T17:09:01.000+08:00');

    // parameters: ephemeris.getAllPlanets(dateObj, longitude, latitude, height);
    var result = ephemeris.getAllPlanets(dateObj, 10.0014, 53.5653, 0);
    console.log(result)
}

export function getHouses(dateObj, longitude, latitude) {
    const houses = ephemeris.getHouses(dateObj, longitude, latitude);
    console.log(houses);
}

export function getPlanetInSign(planet, dateObj) {
    const allPlanets = ephemeris.getAllPlanets(dateObj);
    const planetPosition = allPlanets.observed[planet];
    console.log('planetPosition', planetPosition);
    const sign = getSign(planetPosition.apparentLongitudeDd);
    console.log(`${planet} is in ${sign}`);
}

export function getBirthChart(dateObj) {
    const allPlanets = ephemeris.getAllPlanets(dateObj);
    let alignments = []
    for (let planet in allPlanets.observed) {
        const planetPosition = allPlanets.observed[planet];
        const sign = getSign(planetPosition.apparentLongitudeDd);
        alignments.push([planet, sign])
    }
    return Object.fromEntries(alignments)
}

export function getYearlyAlignments() {
    let alignments = [];
    let dateObj = new Date();
    for (let i = 0; i < 365; i++) {
        let dateStr = dateObj.toISOString().split('T')[0].replace(/-/g, '');
        alignments.push([dateStr, getBirthChart(dateObj)])
        dateObj.setDate(dateObj.getDate() + 1);
    }
    return alignments;
}

export function getYearlyAlignmentAdvanced() {
    const basic = getYearlyAlignments()
    const advanced = basic.map(([dateId, alignment], index) => {
        let advancedAlignment = {};
        for (let planet in alignment) {
            let currentSign = alignment[planet];
            if (!currentSign) {
                console.log('current sign is null')
                console.log('basic ', index, basic[index])
                console.log({ dateId, alignment, planet })
                process.exit()
            }
            let nextChange = basic.slice(index).find(([nextDateId, nextAlignment]) => nextAlignment[planet] !== currentSign);
            if (nextChange) {
                advancedAlignment[planet] = {
                    current: currentSign,
                    until: nextChange[0],
                    next: nextChange[1][planet]
                };
            } else {
                advancedAlignment[planet] = {
                    current: currentSign,
                    until: null,
                    next: null
                };
            }
        }
        return [dateId, advancedAlignment];
    });
    return Object.fromEntries(advanced);
}

