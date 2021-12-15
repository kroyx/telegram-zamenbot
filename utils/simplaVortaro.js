const fetch = require("node-fetch");

exports.difinu = async (vorto) => {
	const ligilo = `http://www.simplavortaro.org/api/v1/vorto/${vorto.toLowerCase()}`;
	const sercxado = await fetch(ligilo)
		.then((sercxado) => sercxado.json())
		.then(({ difinoj }) => difinoj.map(({ difino }) => difino))
		.then((vortdifinoj) =>
			vortdifinoj.filter((vortdifino) => vortdifino !== null)
		)
		.then((respondo) => respondo.reduce((a, b) => `${a}\n\n${b}`))
		.catch(() => "error");

	return sercxado;
};

exports.traduku = async (vorto) => {
	const ligilo = `http://www.simplavortaro.org/api/v1/vorto/${vorto}`;
	const sercxado = await fetch(ligilo)
		.then((sercxado) => sercxado.json())
		.then(({ difinoj }) =>
			difinoj.map(({ tradukoj }) =>
				tradukoj.map(({ lingvo, traduko }) => ({
					lingvo,
					traduko,
				}))
			)
		)
		.catch(() => "error");

	return sercxado;
};

exports.analizu = async (vorto) => {
	const ligilo = `http://simplavortaro.org/api/v1/trovi/${vorto}`;
	const sercxado = await fetch(ligilo)
		.then((sercxado) => sercxado.json())
		.catch(() => "error");

	return sercxado;
};
