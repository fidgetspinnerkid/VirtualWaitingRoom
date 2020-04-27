var formHTML;

function setFormHTML(){
  formHTML = $("form.render-wrap").html();
  getTableHeaders();
  // on form update, we broadcast to everyone
  broadcast_form(formHTML);
}

// initialize a peer
var peer_id = Math.floor(100000 + Math.random() * 900000).toString();
var conn;
var conns = {};
var peer = new Peer(peer_id, {
  debug: 2
});

// on peer open, we print the peer id
peer.on('open', function (id) {
  // Workaround for peer.reconnect deleting previous id
  if (peer.id === null) {
    console.log('Received null id from peer open');
    peer.id = lastPeerId;
  } else {
    lastPeerId = peer.id;
  }
  console.log('ID: ' + peer.id);

  $("#roomCode").html("<h3>Room Code: " + peer_id + "</h3>")
});

// when there is a connection, we add the connection to a list
peer.on('connection', function (c) {
  conns[c.peer] = c;
  console.log("Connected to: " + c.peer);

  ready(c);
});

// prepare each connection with some listeners.
function ready(conn) {
  conn.on('data', function (data) {
    console.log("Data recieved from " + conn.peer);
    console.log(data);
    log_peer_received(conn.peer, data);
    formatCurrentData();
  });
  conn.on('close', function () {
    console.log(conn.peer);
    console.log(conns[conn.peer]);
    delete conns[conn.peer];
  });
  conn.on('open', function () {
    // send to peer on creation of a new connection
    send_to_peer(conn.peer, formHTML);
  });
}

function broadcast_form(form) {
  for (peer in conns) {
    send_to_peer(peer, form);
    console.log(peer);
  }
}
function send_to_peer(peer_id, message) {
  console.log("sending");
  console.log(message)
  conns[peer_id].send(message);
}

function log_peer_received(peer_id, message) {
  if ("receivedMessages" in conns[peer_id]) {
    conns[peer_id].receivedMessages.push(message);
  } else{
    conns[peer_id].receivedMessages = [message];
  }
}