 $( document ).ready(function() {

  var $ul = $('#output');
  var listTemplateLive = $('#list-template-live').html();
  var listTemplateNotLive = $('#list-template-not-live').html();

  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var arrOfPromises = [];


  var arrOfPromises = channels.map(function(channelName) {
        return $.ajax({
            url: 'https://wind-bow.gomix.me/twitch-api/streams/' + channelName,
            dataType: 'jsonp'
        }).then(function(data) {
            console.log(data);
            if (data.stream) { // i.e. if it's not null and currently streaming
                return {
                    name: data.stream.channel.display_name,
                    url: data.stream.channel.url,
                    logo: data.stream.channel.logo,
                    program: data.stream.channel.status,
                    streaming: true
                };
            } else { // i.e. it's not currently streaming, do a separate request to get the channel info.
                return $.ajax({
                    url: 'https://wind-bow.gomix.me/twitch-api/channels/' + channelName,
                    dataType: 'jsonp'
                }).then(function(channelData) {
                    console.log(channelData);
                    return {
                        name: channelData.display_name,
                        url: channelData.url,
                        logo: channelData.logo,
                        streaming: null
                    };
                });
            }
        });
    });

    console.log("arrOfPromises contents: ", arrOfPromises); // arrOfPromises should have 8 defferred objects or promises as its values

    $.when.apply($, arrOfPromises).then(function() {
        console.log(arguments); // the arguments are such because they are passed into the 'then' function when all promises in arrOfPromises are resolved
        var allStreams = [].slice.call(arguments);console.log("args: ",arguments); console.log("allstr: ",allStreams)
        $.each(allStreams, function(i, stream) {
          if (stream.streaming) {
            renderList(listTemplateLive, stream);
          } else {
            renderList(listTemplateNotLive, stream);
          }
        });
    });

    function renderList(template, stream) {
      $ul.append(Mustache.render(template, stream));
    }


    /*
      - .when(arrOfPromises) would not work because the.when() function requires a promise for its argument. arrOfPromises is simply an Array
      of promises so you need to use apply to call the when function so you can use arr as the argument, with jQuery / $ as
      the this context
      - [].slice.call(arguments) converts the 'arguments' array-like object to a proper array so we can use array methods
      on it.

    */

    // console.log("test for status", allStreams[6].status);







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
