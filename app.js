const Discord = require('discord.js');
const client = new Discord.Client();

var StaticChannels = 0;
var TempTalkChannel = 0;
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});



client.on('voiceStateUpdate', (oldmember, newmember)=>{
    let oldvoice = oldmember.voiceChannel;
    let newvoice = newmember.voiceChannel;
    var ArrayChannels = Array.from(newmember.guild.channels)
    if (StaticChannels == 0) StaticChannels = ArrayChannels.length;
    if (StaticChannels < ArrayChannels.length){
        for (var i = StaticChannels; i < ArrayChannels.length; i++ ){
            if (ArrayChannels[i][1].members.size == 0){
                newmember.guild.channels.get(ArrayChannels[i][1].id).delete();
            } 
        } 
    }
    if (newvoice != undefined){
    if (newvoice.id == "605423254030778368"){
        if (newmember.presence.game == null){
            if(TempTalkChannel == 100) TempTalkChannel = 0;
           TempTalkChannel++;
            var name = "Reden #"+TempTalkChannel;
            newmember.guild.createChannel(name, {type: "voice"});
            setTimeout(function(){
                newmember.setVoiceChannel(newmember.guild.channels.find(channel => channel.name === name));
                newmember.guild.channels.find(channel => channel.name === name).setParent("605423747830120451");
            }, 1000);
            
        }else{
            console.log(newmember.presence.game.name);
            var channel = newmember.guild.channels.find(channel => channel.name === newmember.presence.game.name);
                if (channel != null){
                    newmember.setVoiceChannel(newmember.guild.channels.find(channel => channel.name === newmember.presence.game.name));
                }else{
                    newmember.guild.createChannel(newmember.presence.game.name, {type: "voice"});
                    setTimeout(function(){
                        newmember.setVoiceChannel(newmember.guild.channels.find(channel => channel.name === newmember.presence.game.name));
                        newmember.guild.channels.find(channel => channel.name === newmember.presence.game.name).setParent("605423747830120451");
                    }, 1000);
                }
                
        }


    }
}
})
var fs = require('fs');
 
fs.readFile('key', 'utf8', function(err, contents) {
    client.login(contents);
});

