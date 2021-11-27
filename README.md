# ZamenRoboto - Telegram Bot

ZamenRoboto estas Telegrama Roboto, kiu helpas donante al vi difinojn de
vortoj, tradukojn, analizante vortoj, ktp.

## Instalado

1. Kreu roboton laŭ la [Documentado de telegramo](https://core.telegram.org/bots#3-how-do-i-create-a-bot).
2. Obtenu la API ĵetonon(token).
3. Klonu la deponejon. `https://github.com/kroyxlab/telegram-zamenbot.git`
4. Igu la dosieron `.env.ekzemplo` al `.env` kaj enmetu la API ĵetonon.
5. Instalu la projektan dependecojn. `npm intall` aŭ `yarn install`.
6. Lanĉu la servilon. `node index.js`.

## Komandoj

| Komando  | Priskribo                                               |
| :------- | :------------------------------------------------------ |
| /difinu  | Liveras difinon de vorto enmetita.                      |
| /traduku | Liveras tradukon de vorto enmetita.                     |
| /analizu | Liveras erojn de la vorto enemetita kaj siajn difinojn. |
| /kursoj  | Liveras ligilojn al esperantaj kursoj.                  |

## Farita per

- [Telegraf.js](https://github.com/telegraf/telegraf) - Telegrame robota framo
  por Node.js.
- [Simpla vortaro API](http://www.simplavortaro.org/informo/api) - La Simpla
  Vortaro estas interfaco por la difinoj de ReVo. Ĝi inkluzivas kelkajn helpilojn
  kaj simplan strukturon.

## Kontribuoj

Tirpetoj estas bonvenaj. Por grandaj ŝanĝoj, bonvolu malfermu eldonon unue por
diskuti kion vi volas ŝanĝi.

## License

[MIT](https://choosealicense.com/licenses/mit/)
