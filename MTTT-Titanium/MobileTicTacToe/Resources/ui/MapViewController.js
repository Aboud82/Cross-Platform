(function() {

	var attachToTab = function(_tab) {
		var oneWindow = _tab.window;
		var children = oneWindow.children;
		if (children != null) {
			var childCount = children.length;
			for (var index = 0; index < childCount; index += 1) {
				var oneChild = children[index];
				oneWindow.remove(oneChild);
			}
		}
		oneWindow.add(this.view);
	};

	mttt.ui.createMapViewController = function(_args) {
		var mapvc = {};

		mapvc.attachToTab = attachToTab;

		var mountainView = Titanium.Map.createAnnotation({
			latitude : 37.390749,
			longitude : -122.081651,
			title : "Appcelerator Headquarters",
			subtitle : 'Mountain View, CA',
			pincolor : Titanium.Map.ANNOTATION_RED,
			animate : true,
			leftButton : '../images/appcelerator_small.png',
			myid : 1 // Custom property to uniquely identify this annotation.
		});

		var mapview = Titanium.Map.createView({
			mapType : Titanium.Map.STANDARD_TYPE,
			region : {
				latitude : 33.74511,
				longitude : -84.38993,
				latitudeDelta : 0.01,
				longitudeDelta : 0.01
			},
			animate : true,
			regionFit : true,
			userLocation : true,
			annotations:[mountainView]
		});

		// Handle click events on any annotations on this map.
		mapview.addEventListener('click', function(evt) {

			Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);

			// Check for all of the possible names that clicksouce
			// can report for the left button/view.
			if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' || evt.clicksource == 'leftView') {
				Ti.API.info("Annotation " + evt.title + ", left button clicked.");
			}
		});

		mapvc.view = mapview;

		return mapvc;
	}
})();
