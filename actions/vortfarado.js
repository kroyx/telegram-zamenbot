module.exports = {
	name: /vortfarado_/,
	execute(ctx) {
		if (ctx.session === undefined) {
			ctx.reply("Enmetu la komandon denove");
			return -1;
		}

		const rezulto = ctx.match.input.split("_")[1];
		ctx.session.vortfaradaRezulto = rezulto;

		if (
			ctx.session.vortfarado.vortfarado === undefined ||
			ctx.session.vortfarado.vortfarado[0].partoj === undefined
		) {
			ctx.deleteMessage();
			return -1;
		}

		const vortfarado = ctx.session.vortfarado.vortfarado.filter(
			(vortfarado) => vortfarado.rezulto === rezulto
		);

		const partoj = vortfarado[0].partoj
			.filter((parto) => parto.vorto !== null)
			.map((parto) => parto.vorto);

		const titolo = `${rezulto.toUpperCase()}:`;

		const butonoj = partoj.map((vorto) => [
			{ text: vorto, callback_data: `parto_${vorto}` },
		]);

		butonoj.push([{ text: "Reen", callback_data: "analizaMenuo" }]);

		ctx.deleteMessage();

		ctx.telegram.sendMessage(ctx.chat.id, titolo, {
			reply_markup: {
				inline_keyboard: butonoj,
			},
		});
	},
};
