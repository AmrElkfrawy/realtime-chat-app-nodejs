const socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');
});

socket.on('disconnect', function () {
  console.log('Disonnected from server.');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});

socket.emit(
  'createMessage',
  {
    from: 'John',
    text: 'Hey',
  },
  function (serverData) {
    // Use the same name 'callback' for the parameter
    console.log('Server got it:', serverData);
  }
);
