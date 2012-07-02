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

	var updateMapView = function(longitude, latitude) {
		mttt.app.mapvc.view.setLocation({
			latitude : latitude,
			longitude : longitude
		});
	};

	mttt.ui.createMapViewController = function(_args) {
		var mapvc = {};
		mapvc.attachToTab = attachToTab;

		var longitude = 52.545;
		var latitude = 13.34;
		var accuracy;

		var player1View = Titanium.Map.createAnnotation({
			latitude : 52.545,
			longitude : 13.3556,
			title : "Martin Fleischer",
			subtitle : 'Score 100',
			pincolor : Titanium.Map.ANNOTATION_RED,
			animate : true,
			leftButton : '/images/controller.png',
			rightButton : '/images/info.png',
			myid : 1 // Custom property to uniquely identify this annotation.
		});

		var player2View = Titanium.Map.createAnnotation({
			latitude : 52.545,
			longitude : 13.36,
			title : "Aboud Chamoun",
			subtitle : 'Score 100',
			pincolor : Titanium.Map.ANNOTATION_RED,
			animate : true,
			leftButton : '/images/controller.png',
			rightButton : '/images/info.png',
			myid : 2 // Custom property to uniquely identify this annotation.
		});

		var mapview = Titanium.Map.createView({
			mapType : Titanium.Map.STANDARD_TYPE,
			region : {
				latitude : longitude,
				longitude : latitude,
				latitudeDelta : 0.01,
				longitudeDelta : 0.01
			},
			animate : true,
			regionFit : true,
			userLocation : false,
			annotations : [player1View, player2View]
		});

		// Handle click events on any annotations on this map.
		mapview.addEventListener('click', function(evt) {

			Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);

			// Check for all of the possible names that clicksouce
			// can report for the left button/view.
			if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' || evt.clicksource == 'leftView') {
				alert("Play with me");
			}
			if (evt.clicksource == 'rightButton' || evt.clicksource == 'rightPane' || evt.clicksource == 'rightView') {
				alert("Show me info");
			}
		});

		if (Titanium.Geolocation.locationServicesEnabled == false) {
			alert('Your device has geo turned off - turn it on.');
		} else {
			Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
			Ti.Geolocation.purpose = "testing";
			Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HIGH;
			Titanium.Geolocation.distanceFilter = 10;

		}

		Ti.Geolocation.addEventListener('location', function(e) {
			if (e.success == null || e.error) {
				//alert("Unable to get your location.");
			} else{
				alert(e.longitude);
				//updateMapView(e.longitude, e.latitude);
			}
		});

		mapvc.view = mapview;

		return mapvc;
	}
})();
