/*Student Name: Abhi Patel, Student num: 301167516, File name : app.js, Date: 02/28/2021*/
// IIFE - Immidiately Invoked Function Expression
(function(){
	function Start(){
		console.log('App started....');

		/*Added code to popup message while deleting business contact */
		let deleteButtons = document.querySelectorAll('.btn-danger')
		
		for(button of deleteButtons)
		{
			button.addEventListener('click',(event)=>{
				if(!confirm("Are you sure?")){
					event.preventDefault();
					window.location.assign('/contact-list');
				}
			});
		}
	}

	window.addEventListener("load",Start);
})();


