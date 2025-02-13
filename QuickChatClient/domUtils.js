export function createUserListItem(username) {
  const li = document.createElement("li");
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "selectedUser";
  radio.id = username;
  if (username === "all") radio.checked = true;

  const label = document.createElement("label");
  label.htmlFor = radio.id;
  label.textContent = username;

  li.appendChild(radio);
  li.appendChild(label);
  return li;
}

export function createMessageElement(from, to, msg) {
  const msgBox = document.createElement("div");
  msgBox.className = "message-box";

  const header = document.createElement("div");
  header.className = "message-header";
  header.textContent = `From: ${from} | To: ${to}`;

  const body = document.createElement("div");
  body.className = "message-body";
  body.textContent = msg;

  msgBox.appendChild(header);
  msgBox.appendChild(body);

  return msgBox;
}
