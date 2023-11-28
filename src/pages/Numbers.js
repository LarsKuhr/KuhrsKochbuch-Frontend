import React, { useEffect, useRef, useState } from "react";

const Numbers = () => {

    const canvasRef = useRef(null);

    useEffect(() => {
        // var canvas = document.getElementById('canvas');
        var canvas = canvasRef.current;
        console.log(canvas)
        var ctx = canvas.getContext('2d');

        canvas.width = 200;
        canvas.height = 200;

        var mouse = {x: 0, y: 0};

        canvas.addEventListener('pointermove', function(e) {
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        ctx.globalCompositeOperation = "multiply";
        ctx.lineWidth = 8;
        // ctx.globalCompositeOperation = "destination-out";

        canvas.addEventListener('pointerdown', function(e) {
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            canvas.addEventListener('pointermove', onPaint, false);
        }, false);

        canvas.addEventListener('pointerup', function() {
            canvas.removeEventListener('pointermove', onPaint, false);
        }, false);

        var onPaint = function() {
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        };

    }, [])

    useEffect(() => {
        const resetOnResize = () => {
          if (window.innerWidth <= 1023) document.body.style.overflow = "hidden";
          if (window.innerWidth >= 1024) document.body.style.overflow = "scrolls";
        };

        document.body.style.overflow = "hidden";
    
        return () => {
          window.removeEventListener("resize", resetOnResize);
        };
      }, []);

    const refresh = () => {
        var canvas = canvasRef.current;
        var ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const [count, setCount] = useState(null);
    const [rndNumbers, setNumbers] = useState(null);
    const [i, setI] = useState(null);

    const send = () => {

        if (!i) newRun();
        setI(i + 1);
        if (i === 9) newRun();

        setCount(count + 1);
        saveToDB();

        refresh();
    }

    const saveToDB = async () => {
        if (!rndNumbers) return

        var canvas = canvasRef.current;
        var ctx = canvas.getContext('2d');

        const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const pixel = [0]
        for (let i = 1; i < canvas.width*canvas.height; i++) {
            pixel.push(data.data[i*4-1])
        }
        console.log(pixel)

        var name = document.getElementById('name').value;

        if (!name) name = "non"

        const number = {
            "img": pixel,
            "num": rndNumbers[i],
            "name": name 
        }

        // console.log(number)

        const respone = await fetch('https://kuhrkochbuch-api.onrender.com/api/numbers/', {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(number)
        })
        // const respone = await fetch('localhost:4000/api/numbers/', reqOptions)
    }

    const newRun = () => {
        numbers = numbers.sort((a, b) => 0.5 - Math.random());
        setNumbers(numbers);
        setI(0);
    }

    return (
        <div name="numbers">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" />
            
            <h1>Bitte hier zeichnen</h1>
            <h2>Zahl: {i && rndNumbers[i]} </h2>
            <button id="Send" onClick={send}>Send</button>
            <button id="refresh" onClick={refresh}>Refresh</button>
            <div id="container">
                <canvas id="canvas" ref={canvasRef}></canvas>
            </div>
            <h2>Anzahl: {count}</h2>
        </div>
    );

}

export default Numbers