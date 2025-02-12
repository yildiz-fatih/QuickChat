import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import 'bootstrap'
import * as signalR from '@microsoft/signalr'

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5007/chathub")
  .configureLogging(signalR.LogLevel.Information)
  .build()

connection.start()

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault()
  
    const userName = document.getElementById('userNameInput').value
  
    connection
      .invoke("GetUserName", userName)
      .catch(err => console.error(err))
  })

connection.on("UserJoined", (userName) => {
    const alertElement = document.getElementById('userJoinAlert')

    // Set the message
    alertElement.innerHTML = `${userName} has joined!`

    // Make the alert visible
    alertElement.style.display = 'block'

    // Hide the alert after 2 seconds
    setTimeout(() => {
        alertElement.style.display = 'none'
    }, 2000)
})

connection.on("UserListUpdate", (userList) => {
    const userListItems = document.getElementById('userListItems')
    userListItems.innerHTML = ''

    userList.forEach(user => {
        const li = document.createElement('li')
        li.textContent = user.userName
        userListItems.appendChild(li)
    });
})
