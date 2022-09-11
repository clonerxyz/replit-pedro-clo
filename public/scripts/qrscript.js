let socket = io();

socket.on('newqr', () => {
  window.location.reload();
});