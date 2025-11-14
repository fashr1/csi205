import Variable from "../Variable/Variable";
import { useState, useEffect } from "react";
import "./Temperatures.css";

function Temperatures() {
  const [celsius, setCelsius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(0);
  const [kelvin, setKelvin] = useState(0);

  useEffect(() => {
    setCelsius(0);
    setFahrenheit(0);
    setKelvin(0);
  }, []);

  function set_Celsius(celsius) {
    setCelsius(celsius);
    setFahrenheit(celsius * (9 / 5) + 32); // คำนวณ Fahrenheit จาก Celsius
    setKelvin(celsius + 273.15); // คำนวณ Kelvin จาก Celsius
  }

  function set_Fahrenheit(fahrenheit) {
    setFahrenheit(fahrenheit);
    setCelsius((fahrenheit - 32) * (5 / 9)); // คำนวณ Celsius จาก Fahrenheit
    setKelvin((fahrenheit - 32) * (5 / 9) + 273.15); // คำนวณ Kelvin จาก Fahrenheit
  }

  function set_Kelvin(kelvin) {
    setKelvin(kelvin);
    setCelsius(kelvin - 273.15); // คำนวณ Celsius จาก Kelvin
    setFahrenheit((kelvin - 273.15) * (9 / 5) + 32); // คำนวณ Fahrenheit จาก Kelvin
  }

  return (
    <div className="temp-container">
      <h3 className="temp-title">TEMPERATURES</h3>
      <h3 className="temp-display">
        <span className="badge bg-primary">{celsius.toFixed(2) + "°C"}</span>
        <span className="badge bg-primary">{fahrenheit.toFixed(2) + "°F"}</span>
        <span className="badge bg-primary">{kelvin.toFixed(2) + "°K"}</span>
      </h3>
      <div className="temp-variables">
        <Variable
          type="int"
          name={"Celsius"}
          value={celsius}
          setValue={set_Celsius}
        />
        <Variable
          type="int"
          name={"Fahrenheit"}
          value={fahrenheit}
          setValue={set_Fahrenheit}
        />
        <Variable
          type="int"
          name={"Kelvin"}
          value={kelvin}
          setValue={set_Kelvin}
        />
      </div>
    </div>
  );
}

export default Temperatures;
