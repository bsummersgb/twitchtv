$( document ).ready(function() {

  $.ajax({
    url: 'https://wind-bow.gomix.me/twitch-api/streams/freecodecamp',
    dataType: 'jsonp',
    success: function(data) {
      if (data.stream) { // i.e. if it's not null
        console.log("This channel is currently streaming: ", data.stream.channel.status);
      } else {
        console.log("No live stream, but here's the channel info:");
        $.ajax({
          url: 'https://wind-bow.gomix.me/twitch-api/channels/freecodecamp',
          dataType: 'jsonp',
          success: function(channelData) {
            console.log(channelData);

          }
        });
      }


    }
  });






});


/* deleted accounts
  - brunofin
  - comster404
*/
