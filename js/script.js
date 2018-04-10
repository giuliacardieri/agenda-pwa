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

var loadDBTemplate = function loadDBTemplate(source) {
  var template, html;
  
  template = Handlebars.compile(source);
  html = template(db);

  $('.header__tabs').addClass('header__tabs--state-hidden');
  $('main').html(html);

}

var loadUserPrefsTemplate = function loadUserPrefsTemplate(source) {
  var template, html;
  
  template = Handlebars.compile(source);
  html = template(userprefs);

  $('.header__tabs').removeClass('header__tabs--state-hidden');
  $('main').html(html);

  rememberTabsContent();
  initializeMaterializeComponents();
}

var rememberTabsContent = function rememberTabsContent() {
  var id = $('.header__tabs a.active').attr('href');
  $(id).removeClass('hidden');
}

var initializeMaterializeComponents = function initializeMaterializeComponents() {
  $('.datepicker').datepicker();
  $('.collapsible').collapsible();
  $('select').formSelect();
  $('.timepicker').timepicker();
  $('.tabs').tabs();
}

var findCurrentNav = function findCurrentNav(id) {
  switch (id) {
    case 'home': loadDBTemplate($('#home-template').html()); break;
    case 'mydesign': loadUserPrefsTemplate($('#mydesign-template').html(), userprefs); break;
    case 'pastevents': loadDBTemplate($('#pastevents-template').html(), db); break;
  }
}

$(function(){
	if (!getUser())
		setUser();

  loadDBTemplate($('#home-template').html());

	userPreferences();

  initializeMaterializeComponents();

  $('.card-action__btn--completed').on('click', function() {
    // TODO make this better
    $(this).parent().parent().parent().find('.card.swipe-elem').trigger('swiperight');
  });

  $('.card-action__btn--cancel').on('click', function() {
    // TODO make this better
    $(this).parent().parent().parent().find('.card.swipe-elem').trigger('swipeleft');
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

  $('main').on('click', '.main__btn--add', function() {  
    $(this).addClass('hidden'); 
    $('.body__add-form-section').removeClass('hidden');
    $('.body__add-form-section').animate({
      top: '0vh',
      left: '0vw',
      easing: 'easein'
    }, 225);
  });

  $('.footer__nav .li__a').on('click', function() {
    $('.li__a').removeClass('li__a--state-active');
    $(this).addClass('li__a--state-active');
    findCurrentNav($(this).attr('id'));
  });

  $('.header__tabs ul li a').on('click', function() {
    $('.tabs__div').addClass('hidden');
    var id = $(this).attr('id');
    $('#' + id).removeClass('hidden');
  });
  

});