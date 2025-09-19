// Prevent page refresh on accidental form submission
document.addEventListener("submit", function(e) {
  e.preventDefault();
});

// Show Login Form
function showLogin() {
  document.getElementById("signupBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
}

// Show Signup Form
function showSignup() {
  document.getElementById("signupBox").classList.remove("hidden");
  document.getElementById("loginBox").classList.add("hidden");
}

// Signup Function
function signup() {
  let user = document.getElementById("signupUser").value.trim();
  let pass = document.getElementById("signupPass").value.trim();

  if (user && pass) {
    // Save in localStorage
    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);
    localStorage.setItem("loginCount", 0);

    alert("✅ Signup successful! Please login.");
    showLogin();
  } else {
    alert("⚠️ Please enter both username and password!");
  }
}

// Login Function
function login() {
  let user = document.getElementById("loginUser").value.trim();
  let pass = document.getElementById("loginPass").value.trim();

  let storedUser = localStorage.getItem("user");
  let storedPass = localStorage.getItem("pass");
  let count = parseInt(localStorage.getItem("loginCount")) || 0;

  if (user === storedUser && pass === storedPass) {
    count++;
    localStorage.setItem("loginCount", count);

    if (count <= 3) {
      window.location.href = "home.html";  // Free access
    } else {
      window.location.href = "subscription.html";  // After 3 logins
    }
  } else {
    alert("❌ Invalid username or password!");
  }
}

// Logout Function
function logout() {
  alert("👋 You have logged out!");
}

// Subscription Function
function subscribeNow() {
  alert("🎉 Thank you for subscribing to CampusMart Premium!");
  window.location.href = "home.html";
}

// Notes handling
function addNote() {
  let noteInput = document.getElementById("noteInput");
  let noteText = noteInput.value.trim();

  if (!noteText) {
    alert("Please write something before adding!");
    return;
  }

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(noteText);
  localStorage.setItem("notes", JSON.stringify(notes));

  noteInput.value = "";
  displayNotes();
}

function displayNotes() {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let notesList = document.getElementById("notesList");
  if (!notesList) return; // avoid errors on pages without notes

  notesList.innerHTML = "";
  notes.forEach((note, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${note}
      <span>
        <button onclick="editNote(${index})">Edit</button>
        <button onclick="deleteNote(${index})">Delete</button>
      </span>
    `;
    notesList.appendChild(li);
  });
}

function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

function editNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let newNote = prompt("Edit your note:", notes[index]);
  if (newNote !== null) {
    notes[index] = newNote;
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
  }
}

// Auto-load notes on page load
document.addEventListener("DOMContentLoaded", displayNotes);

// Open pages
function openNotes() {
  window.location.href = "notes.html";
}
function openAssignments() {
  window.location.href = "notes.html#assignments";
}
function openPlacement() {
  window.location.href = "notes.html#placements";
}

// Add Item (Notes / Assignments / Placement Notes)
function addItem(type) {
  let input, listId;

  if (type === "notes") {
    input = document.getElementById("noteInput");
    listId = "notesList";
  } else if (type === "assignments") {
    input = document.getElementById("assignmentInput");
    listId = "assignmentsList";
  } else if (type === "placements") {
    input = document.getElementById("placementInput");
    listId = "placementsList";
  }

  let text = input.value.trim();
  if (text === "") return alert("⚠️ Please enter something!");

  let li = document.createElement("li");
  li.innerHTML = `
    <span>${text}</span>
    <button onclick="editItem(this)">Edit</button>
    <button onclick="deleteItem(this)">Delete</button>
  `;

  document.getElementById(listId).appendChild(li);
  input.value = "";
}

// Edit Item
function editItem(button) {
  let span = button.parentElement.querySelector("span");
  let newText = prompt("Edit item:", span.textContent);
  if (newText !== null && newText.trim() !== "") {
    span.textContent = newText.trim();
  }
}

// Delete Item
function deleteItem(button) {
  button.parentElement.remove();
}
