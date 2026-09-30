# The Little Calculator

Web calculator built with HTML, CSS and vanilla JavaScript for the Mobile and Web Technologies course (CEU San Pablo).

## Files

- `calculator.html`: page structure (input, info field and buttons).
- `calculator.css`: styling (black calculator with a green screen).
- `calculator.js`: all the logic, written with arrow functions.

## How to use

Open `calculator.html` in a browser.

- **Single number:** type an integer or a decimal (positive or negative), e.g. `-3.5`, and press a unary operation.
- **Binary operation:** type the first number, press `+`, `−` or `×`, type the second number and press `=`.
- **CSV list:** type numbers separated by commas, e.g. `4,10,2` or `3, 1.5, -2`, and press one of the CSV buttons.

The grey/amber box under the screen (`#info`) shows information about the result, or an error message.

## Implemented features (as required by the task)

1. **Information field:** `<h2 id="info" class="big" title="Info about the number">`, updated by `fill_info()`: "less than 100", "between 100 and 200" or "greater than 200".
2. **Unary operations:** `square()`, `mod()` (button `modulo`) and `fact()` (button `factorial`).
3. **Binary operations:** addition and multiplication. `first` and `operator` are global variables, and `eq()` computes the result when `=` is pressed.
4. **CSV operations:** `sum()`, `sort()`, `reverse()` and `removelast()`.
5. **Error handling:** `validate()` checks integers, decimals and CSV lists, and shows a specific message for each case (empty input, not a number, invalid list element).

## Extras added

Beyond the mandatory task we added three extra operations:

- **Cube:** `cube()` (button `x³`).
- **Subtraction:** `subtraction()` (button `−`), calculated in `eq()` like the other binary operations.
- **Average:** `average()` (CSV button `average`).

We also added **out-of-range errors**: numbers above `1e15` are rejected by `validate()`, the factorial of numbers above 170 is rejected (the result would be `Infinity`), and `eq()` rejects non-finite results.

## Keyboard accessibility

All buttons are real `<button>` elements, so they can be reached with Tab and pressed with Enter or Space. The focused button has a visible outline.
