Ti.API.info('Including GameViewController.js');
Ti.include('/ki/ki.js');
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

	var clickEvent = function(e) {
		disableButtons();
		if (mttt.app.gvc.settings.modus == 0) {
			e.source.backgroundDisabledImage = mttt.app.gvc.symbolPlayer1;
			e.source.enabled = false;
			e.source.state = 1;
		} else if ((mttt.app.gvc.player == 0 && mttt.app.gvc.settings.firstPlayer == 0) || (mttt.app.gvc.player == 1 && mttt.app.gvc.settings.firstPlayer == 1)) {
			e.source.backgroundDisabledImage = mttt.app.gvc.symbolPlayer1;
			e.source.enabled = false;
			e.source.state = 1;
		} else {
			e.source.backgroundDisabledImage = mttt.app.gvc.symbolPlayer2;
			e.source.enabled = false;
			e.source.state = 2;
		}
		var winningLine = isGameOver();
		if (winningLine != 0) {
			endGame(winningLine);
		} else {
			turn();
		}
	};

	var turn = function() {
		enableButtons();
		mttt.app.gvc.player = (mttt.app.gvc.player + 1) % 2;
		mttt.app.gvc.turn += 1;
		if (mttt.app.gvc.settings.modus == 1) {
			if ((mttt.app.gvc.settings.firstPlayer == 0 && mttt.app.gvc.player == 0) || (mttt.app.gvc.settings.firstPlayer == 1 && mttt.app.gvc.player == 1)) {
				mttt.app.gvc.playerLabel.text = "Player1";
			} else {
				mttt.app.gvc.playerLabel.text = "Player2";
			}
		} else if ((mttt.app.gvc.settings.firstPlayer == 0 && mttt.app.gvc.player == 1) || (mttt.app.gvc.settings.firstPlayer == 1 && mttt.app.gvc.player == 0)) {
			disableButtons();
			cpu();
		}
	};

	var cpu = function() {
		mttt.app.gvc.playerLabel.text = "CPU Turn";
		setTimeout(function() {
			if (mttt.app.gvc.turn == 0) {
				cpuFirstTurn(true);
			} else if (mttt.app.gvc.turn == 1) {
				cpuFirstTurn(false);
			} else {
				cpuTurn();
			}
			var winningLine = isGameOver();
			if (winningLine != 0) {
				endGame(winningLine);
			} else {
				turn();
				mttt.app.gvc.playerLabel.text = "Your Turn";
				enableButtons();
			}
		}, 1000);

	};

	var enableButtons = function() {
		for (var i = 0; i < mttt.app.gvc.buttonsArray.length; i++) {
			if (mttt.app.gvc.buttonsArray[i].state == 0) {
				mttt.app.gvc.buttonsArray[i].enabled = true;
			}
		}
	};
	var disableButtons = function() {
		for (var i = 0; i < mttt.app.gvc.buttonsArray.length; i++) {
			mttt.app.gvc.buttonsArray[i].enabled = false;
		}
	};

	var endGame = function(winningLine) {
		disableButtons();
		if (winningLine == 1) {
			alert("Draw");
			setTimeout(function() {
				returnToGameMenu();
			}, 3000);
			return;
		}
		var image;

		if ((mttt.app.gvc.settings.firstPlayer == 0 && mttt.app.gvc.player == 0) || (mttt.app.gvc.settings.firstPlayer == 1 && mttt.app.gvc.player == 1)) {
			image = mttt.app.gvc.symbolPlayer1Wins;
		} else {

			image = mttt.app.gvc.symbolPlayer2Wins;
		}

		mttt.app.gvc.buttonsArray[winningLine[0]].backgroundDisabledImage = image;
		mttt.app.gvc.buttonsArray[winningLine[1]].backgroundDisabledImage = image;
		mttt.app.gvc.buttonsArray[winningLine[2]].backgroundDisabledImage = image;
		setTimeout(function() {
			if ((mttt.app.gvc.settings.firstPlayer == 0 && mttt.app.gvc.player == 0) || (mttt.app.gvc.settings.firstPlayer == 1 && mttt.app.gvc.player == 1)) {
				alert(mttt.app.gvc.playerLabel.text = "Player1 wins");
			} else {
				if (mttt.app.gvc.settings.modus == 0) {
					alert(mttt.app.gvc.playerLabel.text = "CPU wins");
				} else {
					alert(mttt.app.gvc.playerLabel.text = "Player2 wins");
				}
			}
		}, 2000);

		setTimeout(function() {
			returnToGameMenu();
		}, 3000);
		return;
	};

	var returnToGameMenu = function() {
		mttt.app.gvc.view.remove(mttt.app.gvc.grid);
		mttt.app.gvc.view.remove(mttt.app.gvc.playerLabel);
		for (var i = 0; i < mttt.app.gvc.buttonsArray.length; i++) {
			mttt.app.gvc.view.remove(mttt.app.gvc.buttonsArray[i]);
		}

		mttt.app.gvc = mttt.ui.createGameStartMenuView();
		var oneTab = mttt.app.tabGroup.tabs[0];
		mttt.app.gvc.attachToTab(oneTab);
	}
	var isGameOver = function() {
		for (var i = 0; i < mttt.app.gvc.winLines.length; i++) {
			if (mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state != 0 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state == mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state == mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state) {
				return mttt.app.gvc.winLines[i];
			}
		}
		if (mttt.app.gvc.turn == 8) {
			return 1;
		}
		return 0;
	};

	var buttonFactoryCreate = function(view) {
		var buttonX = 95;
		var buttonY = 113;
		var buttonsArray = [];
		for (var x = 0; x < 3; x++) {
			for (var y = 0; y < 3; y++) {
				var button = Ti.UI.createButton({
					backgroundImage : '/images/leer.png',
					backgroundDisabledImage : '/images/leer.png',
					width : 60,
					height : 60,
					center : {
						x : buttonX + (x * 67),
						y : buttonY + (y * 67)
					},
					enabled : false,
					index : (x * 3) + y,
					state : 0
				});
				buttonsArray.push(button);
				button.addEventListener('click', clickEvent);
				view.add(button);
			}
		}
		return buttonsArray;
	};

	var createWinLines = function() {
		winLinesArray = [];
		// horizontal
		winLinesArray[0] = new Array(0, 1, 2);
		winLinesArray[1] = new Array(3, 4, 5);
		winLinesArray[2] = new Array(6, 7, 8);
		// vertical
		winLinesArray[3] = new Array(0, 3, 6);
		winLinesArray[4] = new Array(1, 4, 7);
		winLinesArray[5] = new Array(2, 5, 8);
		// diagonal
		winLinesArray[6] = new Array(0, 4, 8);
		winLinesArray[7] = new Array(2, 4, 6);

		return winLinesArray;
	};

	var getSettings = function() {
		var settings = {};
		settings.modus = mttt.app.gmvc.settings.modus;
		settings.symbol = mttt.app.gmvc.settings.symbol;
		settings.firstPlayer = mttt.app.gmvc.settings.firstPlayer;
		return settings;
	};

	mttt.ui.createGameViewController = function(settings) {

		var gvc = {};

		gvc.attachToTab = attachToTab;
		gvc.player = 0;
		gvc.turn = 0;
		gvc.settings = settings;

		if (settings.symbol == 0) {
			gvc.symbolPlayer1 = "/images/kreuz.png";
			gvc.symbolPlayer1Wins = '/images/kreuz_g.png';
			gvc.symbolPlayer2 = "/images/kreis.png";
			gvc.symbolPlayer2Wins = '/images/kreis_g.png';
		} else {
			gvc.symbolPlayer1 = "/images/kreis.png";
			gvc.symbolPlayer1Wins = '/images/kreis_g.png';
			gvc.symbolPlayer2 = "/images/kreuz.png";
			gvc.symbolPlayer2Wins = '/images/kreuz_g.png';
		}

		var view = Ti.UI.createView();

		gvc.winLines = createWinLines();

		var labelText = "Player1";
		if (gvc.settings.firstPlayer == 1) {
			labelText = "Player2";
		}
		// Create a Label.
		gvc.playerLabel = Ti.UI.createLabel({
			text : labelText,
			center : {
				x : (mttt.app.screenWidth / 2),
				y : 20
			}
		});

		// Add to the parent view.
		view.add(gvc.playerLabel);

		var grid = Ti.UI.createImageView({
			image : '/images/grid.png'
		})
		view.add(grid);
		gvc.grid = grid;

		gvc.buttonsArray = buttonFactoryCreate(view);

		gvc.view = view;

		return gvc;
	};

	mttt.ui.createGameStartMenuView = function(_args) {
		var gvc = {};

		gvc.attachToTab = attachToTab;
		var view = Ti.UI.createView();

		var startGameButton = Ti.UI.createButton({
			title : 'Start Game',
			height : 50,
			width : 100,
			center : {
				x : (mttt.app.screenWidth / 2),
				y : (mttt.app.screenWidth / 2)
			},
			enabled : true

		});
		startGameButton.addEventListener('click', function() {
			view.remove(startGameButton);
			mttt.app.gvc = mttt.ui.createGameViewController(getSettings());
			var oneTab = mttt.app.tabGroup.tabs[0];
			mttt.app.gvc.attachToTab(oneTab);
			if (mttt.app.gvc.settings.modus == 0 && mttt.app.gvc.settings.firstPlayer == 1) {
				disableButtons();
				cpu();
			} else {
				enableButtons();
			}

		});
		view.add(startGameButton);

		gvc.view = view;

		return gvc;
	};
})();
