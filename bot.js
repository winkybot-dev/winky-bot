// if you get in any trouble from discord for using this, im not responsible.
// (you wont though, it's not like its a spambot or anything...)

// includes discord.js library and config.json file
const Discord = require("discord.js");
const ConfigFile = require("./config.json");

// gets info from config file
const token = ConfigFile.token;
const prefix = ConfigFile.prefix;

// creates an instance of Discord.Client
var client = new Discord.Client();

// creates a embed to be used for the embed command, and also creates other presets for other commands
var embed = new Discord.RichEmbed();
const aboutEmbed = new Discord.RichEmbed();
aboutEmbed.setDescription("winky-bot is an open source Discord selfbot written in the Discord.JS library.\n\nGitHub repo: https://github.com/winkybot-dev/winky-bot");
aboutEmbed.setColor("9932CC");
aboutEmbed.setFooter("written by smokals - https://github.com/smokals/", "https://avatars2.githubusercontent.com/u/31916378?s=460&v=4")
aboutEmbed.setThumbnail("https://github.com/winkybot-dev/winky-bot/blob/master/icon.png?raw=true");
aboutEmbed.setAuthor("winky-bot : https://github.com/winkybot-dev/winky-bot", "https://github.com/winkybot-dev/winky-bot/blob/master/icon.png?raw=true");
aboutEmbed.addField("Support:", "not smoky#0001", true);
aboutEmbed.addField("Report A Bug or Submit a Feature Request:", "[GitHub Issues Page](https://github.com/winkybot-dev/winky-bot/issues)", true);
const invalidCommandEmbed = new Discord.RichEmbed();
invalidCommandEmbed.setDescription("Invalid command!");
invalidCommandEmbed.setColor("9932CC");
invalidCommandEmbed.setTitle("Error!");
invalidCommandEmbed.setAuthor("winky-bot : https://github.com/winkybot-dev/winky-bot", "https://github.com/winkybot-dev/winky-bot/blob/master/icon.png?raw=true");

// when the bot is launched and successfully logs into the account
client.on("ready", function()
{
	// print login information to nodeJS console
	console.log("--> bot ready!\n-> logged in with token: " + token + "\n-> user id: " + client.user.id);
	console.log("\n\nWaiting for commands...");
});

// honestly not sure what this one does, probably for if the bot gets disconnected from the user account
client.on("disconnected", function()
{
	// prints "Disconnected" to the nodeJS console and exits the process with a code of 1
	console.log("\nDisconnected!");
	process.exit(1);
});

// every time any message is sent in any channel the user has access to
client.on("message", function(message)
{
	// if the message is not sent by the user and or does not begin with the prefix set in config.JSON, ignore the message
	if (!message.author.id == client.user.id) return;
	if (!message.content.startsWith(prefix)) return;

	// get any arguments specified, and store them in an array named args
	var args = message.content.substring(prefix.length).split(" ");

	// switch statement on the first argument, the actual commandARRAYS START AT 0
	switch (args[0].toLowerCase())
	{
		// ping command
		case "ping":
			// reply with "Pong!", and the latency
			message.channel.send("Pong!");
			message.channel.send(new Date().getTime() - message.createdTimestamp + " ms"); // TODO: this sends a negative ping for some bizare reason...
			// write to the nodeJS console that the ping command was executed
			console.log("\n[*] ping command executed");
			break;

		// embed command
		case "embed": // command format: ;embed [TITLE] [COLOUR_IN_HEX] [Body Text]
			// clear the embed
			embed = new Discord.RichEmbed();
			// add the title (first command argument), and the body text (anything after the second argument)
			embed.addField(args[1], args.slice(3).join(" "));
			// set the embed colour to the hex value specified in the second argument
			embed.setColor(args[2]);
			// send the embed
			message.channel.send(embed);
			// write to the nodeJS console that the embed command was executed
			console.log("\n[*] embed command executed : title=" + args[1] + ", colour=" + args[2] + ", body=" + args.slice(3).join(" "));
			break;

		// about commannd
		case "about":
			// semd the embed containing about information
			message.channel.send(aboutEmbed);
			// write to the nodeJS console that the about command was executed
			console.log("\n[*] about command executed");
			break;

		// help command
		case "help":
			message.channel.send("`Don't worry, we have a wiki. It's better :)` https://github.com/winkybot-dev/winky-bot/issues");
			// write to the nodeJS console that the help command was executed
			console.log("\n[*] help command executed");
			break;

		// kick command
		case "kick": // command format: ;embed [@mention_user] [reason for kick]
			// attempt to kick the mentioned user for the reason specified
			message.mentions.members.first().kick(args.slice(2).join(" ")).then((member) =>
			{
				// if the user was successfully kicked, send a message
				message.channel.send(":wave: " + message.mentions.members.first().displayName + " has been kicked for `" + args.slice(2).join(" ") + "`");
				// write to the nodeJS console that the kick commad was executed
				console.log("\n[*] kick command successfully executed : target user=" + args[1] + ", reason=" + args.slice(2).join(" "));
			}).catch(() =>
			{
				// if the user could not be kicked, send a message
				message.channel.send("`The mentioned member could not be kicked!`");
				// write to the nodeJS console that the kick command was executed
				console.log("\n[*] kick command unsuccessfully executed : target user=" + args[1] + ", reason=" + args.slice(2).join(" "));
			});
			break;

		// ban command
		case "ban": // command format: ;embed [@mention_user] [reason for ban]
			// attempt to ban the first mentioned user for the reason specified
			message.mentions.members.first().ban(args.slice(2).join(" ")).then((member) =>
			{
				// if the user was successfully banned, send a message
				message.channel.send(":wave: " + message.mentions.members.first().displayName + " has been banned for `" + args.slice(2).join(" ") + "`");
				// write to the nodeJS console that the ban command was executed
				console.log("\n[*] ban command unsuccessfully executed : target user=" + args[1] + ", reason=" + args.slice(2).join(" "));

			}).catch(() =>
			{
				// if the user could not be banned, send a message
				message.channel.send("`The mentioned member could not be banned!`");
				// write to the nodeJS console that the ban command was executed
				console.log("\n[*] ban command unsuccessfully executed : target user=" + args[1] + ", reason=" + args.slice(2).join(" "));
			});
			break;

		// userinfo command
		case "userinfo": // command format: ;userinfo [@mention_user]

			// write to the nodeJS console that the userinfo command was executed
			console.log("\n[*] userinfo command executed : target user=" + args[1]);
			break;

		// serverinfo command
		case "serverinfo":

			// write to the nodeJS console that the serverinfo command was executed
			console.log("\n[*] serverinfo command executed");
			break;

		// if the command was not recognised
		default:
			// send a message saying it was invalid TODO: make this an embed for maximum fancyness
			message.channel.send(invalidCommandEmbed);
			// write to the nodeJS console that an invalid command was executed
			console.log("\n[*] an invalid command was executed");
	}
});

// attempt to login to the user account via the token specified in the config file
client.login(token);
