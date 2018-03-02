var formToObject = function formToObject(formArray) {
  var returnArray = {};

  for (var i = 0; i < formArray.length; i++){
    returnArray[formArray[i]['name']] = formArray[i]['value'];
  }
  return returnArray;
}

var loadForm = function loadForm() {
	var user =  getUser();
	if (user.voice === "on")
		$('.form--settings input.voice').attr('checked', 'checked');
	if (user.speech === "on")
		$('.form--settings input.speech').attr('checked', 'checked');
	if (user.swipe === "on")
		$('.form--settings input.swipe').attr('checked', 'checked');
	if (user.vibrate === "on")
		$('.form--settings input.vibrate').attr('checked', 'checked');
	if (user.night_mode === "on")
		$('.form--settings input.night_mode').attr('checked', 'checked');
};

$( document ).ready(function(){
	loadForm();

	$('.form--settings').on('submit', function(e) {
		e.preventDefault();
		user = formToObject($('.form--settings').serializeArray());
		setUser(JSON.stringify(user));
		if (user.vibrate === 'on')
  			navigator.vibrate(200);
	});
})