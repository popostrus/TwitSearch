var socket;

function setup(){
  $('#searchBTN').click(function (){
    var searchfor=document.getElementById('searchInput').value;
    document.getElementById('tweetId').innerHTML="";
    socket.emit('searchKey',searchfor);
    console.log(searchfor);
  });
  socket=io.connect();
  socket.on('tweet',DisplayT);
  }

function DisplayT(username,profpic,date,msg,screenName){
  $('#tweetId').append("<div class='col-xs-12' id='tweetBoxId'><div id='tweet'>"+"<center>"+"<img src='"+profpic+"' width='42' height='42'>"+"<h3 id='usernameId'>"+"<a href='http://www.twitter.com/"+screenName+"' target='_blank'>"+username+"</a>"+"</h3>"+'<h4>'+msg+'</h4>'+"</center>"+"<div>"+"<p id='dateId'>"+date+"</p>"+"</div>"+"</div></div>");
}
