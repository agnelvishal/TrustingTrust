var slideshow;
window.onload = function(){

	var avwords="words.html";
	var requestURL = 'https://ipinfo.io/json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.onreadystatechange=function(){
		    if (request.readyState === 4){   //if complete
		        if(request.status === 200){  //check if "OK" (200)
		        console.log("location success");
		        }
			 else{
				 avwords="words.html";
				 console.log("location failure");
				 hello();
			 }

    }
	 };

	 try
	 {
		request.send();
		request.onload = function() {

		 var json=request.response;
		 if(json.region=="Tamil Nadu")
			 {
				 avwords="tamilWords.html";
				 console.log("tamil text");
			 }
			 else
			 {
				 avwords="words.html";
				 console.log("international text");
			 }
			}
		}
		finally{
			hello();

		}
	// PRELOADER
	function hello()
	{
	Q.all([
		Loader.loadAssets(Loader.manifestPreload),
		Words.convert(avwords)
	]).then(function(){

		// CHANGE DOM
		document.body.removeChild($("#preloader"));
		$("#main").style.display = "block";
		$("#footer").style.display = "block";

		// Slideshow
		slideshow = new Slideshow({
			dom: $("#slideshow"),
			slides: SLIDES
		});

		// Slide Select
		slideSelect = new SlideSelect({
			dom: $("#select"),
			slides: SLIDES
		});
		slideSelect.dom.style.display = "none";
		subscribe("start/game", function(){
			slideSelect.dom.style.display = "block";

			// [FOR DEBUGGING]
	 			publish("slideshow/next");
			//publish("slideshow/scratch", ["credits"]);

		});

		// SOUND
		var _soundIsOn = true;
		$("#sound").onclick = function(){
			_soundIsOn = !_soundIsOn;
			Howler.mute(!_soundIsOn);
			$("#sound").setAttribute("sound", _soundIsOn?"on":"off");
		};

		// LOAD REAL THINGS
		Loader.loadAssets(
			Loader.manifest,
			function(){
				publish("preloader/done");
			},
			function(ratio){
				publish("preloader/progress", [ratio]);
			}
		);

		// First slide!
		slideshow.nextSlide();

	});


}
};
