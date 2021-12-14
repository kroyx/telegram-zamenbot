module.exports = {
	name: "analizaMenuo",
	execute(ctx) {
		if (ctx.session === undefined) {
			ctx.reply("Enmetu la komandon denove");
			return;
		}
		const vorto = ctx.session.vorto;
		const titolo = vorto.toUpperCase();
		const partoj = ctx.session.vortfarado;
		const vortfaradoj = partoj.vortfarado.map(
			(vortfarado) => vortfarado.rezulto
		);
		const butonoj = vortfaradoj.map((rezulto) => [
			{ text: rezulto, callback_data: `vortfarado_${rezulto}` },
		]);
		butonoj.push([
			{
				text: `Legu pli pri la vorto "${vorto}"`,
				url: `http://www.simplavortaro.org/ser%c5%89o?s=${vorto.toLowerCase()}`,
			},
		]);
		ctx.deleteMessage();
		ctx.telegram.sendMessage(ctx.chat.id, `${titolo}:`, {
			reply_markup: {
				inline_keyboard: butonoj,
			},
		});
	},
};
