var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('papertest.html');
});
app.get('/buurtimg', function(req, res){
  res.sendfile('eindhoven_buurt.png');
});

var lines = [];

io.on('connection', function(socket){
    console.log('a user connected');

    for(var i in lines){
        socket.emit('line', lines[i]);
    }

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('line', function(p){
        console.log('new line: ' + p);
        lines.push(p);
        socket.broadcast.emit('line', p);
    });
});

/*
function update(){
    io.sockets.emit('points', points);
}
setInterval(update, 50);
*/
http.listen(3000, function(){
  console.log('listening on *:3000');
});
