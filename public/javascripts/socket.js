$(function(){

var socket = io.connect();
socket.on('data', function (data) {
  if (data.filename){
     $('#monitor').html(data.filename);
     Kostal.draw(data.lines);
  }
  if (data.filename ===  false){
     $('[jq=stop]').attr('disabled','disabled');
  }
});


socket.on('live', function (data) {
  if (data.filename ===  $('#monitor').html() && data.line){
    Kostal.update(data.line);
  }
  $('[jq="'+data.filename+'"]').addClass('live');
});


$('[jq]').click(function(e){
  e.preventDefault();
  e.stopPropagation();
  jq = this.getAttribute('jq');
  if (jq) socket.emit('status', jq);
});
});
