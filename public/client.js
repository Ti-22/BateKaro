const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let messagearea = document.querySelector('.message_area');

do {
    name = prompt('Please Enter Your Name:').split(' ')[0]
}while(!name);

alert('welcome ' + name);

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(msg) {
    let message = {
        user: name,
        message: msg.trim()
    }
    appendMessage(message, 'outgoing');
    socket.emit('send', message);
}

socket.on('send', (message) => {
    appendMessage(message, 'incoming');
});

function appendMessage(msg,type) {
    let today = new Date();
    let Minutes;
    (today.getMinutes() < 10) ? Minutes = '0' + today.getMinutes() : Minutes = today.getMinutes();
    let time = today.getHours() +':' + Minutes ;
    let mainDiv = document.createElement('div')
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    <p align="right" style="font-size:12px"><b>${time}</b></p>
    `
    mainDiv.innerHTML= markup;
    messagearea.appendChild(mainDiv);
    textarea.value = ''
    scrollToBottom();
}

function scrollToBottom () {
    messagearea.scrollTop = messagearea.scrollHeight;
}

