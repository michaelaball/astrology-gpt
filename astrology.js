import ephemeris from "ephemeris";

export default {
    getPlanetaryAlignments: ()=> {
    const dateObj = new Date('2015-08-10T17:09:01.000+08:00');
 
    // parameters: ephemeris.getAllPlanets(dateObj, longitude, latitude, height);
    var result = ephemeris.getAllPlanets(dateObj, 10.0014, 53.5653, 0);
    console.log(result)
    }
}
 