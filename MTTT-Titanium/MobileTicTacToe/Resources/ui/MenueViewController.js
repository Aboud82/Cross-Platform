Ti.include('GameViewController.js');
(function() {

	var attachToTab = function(_tab) {

		var oneWindow = _tab.window;
		var children = oneWindow.children;
		var childCount = children.length;
		for(var index = 0; index < childCount; index += 1) {
			var oneChild = children[index];
			oneWindow.remove(oneChild);
		}

		oneWindow.add(this.view);
	};
	mttt.ui.createGameMenuViewController = function(_args) {
		var gvc = {};

		gvc.attachToTab = attachToTab;
		var view = Ti.UI.createView();

		gvc.gameMenuLabel = Ti.UI.createLabel({
			text : "Game Menu",
			center : {
				x : (mttt.app.screenWidth / 2),
				y : 20
			}
		});

		// Add to the parent view.
		view.add(gvc.gameMenuLabel);

		var startHSGameButton = Ti.UI.createButton({
			title : 'Hot Seat',
			height : 50,
			width : 100,
			center : {
				x : (mttt.app.screenWidth / 2),
				y : 100
			},
			enabled : true

		});
		startHSGameButton.addEventListener('click', function() {
			view.remove(startHSGameButton);
			view.remove(startCPUGameButton);
			view.remove(gvc.gameMenuLabel);
			mttt.app.gvc = mttt.ui.createGameViewController();
			var oneTab = mttt.app.tabGroup.tabs[0];
			mttt.app.gvc.attachToTab(oneTab);
			mttt.app.gvc.cpu = false;
		});
		view.add(startHSGameButton);

		var startCPUGameButton = Ti.UI.createButton({
			title : 'CPU',
			height : 50,
			width : 100,
			center : {
				x : (mttt.app.screenWidth / 2),
				y : 160
			},
			enabled : true

		});
		startCPUGameButton.addEventListener('click', function() {
			view.remove(startHSGameButton);
			view.remove(startCPUGameButton);
			view.remove(gvc.gameMenuLabel);
			mttt.app.gvc = mttt.ui.createGameViewController();
			var oneTab = mttt.app.tabGroup.tabs[0];
			mttt.app.gvc.attachToTab(oneTab);
			mttt.app.gvc.cpu = true;
			mttt.app.gvc.playerLabel.text = "Your Turn";
		});
		view.add(startCPUGameButton);
		
		var basicSwitch = Titanium.UI.createSwitch({
			value : false
		});
		basicSwitch.addEventListener('change', function(e) {
			Titanium.API.info('Basic Switch value = ' + e.value + ' act val ' + basicSwitch.value);
		});
		view.add(basicSwitch);
		gvc.view = view;

		return gvc;

	};
})();
