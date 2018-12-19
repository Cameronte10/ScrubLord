
const Discord = require('discord.js');
const client = new Discord.Client();
const { Attachment } = require('discord.js');
const querystring = require('querystring');
const r2 = require('r2');
const CAT_API_URL = "https://api.thecatapi.com/"
const CAT_API_KEY = "7dce790f-d813-4e57-9c5c-23417f84e587";
var events = require('events');
var eventEmitter = new events.EventEmitter();
var dt = require('./myfirstmodule.js');
var prefix = "&";
var hyperaidschance = 50.0;
//var diceroll1 = 0;
//var diceroll2 = 0;
//var diceroll3 = 0;
//https://discordapp.com/oauth2/authorize?client_id=524728234558881792&permissions=8&scope=bot  TestBotInvite
client.on('ready', () =>
{
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

});
if (client.guild === "193662219274158091") 
{
    const guild = client.guilds.get("193662219274158091");
    const scrub = guild.roles.find(x => x.name === "Scrub");
    const aids = guild.roles.find(x => x.name === "AIDS");
    const hyperAids = guild.roles.find(x => x.name === "HyperAIDS");
}
//
client.on('message', async msg =>
{
    if(msg.author.bot) return;
    else
    {
    
    if (msg.content === prefix+"help") 
    {
        msg.author.send({embed: {
            color: 3447003,
            fields: [{
            name: "Commands",
            value: "Noah Levvit-Brown"
        },
        {
            name: prefix+"ping",
            value: "Pings the bot"
        },
        {
            name: prefix+"giveAIDS",
            value: "Give your friends **AIDS**, but only if you have it"
        },
        {
            name: prefix+"dice (number)",
            value: "Rolls (number) of d6's"
        }
        ],
        }})
    }
    if (msg.content === "?????")
    {
        msg.channel.send("https://i.ytimg.com/vi/F_1l9NV24ow/hqdefault.jpg")
    }
    if (msg.member.roles.find(x => x.name === "HyperAIDS"))
    {
        msg.delete();
    }
	if (msg.content === prefix + 'ping')
    {
        const m = await msg.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);

    }
    if (msg.content.startsWith(prefix+"dice")) 
    {
        var amount = msg.content.substr((prefix+"dice").length);
        var total = 0;
        for (var i = 0; i < amount; i++) {
             diceroll = Math.floor(Math.random() * 5.999 + 1);
             msg.channel.send("Roll "+(i+1)+" is: "+diceroll);
             total += diceroll;
         } 
         msg.channel.send(total + " is your final score!");
    }
    if (msg.content.startsWith(prefix+"dSides")) 
    {
        var amount = msg.content.substr((prefix+"dSides ").length);
        diceroll = Math.floor(Math.random() * (amount-0.001) + 1);
        msg.channel.send("Your magical number is "+diceroll);
    }
    if (msg.content === prefix + 'test')
    {
        msg.channel.send(msg.author.discriminator);
    }
    if (msg.content === prefix + "meow")
    {
        messageRecieved(msg);
    }
    if (msg.content === prefix + 'avatar')
    {
        // Send the user's avatar URL
        msg.reply(msg.author.avatarURL);
    }
    if (msg.content.startsWith(prefix + 'addScrub'))
    {
        msg.mentions.members.first().addRole(scrub);
        msg.reply(msg.mentions.members.first().user + " is now a Scrub lol");
    }
    if (msg.content === prefix + "sauce")
    {
        const attachment = new Attachment('https://i.imgur.com/nSpDdY4.gif');
        msg.channel.send(`${msg.author},`, attachment);
    }
    //AIDS
    if (msg.content.startsWith(prefix + 'giveAIDS'))
    {
        if (msg.mentions.members.first())
        {
            if (msg.member.roles.find(x => x.name === "AIDS"))
            {
                const attachment = new Attachment('https://cdn.discordapp.com/attachments/193662219274158091/523691866278068224/2541592537_b63ca6e1b8.png');
                msg.channel.send(msg.author + " gave " + msg.mentions.members.first() + "AIDS! Have fun ;-)", attachment)
                msg.mentions.members.first().addRole(aids);
                var chance = Math.random() * 100;
                //if (chance == 6)
				if (chance >= 0 && chance <= hyperaidschance)
                {
                    msg.mentions.members.first().addRole(hyperAids);
                    setTimeout(function () { msg.mentions.members.first().removeRole(hyperAids); }, 20000)
                }
            }
            else
            {
                msg.channel.send("Sorry " + msg.author + ", you do not appear to have AIDS");
            }
        }
        else
        {
            msg.channel.send("What a fucking idiot you are " + msg.author);
            msg.channel.send("You need to mention someone to be able to give them AIDS");
        }
    }

    //lol
    if (msg.content === prefix + "don't type this")
    {
        msg.author.send("lol")
    }
    //Time
    if (msg.content === prefix + "time")
    {
        msg.reply("It is currently " + dt.myDateTime())
    }

    if (msg.content === prefix + "flip")
    {
        var num = Math.round(Math.random());
        if (num === 0)
        {
            msg.channel.send("Tails");
        }
        else
        {
            msg.channel.send("Heads");
        }
    }

}});

async function messageRecieved(message)
{
    try
    {
        // pass the name of the user who sent the message for stats later, expect an array of images to be returned.
        var images = await loadImage(message.author.username);

        // get the Image, and first Breed from the returned object.
        var image = images[0];
        var breed = image.breeds[0];

        console.log('message processed', 'showing', breed)
        // use the *** to make text bold, and * to make italic
        message.channel.send("***" + breed.name + "*** \r *" + breed.temperament + "*", { files: [image.url] });
        // if you didn't want to see the text, just send the file

    } catch (error)
    {
        console.log(error)
    }
}
async function loadImage(sub_id)
{
    // you need an API key to get access to all the iamges, or see the requests you've made in the stats for your account
    var headers = {
        'X-API-KEY': CAT_API_KEY,
    }
    var query_params = {
        'has_breeds': true, // we only want images with at least one breed data object - name, temperament etc
        'mime_types': 'jpg,png', // we only want static images as Discord doesn't like gifs
        'size': 'small',   // get the small images as the size is prefect for Discord's 390x256 limit
        'sub_id': sub_id, // pass the message senders username so you can see how many images each user has asked for in the stats
        'limit': 1       // only need one
    }
    // convert this object to query string 
    let queryString = querystring.stringify(query_params);

    try
    {
        // construct the API Get request url
        let _url = CAT_API_URL + `v1/images/search?${queryString}`;
        // make the request passing the url, and headers object which contains the API_KEY
        var response = await r2.get(_url, { headers }).json
    } catch (e)
    {
        console.log(e)
    }
    return response;

}

client.login('MzIwODI1NTAxNDUzMjU0NjU3.Dvi-9g.SyAr1u6KmBoig90vbjSzfjnZGY4'/*'NTI0NzI4MjM0NTU4ODgxNzky.DvsTPQ.b2mUR9d3RCCnSbDAxds8MaX0Ih8'*//*TestBot*/);
