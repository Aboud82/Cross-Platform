Ti.include('GameViewController.js');
(function() {

	var attachToTab = function(_tab) {

		var oneWindow = _tab.window;
		var children = oneWindow.children;
		var childCount = children.length;
		for (var index = 0; index < childCount; index += 1) {
			var oneChild = children[index];
			oneWindow.remove(oneChild);
		}

		oneWindow.add(this.view);
	};

	mttt.ui.createGameMenuViewController = function(_args) {
		var gmvc = {};

		gmvc.attachToTab = attachToTab;

		var view = Ti.UI.createView();
		var PlayModusLabel = createLabel('Play Modus', mttt.app.screenWidth / 2 - 110, mttt.app.screenHeight / 2 - 150, 50, 100);
		var buttonSingle = createButton('Single', (mttt.app.screenWidth / 2 ) - 35, (mttt.app.screenHeight / 2) - 150, 50, 70);
		var buttonDual = createButton('Dual', (mttt.app.screenWidth / 2 ) + 35, (mttt.app.screenHeight / 2) - 150, 50, 70);

		//ich versuche hier die 2 buttons global zu machen, damit du ihre Zustände von außen siehst, und damit die listener methoden (toggle methoden)
		//sie sehen
		gmvc.buttonSingle
		gmvc.buttonDual

		buttonSingle.addEventListener('click', togglePlayModus);
		buttonDual.addEventListener('click', togglePlayModus);

		var yourSignLabel = createLabel('Your Sign', mttt.app.screenWidth / 2 - 110, mttt.app.screenHeight / 2 - 75, 50, 100);
		var button_x = createButton('', (mttt.app.screenWidth / 2 ) - 35, (mttt.app.screenHeight / 2 - 75), 60, 60);
		var button_o = createButton('', (mttt.app.screenWidth / 2 ) + 35, (mttt.app.screenHeight / 2 - 75 ), 60, 60);

		button_x.addEventListener('click', toggleSign);
		button_o.addEventListener('click', toggleSign);

		var howStartsLabel = createLabel('who starts', mttt.app.screenWidth / 2 - 110, mttt.app.screenHeight / 2, 50, 100);
		var buttonCPU = createButton('CPU', (mttt.app.screenWidth / 2 ) - 35, (mttt.app.screenHeight / 2), 50, 70);
		var buttonUser = createButton('User', (mttt.app.screenWidth / 2 ) + 35, (mttt.app.screenHeight / 2), 50, 70);

		buttonCPU.addEventListener('click', toggleWhoStartsButton);
		buttonUser.addEventListener('click', toggleWhoStartsButton);

		var gameServerLabel = createLabel('Game Server', mttt.app.screenWidth / 2 - 110, mttt.app.screenHeight / 2 + 50, 50, 100);
		var gameServerTextField = createTextField(mttt.app.screenWidth / 2 + 15, mttt.app.screenHeight / 2 + 50, 50, 100);
		var nickNameLabel = createLabel('Nickname', mttt.app.screenWidth / 2 - 110, mttt.app.screenHeight / 2 + 110, 50, 100);
		var nickNameTextField = createTextField(mttt.app.screenWidth / 2 + 15, mttt.app.screenHeight / 2 + 110, 50, 100);

		prepareDefaultModus(buttonSingle, button_x, button_o, buttonCPU);

		// Add to the parent view.
		view.add(PlayModusLabel);
		view.add(buttonSingle);
		view.add(buttonDual);
		view.add(yourSignLabel);
		view.add(button_x);
		view.add(button_o);
		view.add(howStartsLabel);
		view.add(buttonCPU);
		view.add(buttonUser);
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
			center : {
				x : center_x,
				y : center_y
			}
		});
		// status property um von außen festzustellen,ob ein Button anklickt ist. 0 steht für nicht angeklickt, 1 für angeklickt.
		button.status = 0;
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
				x : 5,
				y : 5
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

	// method to start default game
	var prepareDefaultModus = function(buttonSingle, button_x, button_o, buttonCPU) {

		buttonSingle.status = 1;
		buttonSingle.enabled = false;

		button_x.backgroundImage = '/images/kreuz.png';
		button_o.backgroundImage = '/images/kreis.png';
		button_x.backgroundDisabledImage = '/images/kreuz_g.png';
		button_o.backgroundDisabledImage = '/images/kreis_g.png';
		button_x.status = 1;
		button_o.enabled = true;
		button_x.enabled = false;

		buttonCPU.status = 1;
		buttonCPU.enabled = false;
	}
	// method ti toggle the play modus buttons
	// ich habe versucht, die properties von den buttons von hier zu ändern. ich konnte die buttons nicht global machen. bei
	// den andern toogle methoden muss man das gleiche machen, die buttons global machen.
	var togglePlayModus = function(e) {

		if (mttt.ui.gmvc.buttonSingle.status == 1) {

			mttt.ui.gmvc.buttonDual.status = 1;
			mttt.ui.gmvc.buttonDual.enabled = false;

			mttt.ui.gmvc.buttonSingle.status = 0;
			mttt.ui.gmvc.buttonSingle.enabled = true;

		} else if (mttt.ui.gmvc.buttonDual.status == 1) {

			mttt.ui.gmvc.buttonDual.status = 0;
			mttt.ui.gmvc.buttonDual.enabled = true;

			mttt.ui.gmvc.buttonSingle.status = 1;
			mttt.ui.gmvc.buttonSingle.enabled = false;
		}
	}
	// method to toggle the status of Sign buttons
	var toggleSign = function(e) {
		if (button_x.status == 1) {
			button_x.status = 0;
			button_o.status = 1;
		} else if (button_o == 1) {
			button_x.status = 1;
			button_o.status = 0;
		}
	}
	// method to toggle the who starts Buttons
	var toggleWhoStartsButton = function(e) {
		if (buttonCPU.status == 1) {
			buttonCPU.status = 0;
			buttonCPU.enabled = false;
			buttonUser.status = 1;
			buttonUser.enabled = true;
		} else if (buttonUser == 1) {
			buttonCPU.status = 1;
			buttonCPU.enabled = false;
			buttonUser.status = 0;
			buttonUser.enabled = true;
		}
	}
})();
