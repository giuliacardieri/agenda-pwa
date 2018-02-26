var getUser = function getUser() {
	if (localStorage.getItem('user'))
		return JSON.parse(localStorage.getItem('user'));
	return null;
};

var setUser = function setUser() {
	localStorage.setItem('user', JSON.stringify({"voice": "on",}));
};

var userPreferences = function userPreferences() {
	var user = getUser();

	if (user.voice === 'on')
		$('.voice-elem').addClass('active');
	if (user.voice_movement === 'on')
		$('.voice_movement-elem').addClass('active');
	if (user.speech === 'on')
		$('.speech-elem').addClass('active');
	if (user.speech_movement === 'on')
		$('.speech_movement-elem').addClass('active');
	if (user.night_mode === 'on')
		$('.night_mode-elem').addClass('active');
}

$( document ).ready(function(){
	if (!getUser())
		setUser();

	userPreferences();

	$('.button-collapse').sideNav();

	$('.btn--add').on('click', function() {
		$('#modalAdd').modal('open');
	});
	$('.modal').modal();

  $('select').material_select();

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });

  $('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
  });

  $('.speech-elem, .speech-elem i.material-icons').on('click', function(e) {
    e.preventDefault();

    $('.speech-elem').removeClass('current-elem');
    $(this).addClass('current-elem');
    
    var synth = new SpeechSynthesisUtterance($('.speech-elem.current-elem').siblings('.speech-talk').html());
    window.speechSynthesis.speak(synth);
  });
     
})