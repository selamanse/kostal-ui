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
  $('[jq="'+data.filename+'"]').highlight(15000);
});


$('[jq]').click(function(e){
  e.preventDefault();
  e.stopPropagation();
  var jq = this.getAttribute('jq');
  if (jq) socket.emit('status', jq);
});
});

$(document).ready(function () {

    $.fn.highlight = function (duration, highlightColor) {
        var highlightBg = highlightColor || "#EEEE44";
        var animateMs = duration || "fast"; // edit is here
        var originalBg = this.css("background-color");

        if (!originalBg || originalBg === highlightBg)
            originalBg = "#FFFFFF"; // default to white

        jQuery(this)
            .css("backgroundColor", highlightBg)
            .animate({ backgroundColor: originalBg }, animateMs, null, function () {
                jQuery(this).css("backgroundColor", originalBg); 
            });
    };
});
