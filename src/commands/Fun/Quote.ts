import { MessageType, Mimetype,buttonsMessage } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'quote',
            description: 'random quote.',
            aliases: ['q'],
            category: 'fun',
            usage: `${client.config.prefix}quote`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
    MessageType.buttonsMessage  = (type === 'conversation') ? M.ISimplifiedMessage.conversation : (type === 'buttonsMessage') ? M.ISimplifiedMessage.extendedTextMessage.text : ''
  
        await axios
            .get(`https://api.quotable.io/random`)
            .then((response) => {
                // console.log(response);
                const text = `📝 *Content:* ${response.data.content}\n\n*✍️ Author:* ${response.data.author}`
                const buttonsk = [
    {buttonId: '${this.client.config.prefix}why', buttonText: {displayText: ':next'}, type: 1}]
                const buttonMessagek = {
      contentText: text,
      footerText: 'Ichigo-botto',
      buttons: buttonsk,
      headerType:1
                }
                return void this.client.sendMessage(M.from,text,buttonsk,MessageType.buttonsMessage,{quoted:M.WAMessage})
            })
            .catch((err) => {
                M.reply(`🔍 Error: ${err}`)
            })
    }
}
