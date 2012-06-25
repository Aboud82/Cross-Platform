var cpuFirstTurn = function(starting) {
	for (var i = 0; i < mttt.app.gvc.buttonsArray.length; i++) {
		if (starting == true) {
			var randomNumber = getRandomFreeField();
			mttt.app.gvc.buttonsArray[randomNumber].backgroundDisabledImage = getImage();
			mttt.app.gvc.buttonsArray[randomNumber].enabled = false;
			mttt.app.gvc.buttonsArray[randomNumber].state = 2;

			return;
		}
		if (mttt.app.gvc.buttonsArray[i].state == 1 && i != 4) {
			mttt.app.gvc.buttonsArray[4].backgroundDisabledImage = getImage();
			mttt.app.gvc.buttonsArray[4].enabled = false;
			mttt.app.gvc.buttonsArray[4].state = 2;
			return;
		}
		if (mttt.app.gvc.buttonsArray[i].state == 1 && i == 4) {
			mttt.app.gvc.buttonsArray[0].backgroundDisabledImage = getImage();
			mttt.app.gvc.buttonsArray[0].enabled = false;
			mttt.app.gvc.buttonsArray[0].state = 2;
			return;
		}
	}
};

var cpuTurn = function() {
	for (var i = 0; i < mttt.app.gvc.winLines.length; i++) {
		if (mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state == 0 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state == 2 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state == 2) {
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].backgroundDisabledImage = getImage();
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].enabled = false;
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state = 2;
			return;
		}
		if (mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state == 0 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state == 2 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state == 2) {
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].backgroundDisabledImage = getImage();
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].enabled = false;
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state = 2;
			return;
		}
		if (mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state == 0 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state == 2 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state == 2) {
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].backgroundDisabledImage = getImage();
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].enabled = false;
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state = 2;
			return;
		}
	}

	for (var i = 0; i < mttt.app.gvc.winLines.length; i++) {
		if (mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state == 0 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state == 1 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state == 1) {
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].backgroundDisabledImage = getImage();
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].enabled = false;
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state = 2;
			return;
		}
		if (mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state == 0 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state == 1 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state == 1) {
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].backgroundDisabledImage = getImage();
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].enabled = false;
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state = 2;
			return;
		}
		if (mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state == 0 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state == 1 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state == 1) {
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].backgroundDisabledImage = getImage();
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].enabled = false;
			mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state = 2;
			return;
		}
	}
	var randomNumber = getRandomFreeField();

	mttt.app.gvc.buttonsArray[randomNumber].backgroundDisabledImage = getImage();
	mttt.app.gvc.buttonsArray[randomNumber].enabled = false;
	mttt.app.gvc.buttonsArray[randomNumber].state = 2;
	return;


};

var getRandomFreeField = function() {
	var randomNumber = Math.floor((Math.random() * 8));
	while (mttt.app.gvc.buttonsArray[randomNumber].state != 0) {
		randomNumber = Math.floor((Math.random() * 8));
	}
	return randomNumber;
};

var getImage = function() {
	if (mttt.app.gvc.settings.symbol == 1) {
		return '/images/kreuz.png';
	} else {
		return '/images/kreis.png';
	}
}; 