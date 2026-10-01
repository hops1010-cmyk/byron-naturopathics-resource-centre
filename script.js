const commands = {
  "/help": "Available commands: /help, /about, /resource, /health, /guidance, /tips, /status, /contact",
  "/about": "This is the Byron Naturopathics Resource Centre, focused on practical wellbeing information and educational guidance.",
  "/resource": "Resource guide: use this page as a starting point for wellness education, health information, and gentle support resources.",
  "/health": "Health reminder: aim for balanced nutrition, restful sleep, regular movement, and a calm routine.",
  "/guidance": "Guidance note: start with small consistent habits, and seek professional advice for medical concerns.",
  "/tips": "Wellbeing tips: stay hydrated, eat whole foods, move daily, and manage stress with regular breaks.",
  "/status": "Status: the resource bot is online and ready to assist with the available commands.",
  "/contact": "Contact support: email or visit your trusted healthcare professional for personalised guidance."
};

const form = document.getElementById("bot-form");
const input = document.getElementById("bot-input");
const messages = document.getElementById("bot-messages");
const commandButtons = document.querySelectorAll(".command-btn");

function addMessage(text, isUser = false) {
  const message = document.createElement("div");
  message.className = isUser ? "message user-message" : "message bot-message";
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

function parseCommand(rawInput) {
  const value = (rawInput || "").trim();

  if (!value) {
    return "Please enter a command.";
  }

  const normalized = value.startsWith("/") ? value.toLowerCase() : `/${value.toLowerCase()}`;

  if (commands[normalized]) {
    return commands[normalized];
  }

  return "Unknown command. Type /help to see the available commands.";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const userInput = input.value;
  addMessage(userInput, true);
  addMessage(parseCommand(userInput));
  input.value = "";
  input.focus();
});

commandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const command = button.dataset.command;
    input.value = command;
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
});
