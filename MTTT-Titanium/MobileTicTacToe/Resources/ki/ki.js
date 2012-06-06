var cpuFirstTurn = function() {
	setTimeout(function() {
		for(var i = 0; i < mttt.app.gvc.buttonsArray.length;i++){
			if(mttt.app.gvc.buttonsArray[i].state ==  1 && i != 4){
				mttt.app.gvc.buttonsArray[4].backgroundDisabledImage = '/images/kreis.png';
				mttt.app.gvc.buttonsArray[4].enabled = false;
				mttt.app.gvc.buttonsArray[4].state = 2;
				mttt.app.gvc.playerLabel.text = "Your Turn";
				return;
			}
			if(mttt.app.gvc.buttonsArray[i].state ==  1 && i == 4){
				mttt.app.gvc.buttonsArray[0].backgroundDisabledImage = '/images/kreis.png';
				mttt.app.gvc.buttonsArray[0].enabled = false;
				mttt.app.gvc.buttonsArray[0].state = 2;
				mttt.app.gvc.playerLabel.text = "Your Turn";
				return;
			}
		}
	},1000);
};
var cpuTurn = function() {
	setTimeout(function() {
		for(var i = 0; i < mttt.app.gvc.winLines.length; i++) {
			if(mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state == 0 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state == 2 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state == 2) {

				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].backgroundDisabledImage = '/images/kreis.png';
				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].enabled = false;
				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state = 2;
				mttt.app.gvc.playerLabel.text = "Your Turn";
				return;
			}
			if(mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state == 0 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state == 2 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state == 2) {

				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].backgroundDisabledImage = '/images/kreis.png';
				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].enabled = false;
				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state = 2;
				mttt.app.gvc.playerLabel.text = "Your Turn";
				return;
			}
			if(mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state == 0 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state == 2 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state == 2) {

				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].backgroundDisabledImage = '/images/kreis.png';
				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].enabled = false;
				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state = 2;
				mttt.app.gvc.playerLabel.text = "Your Turn";
				return;
			}
		}
		
		for(var i = 0; i < mttt.app.gvc.winLines.length; i++) {
			if(mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state == 0 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state == 1 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state == 1) {

				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].backgroundDisabledImage = '/images/kreis.png';
				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].enabled = false;
				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state = 2;
				mttt.app.gvc.playerLabel.text = "Your Turn";
				return;
			}
			if(mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state == 0 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state == 1 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state == 1) {

				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].backgroundDisabledImage = '/images/kreis.png';
				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].enabled = false;
				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state = 2;
				mttt.app.gvc.playerLabel.text = "Your Turn";
				return;
			}
			if(mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state == 0 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][1]].state == 1 && mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][2]].state == 1) {

				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].backgroundDisabledImage = '/images/kreis.png';
				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].enabled = false;
				mttt.app.gvc.buttonsArray[mttt.app.gvc.winLines[i][0]].state = 2;
				mttt.app.gvc.playerLabel.text = "Your Turn";
				return;
			}
		}
		var randomNumber = getRandomFreeField();
		mttt.app.gvc.buttonsArray[randomNumber].backgroundDisabledImage = '/images/kreis.png';
		mttt.app.gvc.buttonsArray[randomNumber].enabled = false;
		mttt.app.gvc.buttonsArray[randomNumber].state = 2;
		
		mttt.app.gvc.playerLabel.text = "Your Turn";
	}, 1000);
};

var getRandomFreeField = function() {
	var randomNumber = Math.floor((Math.random() * 8));
	while(mttt.app.gvc.buttonsArray[randomNumber].state != 0) {
		randomNumber = Math.floor((Math.random() * 8));
	}
	return randomNumber;
}; 