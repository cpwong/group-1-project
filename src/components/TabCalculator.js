import React, { useEffect } from 'react';
import './TabCalculator/TabCalculator.css'

export default function TabCalculator(props) {
  class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear();
    }

    /* class is an object which uses the data inputs and outputs the results and has functions
                clear() - clear all 
                delete() - delete a single number
                appendNumber()
                chooseOperation()
                compute()
                getDisplayNumber()
                updateDisplay()
                */

    clear() {
      this.currentOperand = "";
      this.perviousOperand = "";
      this.operation = undefined;
    }

    delete() {
      this.currentOperand = this.currentOperand
        .toString()
        .slice(0, -1); /* this removes one character 
                    each time the function is activated counting from the back of the array  and the final result left in
                    the array is saved into this.currentOperand. this function is used in the deleteButton in html that
                    is tied to the event listener where a click creates one activation of this function. That function
                    also activates an updateDisplay to create a show of result in the calculator 's output div*/
    }

    appendNumber(number) {
      console.log("appendNumber", number);
      if (number === "." && this.currentOperand.includes("."))
        return; /*incluldes return true or false after
                    checking that the passed arguement to ensure that having one or more instances of ('.') in this case
                    does not exist or continue by returning and the statement evalutes to false it continues to next
                    line but returns nothing when it is true */
      this.currentOperand = this.currentOperand.toString() + number.toString();
      /*this concatenates instead of added to show in the previousOperandTextElement */
    }

    chooseOperation(operation) {
      if (this.currentOperand === "")
        return; /* if value is null, there is no calculation required: return*/
      if (this.previousOperand !== "") {
        /*with values in previousOperand and there is a need to calculate
                    if the value is not null for previousOperand, Compute runs but if it is null go down to lines of code
                    below where current Value is placed into prevOperand and in the event of currentOperand not null and 
                    prevOperand not null compute runs                */
        this.compute();
      }
      this.operation =
        operation; /*this passes argument into and initiates the value of operation 
                    in this case it will be one of the chosen 4 operators + , -, /, * .         */
      this.previousOperand =
        this.currentOperand; /*this passes the value into previousOperand constant*/
      this.currentOperand =
        ""; /* clears the value in currentOperate and waits for us to key in new values */
    }

    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      /*The parseFloat() function parses an argument (converting it to a string first if needed) and 
                    returns a floating point number. */

      const current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current))
        return; /* check if either is not a number */
      switch (
        this
          .operation /*using the value found in operation execute accordingly to cases */
      ) {
        case "+":
          computation = prev + current;
          break;

        case "-":
          computation = prev - current;
          break;

        case "*":
          computation = prev * current;
          break;

        case "/":
          computation = prev / current;
          break;

        default:
          /*where none of the values match the above cases no computation is done */
          return;
      }

      this.currentOperand =
        computation; /* these few lines of code in this section does not update
                    the screen in calculator however, ${currentOperand} is updated automatically as updateDisplay
                    is attached to the buttons in operationButtons in its forEach loop   */
      this.operation =
        undefined; /*once operation is completed, operand is set to undefined */
      this.previousOperand = ""; /*previousOperand is cleared */
    }

    getDisplayNumber(number) {
      /*this functionn takes in a number and parses it with a , once every 3 
                    digits */

      const stringNumber =
        number.toString(); /*changes number to string and saves in stringNumber */
      const integerNumber = parseFloat(stringNumber.split(".")[0]);

      /* parseFloat() function parses an argument (converting it to a string first if needed) and 
                        returns a floating point number. While split divides the ${number} separated by '.' and save 
                        the first part of the array and passes the value of the selected array into parseFloat and saves
                        into9 the constant integerNumber */

      const decimalFactorial = stringNumber.split(".")[1];
      /*this part takes the second part of the array
                        into decimalFactorial */

      let numberDisplay;
      if (isNaN(integerNumber)) {
        /*if the value not present or not a number set value to null */
        numberDisplay = "";
      } else {
        numberDisplay = integerNumber.toLocaleString("en", {
          maximumFractionDigits: 0,
        });
      }
      /*this passes the value of 
                                integerfactorial into variable NumberDisplay and the next line set the digitals to 0 
                                */

      if (decimalFactorial != null) {
        return `${numberDisplay}.${decimalFactorial}`;
      } else {
        return numberDisplay;
      }
    }

    updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(
        this.currentOperand
      );
      console.log("updateDisplay", this);

      //this.currentOperand  /* this is where the value that is passed and this line is being replaced by below line */

      /* into currentOperand gets updated into the screen in output div */

      if (this.operation != null) {
        /*where the operation sign is present, the code below updates the html value 
                        in previousOperandTextElement*/

        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
          this.previousOperand
        )} ${this.operation}`;
      } else {
        /*where sign is not present meaning no operation button is pressed value set to null */
        this.previousOperandTextElement.innerText = "";
      }
    }
  }
useEffect (()=> {
    const numberButtons = document.querySelectorAll("[data-number]");
    const operationButtons = document.querySelectorAll("[data-operation]");
    const equalsButton = document.querySelector("[data-equals]");
    const deleteButton = document.querySelector("[data-delete]");
    const clearButton = document.querySelector("[data-clear]");
  
    const previousOperandTextElement = document.querySelector(
      "[data-prior-operand]"
    );
    const currentOperandTextElement = document.querySelector(
      "[data-current-operand]"
    );
  
    const calculator = new Calculator(
      previousOperandTextElement,
      currentOperandTextElement
    );
  
    /* this starts the Calculator function */
  
    numberButtons.forEach((button) => {
      /* arrow function to initiate block code */
      button.addEventListener("click", () => {
        /* every button event triggers appendNumber and appends the innerText in that button */
        calculator.appendNumber(
          button.innerText
        ); /*calls appendNumber function in calculator object */
        calculator.updateDisplay(); /*this is then updated at line of updateDisplay */
      });
    });
  
    operationButtons.forEach((button) => {
      button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        /*chooseOperation takes the value of button 's html value*/
        calculator.updateDisplay();
      });
    });
  
    equalsButton.addEventListener("click", (button) => {
      calculator.compute();
      calculator.updateDisplay();
    });
  
    clearButton.addEventListener("click", (button) => {
      calculator.clear();
      calculator.updateDisplay();
    });
  
    deleteButton.addEventListener("click", (button) => {
      calculator.delete();
      calculator.updateDisplay();
    });
  
    //
}, []
)
 

  return (
    <div>
      <h2>Calculator</h2>

      <div className="calculator-grid">
        <div className="output">
          <div data-prior-operand id="prev-operand"></div>
          <div data-current-operand id="current-operand"></div>
        </div>

        <button data-clear className="span-two">
          AC
        </button>
        <button data-delete>DEL</button>
        <button data-operation>/</button>
        <button data-number>1</button>
        <button data-number>2</button>
        <button data-number>3</button>
        <button data-operation>*</button>
        <button data-number>4</button>
        <button data-number>5</button>
        <button data-number>6</button>
        <button data-operation>+</button>
        <button data-number>7</button>
        <button data-number>8</button>
        <button data-number>9</button>
        <button data-operation>-</button>
        <button data-number>.</button>
        <button data-number>0</button>
        <button data-equals className="span-two">
          =
        </button>
      </div>
    </div>
  );
}

