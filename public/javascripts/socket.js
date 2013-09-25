$(function(){

var socket = io.connect();
socket.on('data', function (data) {
  console.log('data',data);
  $('[jq]').removeAttr("disabled");
  if (data.filename){
     $('#monitor').html(data.filename);
     Kostal.draw(data.lines);
  }
  if (data.filename ===  false){
     $('[jq=stop]').attr('disabled','disabled');
  }
});


socket.on('live', function (data) {
  console.log('live',data);
  if (data.filename ===  $('#monitor').html() && data.line){
    Kostal.update(data.line);
  }
});


$('[jq]').click(function(e){
  e.preventDefault();
  e.stopPropagation();
  jq = this.getAttribute('jq');
  console.log(jq);
  
  socket.emit('status', jq);
});
});
