const Discord = require("discord.js")
const fs = require("fs")
var utils = require("../utils/index.js")
var general = require("../general/index.js")
var music = require("../music/index.js")
var shitpost = require("../shitpost/index.js")
var botmanage = require("../botmanage/index.js")
var mod = require("../mod/index.js")
var dj = require("../dj/index.js")
var config = global.config
function filterItems(items) {
  for (var i = 0; i < items.length; ) {
    if (items[i] == "index.js") items.splice(i, 1)
    else if (!items[i].endsWith(".js")) items.splice(i , 1)
    else i++;
  }
}
module.exports = {
  name:"!modhelp",
  desc:"Lists all commands",
  func:async function(message){
  let client = this
  let gencommands = []
  let musiccommands = []
  let shitpostcommands = []
  let djcommands = []
  let modcommands = []
  let botcommands = []
  try {
    items = fs.readdirSync("./general");
    filterItems(items)
    gencommands = items.map(element => utils.elementToStringMod(element, general))
    items = fs.readdirSync("./music");
    filterItems(items)
    musiccommands = items.map(r => utils.elementToStringMod(r, music))
    items = fs.readdirSync("./shitpost")
    filterItems(items)
    shitpostcommands = items.map(element => utils.elementToStringMod(element, shitpost))
    items = fs.readdirSync("./dj");
    filterItems(items)
    djcommands = items.map(r => utils.elementToString(r, dj))
    items = fs.readdirSync("./mod")
    filterItems(items)
    modcommands = items.map(element => utils.elementToStringMod(element, mod))
    items = fs.readdirSync("./botmanage")
    filterItems(items)
    botcommands = items.map(element => utils.elementToStringMod(element, botmanage))
    
    let avatarURL = await client.users.fetch('163052863038291970').avatarURL;
    let embed = new Discord.MessageEmbed()
    .setTitle(`ALRIGHT BOSS HERE'S YOUR OPTIONS ${config.version}`)
    .setColor("#f759e8")
    .setThumbnail(client.user.avatarURL)
    .addField("**General Commands**", gencommands.join(""), true)
    .addField("**Music Commands**", musiccommands.join(""), true)
    .addField("**DJ Commands** (requires DJ role)", djcommands.join(""), true)
    .addField("**Mod Commands**", modcommands.join(""), true)
    .addField("**Bot Management Commands**", botcommands.join(""), true)
    .addField("**Shitpost Commands**(only in shitpost central)", shitpostcommands.join(""), true)
    .setFooter("Created by Reaxt, Et al.", avatarURL);
    message.author.send({embed}).then(() => {
      message.react("👌")
    });


  } catch (err) {
    message.channel.send({embed:utils.embed("malfunction", `OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "Red")})
  }


  }
}