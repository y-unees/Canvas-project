const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - toolbar.offsetWidth;
canvas.height = window.innerHeight;

let isPainting = false;
let isEraser = false;
let lineWidth = 5;
let previousColor = "#000000";
ctx.strokeStyle = "#000";
ctx.lineWidth = lineWidth;
ctx.lineCap = "round";

// Function to get touch/mouse position
const getPos = (e) => {
    let x, y;
    if (e.touches) {
        const touch = e.touches[0];
        x = touch.pageX - toolbar.offsetWidth;
        y = touch.pageY;
    } else {
        x = e.clientX - toolbar.offsetWidth;
        y = e.clientY;
    }
    return { x, y };
};

// Start drawing
const startPainting = (e) => {
    e.preventDefault(); 
    isPainting = true;
    ctx.beginPath();
    const { x, y } = getPos(e);
    ctx.moveTo(x, y);
};

// Draw
const draw = (e) => {
    if (!isPainting) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
};

// Stop drawing
const stopPainting = () => {
    isPainting = false;
    ctx.beginPath();
};

// Mouse Events
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopPainting);

// Touch Events (Mobile)
canvas.addEventListener("touchstart", startPainting, { passive: false });
canvas.addEventListener("touchmove", draw, { passive: false });
canvas.addEventListener("touchend", stopPainting);

toolbar.addEventListener("click", (e) => {
    if (e.target.id === "clear") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    if (e.target.id === "download") {
        const link = document.createElement("a");
        link.download = "drawing.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }
});

toolbar.addEventListener("change", (e) => {
    if (e.target.id === "stroke") {
        ctx.strokeStyle = e.target.value;
    }
    if (e.target.id === "linewidth") {
        lineWidth = e.target.value;
        ctx.lineWidth = lineWidth;
    }
});

const eraserButton = document.getElementById("eraser");
eraserButton.addEventListener("click", () => {
    isEraser = !isEraser;
    if (isEraser) {
        previousColor = ctx.strokeStyle;
        ctx.strokeStyle = "#ffffff";
        eraserButton.classList.add("active");
    } else {
        ctx.strokeStyle = previousColor;
        eraserButton.classList.remove("active");
    }
});

const helpButton = document.getElementById("help");
const helpModal = document.getElementById("help-modal");
const closeBtn = document.querySelector(".close");

helpButton.addEventListener("click", () => {
    helpModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    helpModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === helpModal) {
        helpModal.style.display = "none";
    }
});

window.addEventListener("touchstart", (e) => {
    if (e.target === helpModal) {
        helpModal.style.display = "none";
    }
});

const resizeCanvas = () => {
    canvas.width = window.innerWidth - toolbar.offsetWidth;
    canvas.height = window.innerHeight - toolbar.offsetTop;
};

window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);