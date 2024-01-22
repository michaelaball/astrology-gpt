import fs from 'fs';
import chatgpt from './chatgpt.js';
import astrology from './astrology.js';

// astrology.getPlanetaryAlignments();

// astrology.getPlanetInSign('venus', new Date('1989-10-06T17:09:01.000+08:00'));

const birthChart = astrology.getBirthChart(new Date('1989-10-06T17:09:01.000+08:00'));
// console.log('birthChart: ',birthChart);
const prompt = fs.readFileSync('forecast-prompt.txt', 'utf8').replace('\n', ' ') + `\n${birthChart}`;

//You are to be a leader.  You are to be a prophet.  You are to be a visionary.  You are to be a sage.  You are to be a seer.  You are to be a soothsayer.  You are to be a diviner.  You are to be a forecaster.  You are to be a prognosticator.`
//  You are to be a fortune teller.  You are to be a clairvoyant.  You are to be a psychic.  You are to be a medium.  You are to be a palm reader.  You are to be a tarot reader.  You are to be a numerologist.  You are to be a graphologist.  You are to be a phrenologist.  You are to be a chiromancer.  You are to be a geomancer.  You are to be a bibliomancer.  You are to be a cartomancer.  You are to be a dowsing practitioner.  You are to be a dream interpreter.  You are to be a crystal gazer.  You are to be a scryer.  You are to be a tea leaf reader.  You are to be a tasseographer.  You are to be a rumpologist.  You are to be a oneiromancer.  You are to be a necromancer.  You are to be a pyromancer.  You are to be a hydromancer.  You are to be a aeromancer.  You are to be a ceromancer.  You are to be a capnomancer.  You are to be a ceraunomancer.  You are to be a gastromancer.  You are to be a haruspex.  You are to be a haruspication practitioner.  You are to be a hepatomancer.  You are to be a lecanomancer.  You are to be a lithomancer.  You are to be a margaritomancer.  You are to be a myomancer.  You are to be a necyomancer.  You are to be a omphalomancer.  You are to be a onychomancer.  You are to be a oomancer.  You are`;
console.log('prompt: ',prompt);
chatgpt.chatGptInterpret(prompt).then(response => console.log(response));
