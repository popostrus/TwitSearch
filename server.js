var express=require('express');
var app=express();
var server=app.listen(3000);
app.use(express.static('public'));
console.log("Starting server...");
var socket=require('socket.io');
var io = socket(server);
var Twit=require('twit');
var T=new Twit({
  consumer_key:         'HUeMyXX0Cx2sJK9yFAEsBJDRY',
  consumer_secret:      'V2ijawDuu6aE3bcSrFFBXdCr0AK4SmY1mT3floodJsFLKieZdQ',
  access_token:         '817244484035432448-uX8scPeGuBUZoaZ1qlXDlqNxnhSlJJL',
  access_token_secret:  'VKsRP4DKL4I8aHSimaeGV4BDDPx561v5zOtznWETQLiEM',
});

io.sockets.on('connection',newConnection);

function newConnection(socket){
  var tweets;
  var key;
  socket.on('searchKey',search);

  function search(searchKey){
    console.log("getting key...");
    console.log(searchKey);
    key=searchKey;
    var searchFor={
      q: key,
      count:100,
      result_type:'recent',


    };

    T.get('search/tweets', searchFor, function(err, data, response) {
      if (!err){
      tweets=data.statuses;
      for (var i = 0; i < tweets.length; i++) {
      //  console.log("("+tweets[i].created_at+") "+tweets[i].user.name+": "+tweets[i].text);
        socket.emit('tweet',tweets[i].user.name,tweets[i].user.profile_image_url,tweets[i].created_at,tweets[i].text,tweets[i].user.screen_name);
        
      }
      }
      else{
        console.log(err);
      }
    });
  }
}
