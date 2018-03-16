// if you get in any trouble from discord for using this, im not responsible.
// (you wont though, it's not like its a spambot or anything...)

const Discord = require("discord.js");

const token = "YOUR_TOKEN_HERE"; // don't worry, if i wanted to steal people's tokens, i wouldn't be stupid enough to make the entire thing open source
const prefix = ":"; // this is the thing you enter before a command to tell the bot what you'r saying is a command, not just a random message

var client = new Discord.Client();

client.on("ready", function()
{
  console.log("--> bot ready!\n-> logged in with token: " + token + "\n-> user id: " + client.user.id);
  console.log("\n\nWaiting for commands...");
});

client.once("message", function(message) // calls every time a message is sent
{
  if (!message.author.equals(client.user)) return;
  if (!message.content.startsWith(prefix)) return;

  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0])
  {
    case "ping":
      message.channel.send('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`'); // right off stack overflow c;
      break;
    default:
      message.channel.send("Invalid command!");
  }
});

client.login(token);
