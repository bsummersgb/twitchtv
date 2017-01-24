 $( document ).ready(function() {
   /* t
   The issue I'm guessing is you using the i variable inside your ajax calls
   for example you make your first call when i is 0
   but ajax call isn't finished and the rest of your code moves on
   i is set to 1
   maybe the first call still isn't done and a second call is being made. Then i is set to 2
now your first call finishes lets say. i is now 2 and the result of the call you made when i is 0 is now being put into streams[i] when i is 2
*/

//    I would suggest making use of the Array methods like push and shift instead, that would probably work

  var $ul = $('#output');
  var listTemplate = $('#list-template').html();
  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  // var allStreams = [];
  var arr = [];


  var arr = channels.map(function(channelName) {
        return $.ajax({
            url: 'https://wind-bow.gomix.me/twitch-api/streams/' + channelName,
            dataType: 'jsonp'
        }).then(function(data) {
            // var data = results[0];
            console.log(data);
            if (data.stream) { // i.e. if it's not null and currently streaming
                return {
                    name: data.stream.channel.display_name,
                    url: data.stream.channel.url,
                    logo: data.stream.channel.logo,
                    status: data.stream
                };
            } else { // i.e. it's not currently streaming, do a separate request to get the channel info.
                return $.ajax({
                    url: 'https://wind-bow.gomix.me/twitch-api/channels/' + channelName,
                    dataType: 'jsonp'
                }).then(function(channelData) {
                    // var channelData = results[0];
                    console.log(channelData);
                    return {
                        name: channelData.display_name,
                        url: channelData.url,
                        logo: channelData.logo
                    };
                });
            }
        });
    });

    console.log("arr contents: ", arr); // arr should have 8 defferred objects or promises as its values

    $.when.apply($, arr).then(function() {
        var allStreams = [].slice.call(arguments);
        $.each(allStreams, function(i, stream) {
            $ul.append(Mustache.render(listTemplate, stream)); // TODO: place in separate function
        });
    });







  // $.each(channels, function(i, channelName){
  //   var xhr = $.ajax({
  //     url: 'https://wind-bow.gomix.me/twitch-api/streams/' + channelName,
  //     dataType: 'jsonp',
  //     success: function(data) {
  //
  //       if (data.stream) { // i.e. if it's not null and currently streaming
  //         allStreams[i] = {
  //           name: data.stream.channel.display_name,
  //           url: data.stream.channel.url,
  //           logo: data.stream.channel.logo,
  //           status: data.stream
  //         };
  //       } else { // i.e. it's not currently streaming, do a separate request to get the channel info.
  //         $.ajax({
  //           url: 'https://wind-bow.gomix.me/twitch-api/channels/' + channelName,
  //           dataType: 'jsonp',
  //           success: function(channelData) {
  //             allStreams[i] = {
  //               name: channelData.display_name,
  //               url: channelData.url,
  //               logo: channelData.logo
  //             };
  //           } // close inner success
  //         }); // close inner $.ajax()
  //       } // close else
  //     } // close outer success
  //   }); // close outer $.ajax()
  //   arr.push(xhr);
  //
  //
  // }); // close $.each()
  //
  // console.log(allStreams);
  //
  // $.when.apply($, arr).then(function(){
  //   $.each(allStreams, function(i, stream) {
  //     $ul.append(Mustache.render(listTemplate, stream));
  //   });
  // });

/* deleted accounts
  - brunofin
  - comster404
*/



}); // close .ready()
