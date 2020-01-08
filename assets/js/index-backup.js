/*
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
//xCenter, yCenter, radius, startAngle, endAngle
ctx.stroke();
*/

document.addEventListener('DOMContentLoaded', function() {
	INIT = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate(),
		0,
		0,
		0,
		0
	);
	END = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate(),
		23,
		59,
		59,
		999
	);
	TOTAL = END.getTime() - INIT.getTime();

	canvas = new Canvas();
	counter = document.querySelector('div.panel div.counter p');
	percent = document.querySelector('div.panel div.progress div.percent p');
	run();
});

function run() {
	D = new Date();
	ACTUAL_PERCENT = D.getTime() - INIT.getTime();
	counter.innerText = D.toLocaleTimeString();

	update();
	draw();

	setInterval(run, 1000);
}

function update() {
	percent.innerText = Utils.toPercent(ACTUAL_PERCENT, TOTAL).toFixed(2) + '%';
}

function draw() {
	canvas.clear();
	canvas.drawArc(
		canvas.centerHorizontal,
		canvas.centerVertical,
		canvas.radius,
		0,
		Utils.percentes2degrees(Utils.toPercent(ACTUAL_PERCENT, TOTAL))
	);
}

const Utils = {
	seconds2degrees(second) {
		return second * (360 / 60);
	},
	percentes2degrees(percent) {
		return percent * (360 / 100);
	},
	toPercent(value, max) {
		return (value / max) * 100;
	}
};

class Canvas {
	constructor() {
		let canvas = document.querySelector('canvas');
		this.ctx = canvas.getContext('2d');
		this.height = canvas.height;
		this.width = canvas.width;
		this.centerHorizontal = this.width / 2;
		this.centerVertical = this.height / 2;
		this.radius = 150;
	}
	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}
	progressColor() {
		let gradient = this.ctx.createLinearGradient(0, 0, 170, 90);
		gradient.addColorStop('0', '#08AEEA');
		gradient.addColorStop('1.0', '#2AF598');
		return gradient;
	}
	drawArc(xCenter, yCenter, radius, startAngle, endAngle) {
		this.ctx.strokeStyle = this.progressColor();
		this.ctx.lineWidth = 30;
		this.ctx.beginPath();
		this.ctx.arc(
			xCenter,
			yCenter,
			radius,
			(Math.PI / 180) * startAngle,
			(Math.PI / 180) * endAngle
		);
		this.ctx.stroke();
	}
}
