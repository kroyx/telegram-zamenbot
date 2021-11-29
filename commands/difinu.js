const fetch = require("node-fetch");

module.exports = {
	name: "difinu",
	description: "Mi donos al vi la difinon de la vorto.",
	async execute(ctx) {
		// Obtenu la vorton enmetita
		const teksto = ctx.message.text.split(" ");
		teksto.shift();

		if (teksto.length === 0) {
			ctx.reply("Aldonu vorton. Ekzemplo: `/difinu kato`", {
				parse_mode: "markdown",
			});
			return -1;
		}

		if (teksto.length > 1) {
			ctx.reply("Ne enmetu pli ol unu vorton. Ekzemplo: `/difinu hundo`", {
				parse_mode: "markdown",
			});
			return -1;
		}

		const vorto = teksto.toString();

		const vortaro = `http://www.simplavortaro.org/api/v1/vorto/${vorto.toLowerCase()}`;
		const sercxado = await fetch(vortaro)
			.then((sercxo) => sercxo.json())
			.then((sercxoJson) => sercxoJson.difinoj.map((vorto) => vorto.difino))
			.then((difinoj) => difinoj.filter((difino) => difino !== null))
			.then((respondo) => respondo.reduce((a, b) => `${a}\n\n${b}`))
			.catch(() => "error");

		if (sercxado === "error") {
			const respondo = `La vorto ${vorto} ne estis trovita.`;
			ctx.reply(respondo);
			return -1;
		}

		const respondo = `${vorto.toUpperCase()}:\n\n${sercxado}`;
		ctx.telegram.sendMessage(ctx.chat.id, respondo, {
			parse_mode: "Markdown",
			disable_web_page_preview: true,
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: "Legu pli pri la vorto",
							url: `http://www.simplavortaro.org/ser%c4%89o?s=${vorto.toLowerCase()}`,
						},
					],
				],
			},
		});
	},
};
