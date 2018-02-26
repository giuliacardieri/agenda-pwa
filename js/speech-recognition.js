var speak = new webkitSpeechRecognition();

speak.lang = 'en-us';

speak.onresult = function(event) {
  var text = ''
  , i
  , name;

  for(i = event.resultIndex; i < event.results.length; ++i) {
    text += event.results[i][0].transcript;
  }
 //console.log(text); // showing what he heard
  
  name = text.toLowerCase();
  postText(name);
};

speak.onend = function () {
  this.start();
};

let postText = (text) => {
  console.log('vc falou ' + text);
  $('.voice-elem.current-elem').siblings('input').val(text);
  Materialize.updateTextFields();
};

speak.start();

$( document ).ready(function(){

  $('.voice-elem, .voice-elem i.material-icons').on('click', function(e) {
    e.preventDefault();
    //console.log('clicou');
    $('.voice-elem').removeClass('current-elem');
    $(this).addClass('current-elem');
  });
});


