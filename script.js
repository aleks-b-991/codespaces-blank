/* ==========================================================
   North Star Bakery - script.js

   1. Data (arrays and objects)
   2. Browser storage (localStorage)
   3. Interactive feature: My Pre-Order List (products.html)
   4. Form validation (contact.html)
   5. Start the right code for the page that is open
   ========================================================== */

/* ---------- 1. Data ---------- */

// Every product a customer can add to their list (array of objects)
const products = [
  { id: "country-sourdough", name: "Country Sourdough", category: "Breads", price: "$7.00 to $9.00" },
  { id: "seeded-multigrain", name: "Seeded Multigrain", category: "Breads", price: "$8.00 to $10.00" },
  { id: "baguettes-rolls", name: "Baguettes and Dinner Rolls", category: "Breads", price: "$3.50 to $12.00" },
  { id: "croissants", name: "Croissants", category: "Pastries", price: "$3.50 to $5.00" },
  { id: "cinnamon-rolls", name: "Cinnamon Rolls and Morning Buns", category: "Pastries", price: "$4.00 to $5.50" },
  { id: "cookies-scones", name: "Cookies and Scones", category: "Pastries", price: "$2.50 to $4.50" },
  { id: "everyday-cakes", name: "Everyday Cakes", category: "Cakes", price: "$28.00 to $40.00" },
  { id: "custom-cakes", name: "Celebration and Custom Cakes", category: "Cakes", price: "$45.00 to $150.00" },
  { id: "event-platters", name: "Event Platters", category: "Cakes", price: "$35.00 to $180.00" }
];

// The ids of the products the customer has picked (array of strings)
let myList = [];

// The message shown under a form field when its check fails (object)
const errorMessages = {
  nameRequired: "Please enter your full name.",
  nameShort: "Your name must be at least 2 characters long.",
  emailRequired: "Please enter your email address so we can confirm your order.",
  emailFormat: "Please enter a valid email address, like you@example.com.",
  phoneFormat: "Please use the format 507-555-0142, or leave this blank.",
  typeRequired: "Please choose a request type.",
  dateRequired: "Please choose a pickup date.",
  datePast: "Your pickup date cannot be in the past.",
  quantityRange: "Please enter a number from 1 to 200, or leave this blank.",
  detailsRequired: "Please tell us which items you would like.",
  detailsShort: "Please give a little more detail (at least 10 characters).",
  confirmRequired: "Please check this box so we know you understand."
};

// Names used to save data in localStorage
const LIST_KEY = "northStarList";
const CONTACT_KEY = "northStarContact";


/* ---------- 2. Browser storage ---------- */

// Save the customer's list so it is still there after a refresh
function saveList() {
  localStorage.setItem(LIST_KEY, JSON.stringify(myList));
}

// Load the saved list when a page opens
function loadList() {
  const saved = localStorage.getItem(LIST_KEY);

  if (saved !== null) {
    myList = JSON.parse(saved);
  }
}

// Remember the customer's name, email, and request type for next time
function saveContactInfo() {
  const contact = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    requestType: document.getElementById("request-type").value
  };

  localStorage.setItem(CONTACT_KEY, JSON.stringify(contact));
}

// Fill in the remembered name, email, and request type
function loadContactInfo() {
  const saved = localStorage.getItem(CONTACT_KEY);

  if (saved !== null) {
    const contact = JSON.parse(saved);
    document.getElementById("name").value = contact.name;
    document.getElementById("email").value = contact.email;
    document.getElementById("request-type").value = contact.requestType;
  }
}


/* ---------- 3. Interactive feature: My Pre-Order List ---------- */

// Find one product object by its id
function findProduct(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i];
    }
  }
  return null;
}

// Add a product if it is not on the list, or take it off if it is
function toggleProduct(id) {
  const position = myList.indexOf(id);

  if (position === -1) {
    myList.push(id);
  } else {
    myList.splice(position, 1);
  }

  saveList();
  updateProductsPage();
}

// Empty the whole list
function clearList() {
  myList = [];
  saveList();
  updateProductsPage();
}

