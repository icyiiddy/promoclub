const socket = io.connect('http://localhost:3000');

const output = document.querySelector('#output');

socket.on('sendNotification', data => {
  console.log(data);
	output.innerHTML += 'A new notification';
});
