import { calculatePositions } from 'astronomy';

export default {
  getPlanetaryAlignments: function() {
    const date = new Date();
    const positions = calculatePositions(date);
    console.log(positions);
  }
};
