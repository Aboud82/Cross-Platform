Ti.API.info('Including network.js');
(function() {
	
	
	// Hostname to listen on/connect to. Here we use the loopback
	// address. iOS also supports Ti.Platform.address (the address of
	// the WiFi interface).
	// Android supports only the loopback address.

	var hostname = 'www.czichos.net';

	
	var clientSocket = Ti.Network.Socket.createTCP({
		host : hostname,
		port : 8080,
		connected : function(e) {
			Ti.API.info('Client socket connected!');
			Ti.Stream.pump(e.socket, pumpCallback, 1024, true);
			e.socket.write(Ti.createBuffer({
				value : 'A message from a connecting socket.'
			}));
		},
		error : function(e) {
			Ti.API.info('Error (' + e.errorCode + '): ' + e.error);
		}
	});

	function writeCallback(e) {
		Ti.API.info('Successfully wrote to socket.');
		alert('Successfully wrote to socket.');
	};

	function pumpCallback(e) {
		// Has the remote socket closed its end?
		if (e.bytesProcessed < 0) {
			Ti.API.info("Closing client socket.");
			clientSocket.close();
			return;
		}
		try {
			if (e.buffer) {
				var received = e.buffer.toString();
				Ti.API.info('Received: ' + received);
			} else {
				Ti.API.error('Error: read callback called with no buffer!');
			}
		} catch (ex) {
			Ti.API.error(ex);
		}
	};
	
	clientSocket.connect();

})();
