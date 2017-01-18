$( document ).ready(function() {

  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  $.each(channels, function(i, channelName){
    $.ajax({
      url: 'https://wind-bow.gomix.me/twitch-api/streams/' + channelName,
      dataType: 'jsonp',
      success: function(data) {
        if (data.stream) { // i.e. if it's not null
          console.log("This channel is currently streaming: ", data.stream.channel.url);
        } else {
          console.log("No live stream, but here's the channel info:");
          $.ajax({
            url: 'https://wind-bow.gomix.me/twitch-api/channels/' + channelName,
            dataType: 'jsonp',
            success: function(channelData) {
              console.log(channelData.url);
            }
          }); // close inner $.ajax()
        }
      }
    }); // close outer $.ajax()
  }); // close $.each()
}); // close .ready()


/* deleted accounts
  - brunofin
  - comster404
*/

//
// $.ajax({
//   url: 'https://wind-bow.gomix.me/twitch-api/channels/ESL_SC2',
//   dataType: 'jsonp',
//   success: function(data) {
//     console.log(data);
//   }
// });
