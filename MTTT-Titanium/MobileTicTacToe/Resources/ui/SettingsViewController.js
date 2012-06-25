Ti.include('GameViewController.js');
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

	mttt.ui.createGameMenuViewController = function(_args) {
		var gmvc = {};

		gmvc.attachToTab = attachToTab;

		gmvc.settings = {};
		gmvc.settings.modus = 0;
		gmvc.settings.symbol = 0;
		gmvc.settings.firstPlayer = 0;

		var view = Ti.UI.createView();
		var PlayModusLabel = createLabel('Play Modus', mttt.app.screenWidth / 2 - 110, 50, 50, 100);
		var buttonSingle = createButton('Single', (mttt.app.screenWidth / 2 ) + 10, 50, 50, 70);
		buttonSingle.enabled = false;
		var buttonDual = createButton('Hotseat', (mttt.app.screenWidth / 2 ) + 90, 50, 50, 70);

		buttonSingle.addEventListener('click', function() {
			mttt.app.gmvc.settings.modus = 0;
			buttonDual.enabled = true;
			buttonSingle.enabled = false;
			buttonCpu.title = "CPU";

		});
		buttonDual.addEventListener('click', function() {
			mttt.app.gmvc.settings.modus = 1;
			buttonDual.enabled = false;
			buttonSingle.enabled = true;
			buttonCpu.title = "Player2";
		});

		var yourSignLabel = createLabel('Player1 Symbol', mttt.app.screenWidth / 2 - 110, 120, 50, 100);

		button_x = createButton('', (mttt.app.screenWidth / 2 ) + 10, 120, 60, 60);
		button_x.enabled = false;
		button_x.backgroundImage = '/images/kreuz.png';
		button_x.backgroundDisabledImage = '/images/kreuz_g.png';

		button_o = createButton('', (mttt.app.screenWidth / 2 ) + 90, 120, 60, 60);
		button_o.backgroundImage = '/images/kreis.png';
		button_o.backgroundDisabledImage = '/images/kreis_g.png';

		button_x.addEventListener('click', function() {
			mttt.app.gmvc.settings.symbol = 0;
			button_x.enabled = false;
			button_o.enabled = true;
		});
		button_o.addEventListener('click', function() {
			mttt.app.gmvc.settings.symbol = 1;
			button_x.enabled = true;
			button_o.enabled = false;
		});

		var firstPlayerLabel = createLabel('Starting Player', mttt.app.screenWidth / 2 - 110, 190, 50, 100);
		buttonPlayer = createButton('Player1', mttt.app.screenWidth / 2 + 10, 190, 50, 70);
		buttonPlayer.enabled = false;
		buttonCpu = createButton('CPU', (mttt.app.screenWidth / 2 ) + 90, 190, 50, 70);

		buttonPlayer.addEventListener('click', function() {
			mttt.app.gmvc.settings.firstPlayer = 0;
			buttonPlayer.enabled = false;
			buttonCpu.enabled = true;
		});
		buttonCpu.addEventListener('click', function() {
			mttt.app.gmvc.settings.firstPlayer = 1;
			buttonPlayer.enabled = true;
			buttonCpu.enabled = false;
		});

		var gameServerLabel = createLabel('Game Server', mttt.app.screenWidth / 2 - 110, mttt.app.screenHeight / 2 + 50, 50, 100);
		var gameServerTextField = createTextField(mttt.app.screenWidth / 2 + 50, mttt.app.screenHeight / 2 + 50, 50, 150);
		var nickNameLabel = createLabel('Nickname', mttt.app.screenWidth / 2 - 110, mttt.app.screenHeight / 2 + 110, 50, 100);
		var nickNameTextField = createTextField(mttt.app.screenWidth / 2 + 50, mttt.app.screenHeight / 2 + 110, 50, 150);

		// Add to the parent view.
		view.add(PlayModusLabel);
		view.add(buttonSingle);
		view.add(buttonDual);
		view.add(yourSignLabel);
		view.add(button_x);
		view.add(button_o);
		view.add(firstPlayerLabel);
		view.add(buttonPlayer);
		view.add(buttonCpu);
		view.add(gameServerLabel);
		view.add(gameServerTextField);
		view.add(nickNameLabel);
		view.add(nickNameTextField);

		gmvc.view = view;

		return gmvc;

	};

	var createButton = function(title, center_x, center_y, height, width) {

		var button = Ti.UI.createButton({
			title : title,
			height : height,
			width : width,
			backgroundDisabledColor : '#009',
			center : {
				x : center_x,
				y : center_y
			}
		});
		return button;
	};

	var createTextField = function(center_x, center_y, height, width) {

		var textField = Ti.UI.createTextField({
			color : '#336699',
			height : height,
			width : width,
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			center : {
				x : center_x,
				y : center_y
			}
		});
		return textField;
	};

	var createLabel = function(title, center_x, center_y, height, width) {

		var label = Ti.UI.createLabel({
			color : '#900',
			font : {
				fontSize : 14
			},
			shadowColor : '#aaa',
			shadowOffset : {
				x : 1,
				y : 1
			},
			text : title,
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			height : height,
			width : width,
			center : {
				x : center_x,
				y : center_y
			}

		});
		return label;
	};
})();
