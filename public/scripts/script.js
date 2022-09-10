const socket = io();

socket.emit('start');

socket.on('load_msg', (chats) => {
  const div = document.querySelector('.chatlog__container');
  chats.forEach((data) => {
    const span = document.createElement('span');
    span.innerHTML = `(${data?.group}) From <a href="https://wa.me/${data?.number}">${data?.number}</a> AKA ${data?.name}: ${data?.msg}`;
    span.classList.add('msg');
    span.onclick = () => copyMsg(data.msg);
    div.appendChild(span);
    div.scrollTo(0, div.scrollHeight);
  });
})

socket.on('new_msg', (data) => {
  const div = document.querySelector('.chatlog__container');
  const span = document.createElement('span');
  span.innerHTML = `(${data?.chat}) From <a href="https://wa.me/${data.author?.number}">${data.author?.number}</a> AKA ${data.author?.pushname}: ${data.msg}`;
  span.classList.add('msg');
  span.onclick = () => copyMsg(data.msg);
  div.appendChild(span);
  div.scrollTo(0, div.scrollHeight);
});

socket.on('clear_msg_done', () => {
  const div = document.querySelector('.chatlog__container');
  div.innerHTML = '';
});

function clearMsg() {
  socket.emit('clear_msg');
}

function navigate(location) {
  window.location.replace(location);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function copyMsg(msg) {
  navigator.clipboard.writeText(msg);
  const div = document.querySelector('.info__container');
  div.firstElementChild.firstElementChild.innerText = `Copied "${msg}"`
  div.classList.remove('hideInfo');
  await delay(2000);
  div.classList.add('hideInfo');
}