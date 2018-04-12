var getUser = function getUser() {
	if (localStorage.getItem('user'))
		return JSON.parse(localStorage.getItem('user'));
	return null;
};

var setUser = function setUser(user_new) {
  if (user_new)
	 localStorage.setItem('user', user_new);
  else
    localStorage.setItem('user', JSON.stringify({
      "checkbox": 1,
      "datepicker": 1,
      "input": 1,
      "select": 1,
      "timepicker": 1,
      "events_style": 1,
      "images_card": 1,
    }));
};

var userPreferencesDesign = function userPreferencesDesign() {
	var user = getUser();

	if (user.checkbox === 2)
		$('.checkbox-elem--type-material').addClass('hidden');
    $('.checkbox-elem--type-browser-default').removeClass('hidden');
  if (user.datepicker === 2)
    $('.datepicker-elem').removeClass('datepicker').attr('type', 'date');
  if (user.input === 2) {
    $('.input-elem-group__input').addClass('browser-default');
    $('.input-elem-group__label').addClass('browser-default');
  }
  if (user.select === 2) {
    $('.select-elem').addClass('browser-default');
    $('.select-elem__label').addClass('browser-default');
  }
  if (user.timepicker === 2) {
    $('.timepicker-elem-group--type-browser-default').removeClass('hidden');
    $('.timepicker-elem-group--type-material').addClass('hidden');
  }

  initializeMaterializeComponents();
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

  userPreferencesDesign();

  initializeMaterializeComponents();

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });

  loadDBTemplate($('#home-template').html());


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

  $('.nav-wrapper__a--type-back').on('click', function() {
    $('.body__content-wrapper').removeClass('hidden');    
    $('.body__add-form-section').animate({
      top: '100vh',
    }, 200, function() {
      $('.body__add-form-section').addClass('hidden');
      $('.main__btn--add').removeClass('hidden');
    });
  });

  $('.nav-wrapper__a--type-main').on('click', function() {
    $('.footer__nav .li__a#home').trigger('click');
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