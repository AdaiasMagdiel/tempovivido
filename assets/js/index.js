var time;

document.addEventListener('DOMContentLoaded', function() {
	geral = document.querySelector('div.panel div.infos div.geral p:nth-child(1)');
	anos = document.querySelector('div.panel div.infos div.anos p:nth-child(1)');
	meses = document.querySelector('div.panel div.infos div.meses p:nth-child(1)');
	dias = document.querySelector('div.panel div.infos div.dias p:nth-child(1)');
	horas = document.querySelector('div.panel div.infos div.horas p:nth-child(1)');
	minutos = document.querySelector('div.panel div.infos div.minutos p:nth-child(1)');
	segundos = document.querySelector('div.panel div.infos div.segundos p:nth-child(1)');

	document.querySelector('div.panel div.input-field input').addEventListener('keydown', e => {
		let value = e.currentTarget.value;
		if (e.keyCode === 13) {
			if (value.length === 10) {
				value += '-0.0.0';
			}
			dataSerialize(value);
			console.log(value);
		}

		if (value.length === 2 && e.keyCode !== 8) {
			e.currentTarget.value += '/';
		}
		if (value.length === 5 && e.keyCode !== 8) {
			e.currentTarget.value += '/';
		}
	});

	function dataSerialize(value) {
		const [data, horario] = value.split('-');
		time = new Time({
			ano: data.split('/')[2],
			mes: +data.split('/')[1] - 1,
			dia: data.split('/')[0],
			hora: horario.split('.')[0],
			minuto: horario.split('.')[1],
			segundo: horario.split('.')[2]
		});
		update();
		_geral();
		notUpdate();
	}
});

function update() {
	tempo = time.now() - time.INIT.getTime();

	segundos.innerText = Math.floor(tempo / 1000);

	setInterval(update, 1000);
}

function notUpdate() {
	anos.innerText = Math.floor(tempo / 1000 / 60 / 60 / 24 / 31 / 12);
	meses.innerText = Math.floor(tempo / 1000 / 60 / 60 / 24 / 31);
	dias.innerText = Math.floor(tempo / 1000 / 60 / 60 / 24);
	horas.innerText = Math.floor(tempo / 1000 / 60 / 60);
	minutos.innerText = Math.floor(tempo / 1000 / 60);

	_geral();
	setInterval(notUpdate, 60000);
}

function _geral() {
	_anos = tempo / 1000 / 60 / 60 / 24 / 31 / 12;
}

class Time {
	constructor({ ano, mes, dia, hora, minuto, segundo }) {
		this.INIT = new Date(ano, mes, dia, hora, minuto, segundo, 0);
	}
	now() {
		return Date.now();
	}
}
