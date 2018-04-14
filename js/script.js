/* user preferences functions */
var getUser = function getUser() {
	if (localStorage.getItem('user'))
		return JSON.parse(localStorage.getItem('user'));
	return null;
};

var setUser = function setUser(user_new) {
  if (user_new)
	 localStorage.setItem('user', user_new);
  else {
    localStorage.setItem('user', JSON.stringify([
      { 'id': 0, 'name': 'checkbox', 'value': 1 },
      { 'id': 1, 'name': 'datepicker', 'value': 1 },
      { 'id': 2, 'name': 'input', 'value': 1 },
      { 'id': 3, 'name': 'select', 'value': 1 },
      { 'id': 4, 'name': 'timepicker', 'value': 1 },
      { 'id': 5, 'name': 'events_style', 'value': 1 },
      { 'id': 6, 'name': 'images_card', 'value': 1 },
    ]));
  }
  userPreferencesDesign();
};

var setNewItem = function setNewItem(element, value) {
  var user;
  user = getUser();
  user[element].value = value;
  setUser(JSON.stringify(user));
}

var userPreferencesDesign = function userPreferencesDesign() {
  var user = getUser();

	if (user[0].value == 2) {
		$('.checkbox-elem--type-material').addClass('hidden');
    $('.checkbox-elem--type-browser-default').removeClass('hidden');
  } else if (user[0].value == 1){
    $('.checkbox-elem--type-material').removeClass('hidden');
    $('.checkbox-elem--type-browser-default').addClass('hidden');
  }

  if (user[1].value == 2) {
    $('.datepicker-elem-group--type-browser-default').removeClass('hidden');
    $('.datepicker-elem-group--type-material').addClass('hidden');
  } else if (user[1].value == 1) {
    $('.datepicker-elem-group--type-browser-default').addClass('hidden');
    $('.datepicker-elem-group--type-material').removeClass('hidden');
  }

  if (user[2].value == 2) {
    $('.input-elem-group__input').addClass('browser-default');
    $('.input-elem-group__label').addClass('browser-default');
  } else if (user[2].value == 1) {
    $('.input-elem-group__input:not(.input-test)').removeClass('browser-default');
    $('.input-elem-group__label:not(.input-test)').removeClass('browser-default');
  }

  if (user[3].value == 2) {
    $('.select-elem').addClass('browser-default');
    $('.select-elem__label').addClass('browser-default');
  } else if (user[3].value == 1) {
    $('.select-elem').removeClass('browser-default');
    $('.select-elem__label').removeClass('browser-default');
  }

  if (user[4].value == 2) {
    $('.timepicker-elem-group--type-browser-default').removeClass('hidden');
    $('.timepicker-elem-group--type-material').addClass('hidden');
  } else if (user[4].value == 1) {
    $('.timepicker-elem-group--type-browser-default').addClass('hidden');
    $('.timepicker-elem-group--type-material').removeClass('hidden');
  }
}

var updateChosenElements = function updateChosenElements() {  
  var user = getUser();
  for (var i = 0; i<Object.keys(user).length; i++)
    $('main .btn-choose.' + user[i].name + '-' + user[i].value).trigger('click');
}

/* handlebars templates functions */
var loadDBTemplate = function loadDBTemplate(source) {
  var template, html, filtered_db;
  
  filtered_db = filterJSONByDate(getDB());
  template = Handlebars.compile(source);
  html = template(sortDB(filtered_db, 'time_start'));

  $('.header__tabs').addClass('header__tabs--state-hidden');
  $('main').html(html);
  initializeMaterializeComponents();
}

var loadUserPrefsTemplate = function loadUserPrefsTemplate(source) {
  var template, html;
  
  template = Handlebars.compile(source);
  html = template(userprefs);

  $('.header__tabs').removeClass('header__tabs--state-hidden');
  $('main').html(html);

  rememberTabsContent();
  initializeMaterializeComponents();
  updateChosenElements();
}

