module.exports = {
	name: ["kurso", "kursoj", "Kurso", "Kursoj"],
	execute(ctx) {
		ctx.telegram.sendMessage(
			ctx.chat.id,
			"Mi montras al vi liston de kursoj.",
			{
				reply_markup: {
					inline_keyboard: ctx.db.kursoj,
				},
			}
		);
	},
};
