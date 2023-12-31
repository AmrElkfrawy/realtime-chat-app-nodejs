const socket = io();

function scrollToBottem() {
  const message = document.querySelector('#messages').lastElementChild;
  message.scrollIntoView();
}

socket.on('connect', function () {
  console.log('Connected to server.');
});

socket.on('disconnect', function () {
  console.log('Disonnected from server.');
});

socket.on('newMessage', function (message) {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const formattedHour = currentHour.toString().padStart(2, '0');
  const formattedMinute = currentMinute.toString().padStart(2, '0');
  const formattedTime = `${formattedHour}:${formattedMinute}`;

  const template = document.querySelector('#message-template').innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime,
  });

  const div = document.createElement('div');
  div.innerHTML = html;

  const messagesList = document.querySelector('#messages');
  messagesList.appendChild(div);
  scrollToBottem();
});

socket.on('newLocationMessage', function (message) {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const formattedHour = currentHour.toString().padStart(2, '0');
  const formattedMinute = currentMinute.toString().padStart(2, '0');
  const formattedTime = `${formattedHour}:${formattedMinute}`;

  const template = document.querySelector(
    '#location-message-template'
  ).innerHTML;

  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime,
  });

  const div = document.createElement('div');
  div.innerHTML = html;

  const messagesList = document.querySelector('#messages');
  messagesList.appendChild(div);
  scrollToBottem();
});

document.querySelector('#submit-btn').addEventListener('click', function (e) {
  e.preventDefault();
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: document.querySelector('input[name="message"]').value,
    },
    function (acc) {
      console.log(acc);
    }
  );
});

document
  .querySelector('#sendlocation-btn')
  .addEventListener('click', function (e) {
    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(
      function (position) {
        socket.emit('createLocationMessage', {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      function (acc) {
        console.log(acc);
      }
    );
  });
