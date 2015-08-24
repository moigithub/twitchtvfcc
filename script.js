var users =  ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","MedryBW","comster404","brunofin","thomasballinger","noobs2ninjas","beohoff"];

var statusAll = 0,
    statusOn = 1,
    statusOff = 2;
var searchText="",
    filterButton="all";

var offline =
{
  "stream": null,
  "_links": {
    "self": "https://api.twitch.tv/kraken/streams/test_channel",
    "channel": "https://api.twitch.tv/kraken/channels/test_channel"
  }
};

var online =
{
    "_links": {
        "self": "https://api.twitch.tv/kraken/streams/medrybw",
        "channel": "https://api.twitch.tv/kraken/channels/medrybw"
    },
    "stream": {
        "_id": 14813941072,
        "game": "StarCraft: Brood War",
        "viewers": 21,
        "created_at": "2015-06-11T01:44:00Z",
        "video_height": 768,
        "average_fps": 23.9655223659,
        "_links": {
            "self": "https://api.twitch.tv/kraken/streams/medrybw"
        },
        "preview": {
            "small": "http://static-cdn.jtvnw.net/previews-ttv/live_user_medrybw-80x45.jpg",
            "medium": "http://static-cdn.jtvnw.net/previews-ttv/live_user_medrybw-320x180.jpg",
            "large": "http://static-cdn.jtvnw.net/previews-ttv/live_user_medrybw-640x360.jpg",
            "template": "http://static-cdn.jtvnw.net/previews-ttv/live_user_medrybw-{width}x{height}.jpg"
        },
        "channel": {
            "_links": {
                "self": "http://api.twitch.tv/kraken/channels/medrybw",
                "follows": "http://api.twitch.tv/kraken/channels/medrybw/follows",
                "commercial": "http://api.twitch.tv/kraken/channels/medrybw/commercial",
                "stream_key": "http://api.twitch.tv/kraken/channels/medrybw/stream_key",
                "chat": "http://api.twitch.tv/kraken/chat/medrybw",
                "features": "http://api.twitch.tv/kraken/channels/medrybw/features",
                "subscriptions": "http://api.twitch.tv/kraken/channels/medrybw/subscriptions",
                "editors": "http://api.twitch.tv/kraken/channels/medrybw/editors",
                "videos": "http://api.twitch.tv/kraken/channels/medrybw/videos",
                "teams": "http://api.twitch.tv/kraken/channels/medrybw/teams"
            },
            "background": null,
            "banner": null,
            "broadcaster_language": "en",
            "display_name": "MedryBW",
            "game": "StarCraft: Brood War",
            "logo": "http://static-cdn.jtvnw.net/jtv_user_pictures/medrybw-profile_image-19fce7e1b0d6c194-300x300.jpeg",
            "mature": false,
            "status": "24/7 Classic Starcraft VoD stream 2000-2012 (6179 VoDs)",
            "partner": false,
            "url": "http://www.twitch.tv/medrybw",
            "video_banner": null,
            "_id": 50332395,
            "name": "medrybw",
            "created_at": "2013-10-18T22:13:12Z",
            "updated_at": "2015-06-22T17:16:52Z",
            "delay": null,
            "followers": 2869,
            "profile_banner": null,
            "profile_banner_background_color": null,
            "views": 531977,
            "language": "en"
        }
    }
};

function getdata(searchtext, filterbutton){
     console.log("text", searchtext, filterbutton);
     var datausers = users.filter(function(user){
        return user.indexOf(searchtext)>-1;
     });
  
     console.log(datausers);

  // clear 
    $(".channels").html("");

    // display data
    switch(filterbutton){
      case "all":
        datausers.forEach(function(user){
          runapi(user, statusAll);
        });
        break;
      case "online":
        datausers.forEach(function(user){
          runapi(user, statusOn);
        });
        break;
      case"offline":
        datausers.forEach(function(user){
          runapi(user, statusOff);
        });
        break;
    }
  
}

function runapi(user, status) {
  var twitchTVAPI = "https://api.twitch.tv/kraken/streams/"+user+"?callback=?";
  var twitchTVURL = "http://www.twitch.tv/";
  
  
  var jqxhr = $.getJSON( twitchTVAPI, function() {
//    console.log( "success" );
  }) // fin getJSON
  .done(function( data ) {
    $(".channels").hide();
    
//    console.log("done", data);
    if(data.stream===null && (status===statusAll || status===statusOff) ) {
      $(".channels").append("<li><div class='channel' id='"+user+"'></div></li>");
      var link = $("<a target='_blank'></a>").attr("href", twitchTVURL + user);
      link.append( "<img class='pic img-circle' src='http://en.arij.net/wp-content/themes/arij/images/photo.jpg' />" );
      link.append( "<div class='user'>"+user+" <span class='statusOFF'>offline</span></div>" );
      $("#"+user).append(link);
      
    } else if ( data.stream!==null && (status===statusAll || status===statusOn) ){
      $(".channels").append("<li><div class='channel' id='"+user+"'></div></li>");
      var link = $("<a target='_blank'></a>").attr("href", data.stream.channel.url);
      link.append( "<img class='photo img-circle' src='"+data.stream.channel.logo+"' />" );
      link.append( "<div class='user'>"+user+" <span class='statusON'>online</span></div>" );
      link.append( "<div class='url'>"+data.stream.channel.url+"</div>" );
      link.append( "<div class='desc'>"+data.stream.channel.status.slice(0,35)+"...</div>" );
      $("#"+user).append(link);
    }
    
    $(".channels").show();
    })  // fin done
  .fail(function() {
 //   console.log( "error" );
  })  // fin fail
  .always(function() {
    //console.log( "complete" );
  });
 
  // Perform other work here ...
  // Set another completion function for the request above
  jqxhr.complete(function() {
   //console.log( "second complete" );
  });

} //end function
  
$(document).ready(function() { 

  // set keyboard search input handler
  $("#search").keyup(function(key){
    searchText = $(this).val();
    //console.log(searchText);
    getdata(searchText, filterButton);
  });
  
  
  
  // set top menu  click handler
  $('ul.nav-pills li a').click(function (e) {
    $('ul.nav-pills li.active').removeClass('active');
    $(this).parent('li').addClass('active');
    
    filterButton = $(this).attr("id");
    
    getdata(searchText, filterButton);
  });
  
  
  // display ALL (default) list
  // initial screen
  getdata(searchText, filterButton);
  
});