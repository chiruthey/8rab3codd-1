const Asena = require('../events');
const Config = require('../config');
const {MessageType} = require('@adiwajshing/baileys');
const axios = require('axios');

const Language = require('../language');
const Lang = Language.getString('_asena');
const fs = require("fs")
let wk = Config.WORKTYPE === 'private' ? true:false

    Asena.addCommand({pattern: 'alpha ?(.*)', fromMe: wk, dontAddCommandList: true}, (async (message, match) => {

        if (message.jid === '393475528094-1415817281@g.us') {

            return;
        }

        var CMD_HELP = '';
        if (match[1] === '') {
            Asena.commands.map(
                async (command) =>  {
                    if (command.dontAddCommandList || command.pattern === undefined) return;
                    try {
                        var match = command.pattern.toString().match(/(\W*)([A-Za-zğüşiöç1234567890]*)/);
                    } catch {
                        var match = [command.pattern];
                    }
    
                    var HANDLER = '';
    
                    if (/\[(\W*)\]/.test(Config.HANDLERS)) {
                        HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
                    } else {
                        HANDLER = '.';
                    }
                    CMD_HELP += '```➢ ' + Lang.COMMAND + '     :``` ```' + (match.length >= 3 ? (HANDLER + match[2]) : command.pattern) + (command.desc === '' ? '```\n\n' : '```\n');
                    if (command.desc !== '') CMD_HELP += '```➣ ' + Lang.DESC + ':``` ```' + command.desc + (command.warn === '' ? '```\n\n' : '```\n');
                    if (command.usage !== '') CMD_HELP += '```➫ ' + Lang.EXAMPLE + ':``` ```' + command.usage + '```\n\n';
                    if (command.warn !== '') CMD_HELP += '```»' + Lang.WARN + ':``` ```' + command.warn + '```\n\n';

                }
            );
            let pp
            try { pp = await message.client.getProfilePicture(message.jid.includes('-') ? message.data.participant : message.jid ); } catch { pp = await message.client.getProfilePicture(); }
            await axios.get(pp, {responseType: 'arraybuffer'}).then(async (res) => { await message.client.sendMessage(message.jid, res.data, MessageType.image, { caption: '●════' + Config.MENUTEXT + '════●\n\n' + CMD_HELP }); });  
        } else {

            if (message.jid === '393475528094-1415817281@g.us') {

                return;
            }
            var CMD_HELP = '';
            Asena.commands.map(
                async (command) =>  {
                    if (command.dontAddCommandList || command.pattern === undefined) return;
                    try {
                        var cmatch = command.pattern.toString().match(/(\W*)([A-Za-zğüşiöç1234567890]*)/);
                    } catch {
                        var cmatch = [command.pattern];
                    }
                
                    if (cmatch[2] == match[1]) {
                        var HANDLER = '';
    
                        if (/\[(\W*)\]/.test(Config.HANDLERS)) {
                            HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
                        } else {
                            HANDLER = '.';
                        }
                        CMD_HELP += '*⚙️ ' + Lang.COMMAND + ':* ```' + (cmatch.length >= 3 ? (HANDLER + cmatch[2]) : command.pattern) + (command.desc === '' ? '```\n\n' : '```\n');
                        if (command.desc !== '') CMD_HELP += '*📝 ' + Lang.DESC + ':* ```' + command.desc + (command.warn === '' ? '```\n\n' : '```\n');
                        if (command.usage !== '') CMD_HELP += '*⌨️ ' + Lang.EXAMPLE + ':* ```' + command.usage + '```\n\n';
                        if (command.warn !== '') CMD_HELP += '*⚠️ ' + Lang.WARN + ':* ```' + command.warn + '```\n\n';

                    }
                }
            );
            if (CMD_HELP === '') CMD_HELP += Lang.NOT_FOUND;
            await message.client.sendMessage(
                message.jid,'●Whatsasena Public● \n\n' + CMD_HELP, MessageType.text,{quoted: message.data}
            );
      }
    }));
/*
Asena.addCommand({pattern: 'owner', fromMe: wk, desc: 'get Devoloper contact number', dontAddCommandList: true}, (async (message, match) => {

            const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n' 
            + 'FN:Alpha sir\n'
            + 'TEL;type=CELL;type=VOICE;waid=' + '918921936055 + ':' + '918921936055' + ' \n'
            + 'END:VCARD'
await message.client.sendMessage(message.jid, {displayname: 'Alpha sir' , vcard: vcard}, MessageType.contact);

  }));

*/
