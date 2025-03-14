const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - toolbar.offsetWidth;
canvas.height = window.innerHeight;

let isPainting = false;
let lineWidth = 5;
let startX, startY;
ctx.strokeStyle = "#000";
ctx.lineWidth = lineWidth;
ctx.lineCap = 'round';

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear'){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    if (e.target.id === 'download'){
        const link = document.createElement('a');
        link.download = 'drawing.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
});

toolbar.addEventListener('change', e =>{
    if(e.target.id === 'stroke'){
        ctx.strokeStyle = e.target.value;
    }
    if(e.target.id === 'linewidth'){
        lineWidth = e.target.value;
        ctx.lineWidth = lineWidth;
    }
});

const draw = (e) => {
    if(!isPainting) return;
    ctx.lineTo(e.clientX - toolbar.offsetWidth, e.clientY);
    ctx.stroke();
};

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - toolbar.offsetWidth, e.clientY);
});

canvas.addEventListener('mouseup', () => {
    isPainting = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

// Eraser
const eraserButton = document.getElementById('eraser');
const strokeInput = document.getElementById('stroke');  
let isEraser = false;  
let previousColor = '#000000';   

eraserButton.addEventListener('click', () => {
    isEraser = !isEraser; 

    if (isEraser) {
        previousColor = ctx.strokeStyle; 
        ctx.strokeStyle = '#ffffff'; 
        eraserButton.classList.add('active'); 
    } else {
        ctx.strokeStyle = previousColor; 
        eraserButton.classList.remove('active');
    }
});

//Pop-Up
const helpButton = document.getElementById('help');
const helpModal = document.getElementById('help-modal');
const closeBtn = document.querySelector('.close');

helpButton.addEventListener('click', () => {
    helpModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    helpModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === helpModal) {
        helpModal.style.display = 'none';
    }
});