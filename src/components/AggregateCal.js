import React, { useState } from "react";
import { Link } from "react-router-dom";
import buitemsLogo from "./images/buitems logo.png";

const AggregateCalculator = () => {
  const [matricMarks, setMatricMarks] = useState("");
  const [fscMarks, setFscMarks] = useState("");
  const [ntsPercentage, setNtsPercentage] = useState("");
  const [aggregateResult, setAggregateResult] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");

  const totalMarks = 1100;
  const ntsTotal = 100;

  const calculateAggregate = () => {
    // Reset states
    setShowResult(false);
    setError("");

    // Validation: Empty fields
    if (!matricMarks || !fscMarks || !ntsPercentage) {
      setError("Please fill in all fields");
      setShowResult(true);
      return;
    }

    const metricMarksNum = Number(matricMarks);
    const fscMarksNum = Number(fscMarks);
    const ntsMarksNum = Number(ntsPercentage);

    // Validation: Invalid numbers
    if (isNaN(metricMarksNum) || isNaN(fscMarksNum) || isNaN(ntsMarksNum)) {
      setError("Please enter valid numbers");
      setShowResult(true);
      return;
    }

    // Validation: Range check
    if (
      metricMarksNum > totalMarks ||
      fscMarksNum > totalMarks ||
      ntsMarksNum > ntsTotal ||
      metricMarksNum < 0 ||
      fscMarksNum < 0 ||
      ntsMarksNum < 0
    ) {
      setError("Please enter valid marks within the allowed range");
      setShowResult(true);
      return;
    }

    // Calculation
    const metricAggregate = (metricMarksNum / totalMarks) * 100;
    const fscAggregate = (fscMarksNum / totalMarks) * 100;
    const ntsAggregate = (ntsMarksNum / ntsTotal) * 100;

    const metricWeightage = metricAggregate * 0.1;
    const fscWeightage = fscAggregate * 0.4;
    const ntsWeightage = ntsAggregate * 0.5;

    const admissionAggregate = metricWeightage + fscWeightage + ntsWeightage;

    // Set result
    setAggregateResult(`${admissionAggregate.toFixed(2)}%`);
    setShowResult(true);

    // Clear inputs
    setMatricMarks("");
    setFscMarks("");
    setNtsPercentage("");
  };

  return (
    <>
      <title>BUITEMS - Aggregate Calculator</title>
      <div className="agg-container">
        <img src={buitemsLogo} alt="BUITEMS Logo" id="logoimg" />

        <h2>Aggregate Calculator</h2>

        <div className="aggregate-inputs">
          <label htmlFor="matricInput">Matric Marks (out of 1100):</label>
          <input
            type="text"
            placeholder="Enter Matric marks"
            id="matricInput"
            value={matricMarks}
            onChange={(e) => setMatricMarks(e.target.value)}
          />

          <label htmlFor="fscInput">FSC Marks (out of 1100):</label>
          <input
            type="text"
            placeholder="Enter FSC marks"
            id="fscInput"
            value={fscMarks}
            onChange={(e) => setFscMarks(e.target.value)}
          />

          <label htmlFor="ntsInput">NTS Percentage (out of 100):</label>
          <input
            type="text"
            placeholder="Enter NTS Percentage"
            id="ntsInput"
            value={ntsPercentage}
            onChange={(e) => setNtsPercentage(e.target.value)}
          />
        </div>

        <button className="calc-aggre-BTN" onClick={calculateAggregate}>
          Calculate
        </button>

        {showResult && (
          <p id="aggregate-ans" className={error ? "error" : "success"}>
            {error || aggregateResult}
          </p>
        )}

        <p id="notePara">NOTE: Add NTS marks in Percentage</p>

        <Link to="/">
          <button className="Homepg">HOME</button>
        </Link>
      </div>
    </>
  );
};

export default AggregateCalculator;
