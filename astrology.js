import ephemeris from 'ephemeris';

export default {
  getPlanetaryAlignments: function() {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // Months are zero-based in JS
    const day = date.getUTCDate();
    const positions = ephemeris.getAllPlanets(year, month, day);
    console.log(positions);
  }
};
