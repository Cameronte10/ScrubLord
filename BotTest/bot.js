
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
var diceroll1 = 0;
var diceroll2 = 0;
var diceroll3 = 0;
client.on('ready', () =>
{
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

});

client.on('message', async msg =>
{
    const guild = client.guilds.get("193662219274158091");
    const scrub = guild.roles.find(x => x.name === "Scrub");
    const aids = guild.roles.find(x => x.name === "AIDS");
    const hyperAids = guild.roles.find(x => x.name === "HyperAIDS");
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
	else if (msg.content === prefix + 'dice')
	{
		msg.channel.send("Dice roll: " + Math.floor(Math.random() * 5.999 + 1));
	}
	else if (msg.content === prefix + 'tripledie')
	{
		diceroll1 = Math.floor(Math.random() * 5.999 + 1);
		diceroll2 = Math.floor(Math.random() * 5.999 + 1);
		diceroll3 = Math.floor(Math.random() * 5.999 + 1);
		if (diceroll1 == diceroll2 && diceroll1 == diceroll3)
		{
			msg.channel.send("Dice rolls: " + diceroll1 + ", " + diceroll2 + ", " + diceroll3 + "    Triple!" + " Total: " + (diceroll1 + diceroll2 + diceroll3))
		}
		else
			msg.channel.send("Dice rolls: " + diceroll1 + ", " + diceroll2 + ", " + diceroll3 + " Total: " + (diceroll1 + diceroll2 + diceroll3))
	}
    else if (msg.content === prefix + 'test')
    {
        msg.channel.send(msg.author.discriminator);
    }
    else if (msg.content === prefix + "meow")
    {
        messageRecieved(msg);
    }
    else if (msg.content === prefix + 'avatar')
    {
        // Send the user's avatar URL
        msg.reply(msg.author.avatarURL);
    }
    else if (msg.content.startsWith(prefix + 'addScrub'))
    {
        msg.mentions.members.first().addRole(scrub);
        msg.reply(msg.mentions.members.first().user + " is now a Scrub lol");
    }
    else if (msg.content === prefix + "sauce")
    {
        const attachment = new Attachment('https://i.imgur.com/nSpDdY4.gif');
        msg.channel.send(`${msg.author},`, attachment);
    }
    //AIDS
    else if (msg.content.startsWith(prefix + 'giveAIDS'))
    {
        if (msg.mentions.members.first())
        {
            if (msg.member.roles.find(x => x.name === "AIDS"))
            {
                const attachment = new Attachment('https://cdn.discordapp.com/attachments/193662219274158091/523691866278068224/2541592537_b63ca6e1b8.png');
                msg.channel.send(msg.author + " gave " + msg.mentions.members.first() + "AIDS! Have fun ;-)", attachment)
                msg.mentions.members.first().addRole(aids);
                var chance = Math.floor(Math.random() * 10);
                //if (chance == 6)
				if (chance >= 0 && chance <= 5)
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
    else if (msg.content === prefix + "don't type this")
    {
        msg.author.send("lol")
    }
    //Time
    else if (msg.content === prefix + "time")
    {
        msg.reply("It is currently " + dt.myDateTime())
    }
    //Annoy
   /* else if (msg.content.startsWith(prefix + "annoy"))
    {
        msg.channel.send('Ok, annoying ' + msg.mentions.members.first().user);
        if (msg.mentions.members.first())
        {
                msg.mentions.members.first().user.send("HO(e):peach::eyes:HO(e):peach::eyes:HO(e):peach::eyes: Merry DICKmas:eggplant::laughing::pray::shrug:‍♂️:laughing: I know y’all elf looking 🧝‍♀️ 🧝‍♂️ headasses out there have been motherfuckin’ NAUGHTY:eyes::kissing_heart::heart_eyes::flushed:all year :stuck_out_tongue_winking_eye:🤪:stuck_out_tongue_winking_eye::kissing_heart::heart_eyes: waiting :shrug:‍♂️:thinking:for that SWEET dick :eyes::ok_hand::eyes::ok_hand::eyes::eggplant:. well 🧐:nerd:🤨:smirk: let those chestNUTTS:peanuts: NUT :champagne::tada::flag_ke:ALL OVER :sweat_drops::umbrella:️:information_desk_person:‍♀️your favorite HOES🤱🧚‍♂️🧚‍♂️:couple_mm: and make sure you :smirk::stuck_out_tongue_closed_eyes::stuck_out_tongue_winking_eye:POP THAT PEPPERMINT PU$$AY:peach: :point_left::wave::left_facing_fist:BECAUSE SANTA:santa: :santa: :lips::kiss:IS CUMMING :eggplant: TO TOWN 🤯:flushed:🤩WITH THE BEST COCK :chicken: :rooster: YOUVE EVER HAD :eyes::pray:🤭:hushed::astonished::sob::weary:🤩 to SLEIGH 🛷 YOU UNDER THE mistleBLOW :massage:‍♀️🧠:stuck_out_tongue_closed_eyes: THIS christmASS! Bend this over your sluttiest reinHOES :stuck_out_tongue_winking_eye::stuck_out_tongue:🧐🤨in the next 69 sexonds :hugging::kissing_heart::heart_eyes::wink::relaxed:️or your PULL OUT game :eggplant::eyes: 🤯:eyes::sunglasses::eyes::eggplant:will be WEAK AS FUCK:scream::cold_sweat::tired_face: and your EAT ASS :scream::scream:in 2018 🤮:cowboy::mask:🤲:raised_back_of_hand::kiss::lips::eye::eyes::baby:!");
                msg.mentions.members.first().user.send("Send the cancel command to stop");
            
        }

        else
        {
            msg.channel.send("What a fucking idiot you are " + msg.author);
            msg.channel.send("You need to mention someone for me to annoy them");
        }
    }*/
    else if (msg.content === prefix + "flip")
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

});

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

client.login('MzIwODI1NTAxNDUzMjU0NjU3.Dvi-9g.SyAr1u6KmBoig90vbjSzfjnZGY4');
