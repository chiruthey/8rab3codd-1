//sreezz-ai
const Asena = require('../events');
const { MessageType } = require('@adiwajshing/baileys');
const TinyURL = require('tinyurl');

let need = '*giv a movie name*';
let movie_desc = "*gives movie download link*\n\n eg =```Money heist```";

Asena.addCommand({ pattern: 'verse ?(.*)', fromMe: false, desc: movie_desc }, (async (message, match) => {
    if (match[1] ==="") return await message.sendMessage(need);
    let alpha = 'https://moviesverse.co/?s=' + match[1];
    TinyURL.shorten( alpha, async(res, err) => {
      //await message.client.sendMessage(message.jid, '*#### Error! ####*\n\n' + '```' + err + '```', MessageType.text);
      await message.client.sendMessage(message.jid,'```your movie link :' + res +'```', MessageType.text);
    });
 }));
