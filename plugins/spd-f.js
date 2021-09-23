let Alpha = require('../events');
let {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
let fs = require('fs');
let axios = require('axios');
let request = require('request');
let got = require("got");
let Config = require('../config');
let wk = Config.WORKTYPE === 'public' ? false:true

let descri = "converts site to pdf"

Alpha.addCommand({pattern: 'spdf ?(.*)', fromMe: wk, desc:descri }, (async (message, match) => {

    const link = match[1]
    
    if (!link) return await message.client.sendMessage(message.jid, '```Give me a link```',MessageType.text)

    var webimage = await axios.get(`https://api.html2pdf.app/v1/generate?url=${match[1]}&apiKey=CuW551mR9ZedARcBDM2DDLzY4tYEHL2IhVW7AnkdM1vq9gNq0CZRXjXnvMYDqQua`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(webimage.data), MessageType.document, {mimetype: Mimetype.pdf, filename: 'Alpha.pdf'})

    }));  
