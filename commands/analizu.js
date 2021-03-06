const { analizu } = require("../utils/simplaVortaro");

module.exports = {
	name: "analizu",
	description: "Mi donos al vi la vorton dividitan en siaj partoj",
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

		const sercxado = await analizu(vorto);

		ctx.session ??= {
			vortfarado: sercxado,
			vorto: vorto,
			vortfaradaRezulto: "",
		};

		const vortfaradoj = sercxado.vortfarado.map(
			(vortfarado) => vortfarado.rezulto
		);

		if (sercxado === "error") {
			const respondo = `La vorto ${vorto} ne estis trovita.`;
			ctx.reply(respondo);
			return -1;
		}

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

		ctx.deleteMessage();

		ctx.telegram.sendMessage(ctx.chat.id, respondo, {
			parse_mode: "Markdown",
			disable_web_page_preview: true,
			reply_markup: {
				inline_keyboard: butonoj,
			},
		});
	},
};
