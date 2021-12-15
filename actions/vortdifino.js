const { difinu } = require("../utils/simplaVortaro");

module.exports = {
	name: /parto_/,
	async execute(ctx) {
		if (ctx.session === undefined) {
			ctx.reply("Enmetu la komandon denove");
			return -1;
		}

		const vorto = ctx.match.input.split("_")[1];
		const sercxado = await difinu(vorto);
		const respondo = `${vorto.toUpperCase()}:\n\n${sercxado})`;

		ctx.deleteMessage();

		ctx.telegram.sendMessage(ctx.chat.id, respondo, {
			parse_mode: "Markdown",
			disable_web_page_preview: true,
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: "Reen",
							callback_data: `vortfarado_${ctx.session.vortfaradaRezulto}`,
						},
					],
				],
			},
		});
	},
};
