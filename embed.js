const { MessageEmbed } = require('discord.js');

const helpEmbed = new MessageEmbed()
.setColor("#5CD4D8")
.setTitle("Calc 101")
.setDescription("Calc is a Discord bot designed to perform simple arithmetic")

module.exports.helpEmbed = helpEmbed;