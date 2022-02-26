const canvas = document.getElementById("ptCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("ptColor");
const range = document.getElementById("ptRange");
const mode = document.getElementById("ptMode");
const save = document.getElementById("ptSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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

function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    console.log(event.target.style);
}

function rangeChange(event) {
    const lineSize = event.target.value;
    ctx.lineWidth = lineSize;
    console.log(event.target.value);
}

function modeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    }
    else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function canvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }    
}

function handleContextMenu(event) {
    event.preventDefault();
    console.log(event);
}

function savePaint() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    
    link.href = image;
    link.download = "DownloadPt";
    link.click();

    console.log(image);
    console.log(link);
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", canvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(color).forEach(color =>
    color.addEventListener("click", changeColor)
    );

console.log(Array.from(color));

if(range) {
    range.addEventListener("input", rangeChange);
}

if(mode) {
    mode.addEventListener("click", modeClick);
}

if(save) {
    save.addEventListener("click", savePaint);
}