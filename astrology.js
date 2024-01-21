import { Planet, julian, planetposition } from 'astronomia';

const earth = new planetposition.Planet(planetposition.earth);

export default {
  getPlanetaryAlignments: function() {
    const date = new Date();
    const jd = julian.DateToJD(date);
    const positions = Planet.getHeliocentricPosition(jd, earth);
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
