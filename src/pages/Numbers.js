import React, { useEffect, useRef } from "react";

const Numbers = () => {

    const canvasRef = useRef(null);

    useEffect(() => {
        // var canvas = document.getElementById('canvas');
        var canvas = canvasRef.current;
        console.log(canvas)
        var ctx = canvas.getContext('2d');

        var container = document.getElementById('container');
        canvas.width = 300;
        canvas.height = 300;

        var mouse = {x: 0, y: 0};

        canvas.addEventListener('pointermove', function(e) {
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        ctx.globalCompositeOperation = "multiply";
        ctx.lineWidth = 12;
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
            console.log("paint")
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

    return (
        <div name="numbers">
            <h1>Bite hier zeichnen</h1>
            <button id="refresh" onClick={refresh}>Refresh</button>
            <div id="container">
                <canvas id="canvas" ref={canvasRef}></canvas>
            </div>
        </div>
    );

}

export default Numbers