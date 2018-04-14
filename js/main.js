var slideshow;
window.onload = function(){


	//document.addEventListener("click",function(){screenfull.request();},false);

	// PRELOADER
	Q.all([
	//	Loader.loadAssets(Loader.manifestPreload),
		Words.convert("words.html")
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

};