// Change each "Add to my list" button to match the list
function showButtons() {
  const buttons = document.querySelectorAll(".add-button");

  for (let i = 0; i < buttons.length; i++) {
    const id = buttons[i].dataset.id;

    if (myList.includes(id)) {
      buttons[i].textContent = "✓ On my list (tap to remove)";
      buttons[i].classList.add("added");
    } else {
      buttons[i].textContent = "Add to my list";
      buttons[i].classList.remove("added");
    }
  }
}

// Build the "My Pre-Order List" section from the myList array
function showList() {
  const listItems = document.getElementById("list-items");
  const listMessage = document.getElementById("list-message");

  listItems.innerHTML = "";

  if (myList.length === 0) {
    listMessage.textContent = "Your list is empty. Tap \"Add to my list\" on any bread, pastry, or cake above.";
    return;
  }

  listMessage.textContent = "You have " + myList.length + " item(s) on your list:";

  for (let i = 0; i < myList.length; i++) {
    const product = findProduct(myList[i]);

    if (product === null) {
      continue;
    }

    const item = document.createElement("li");
    item.textContent = product.name + " (" + product.category + ", " + product.price + ") ";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.className = "remove-button";
    removeButton.addEventListener("click", function () {
      toggleProduct(product.id);
    });

    item.appendChild(removeButton);
    listItems.appendChild(item);
  }
}

// Update the short summary line near the top of the page
function showSummary() {
  const summary = document.getElementById("list-summary");

  if (myList.length === 0) {
    summary.textContent = "Tap \"Add to my list\" on anything you like to build a pre-order list.";
  } else {
    summary.innerHTML = "Your pre-order list has <strong>" + myList.length +
      " item(s)</strong>. <a href=\"#my-list\">View my list</a>";
  }
}

// Refresh every part of the products page that depends on the list
function updateProductsPage() {
  showButtons();
  showList();
  showSummary();
}

// Connect the buttons on products.html to the functions above
function setUpProductsPage() {
  const buttons = document.querySelectorAll(".add-button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      toggleProduct(buttons[i].dataset.id);
    });
  }

  document.getElementById("clear-list").addEventListener("click", clearList);

  updateProductsPage();
}


/* ---------- 4. Form validation ---------- */

// Show a message under a field and mark the field as invalid
function showError(fieldId, message) {
  document.getElementById(fieldId + "-error").textContent = message;
  document.getElementById(fieldId).classList.add("invalid");
}

// Remove the message under a field
function clearError(fieldId) {
  document.getElementById(fieldId + "-error").textContent = "";
  document.getElementById(fieldId).classList.remove("invalid");
}

// Each check below returns true when the field is fine and false when it is not

function checkName() {
  const value = document.getElementById("name").value.trim();

  if (value === "") {
    showError("name", errorMessages.nameRequired);
    return false;
  }
  if (value.length < 2) {
    showError("name", errorMessages.nameShort);
    return false;
  }
  clearError("name");
  return true;
}

function checkEmail() {
  const value = document.getElementById("email").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === "") {
    showError("email", errorMessages.emailRequired);
    return false;
  }
  if (!emailPattern.test(value)) {
    showError("email", errorMessages.emailFormat);
    return false;
  }
  clearError("email");
  return true;
}

function checkPhone() {
  const value = document.getElementById("phone").value.trim();
  const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

  // phone is optional, so only check it when something was typed
  if (value !== "" && !phonePattern.test(value)) {
    showError("phone", errorMessages.phoneFormat);
    return false;
  }
  clearError("phone");
  return true;
}

function checkRequestType() {
  if (document.getElementById("request-type").value === "") {
    showError("request-type", errorMessages.typeRequired);
    return false;
  }
  clearError("request-type");
  return true;
}

// Today's date written like 2026-10-07, the same way a date field stores it
function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return year + "-" + month + "-" + day;
}

function checkPickupDate() {
  const value = document.getElementById("pickup-date").value;

  if (value === "") {
    showError("pickup-date", errorMessages.dateRequired);
    return false;
  }
  if (value < getToday()) {
    showError("pickup-date", errorMessages.datePast);
    return false;
  }
  clearError("pickup-date");
  return true;
}