/* form functions */
var addFormData = function addFormData(data) {
  console.log(data);
  var final_data = {};
  var user = getUser();
  var old_db = getDB();

  final_data.title = data[0].value;
  final_data.location = data[7].value;
  final_data.category = data[8].value;

  if (user[1].value == 1) {
    final_data.date = (data[1].value);
  } else {
    final_data.date = (data[2].value);
  }

  if (user[4].value == 1) {
    final_data.time_start = data[3].value;
    final_data.time_end = data[4].value;
  } else {
    final_data.time_start = data[5].value;
    final_data.time_end = data[6].value;
  }

  switch(final_data.category) {
    case 'Diabetes': final_data.icon = 'local_pharmacy'; break;
    case 'Exercise': final_data.icon = 'fitness_center'; break;
    case 'Family': final_data.icon = 'child_care'; break;
    case 'Food': final_data.icon = 'restaurant'; break;
    case 'Health': final_data.icon = 'local_hospital'; break;
    case 'Home': final_data.icon = 'home'; break;
    case 'Personal': final_data.icon = 'face'; break;
    case 'Pets': final_data.icon = 'pets'; break;
    case 'School': final_data.icon = 'school'; break;
    case 'Shopping': final_data.icon = 'local_mall'; break;
    case 'Social': final_data.icon = 'people'; break;
    case 'Other': final_data.icon = 'info'; break;
    case 'Travel': final_data.icon = 'flight_land'; break;
    case 'Work': final_data.icon = 'work'; break;
  }
  final_data.completed = false;
  old_db.push(final_data);
  setDB(old_db);
}

/* my design page tab menu functions */
var rememberTabsContent = function rememberTabsContent() {
  var id = $('.header__tabs a.active').attr('href');
  $(id).removeClass('hidden');
}

/* materialize function */
var initializeMaterializeComponents = function initializeMaterializeComponents() { 
  $('.datepicker').datepicker({
    format: 'yyyy-mm-dd',
    showClearBtn: true,
  });
  $('.collapsible').collapsible();
  $('select').formSelect();
  $('.timepicker').timepicker();
  $('.tabs').tabs();
}

/* nav functions */
var findCurrentNav = function findCurrentNav(id) {
  switch (id) {
    case 'home': loadDBTemplate($('#home-template').html()); break;
    case 'mydesign': loadUserPrefsTemplate($('#mydesign-template').html(), userprefs); break;
    case 'pastevents': loadDBTemplate($('#pastevents-template').html(), db); break;
  }
}

/* fake db functions*/
/* a fake db was created in order to save all user data on the device, allowing more privacy */
var filterJSONByDate = function filterJSONByDate(array) {
  var today = (new Date()).toISOString().substring(0, 10);
  var new_db = [];

  for (var i = 0; i<Object.keys(array).length; i++) {
    if (array[i].date == today)
      new_db.push(array[i])
  }

  return new_db;
}

var sortDB = function sortDB(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; 
    var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

var setDB = function setUser(new_db) {
  if (new_db)
   localStorage.setItem('agenda_db', JSON.stringify(new_db));
  else {
    localStorage.setItem('agenda_db', JSON.stringify(db));
  }
};

var getDB = function getDB() {
  if (localStorage.getItem('agenda_db'))
    return JSON.parse(localStorage.getItem('agenda_db'));
  return null;
}

$(function(){

  /* initializations */
	if (!getUser())
		setUser();

  if (!getDB())
    setDB();

  userPreferencesDesign();

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });

  loadDBTemplate($('#home-template').html());

  /* cards actions */
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

  /* form page actions */
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

  $('.add-form__form').on('submit', function(e) {
    e.preventDefault();
    console.log('submitted!');
    addFormData($(this).serializeArray());
    return false;
  });

  /* footer nav clicks */
  $('.footer__nav .li__a').on('click', function() {
    $('.li__a').removeClass('li__a--state-active');
    $(this).addClass('li__a--state-active');
    findCurrentNav($(this).attr('id'));
  });

  /* tab menu clicks*/
  $('.header__tabs ul li a').on('click', function() {
    $('.tabs__div').addClass('hidden');
    var id = $(this).attr('id');
    $('#' + id).removeClass('hidden');
  });

  /* btns clicks */
  $('main').on('click', '.main__btn--add', function() {  
    $(this).addClass('hidden'); 
    $('.body__add-form-section').removeClass('hidden');
    $('.body__add-form-section').animate({
      top: '0vh',
      left: '0vw',
      easing: 'easein'
    }, 225);
  });

  $('main').on('click', '.btn-choose', function() {
    setNewItem($(this).attr('data-element'), $(this).attr('data-value'));

    $('.btn-choose').removeClass('btn-choose--state-chosen').html('Choose');
    $(this).addClass('btn-choose--state-chosen').html('Chosen');

    var icon_elem = $(this).attr('data-icon');
    $('.collapsible-header__span.elem-' + $(this).attr('data-element')).addClass('hidden');
    $('.collapsible-header__span-' + icon_elem).removeClass('hidden');
  });
});