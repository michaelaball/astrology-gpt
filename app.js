import chatgpt from './chatgpt.js';
import astrology from './astrology.js';

// astrology.getPlanetaryAlignments();

// astrology.getPlanetInSign('venus', new Date('1989-10-06T17:09:01.000+08:00'));

const birthChart = astrology.getBirthChart(new Date('1989-10-06T17:09:01.000+08:00'));
chatgpt.chatGptInterpret(birthChart).then(response => console.log(response));
