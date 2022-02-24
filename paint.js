const canvas = document.getElementById("ptCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

ctx.strokeStye = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting) {
        console.log("creating path in ",x,y);
        ctx.beginPath();
        ctx.moveTo(x,y);
    } 
    else {
        console.log("creating line in ",x,y);
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}
