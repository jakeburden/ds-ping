// var example = [
//    {
// 	   url: 'digitalsurgeons.com',
// 	   status: 200
//    },
//    {
// 	   url: 'nugofiber.digitalsurgeons.com',
// 	   status: 200
//    },
//    {
// 	   url: 'skillsoft.com',
// 	   status: 200
//    }
// ];

function checkStatus() {
	console.log(this.responseText);
	var result = JSON.parse(this.responseText);

	result.every(function(res) {
	   if (res.value !== 200) {
		   soundTheAlarm();
		   return false;
	   }

	   return true;
	});
}

function soundTheAlarm() {
	console.log('Alarm!!');

	var audioContext = new AudioContext();

	var osc = audioContext.createOscillator();
	osc.type = 'sawtooth';
	osc.frequency.value = 440;
	osc.connect(audioContext.destination);
	osc.start(0);

	var gain = audioContext.createGain();
	gain.gain.value = 100;
	gain.connect(osc.frequency);

	var osc2 = audioContext.createOscillator();
	osc2.type = 'sawtooth';
	osc2.frequency.value = 1;
	osc2.connect(gain);
	osc2.start(0);
}

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', checkStatus);
xhr.open('GET', 'http://localhost:9090/logs/latest');
xhr.send();
