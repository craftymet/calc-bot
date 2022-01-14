// import the required modules/files
const DiscordJS = require('discord.js');
const dotenv = require('dotenv').config();
const { intents } = DiscordJS;
const { MessageEmbed } = require('discord.js');

// create a new bot instance & declare intents
const bot = new DiscordJS.Client({
    intents: [
        DiscordJS.Intents.FLAGS.GUILDS,
        DiscordJS.Intents.FLAGS.GUILD_MESSAGES
    ]
})


// run when client is ready
bot.on("ready", async () => {
    // log the bot's username & tag to the console
    console.log(`logged in as ${bot.user.tag}`);

    // set the bot's activity to be displayed as /help
    bot.user.setActivity("/help", { type: "PLAYING" });

    // set the guild to a falsey value to enable global commands
    const guild = false;
    
    // reset commands to prevent unexpected duplicates
    bot.application.commands.set([]);
    
    // where fetched commands will be saved to
    let commands;

    // fetch required commands based on value of guild 
    if (guild) {
        commands = guild.commands;
    } else {
        commands = bot.application?.commands;
    }

    // construct addition slash command
    commands?.create({
        name: "add",
        description: "adds two numbers",
        options: [{
            name: "num1",
            description: "first number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "num2",
            description: "second number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }]
    })
    // construct subtraction slash command
    commands?.create({
        name: "subtract",
        description: "subtracts two numbers",
        options: [{
            name: "num1",
            description: "first number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "num2",
            description: "second number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER 
        }]
    })
    // construct multipulcation slash command
    commands?.create({
        name: "multiply",
        description: "multiplies two numbers",
        options: [{
            name: "num1",
            description: "first number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "num2",
            description: "second number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }]
    })
    // construct division slash command
    commands?.create({
        name: "divide",
        description: "divides two numbers",
        options: [{
            name: "num1",
            description: "first number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "num2",
            description: "second number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }]
    })
    // construct % of slash command
    commands?.create({
        name: "percentage_of",
        description: "calculates percentage of",
        options: [{
            name: "percent",
            description: "percent, write without including the % symbol",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "num1",
            description: "the number you're calculating the percentage of",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }]
    })
    // construct help slash command
    commands?.create({
        name: "help",
        description: "describes how to interact with Calc",
    })
    // construct square root slash command
    commands?.create({
        name: "square_root",
        description: "finds the square root of a number",
        options: [{
            name: "num1",
            description: "the number you're calculating the square root of",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "round_to_nearest_int",
            description: "determines whether the answer is rounded to the nearest integer, select either true or false",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.BOOLEAN
        }]
    })
    // construct powers slash command
    commands?.create({
        name: "power",
        description: "calculates the base raised to the exponent",
        options: [{
            name: "base",
            description: "the base number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "exponent",
            description: "the exponent",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }]
    })
    // construct percentage change slash command
    commands?.create({
        name: "percent_change",
        description: "calculates the percent change",
        options: [{
            name: "old_value",
            description: "the original value of a number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "new_value",
            description: "the updated value of the old value",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }]
    })
})


// implement slash commands
bot.on("interactionCreate", async interaction => {
    // return if interaction is not a command
    if (!interaction.isCommand) {
        return;
    }
    const { commandName, options } = interaction;

    // define logic for slash command with switch statement
    switch (commandName) {
        case "add": {
            const num1 = await options.getNumber("num1") || 0
            const num2 = await options.getNumber("num2") || 0

            // create embed
            const addEmbed = new MessageEmbed()
            .setColor("#5CD4D8")
            .setTitle(`(${num1}) + (${num2}) = *(${num1 + num2})*`)
            .setTimestamp()
            .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})

            // reply to the slash command with the embed
            await interaction.reply({
                embeds: [addEmbed]
            })
            break;
        }
        case "subtract": {   
            const num1 = await options.getNumber("num1") || 0
            const num2 = await options.getNumber("num2") || 0
                
            const subtractEmbed = new MessageEmbed()
            .setColor("#5CD4D8")
            .setTitle(`(${num1}) - (${num2}) = *(${num1 - num2})*`)
            .setTimestamp()
            .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})
        
            await interaction.reply({
                embeds: [subtractEmbed]
            })
            break;
        }
        case "multiply": { 
            const num1 = await options.getNumber("num1") || 0
            const num2 = await options.getNumber("num2") || 0
        
            const multiplyEmbed = new MessageEmbed()
            .setColor("#5CD4D8")
            .setTitle(`(${num1}) x (${num2}) = *(${num1 * num2})*`)
            .setTimestamp()
            .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})

            await interaction.reply({
                embeds: [multiplyEmbed]
            })
            break;
        }
        case "divide": {
            const num1 = await options.getNumber("num1") || 0
            const num2 = await options.getNumber("num2") || 0
        
            const devideEmbed = new MessageEmbed()
            .setColor("#5CD4D8")
            .setTitle(`(${num1}) / (${num2}) = *(${num1 / num2})*`)
            .setTimestamp()
            .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})

            await interaction.reply({
                embeds: [devideEmbed]
            })
            break;
        }
        case "percentage_of": {
            const percent = await options.getNumber("percent") || 0
            const num1 = await options.getNumber("num1") || 0
            // percentage of = % / 100 * num
            const i = await percent / 100;
        
            const percentageOfEmbed = new MessageEmbed()
            .setColor("#5CD4D8")
            .setTitle(`(${percent}%) of (${num1}) is *(${i * num1})*`)
            .setTimestamp()
            .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})

            await interaction.reply({
                embeds: [percentageOfEmbed]
            })
            break;
        }
        case "help": { 
            const helpEmbed = new MessageEmbed()
            .setColor("#5CD4D8")
            .setTitle("Calc 101")
            .setDescription("Calc is a Discord bot designed to perform simple arithmetic")
            .addFields(
                {name: "\u200B", value: "\n\u200b"},
                {name: "Calling commands", value: "Calc utilizes Discord slash commands for each of it's commands, see the following list for an overview of each command"},
                {name: "/add", value: "adds two numbers", inline: true},
                {name: "/subtract", value: "subtracts two numbers", inline: true},
                {name: "/multiply", value: "multiplies two numbers", inline: true},
                {name: "/divide", value: "divides two numbers", inline: true},
                {name: "/percentage_of", value: "calculates the percentage of a number", inline: true},
                {name: "/square_root", value: "returns the square root of a number, answer can be rounded to the nearest integer", inline: true},
                {name: "/power", value: "returns the base raised to the power", inline: true}
            )
            .setTimestamp()
            .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})
            .setImage("https://i.postimg.cc/Kjy5Mnc8/Calc-bot-banner.png")

            await interaction.reply({
                embeds: [helpEmbed] 
            })
            break;
        }
        case "square_root": {
            const num1 = await options.getNumber("num1") || 0
            const round = await options.getBoolean("round_to_nearest_int") || 0
            // calculate the square root of num1
            const sqrtOfNum1 = await Math.sqrt(num1);

            // embed for returning the square root
            const squareRootEmbed = new MessageEmbed()
            .setColor("#5CD4D8")
            .setTitle(`the square root of (${num1}) is *(${sqrtOfNum1})*`)
            .setTimestamp()
            .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})

            // embed for returning the square root rounded to the nearest integer
            const squareRootRoundedEmbed = new MessageEmbed()
            .setColor("#5CD4D8")
            .setTitle(`the square root of (${num1}) rounded to the nearest integer is *(${Math.round(sqrtOfNum1)})*`)
            .setTimestamp()
            .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})
        
            // if round_to_nearest_int is true
            if (round) {
                await interaction.reply({
                    embeds: [squareRootRoundedEmbed]
                })
            // if round_to_nearest_int is false
            } else {
                await interaction.reply({
                    embeds: [squareRootEmbed]
                })
            }
            break;
        }
        case "power": {
            const num1 = await options.getNumber("base") || 0
            const num2 = await options.getNumber("exponent") || 0

            const powerEmbed = new MessageEmbed()
            .setColor("#5CD4D8")
            .setTitle(`(${num1}) raised to the power (${num2}) is *(${Math.pow(num1, num2)})*`)
            .setTimestamp()
            .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})

            await interaction.reply({
                embeds: [powerEmbed] 
            })
            break;
        }
        case "percent_change": {
            // formula for percent change = new value - old value / old value x 100
            const oldNum = await options.getNumber("old_value") || 0
            const newNum = await options.getNumber("new_value") || 0
            // subtract the old value from the new value
            const i = await newNum - oldNum;
            // divide i by the old value
            const x = await i / oldNum;
            // declare empty variable to store whether or not the percent change is an increase or a decrease
            let increaseOrDecrease;

            // save the result the increaseOrDecrease
            if (newNum > oldNum) {
                increaseOrDecrease = "an increase";

            } else {
                increaseOrDecrease = "a decrease";
            }

            const percentChangeEmbed = new MessageEmbed()
            .setColor("#5CD4D8")
            .setTitle(`the percent change between (${oldNum}) and (${newNum}) is ${increaseOrDecrease} of (${x * 100}%)`)
            .setTimestamp()
            .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})

            await interaction.reply({
                embeds: [percentChangeEmbed]
            })
            break;
        }    
    }
 })

// login to discord using the bot token
bot.login(process.env.TOKEN);