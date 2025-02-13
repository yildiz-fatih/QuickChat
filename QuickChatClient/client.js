import {
  createMessageElement,
  createUserListItem,
  createWelcomeMessage,
} from "./domUtils";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "bootstrap";
import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://192.168.0.24:5007/chathub")
  .configureLogging(signalR.LogLevel.Information)
  .build();

connection.start();

let localUserName = ""; // Store sender's username

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  localUserName = document.getElementById("userNameInput").value;

  connection.invoke("GetUserName", localUserName).catch(console.error);

  // Replace the login form with the welcome message using the utility function
  const loginFormContainer = document.getElementById("loginFormContainer");
  loginFormContainer.innerHTML = ""; // Clear the login form content
  loginFormContainer.appendChild(createWelcomeMessage(localUserName));

  // Show the hidden elements for the logged-in user
  document.getElementById("messageFormContainer").classList.remove("hidden");
  document.getElementById("userListContainer").classList.remove("hidden");
});

connection.on("UserJoined", (userName) => {
  const alertElement = document.getElementById("userJoinAlert");

  // Set the message
  alertElement.innerHTML = `${userName} has joined!`;

  // Make the alert visible
  alertElement.classList.remove("hidden");

  // Hide the alert after 2 seconds
  setTimeout(() => {
    alertElement.classList.add("hidden");
  }, 2000);
});

connection.on("UserListUpdate", (userList) => {
  const userListItems = document.getElementById("userListItems");
  userListItems.innerHTML = "";

  // Always include the default "all" option at the top
  userListItems.appendChild(createUserListItem("all"));

  userList.forEach((user) => {
    userListItems.appendChild(createUserListItem(user.userName));
  });
});

// Message form submission
document.getElementById("messageForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const message = document.getElementById("messageInput").value;
  const targetUserName = document.querySelector(
    'input[name="selectedUser"]:checked'
  ).id;

  const container = document.getElementById("messagesContainer");
  container.classList.remove("hidden");

  container.appendChild(
    createMessageElement(localUserName, targetUserName, message)
  );

  connection
    .invoke("SendMessage", message, targetUserName)
    .catch(console.error);

  document.getElementById("messageInput").value = ""; // Clear the input field
});

// Handle incoming messages from others
connection.on("NewMessage", (from, to, msg) => {
  if (from !== localUserName) {
    const container = document.getElementById("messagesContainer");
    container.classList.remove("hidden");

    container.appendChild(createMessageElement(from, to, msg));
  }
});
