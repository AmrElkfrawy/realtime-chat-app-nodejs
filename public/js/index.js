const socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');
});

socket.on('disconnect', function () {
  console.log('Disonnected from server.');
});

socket.on('newMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('LT');
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

  // const formattedTime = moment(message.createdAt).format('LT');
  // const li = document.createElement('li');
  // li.innerText = `${message.from} (${formattedTime}): ${message.text} `;

  // const messagesList = document.querySelector('#messages');
  // messagesList.appendChild(li);
});

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('LT');

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

  // const formattedTime = moment(message.createdAt).format('LT');
  // const li = document.createElement('li');
  // li.innerText = `${message.from} (${formattedTime}): `;

  // const a = document.createElement('a');
  // a.setAttribute('target', '_blank');
  // a.setAttribute('href', message.url);
  // a.innerText = 'My current location';
  // li.appendChild(a);

  // const messagesList = document.querySelector('#messages');
  // messagesList.appendChild(li);
});

document.querySelector('#submit-btn').addEventListener('click', function (e) {
  e.preventDefault();
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: document.querySelector('input[name="message"]').value,
    },
    function () {}
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
      function () {
        alert('Unable to fetch location.');
      }
    );
  });
