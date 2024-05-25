const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const textFont = document.getElementById("font");
const textSize = document.getElementById("fontSize");
const textColor = document.getElementById("fontColor");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting(){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
}
function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}
function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick(){
    if(isFilling){
        isFilling = false
        modeBtn.innerText ="Fill"
    }else{
        isFilling = true
        modeBtn.innerText ="Draw"
    }
}
function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, 800, 800);
    }
}
function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 800, 800);
}
function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText ="Fill"
}
function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        fileInput.value = null;
    }
}
function onDoubleCLick(event){
    ctx.save();
    const text = textInput.value;
    if(text !== ""){
        ctx.lineWidth = 1;
        const font = textFont.value;
        const size = textSize.value;
        const color = textColor.value;
        ctx.font = `${size} ${font}`;
        ctx.fillStyle = `${color}`;
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}
function onSaveClick(event){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}


canvas.addEventListener("dblclick", onDoubleCLick);
canvas.onmousemove = onMove
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick); 
