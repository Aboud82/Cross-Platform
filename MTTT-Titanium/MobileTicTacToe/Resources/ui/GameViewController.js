Ti.API.info('Including GameViewController.js');
Ti.include('/ki/ki.js');
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
	var clickEvent = function(e) {
		if(mttt.app.gvc.player == 0) {
			e.source.backgroundDisabledImage = '/images/kreuz.png';
			e.source.enabled = false;
			e.source.state = 1;
		} else {
			e.source.backgroundDisabledImage = '/images/kreis.png';
			e.source.enabled = false;
			e.source.state = 2;
		}

		var winningLine = isGameOver();
		if(winningLine != 0) {
			endGame(winningLine);
		} else {
			turn();
		}
	};

	var turn = function() {
		mttt.app.gvc.player = (mttt.app.gvc.player + 1) % 2;
		mttt.app.gvc.turn += 1;
		if(mttt.app.gvc.cpu == false) {
			mttt.app.gvc.playerLabel.text = (mttt.app.gvc.player + 1) + " Player's Turn";
		}
		if(mttt.app.gvc.player == 1 && mttt.app.gvc.cpu == true) {
			mttt.app.gvc.playerLabel.text = "CPU Turn";
			if(mttt.app.gvc.turn == 1) {
				cpuFirstTurn()
			} else {
				cpuTurn();
			}
			setTimeout(function() {
				var winningLine = isGameOver();
				if(winningLine != 0) {
					endGame(winningLine);
				} else {
					turn();
				}
			}, 1000);
		}

	};

	var endGame = function(winningLine) {
		if(winningLine == 1) {
			alert("Draw");
			setTimeout(function() {
				returnToGameMenu();
			}, 3000);
			return;
		}
		for(var i = 0; i < mttt.app.gvc.buttonsArray.length; i++) {
			mttt.app.gvc.buttonsArray[i].enabled = false;
		}
		var image;
		if(mttt.app.gvc.player == 0) {
			image = '/images/kreuz_g.png'
		}
		if(mttt.app.gvc.player == 1) {
			image = '/images/kreis_g.png'
		}
		mttt.app.gvc.buttonsArray[winningLine[0]].backgroundDisabledImage = image;
		mttt.app.gvc.buttonsArray[winningLine[1]].backgroundDisabledImage = image;
		mttt.app.gvc.buttonsArray[winningLine[2]].backgroundDisabledImage = image;
		setTimeout(function() {
			alert("Player" + (mttt.app.gvc.player + 1) + " wins")
		}, 2000);

		setTimeout(function() {
			returnToGameMenu();
		}, 3000);
	};

	var returnToGameMenu = function() {
		mttt.app.gvc.view.remove(mttt.app.gvc.grid);
		mttt.app.gvc.view.remove(mttt.app.gvc.playerLabel);

		for(var i = 0; i < mttt.app.gvc.buttonsArray.length; i++) {
			mttt.app.gvc.view.remove(mttt.app.gvc.buttonsArray[i]);
		}

		mttt.app.gvc = mttt.ui.createGameMenuViewController();
		var oneTab = mttt.app.tabGroup.tabs[0];
		mttt.app.gvc.attachToTab(oneTab);
	}
	var isGameOver = function() {
		for(var i = 0; i < mttt.app.gvc.winLines.length; i++) {
			if(mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state != 0 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state == mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state == mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state) {
				return mttt.app.gvc.winLines[i];
			}
		}
		if(mttt.app.gvc.turn == 8) {

			return 1;
		}
		return 0;
	};

	var buttonFactoryCreate = function(view) {
		var buttonX = 95;
		var buttonY = 113;
		var buttonsArray = [];
		for(var x = 0; x < 3; x++) {
			for(var y = 0; y < 3; y++) {
				var button = Ti.UI.createButton({
					backgroundImage : '/images/leer.png',
					backgroundDisabledImage : '/images/leer.png',
					width : 60,
					height : 60,
					center : {
						x : buttonX + (x * 67),
						y : buttonY + (y * 67)
					},
					enabled : true,
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
	}
	mttt.ui.createGameViewController = function(_args) {

		var gvc = {};

		gvc.attachToTab = attachToTab;
		gvc.player = 0;
		gvc.turn = 0;

		var view = Ti.UI.createView();

		gvc.winLines = createWinLines();

		// Create a Label.
		gvc.playerLabel = Ti.UI.createLabel({
			text : "1 Player's Turn",
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

	
})();
