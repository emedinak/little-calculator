// Global variables for the binary operations
let first = 0;
let operator = "";

// Numbers with a bigger absolute value are out of range
const MAX_NUMBER = 1e15;

// Shows a message in the info field (error = true paints it as an error)
const show_info = (message, error) => {
  const info = document.getElementById("info");
  info.innerHTML = message;
  info.className = error ? "big error" : "big";
};

// Info field: depends on the result shown in the input
const fill_info = (result) => {
  if (result < 100) {
    show_info("Info: The result is less than 100", false);
  } else if (result <= 200) {
    show_info("Info: The result is between 100 and 200", false);
  } else {
    show_info("Info: The result is greater than 200", false);
  }
};

// Checks that a text is a number (integer or decimal, positive or negative)
const is_number = (text) => text.trim() !== "" && isFinite(+text);

// Validates the input. csv = false -> one number, csv = true -> list of numbers
const validate = (text, csv) => {
  if (text.trim() === "") {
    show_info("Error: the input is empty", true);
    return false;
  }
  if (!csv) {
    if (!is_number(text)) {
      show_info("Error: \"" + text + "\" is not a valid number", true);
      return false;
    }
    if (Math.abs(+text) > MAX_NUMBER) {
      show_info("Error: " + text + " is out of range (maximum " + MAX_NUMBER + ")", true);
      return false;
    }
    return true;
  }
  const list = text.split(",");
  for (let i = 0; i < list.length; i++) {
    if (!is_number(list[i])) {
      show_info("Error: element " + (i + 1) + " of the list is not a valid number", true);
      return false;
    }
    if (Math.abs(+list[i]) > MAX_NUMBER) {
      show_info("Error: element " + (i + 1) + " of the list is out of range (maximum " + MAX_NUMBER + ")", true);
      return false;
    }
  }
  return true;
};

// Reads the input as a number (or returns null if invalid)
const read_number = () => {
  const text = document.getElementById("input").value;
  return validate(text, false) ? +text : null;
};

// Reads the input as an array of strings (or returns null if invalid)
const read_list = () => {
  const text = document.getElementById("input").value;
  return validate(text, true) ? text.split(",") : null;
};

// ---------- Unary operations ----------
const square = () => {
  const x = read_number();
  if (x === null) return;
  document.getElementById("input").value = x * x;
  fill_info(x * x);
};

const cube = () => {
  const x = read_number();
  if (x === null) return;
  document.getElementById("input").value = x ** 3;
  fill_info(x ** 3);
};

const mod = () => {
  const x = read_number();
  if (x === null) return;
  const result = x < 0 ? -x : x;
  document.getElementById("input").value = result;
  fill_info(result);
};

const fact = () => {
  const x = read_number();
  if (x === null) return;
  if (x < 0 || x % 1 !== 0) {
    show_info("Error: the factorial needs a non-negative integer", true);
    return;
  }
  if (x > 170) {
    show_info("Error: the factorial of " + x + " is out of range (maximum input is 170)", true);
    return;
  }
  let result = 1;
  for (let i = 2; i <= x; i++) {
    result = result * i;
  }
  document.getElementById("input").value = result;
  fill_info(result);
};

// ---------- Binary operations ----------
// Stores the first number and the operator in the global variables
const store = (op) => {
  const x = read_number();
  if (x === null) return;
  first = x;
  operator = op;
  document.getElementById("input").value = "";
  show_info("Info: " + x + " " + op + " ... enter the second number and press =", false);
};

const addition = () => store("+");
const subtraction = () => store("-");
const multiplication = () => store("*");

const eq = () => {
  if (operator === "") {
    show_info("Error: choose an operator (+, - or *) first", true);
    return;
  }
  const second = read_number();
  if (second === null) return;
  let result;
  if (operator === "+") {
    result = first + second;
  } else if (operator === "-") {
    result = first - second;
  } else {
    result = first * second;
  }
  if (!isFinite(result)) {
    show_info("Error: the result is out of range", true);
    return;
  }
  operator = "";
  document.getElementById("input").value = result;
  fill_info(result);
};

// ---------- CSV operations ----------
const sum = () => {
  const list = read_list();
  if (list === null) return;
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    total = total + +list[i];
  }
  document.getElementById("input").value = total;
  fill_info(total);
};

const average = () => {
  const list = read_list();
  if (list === null) return;
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    total = total + +list[i];
  }
  document.getElementById("input").value = total / list.length;
  fill_info(total / list.length);
};

const sort = () => {
  const list = read_list();
  if (list === null) return;
  document.getElementById("input").value = list.sort((a, b) => a - b).join(",");
  show_info("Info: The list has been sorted (" + list.length + " elements)", false);
};

const reverse = () => {
  const list = read_list();
  if (list === null) return;
  document.getElementById("input").value = list.reverse().join(",");
  show_info("Info: The list has been reversed (" + list.length + " elements)", false);
};

const removelast = () => {
  const list = read_list();
  if (list === null) return;
  list.pop();
  document.getElementById("input").value = list.join(",");
  show_info("Info: The last element has been removed (" + list.length + " elements left)", false);
};
