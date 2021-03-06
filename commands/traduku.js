const { traduku } = require("../utils/simplaVortaro");

module.exports = {
	name: "traduku",
	description: "Mi donos al vi tradukojn de la vorto.",
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

		const sercxado = await traduku(vorto);

		if (sercxado === "error") {
			const respondo = `La vorto ${vorto} ne estis trovita.`;
			ctx.reply(respondo);
			return -1;
		}

		const tradukoj = sercxado[0]
			.map((traduko) => `${traduko.lingvo}: ${traduko.traduko}.`)
			.sort()
			.reduce((a, b) => `${a}\n${b}`);

		const respondo = `${vorto.toUpperCase()}:\n\n\`\`\`\n${tradukoj}\`\`\``;

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
