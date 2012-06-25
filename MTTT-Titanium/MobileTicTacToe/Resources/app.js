// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

Ti.include('mttt.js');

// mttt.js creates the following namespaces
// mttt
// mttt.app

mttt.app.tabGroup = mttt.ui.createTabGroup();

mttt.app.tabGroup.open();

mttt.app.gmvc = mttt.ui.createGameMenuViewController();
var threeTab = mttt.app.tabGroup.tabs[2];
mttt.app.gmvc.attachToTab(threeTab);

mttt.app.mapvc = mttt.ui.createMapViewController();
var twoTab = mttt.app.tabGroup.tabs[1];
mttt.app.mapvc.attachToTab(twoTab);

mttt.app.gvc = mttt.ui.createGameStartMenuView();
var oneTab = mttt.app.tabGroup.tabs[0];
mttt.app.gvc.attachToTab(oneTab);
