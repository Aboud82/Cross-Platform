Ti.API.info('Including ui.js');

(function() {

	mttt.ui = {};

	mttt.ui.createTabGroup = function() {
		// create tab group
		var tabGroup = Titanium.UI.createTabGroup();

		// create tab1 with window
		var win1 = Titanium.UI.createWindow({
			title : 'Game',
			backgroundColor : '#fff'
		});
		var tab1 = Titanium.UI.createTab({
			icon : '/images/controller.png',
			title : 'Game',
			window : win1
		});
		var label1 = Titanium.UI.createLabel({			
		});
		win1.add(label1);

		// create tab2 with window
		var win2 = Titanium.UI.createWindow({
			title : 'Map',
			backgroundColor : '#fff'
		});
		var tab2 = Titanium.UI.createTab({
			icon : '/images/map.png',
			title : 'Map',
			window : win2
		});
		var label2 = Titanium.UI.createLabel({	
		});
		win2.add(label2);

		// create tab2 with window
		var win3 = Titanium.UI.createWindow({
			title : 'Settings',
			backgroundColor : '#fff'
		});
		var tab3 = Titanium.UI.createTab({
			icon : '/images/settings.png',
			title : 'Settings',
			window : win3
		});
		var label3 = Titanium.UI.createLabel({		
		});
		win3.add(label3);

		//  add tabs
		tabGroup.addTab(tab1);
		tabGroup.addTab(tab2);
		tabGroup.addTab(tab3);

		// open tab group
		return tabGroup;
	}
})();

//Include additional namespaces
Ti.include('GameViewController.js');
Ti.include('SettingsViewController.js');
Ti.include('MapViewController.js');