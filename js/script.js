var night_mode;

var getUser = function getUser() {
	if (localStorage.getItem('user'))
		return JSON.parse(localStorage.getItem('user'));
	return null;
};

var setUser = function setUser(user_new) {
  if (user_new)
	 localStorage.setItem('user', user_new);
  else
    localStorage.setItem('user', JSON.stringify({"voice": "on",}));
};

var userPreferences = function userPreferences() {
	var user = getUser();

	if (user.voice === 'on')
		$('.voice-elem').addClass('active');
}

$(function(){
	if (!getUser())
		setUser();

  var source = $('#events-template').html();
  var template = Handlebars.compile(source);
  var html = template(db);
  $('.events-template-results').html(html);

	userPreferences();

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

  $('.card-action__btn--completed').on('click', function() {
    // TODO make this better
    $(this).parent().parent().parent().find('.card.swipe-elem.active').trigger('swiperight');
  });

  $('.card-action__btn--cancel').on('click', function() {
    // TODO make this better
    $(this).parent().parent().parent().find('.card.swipe-elem.active').trigger('swipeleft');
  });


  $('.card.swipe-elem').on('swiperight', function() {
    $('.card__action_wrapper--state-completed').removeClass('hidden');
    $(this).animate({
      right: '-350px',
      opacity: 0,
    }, 1500, function() {
      $(this).addClass('hidden');
    });
  });

  $('.card.swipe-elem').on('swipeleft', function() {
    $('.card__action_wrapper--state-canceled').removeClass('hidden');
    $(this).animate({
      left: '-350px',
      opacity: 0,
    }, 1500, function() {
      $(this).addClass('hidden');
    });
  });

  $('.nav-wrapper__a').on('click', function() {
    $('.body__content-wrapper').removeClass('hidden');    
    $('.body__add-form-section').animate({
      top: '100vh',
    }, 200, function() {
      $('.body__add-form-section').addClass('hidden');
      $('.main__btn--add').removeClass('hidden');
    });
  });

  $('.main__btn--add').on('click', function() {  
    $(this).addClass('hidden'); 
    $('.body__add-form-section').removeClass('hidden');
    $('.body__add-form-section').animate({
      top: '0vh',
      left: '0vw',
      easing: 'easein'
    }, 225);
  });

  

});