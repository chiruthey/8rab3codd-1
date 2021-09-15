const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const request = require('request');
const got = require("got");
const Config = require('../config');
const des = "You can PNG from any Emoji"
const iii = "```YOU MUST ENTER EMOJI!``` \n\n alpha"

if (Config.WORKTYPE == 'private') {

    Asena.addCommand({pattern: 'emoj ?(.*)', fromMe: true, desc: "converts emoji to png" } , (async (message, match) => {

        if (match[1] === '') return await message.sendMessage(iii);

        var webimage = await axios.get(`https://docs-jojo.herokuapp.com/api/emoji2png?emoji=${encodeURIComponent(match[1])}&type=apple`, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.png, caption: 'ᑕᖇEᗩTEᗪ ᗷY alpha'})

    }));
}
else if (Config.WORKTYPE == 'public') {

    Asena.addCommand({pattern: 'emoj ?(.*)', fromMe: false, desc: "converts emoji to png" }, (async (message, match) => {

        if (match[1] === '') return await message.sendMessage(iii);

        var webimage = await axios.get(`https://docs-jojo.herokuapp.com/api/emoji2png?emoji=${encodeURIComponent(match[1])}&type=apple`, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(webimage.data), MessageType.sticker);

    }));
}
