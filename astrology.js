import ephemeris from "ephemeris";

const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

function getSign(longitude) {
    let index = Math.floor((longitude - 1) / 30)
    while (index < 0) {
        index = 12 + index
    }
    return signs[index];
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
export function formatDateDayMonth(date) {
    if (!(date instanceof Date)) {
        throw new Error('Input must be a Date object');
    }

    // Get day and month from the Date object
    const day = date.getDate(); // Day of the month
    const month = date.getMonth() + 1; // Month is 0-indexed, so add 1

    // Format month and day (optional: leading zero for single digit values)
    const formattedDay = day < 10 ? '0' + day : day.toString();
    const formattedMonth = month < 10 ? '0' + month : month.toString();

    // Return the formatted date string in MM/DD format
    return `${formattedMonth}/${formattedDay}`;
}

export function getPlanetInSign(planet, dateObj) {
    const allPlanets = ephemeris.getAllPlanets(dateObj);
    const planetPosition = allPlanets.observed[planet];
    console.log('planetPosition', planetPosition);
    const sign = getSign(planetPosition.apparentLongitudeDd);
    console.log(`${planet} is in ${sign}`);
}

export function createDateIdFromDate(date) {
    if (!(date instanceof Date)) {
        throw new Error('Input must be a Date object');
    }

    // Get year, month, and day from the Date object
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is 0-indexed, so add 1
    const day = date.getDate();

    // Ensure month and day are two digits
    const monthFormatted = month < 10 ? '0' + month : month.toString();
    const dayFormatted = day < 10 ? '0' + day : day.toString();

    // Concatenate to form YYYYMMDD format
    return `${year}${monthFormatted}${dayFormatted}`;
}

export function createDateFromId(dateId) {
    // Ensure the input is a string
    if (typeof dateId !== 'string') {
        throw new Error('Date ID must be a string');
    }

    // Check if the input has the correct length (8 characters)
    if (dateId.length !== 8) {
        throw new Error('Date ID must be in the format YYYYMMDD');
    }

    // Extract year, month, and day from the string
    const year = parseInt(dateId.substring(0, 4), 10);
    const month = parseInt(dateId.substring(4, 6), 10) - 1; // Month is 0-indexed in JavaScript Date
    const day = parseInt(dateId.substring(6, 8), 10);

    // Create and return the new Date object
    return new Date(year, month, day);
}

export function getBirthChart(dateObj, doPrint=false) {
    const allPlanets = ephemeris.getAllPlanets(dateObj);
    let alignments = []
    for (let planet in allPlanets.observed) {
        const planetPosition = allPlanets.observed[planet];
        if (doPrint) {
            // console.log('allplanets.observed: ',allPlanets.observed)
        }        
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
                const problematicChart = getBirthChart(createDateFromId(dateId), true)
                console.log('problematic chart: ',problematicChart)
                // process.exit()
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

