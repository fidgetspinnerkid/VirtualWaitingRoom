var peer_id = null;
var conn_id;
var peer_open = false;
var conn;
var conns = {};
var peer = new Peer(peer_id, {
  debug: 2
});

// on peer open, we print the peer id
peer.on('open', function (id) {
  peer_open = true;

  // Workaround for peer.reconnect deleting previous id
  if (peer.id === null) {
    console.log('Received null id from peer open');
    peer.id = lastPeerId;
  } else {
    lastPeerId = peer.id;
  }
  console.log('ID: ' + peer.id);

  if (conn_id) {
    // if there is a connection to join, join it.
    conn = peer.connect(conn_id, {
      reliable: true
    });
  }

  $("#roomCode").html("<h3>Room Code: " + peer_id + "</h3>")
});

// // when there is a connection, we add the connection to a list
// peer.on('connection', function (c) {
//   conns[c.peer] = c;
//   console.log("Connected to: " + c.peer);

//   ready(c);
// });

function join() {
  // Close old connection
  if (conn) {
    conn.close();
  }

  // Create connection to destination peer specified in the input field
  conn = peer.connect(conn_id, {
    reliable: true
  });

  conn.on('open', function () {
    status.innerHTML = "Connected to: " + conn.peer;
    console.log("Connected to: " + conn.peer);
  });
  // Handle incoming data (messages only since this is the signal sender)
  conn.on('data', function (data) {
    console.log(data);
    $("#mainForm").html(data);
    // addMessage("<span class=\"peerMsg\">Peer:</span> " + data);
  });
  conn.on('close', function () {
    // status.innerHTML = "Connection closed";
  });
};

$("#roomIDForm").submit(function(){
  console.log("submitted");
  conn_id = $("#room_id").val();

  if (peer_open) {
    console.log("hello");
    join();
  }
  return false;
})