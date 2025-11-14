// src/components/Calculator.jsx
import { useState, useEffect } from "react";
import "./Calculator.css";

export default function Calculator() {
  // === State สำหรับเก็บค่าต่าง ๆ ===
  const [screen, setScreen] = useState("0");        // ค่าที่แสดงบนหน้าจอ
  const [operator, setOperator] = useState(null);   // เก็บเครื่องหมาย + หรือ -
  const [previous, setPrevious] = useState(null);   // เก็บค่าก่อนหน้าสำหรับคำนวณ
  const [waitingForNew, setWaitingForNew] = useState(false); // ใช้เช็คว่ารอป้อนเลขใหม่ไหม

  // === ฟังก์ชันอัปเดตค่าบนหน้าจอ ===
  const updateScreen = (val) => setScreen(val.toString());

  // === เมื่อกดตัวเลข ===
  const numberClicked = (num) => {
    if (waitingForNew) {
      // ถ้ารอเลขใหม่อยู่ → แสดงเลขที่กดทันที
      updateScreen(num);
      setWaitingForNew(false);
    } else {
      // ถ้ายังไม่รอเลขใหม่ → ต่อท้ายเลขบนหน้าจอ
      updateScreen(screen === "0" ? num : screen + num);
    }
  };

  // === เมื่อกดเครื่องหมาย + หรือ - ===
  const operatorClicked = (op) => {
    if (previous === null) {
      // ถ้ายังไม่มีค่าเดิม → เก็บค่าปัจจุบันไว้ก่อน
      setPrevious(parseFloat(screen));
    } else if (!waitingForNew) {
      // ถ้ามีค่าเดิมแล้วและไม่รอเลขใหม่ → คำนวณก่อน
      calculate(op);
    }
    // ตั้งค่า operator และบอกว่า “รอเลขใหม่”
    setOperator(op);
    setWaitingForNew(true);
  };

  // === ฟังก์ชันคำนวณหลัก ===
  const calculate = (nextOp = null) => {
    if (operator && previous !== null) {
      const current = parseFloat(screen);
      let result = previous;

      // เช็คเครื่องหมายแล้วคำนวณ
      switch (operator) {
        case "+": result = previous + current; break;
        case "-": result = previous - current; break;
        default: break;
      }

      // ปรับค่าทศนิยมให้อยู่ในรูปสวยงาม (ไม่ยาวเกิน)
      result = parseFloat(result.toPrecision(9));

      // อัปเดตหน้าจอและค่าเก็บไว้
      updateScreen(result);
      setPrevious(result);
      setOperator(nextOp);
      setWaitingForNew(nextOp !== null);
    }
  };

  // === เมื่อกดปุ่ม = ===
  const equalClicked = () => calculate(null);

  // === เมื่อกดปุ่ม CE (เคลียร์หน้าจอ) ===
  const ceClicked = () => {
    updateScreen("0");
    setOperator(null);
    setPrevious(null);
    setWaitingForNew(false);
  };

  // === รองรับการกดคีย์บอร์ด ===
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key >= "0" && e.key <= "9") numberClicked(Number(e.key));
      else if (["+", "-"].includes(e.key)) operatorClicked(e.key);
      else if (e.key === "=" || e.key === "Enter") equalClicked();
      else if (e.key === "Escape") ceClicked();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  // === ส่วนแสดงผลหน้าเว็บ ===
  return (
    <div className="calculator-page">
      <div className="cal-container">
        {/* หน้าจอเครื่องคิดเลข */}
        <div className="cal-screen">{screen}</div>

        {/* แถวที่ 1 */}
        <div>
          <button className="cal-btn-blue" disabled>MC</button>
          <button className="cal-btn-blue" disabled>MR</button>
          <button className="cal-btn-blue" disabled>M+</button>
          <button className="cal-btn-blue" disabled>M−</button>
          <button className="cal-btn-red cal-btn-hover-red" onClick={ceClicked}>CE</button>
        </div>

        {/* แถวที่ 2 */}
        <div>
          {[7, 8, 9].map((n) => (
            <button key={n} className="cal-btn-pink cal-btn-hover-pink" onClick={() => numberClicked(n)}>{n}</button>
          ))}
          <button className="cal-btn-blue" disabled>÷</button>
          <button className="cal-btn-blue" disabled>√</button>
        </div>

        {/* แถวที่ 3 */}
        <div>
          {[4, 5, 6].map((n) => (
            <button key={n} className="cal-btn-pink cal-btn-hover-pink" onClick={() => numberClicked(n)}>{n}</button>
          ))}
          <button className="cal-btn-blue" disabled>×</button>
          <button className="cal-btn-blue" disabled>%</button>
        </div>

        {/* แถวที่ 4 */}
        <div>
          {[1, 2, 3].map((n) => (
            <button key={n} className="cal-btn-pink cal-btn-hover-pink" onClick={() => numberClicked(n)}>{n}</button>
          ))}
          <button id="minus" className="cal-btn-blue cal-btn-hover-blue" onClick={() => operatorClicked("-")}>−</button>
          <button className="cal-btn-blue" disabled>1/x</button>
        </div>

        {/* แถวที่ 5 */}
        <div>
          <button className="cal-btn-pink" disabled>.</button>
          <button className="cal-btn-pink cal-btn-hover-pink" onClick={() => numberClicked(0)}>0</button>
          <button className="cal-btn-pink" disabled>+/−</button>
          <button id="plus" className="cal-btn-blue cal-btn-hover-blue" onClick={() => operatorClicked("+")}>+</button>
          <button className="cal-btn-blue cal-btn-hover-blue" onClick={equalClicked}>=</button>
        </div>
      </div>

      {/* ชื่อผู้จัดทำ */}
      <div className="student">67133473 นายประสบการณ์ ผมพันธ์</div>
    </div>
  );
}
