
const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");



//From working client
const connection = new WebSocket("ws://localhost:8080");
const button = document.querySelector("#submitter");

connection.onopen = (event) => {
    console.log("WebSocket is open now.");
};

connection.onclose = (event) => {
    console.log("WebSocket is closed now.");
};

connection.onerror = (event) => {
    console.error("WebSocket error observed:", event);
};

connection.onmessage = (event) => {
  // append received message from the server to the DOM element 
  //const chat = document.querySelector("#chat");
  //chat.innerHTML += event.data;
  console.log(event)
  servResponse(event); // recieve a response
};

/*button.addEventListener("click", () => {
  //const name = document.querySelector("#name");
  const name = PERSON_NAME;
  //const message = document.querySelector("#message");
  const message = msgerInput.value
  const data = `<p>${name.value}: ${message.value}</p>`;

  // Send composed message to the server
  connection.send(data);

  // clear input fields
  name.value = "";
  message.value = "";
}); */

//end of coppied code

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg"; //DELETE ME
var PERSON_IMG = "";
const BOT_NAME = "BOT"; //DELETE ME
var PERSON_NAME = "";
var CHAT_ROOM_NUM = 0;

//MODAL SECTION START
// Get the modal
var modalUsername = document.getElementById("configModal");

// Get the button that opens the modal
var buttonUsername = document.getElementById("EnterUsername");
var modalChat = document.getElementById("chatroomModal");
var buttonChat = document.getElementById("chatButton");

// When the user clicks on the button, open the modal
window.onload = function() {
    modalUsername.style.display = "block";
}
$("#userSub").click( function(event) {
  event.preventDefault();
  PERSON_NAME= document.getElementById("UserNameInput").value;
    if (PERSON_NAME === ""){
      PERSON_NAME = "John Doe"
    }
    document.getElementById("userGroup").style.display = "none"
    document.getElementById("profiGroup").style.display = "block"
});
// When the user clicks on the button, close the modal and get the user name from the textbox

// When the user clicks on <span> (x), close the modal


//MODAL SECTION END

function groupSelect(group) {
  CHAT_ROOM_NUM = group.alt
  document.getElementById("configModal").style.display = "none"
}



function selectImage(imgs) {
  // Use the same src in the expanded image as the image being clicked on from the grid
  PERSON_IMG = imgs.src;
  document.getElementById("profiContainer").style.display = "none";
  document.getElementById("groupSelect").style.display = "block";
}


msgerForm.addEventListener("submit", event => {
    event.preventDefault();
  // Start putting your message in your own chat - Lets you see the messages you send in the chat
    let msgText = msgerInput.value;
    if (!msgText) return;
  
    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    msgerInput.value = "";
  //end putting your message in your own chat                        

//Start pushing your message to the server
var messageData = {

  "name": PERSON_NAME,
  "text": msgText,
  "chatRoomId":  CHAT_ROOM_NUM,
  "chatIM": PERSON_IMG
}


  const name = PERSON_NAME; 
  const data = JSON.stringify(messageData)
  //`<p>${name}: ${msgText}</p>`;
console.log(data)
  // Send composed message to the server
  connection.send(data);
  //END of pushing your message ot the server
  });


function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse() {
  const r = random(0, BOT_MSGS.length - 1);
  const msgText = BOT_MSGS[r];
  const delay = msgText.split(" ").length * 100;

  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  }, delay);
}

function servResponse(event) {
  var obj = JSON.parse(event.data)
  //const msgText = event.data;
  const msgText = obj.text;
  console.log(msgText)
  const delay = msgText.split(" ").length * 100;

  setTimeout(() => {
    if((obj.name != PERSON_NAME) && (obj.chatRoomId == CHAT_ROOM_NUM))
    {
    appendMessage(obj.name, obj.chatIM, "left", msgText);
    console.log(PERSON_NAME)
    }
  }, delay);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
