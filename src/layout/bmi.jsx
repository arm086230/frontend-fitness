import React, { useState } from "react";
import Swal from "sweetalert2";

function Bmi() {
  
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");

  let calcBmi = (event) => {
  
    event.preventDefault();
  
    if (weight === 0 || height === 0) {
        Swal.fire({
            icon: 'error',
            title: 'You did not enter a value.',
            text: "Please enter a valid weight and height",
          });
    
    } else {
    
      let weightInKg = weight;
      let heightInM = height / 100;
  
      let bmi = weightInKg / (heightInM * heightInM);
      setBmi(bmi.toFixed(1));

      if (bmi < 18.5) {
        setMessage("You are underweight");
      } else if (bmi >= 18.5 && bmi < 24.9) {
        setMessage("You are a healthy weight");
      } else if (bmi >= 25 && bmi < 29.9) {
        setMessage("You are overweight");
      } else {
        setMessage("You are obese");
      }
    }
  };
  


    // let imgSrc;

    // if (bmi < 1) {
    //   imgSrc = null
    // } else {
    //   if(bmi < 18.5) {
    //     imgSrc = require()
    //   } else if (bmi >= 25 && bmi < 29.9) {
    //     imgSrc = require('../src/assets/healthy.png')
    //   } else {
    //     imgSrc = require('../src/assets/overweight.png')
    //   }
    // }

  let reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="container mx-auto p-4 max-w-lg bg-white shadow-lg rounded-lg mt-20">
        <h2 className="center text-2xl font-bold mb-4 text-center">
          BMI Calculator
        </h2>
        <form onSubmit={calcBmi}>
          <div className="mb-4">
            <label className="block text-gray-700">Weight (KG)</label>
            <input
              className="mt-1 p-2 w-full border rounded"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Height (IN)</label>
            <input
              className="mt-1 p-2 w-full border rounded"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              className="btn bg-blue-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              Submit
            </button>
            <button
              className="btn btn-outline bg-gray-200 text-gray-700 px-4 py-2 rounded"
              onClick={reload}
              type="submit"
            >
              Reload
            </button>
          </div>
        </form>

        <div className="center mt-6 text-center">
          <h3 className="text-xl font-semibold">Your BMI is: {bmi}</h3>
          <p className="text-gray-700">{message}</p>
        </div>

        <div className="img-container mt-6">
          {/* <img src={imgSrc} alt=''></img> */}
        </div>
      </div>
    </div>
  );
}

export default Bmi;
