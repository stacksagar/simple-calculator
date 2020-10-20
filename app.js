const data = document.querySelectorAll(".data");
data.forEach((data) => {
  data.addEventListener("click", function () {
    this.classList.add("dataEffect");
    setTimeout(() => {
      this.classList.remove("dataEffect");
    }, 200);
  });
});

const numberButtons = document.querySelectorAll(".data-number");
const actionButtons = document.querySelectorAll(".data-action");
const allClearButton = document.querySelector(".data-all-clear");
const deleteButton = document.querySelector(".data-delete");
const equalButton = document.querySelector(".data-equal");
const dataCurrent = document.querySelector(".current");
const dataPrevious = document.querySelector(".previous");

class myCalculator {
  constructor() {
    this.dataCurrent = dataCurrent;
    this.dataPrevious = dataPrevious;

    this.clear();
  }

  clear() {
    this.currentValue = 0;
    this.previousValue = 0;
    this.action = undefined;
  }

  appendOutput(value) {
    if (value === "." && this.currentValue.includes(".")) return;
    this.currentValue = this.currentValue + value;
  }

  getAction(value) {
    if (this.currentValue === "") return;
    if (this.previousValue != "") {
      this.getCalculation();
    }
    this.action = value;
    this.previousValue = this.currentValue;
    this.currentValue = "";
  }
  getCalculation() {
    let sum;
    const previous = parseFloat(this.previousValue);
    const current = parseFloat(this.currentValue);
    if (isNaN(current) || isNaN(previous)) return;

    switch (this.action) {
      case "+":
        sum = previous + current;
        break;
      case "-":
        sum = previous - current;
        break;
      case "*":
        sum = previous * current;
        break;
      case "/":
        sum = previous / current;
        break;
      case "%":
        sum = previous % current;
        break;
      default:
    }
    this.currentValue = sum;
    this.previousValue = "";
    this.action = undefined;
  }
  deleteText() {
    this.currentValue = this.currentValue.slice(0, -1);
  }

  updateOutput(value) {
    const comaFormatted = parseFloat(value);
    if (isNaN(comaFormatted)) {
      return "";
    } else {
      return comaFormatted.toLocaleString();
    }
  }

  getOutput() {
    this.dataCurrent.innerHTML = this.updateOutput(this.currentValue);
    this.dataPrevious.innerHTML = this.updateOutput(this.previousValue);
  }
}
// class function end

const calculator = new myCalculator();

numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.appendOutput(this.innerText);
    declare()
  });
});

actionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.getAction(this.innerText);
    declare();
  });
});
equalButton.addEventListener("click", () => {
  calculator.getCalculation();
  declare();
});
allClearButton.addEventListener("click", () => {
  calculator.clear();
  declare();
});
deleteButton.addEventListener("click", () => {
  calculator.deleteText();
  declare();
});

function declare() {
  calculator.getOutput();
}
declare();
