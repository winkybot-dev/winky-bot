// if you get in any trouble from discord for using this, im not responsible.
// (you wont though, it's not like its a spambot or anything...)

const Discord = require("discord.js");
const ConfigFile = require("./config.json");

const token = ConfigFile.token;
const id = ConfigFile.id;
const prefix = ConfigFile.prefix;

var client = new Discord.Client();

client.on("ready", function()
{
  console.log("--> bot ready!\n-> logged in with token: " + token + "\n-> user id: " + client.user.id);
  console.log("\n\nWaiting for commands...");
});

client.on("message", function(message) // calls every time a message is sent
{
  if (!message.author.id == id) return;
  if (!message.content.startsWith(prefix)) return;

  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0].toLowerCase())
  {
    case "ping":
      message.channel.send('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`'); // right off stack overflow c;
      break;

   case "embed": // i know the body of the embed is undefined but its late and im tired so ill fix it tomorrow zzzzz~~~
      var embed = new Discord.RichEmbed()
         .addField(args.slice(1));
      message.channel.send(embed);
      break;

    default:
      message.channel.send("Invalid command!");
  }
});

client.login(token);