function checkQuantity() {
  const value = document.getElementById("quantity").value;

  // quantity is optional, so only check it when something was typed
  if (value !== "" && (Number(value) < 1 || Number(value) > 200)) {
    showError("quantity", errorMessages.quantityRange);
    return false;
  }
  clearError("quantity");
  return true;
}

function checkItemDetails() {
  const value = document.getElementById("item-details").value.trim();

  if (value === "") {
    showError("item-details", errorMessages.detailsRequired);
    return false;
  }
  if (value.length < 10) {
    showError("item-details", errorMessages.detailsShort);
    return false;
  }
  clearError("item-details");
  return true;
}

function checkConfirm() {
  if (!document.getElementById("confirm").checked) {
    showError("confirm", errorMessages.confirmRequired);
    return false;
  }
  clearError("confirm");
  return true;
}

// Every field that gets checked, and the function that checks it (array of objects)
const formChecks = [
  { fieldId: "name", check: checkName },
  { fieldId: "email", check: checkEmail },
  { fieldId: "phone", check: checkPhone },
  { fieldId: "request-type", check: checkRequestType },
  { fieldId: "pickup-date", check: checkPickupDate },
  { fieldId: "quantity", check: checkQuantity },
  { fieldId: "item-details", check: checkItemDetails },
  { fieldId: "confirm", check: checkConfirm }
];

// Run every check and return true only when all of them pass
function validateForm() {
  let firstProblem = null;

  for (let i = 0; i < formChecks.length; i++) {
    const passed = formChecks[i].check();

    if (!passed && firstProblem === null) {
      firstProblem = formChecks[i].fieldId;
    }
  }

  if (firstProblem !== null) {
    document.getElementById(firstProblem).focus();
    return false;
  }
  return true;
}

// Runs when the customer presses "Send My Request"
function handleSubmit(event) {
  // stop the browser from sending the form so JavaScript can check it first
  event.preventDefault();

  const success = document.getElementById("form-success");

  if (!validateForm()) {
    success.textContent = "";
    return;
  }

  saveContactInfo();

  success.textContent = "Thank you, " + document.getElementById("name").value.trim() +
    "! Your request is ready. We will email " + document.getElementById("email").value.trim() +
    " within one business day to confirm.";
}

// Runs when the customer presses "Clear Form"
function handleReset() {
  for (let i = 0; i < formChecks.length; i++) {
    clearError(formChecks[i].fieldId);
  }
  document.getElementById("form-success").textContent = "";
}

// Put the saved product list into the "Item details" box
function fillItemDetailsFromList() {
  const details = document.getElementById("item-details");
  const note = document.getElementById("list-note");

  if (myList.length === 0 || details.value !== "") {
    return;
  }

  let text = "";

  for (let i = 0; i < myList.length; i++) {
    const product = findProduct(myList[i]);

    if (product !== null) {
      text = text + "1 x " + product.name + "\n";
    }
  }

  details.value = text;
  note.textContent = "We added the " + myList.length +
    " item(s) from your pre-order list. Change the amounts or add notes below.";
}

// Connect the form on contact.html to the functions above
function setUpContactPage() {
  const form = document.getElementById("order-form");

  // turn off the browser's own pop-up messages so our messages show instead
  form.noValidate = true;

  form.addEventListener("submit", handleSubmit);
  form.addEventListener("reset", handleReset);

  // re-check a field when the customer leaves it or changes it
  for (let i = 0; i < formChecks.length; i++) {
    document.getElementById(formChecks[i].fieldId).addEventListener("change", formChecks[i].check);
  }

  loadContactInfo();
  fillItemDetailsFromList();
}


/* ---------- 5. Start ---------- */

loadList();

// products.html has the list section, contact.html has the form
if (document.getElementById("my-list") !== null) {
  setUpProductsPage();
}

if (document.getElementById("order-form") !== null) {
  setUpContactPage();
}
