import React, { useEffect, useState } from 'react';
import './Animation.css';

// Import images from public folder
import basketballImg from '/basketball.jpg';
import footballImg from '/football.jpg';
import volleyballImg from '/volleyball.jpg';
import humanImg from '/human.jpg';
import cartoonImg from '/cartoon.png';
import textureImg from '/transparent-background-png-concrete-texture-design_53876-1012480.jpg';

// global constants
const fieldWidth = 1000;
const fieldHeight = 550;
let ballDiameter = 120;

const vx = 5;
const vy = 5;

let maxLeft = fieldWidth - ballDiameter - 6;
let maxTop = fieldHeight - ballDiameter - 6;

let running = false;
let goRight = true;
let goDown = true;

let left = 0;
let top_ = 0;

const Animation = () => {
    const [ballImage, setBallImage] = useState('');

    const runClick = () => {
        running = !running;
        render();
    };

    const calculate = () => {
        if (goRight) {
            left += vx;
            if (left >= maxLeft) goRight = false;
        } else {
            left -= vx;
            if (left <= 0) goRight = true;
        }

        if (goDown) {
            top_ += vy;
            if (top_ >= maxTop) goDown = false;
        } else {
            top_ -= vy;
            if (top_ <= 0) goDown = true;
        }
    };

    const render = () => {
        const ball = document.getElementById('ball');
        const btnRun = document.getElementById('run');
        ball.style.left = left + 'px';
        ball.style.top = top_ + 'px';

        if (running) {
            btnRun.innerHTML = '<span class="bi bi-pause">&nbsp;PAUSE</span>';
            btnRun.classList.remove('btn-success');
            btnRun.classList.add('btn-danger');
            ball.classList.add('spin');
        } else {
            btnRun.innerHTML = '<span class="bi bi-play">&nbsp;RUN</span>';
            btnRun.classList.remove('btn-danger');
            btnRun.classList.add('btn-success');
            ball.classList.remove('spin');
        }
    };

    const process = () => {
        if (running) {
            calculate();
            render();
        }
    };

    const initial = () => {
        document.getElementById('field').style.width = fieldWidth + 'px';
        document.getElementById('field').style.height = fieldHeight + 'px';
        document.getElementById('ball').style.width = ballDiameter + 'px';
        document.getElementById('ball').style.height = ballDiameter + 'px';
    };

    useEffect(() => {
        initial();
        const interval = setInterval(process, 25);
        return () => clearInterval(interval);
    }, []);

    const changeBallImage = (image) => {
        setBallImage(image);
    };

    const getImageSrc = (type) => {
        switch (type) {
            case 'basketball':
                return basketballImg;
            case 'football':
                return footballImg;
            case 'volleyball':
                return volleyballImg;
            case 'human':
                return humanImg;
            case 'cartoon':
                return cartoonImg;
            default:
                return '';
        }
    };

    return (
        <div id="container">
            <div id="field">
                <div id="ball" style={{ backgroundImage: `url(${ballImage})` }}></div>
            </div>

            {/* ปุ่มควบคุม */}
            <div id="control">
                <button id="run" className="btn btn-success" onClick={runClick}>
                    <span className="bi bi-play">&nbsp;RUN</span>
                </button>
                <button className="btn btn-secondary" onClick={() => changeBallImage('')}>None</button>
                <button className="btn btn-outline-primary" onClick={() => changeBallImage(getImageSrc('basketball'))}>Basketball</button>
                <button className="btn btn-outline-primary" onClick={() => changeBallImage(getImageSrc('football'))}>Football</button>
                <button className="btn btn-outline-primary" onClick={() => changeBallImage(getImageSrc('volleyball'))}>Voleyball</button>
                <button className="btn btn-outline-primary" onClick={() => changeBallImage(getImageSrc('human'))}>Human</button>
                <button className="btn btn-outline-primary" onClick={() => changeBallImage(getImageSrc('cartoon'))}>Cartoon</button>
            </div>
            <h3><div className="student">67133473 นายประสบการณ์ ผมพันธ์</div></h3>
        </div>

    );
};

export default Animation;
