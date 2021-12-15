const { difinu } = require("../utils/simplaVortaro");

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

		const sercxado = await difinu(vorto);

		if (sercxado === "error") {
			const respondo = `La vorto ${vorto} ne estis trovita.`;
			ctx.reply(respondo);
			return -1;
		}

		const respondo = `${vorto.toUpperCase()}:\n\n${sercxado}`;

		ctx.deleteMessage();

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
