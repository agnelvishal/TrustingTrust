var slideshow;
window.onload = function(){

	var avwords;
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

		request.send();
		request.onload = function() {

		 var json=request.response;
		 if(json.region=="Tamil Nadu")
			 {
				 avwords="tamilWords.html";
				 console.log("tamil text");
				 hello();
			 }
			 else
			 {
				 avwords="words.html";
				 console.log("international text");
				 hello();
			 }
		 }
	// PRELOADER
	function hello()
	{
	Q.all([
		//Loader.loadAssets(Loader.manifestPreload),
		Words.convert(avwords)
	]).then(function(){

		// CHANGE DOM
		document.body.removeChild($("#preloader"));
		$("#main").style.display = "block";
	//	$("#footer").style.display = "block";

		// Slideshow
		slideshow = new Slideshow({
			dom: $("#slideshow"),
			slides: SLIDES
		});

		// Slide Select



		subscribe("start/game", function(){



			// [FOR DEBUGGING]
			publish("slideshow/next");
			//publish("slideshow/scratch", ["credits"]);

		});

		// SOUND


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
