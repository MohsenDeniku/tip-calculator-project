import React, { useState, useRef } from "react";
import "./App.css";
import TextInput from "./components/TextInput";

const tipOptions = [5, 10, 15, 25, 50];

export default function App() {
  const [selectedTip, setSelectedTip] = useState(null);
  const [customTip, setCustomTip] = useState(""); 
  const [values, setValues] = useState({});
  const billInputRef = useRef(null);
  const peopleInputRef = useRef(null);

  function tipAmountCalculator() {
    const tipPercent =
      selectedTip === "custom" && customTip ? Number(customTip) : selectedTip;
    if (values.bill && values.people && tipPercent) {
      return ((tipPercent * values.bill) / 100 / values.people).toFixed(2);
    }
    return "0.00";
  }

  function totalCalculator() {
    const tipPercent =
      selectedTip === "custom" && customTip ? Number(customTip) : selectedTip;
    if (values.bill && values.people && tipPercent) {
      return (
        (tipPercent * values.bill) / 100 / values.people +
        values.bill / values.people
      ).toFixed(2);
    }
    return "0.00";
  }

  function changeHandler(name, val) {
    setValues((prev) => ({ ...prev, [name]: val }));
  }

  function reset() {
    setValues({});
    setSelectedTip(null);
    setCustomTip(""); 
    billInputRef.current.value = "";
    peopleInputRef.current.value = "";
    billInputRef.current.focus();
  }


  return (
    <div className="app">
      <header>
        <span>SPLI</span>
        <span>TTER</span>
      </header>
      <main className="main-container">
        <section className="inputs">
          <TextInput
            holder="bill"
            image="/images/icon-dollar.svg"
            number="0"
            label="Bill"
            changeHandler={changeHandler}
            ref={billInputRef}
          />
          <div className="options-container">
            <label className="input-main-container-label">Select Tip %</label>
            <div className="tip-options">
              {tipOptions.map((tip) => (
                <button
                  key={tip}
                  className={
                    selectedTip === tip ? "tip-btn selected" : "tip-btn"
                  }
                  onClick={() => setSelectedTip(tip)}
                  type="button"
                >
                  {tip}%
                </button>
              ))}
              <button
                className={
                  selectedTip === "custom"
                    ? "tip-btn selected"
                    : "tip-btn custom"
                }
                onClick={() => setSelectedTip("custom")}
                type="button"
              >
                Custom
              </button>
            </div>
            <div
              className={`custom-tip-wrapper${
                selectedTip === "custom" ? " show" : ""
              }`}
            >
              <input
                type="number"
                min="0"
                className="custom-tip-input"
                placeholder="Custom %"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <TextInput
            image="/images/icon-person.svg"
            number="0"
            label="Number of People"
            holder="people"
            changeHandler={changeHandler}
            ref={peopleInputRef}
          />
        </section>
        <section className="calculator-section-container">
          <div>
            <div className="calculator-section">
              <div className="calculator-section-left">
                <p>Tip Amount</p>
                <span>/ person</span>
              </div>
              <h2 className="tip-amount-number">${tipAmountCalculator()}</h2>
            </div>
            <div className="calculator-section">
              <div className="calculator-section-left">
                <p>Total</p>
                <span>/ person</span>
              </div>
              <h2 className="tip-amount-number">${totalCalculator()}</h2>
            </div>
          </div>
          <button onClick={reset} className="reset-btn">
            RESET
          </button>
        </section>
      </main>
    </div>
  );
}
