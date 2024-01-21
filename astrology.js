import ephemeris from 'ephemeris';

export default {
  getPlanetaryAlignments: function() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based in JS
    const day = date.getDate();
    const positions = ephemeris.getAllPlanets(year, month, day);
    console.log(positions);
  }
};

export default {
  getPlanetaryAlignments: function() {
    const date = new Date();
    const positions = calculatePositions(date);
    console.log(positions);
  }
};
