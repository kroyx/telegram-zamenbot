const fetch = require("node-fetch");

module.exports = {
	name: ["analizu", "Analizu"],
	async execute(ctx) {
		const teksto = ctx.message.text.split(" ");
		teksto.shift();

		if (teksto.length === 0) {
			ctx.reply("Aldonu vorton. Ekzemplo: /difinu kato");
			return -1;
		}

		if (teksto.length > 1) {
			ctx.reply("Ne enmetu pli ol unu vorton");
			ctx.reply(vortaro);
			return -1;
		}

		const vorto = teksto.toString();

		const vortaro = `http://simplavortaro.org/api/v1/trovi/${vorto}`;
		const sercxado = await fetch(vortaro)
			.then((sercxo) => sercxo.json())
			.then((vortfarado) => vortfarado.vortfarado[0])
			.then((vorto) => {
				const rezulto = vorto.rezulto;
				const partoj = vorto.partoj
					.filter((vorto) => vorto.vorto !== null)
					.map((vorto) => vorto.vorto);
				return {
					rezulto,
					partoj,
				};
			})
			.catch(() => "error");

		if (sercxado !== "error") {
			let vortfarado = sercxado.rezulto;
			let partoj = sercxado.partoj
				.map(
					(parto) =>
						`[${parto.toUpperCase()}](http://www.simplavortaro.org/ser%c5%89o?s=${vorto.toLowerCase()})`
				)
				.reduce((a, b) => `${a}\n${b}`);

			const respondo = `[${vorto.toUpperCase()}](http://www.simplavortaro.org/ser%c5%89o?s=${vorto.toLowerCase()}):\n${vortfarado}\n\n${partoj}\n\n[Legu pli pri la vorto](http://www.simplavortaro.org/ser%c5%89o?s=${vorto.toLowerCase()})`;

			ctx.reply(respondo, {
				parse_mode: "Markdown",
				disable_web_page_preview: true,
			});
		} else {
			const respondo = `La vorto ${vorto} ne estis trovita.`;
			ctx.reply(respondo);
		}
	},
};
