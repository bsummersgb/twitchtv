$( document ).ready(function() {

  var $ul = $('#output');
  var listTemplate = $('#list-template').html();
  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var allStreams = [];
  var fannies = [];
  var willies = [];

  $.each(channels, function(i, channelName){
    var xhr = $.ajax({
      url: 'https://wind-bow.gomix.me/twitch-api/streams/' + channelName,
      dataType: 'jsonp',
      success: function(data) {

        if (data.stream) { // i.e. if it's not null and currently streaming
          allStreams[i] = {
            name: data.stream.channel.display_name,
            url: data.stream.channel.url,
            logo: data.stream.channel.logo,
            status: data.stream
          };
        } else { // i.e. it's not currently streaming
          xhr = $.ajax({
            url: 'https://wind-bow.gomix.me/twitch-api/channels/' + channelName,
            dataType: 'jsonp',
            success: function(channelData) {
              allStreams[i] = {
                name: channelData.display_name,
                url: channelData.url,
                logo: channelData.logo
              };
            } // close inner success
          }); // close inner $.ajax()
        } // close else
      } // close outer success
    }); // close outer $.ajax()
    fannies.push(xhr);

  }); // close $.each()

  console.log(allStreams);

  $.when.apply($, fannies).then(function(){
    $.each(allStreams, function(i, stream) {
      $ul.append(Mustache.render(listTemplate, stream));
    });
  })

/* deleted accounts
  - brunofin
  - comster404
*/



}); // close .ready()
