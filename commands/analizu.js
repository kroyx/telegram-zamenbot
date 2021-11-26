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

		ctx.state.saluti = "saluton";

		const vorto = teksto.toString();

		const vortaro = `http://simplavortaro.org/api/v1/trovi/${vorto}`;
		const sercxado = await fetch(vortaro)
			.then((sercxo) => sercxo.json())
			.catch(() => "error");

		ctx.db.vortfarado = sercxado;
		ctx.db.vorto = vorto;

		const vortfaradoj = sercxado.vortfarado.map(
			(vortfarado) => vortfarado.rezulto
		);

		if (sercxado !== "error") {
			const butonoj = vortfaradoj.map((rezulto) => [
				{ text: rezulto, callback_data: `vortfarado_${rezulto}` },
			]);

			butonoj.push([
				{
					text: `Legu pli pri la vorto "${vorto}"`,
					url: `http://www.simplavortaro.org/ser%c5%89o?s=${vorto.toLowerCase()}`,
				},
			]);

			const respondo = `${vorto.toUpperCase()}:`;

			ctx.telegram.sendMessage(ctx.chat.id, respondo, {
				parse_mode: "Markdown",
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: butonoj,
				},
			});

		} else {
			const respondo = `La vorto ${vorto} ne estis trovita.`;
			ctx.reply(respondo);
		}
	},
};
