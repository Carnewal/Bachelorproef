// Generated by CoffeeScript 1.6.3
(function() {
  $(document).ready(function() {
    var emitOrientation, socket;
    $('#mobileInput .btn').click(function() {
      return socket.emit('mobileConnectWithCode', $('#mobileInput input').val());
    });
    socket = io.connect('http://192.168.0.102:1337');
    socket.on("connect", function() {});
    socket.on("error", function(error) {
      return alert(error);
    });
    socket.on("serverAcceptedConnection", function(data) {
      return window.addEventListener('deviceorientation', emitOrientation, false);
    });
    emitOrientation = function(e) {
      return socket.emit("ondeviceorientation", {
        alpha: e.alpha,
        beta: e.beta
      });
    };
    return socket.on("lostConnection", function(data) {
      alert('sorry the connection was lost :-(');
      return window.removeEventListener('deviceorientation', emitOrientation, false);
    });
  });

}).call(this);