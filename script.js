const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let targetMouseX = window.innerWidth / 2;
let targetMouseY = window.innerHeight / 2;
let currentMouseX = window.innerWidth / 2;
let currentMouseY = window.innerHeight / 2;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
});

resizeCanvas();

function drawEye() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ease mouse coordinates toward target mouse position
    const easeFactor = 0.1;
    currentMouseX += (targetMouseX - currentMouseX) * easeFactor;
    currentMouseY += (targetMouseY - currentMouseY) * easeFactor;

    const spacer = document.querySelector('.spacer');
    let eyeCenterX = canvas.width / 2;
    let eyeCenterY = canvas.height / 2;
    let radiusX = 120;
    let radiusY = 45;

    if (spacer) {
        const rect = spacer.getBoundingClientRect();
        eyeCenterX = rect.left + rect.width / 2;
        eyeCenterY = rect.top + rect.height / 2;
        radiusX = Math.min(rect.width * 0.2, 75);
        radiusY = Math.max(rect.height * 0.55, 25);
    }

    // Draw white sclera (almond / eye shape with pointy corners on sides)
    ctx.beginPath();
    const leftX = eyeCenterX - radiusX;
    const rightX = eyeCenterX + radiusX;
    
    // Move to left corner
    ctx.moveTo(leftX, eyeCenterY);
    // Top arch to right corner (taller arch)
    ctx.quadraticCurveTo(eyeCenterX, eyeCenterY - radiusY * 1.4, rightX, eyeCenterY);
    // Bottom arch back to left corner (taller arch)
    ctx.quadraticCurveTo(eyeCenterX, eyeCenterY + radiusY * 1.4, leftX, eyeCenterY);
    
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Pupil parameters (made slightly bigger)
    const pupilRadius = radiusY * 0.65;
    const maxDx = radiusX - pupilRadius - 3;
    const maxDy = radiusY - pupilRadius - 3;

    // Direction vector from eye center to smoothed cursor
    const dx = currentMouseX - eyeCenterX;
    const dy = currentMouseY - eyeCenterY;

    // Check distance scaled by ellipse axes
    const normalizedDist = Math.hypot(dx / maxDx, dy / maxDy);

    let pupilX = eyeCenterX + dx;
    let pupilY = eyeCenterY + dy;

    if (normalizedDist > 1) {
        pupilX = eyeCenterX + (dx / normalizedDist);
        pupilY = eyeCenterY + (dy / normalizedDist);
    }

    // Draw black pupil
    ctx.beginPath();
    ctx.arc(pupilX, pupilY, pupilRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#000000';
    ctx.fill();

    requestAnimationFrame(drawEye);
}

requestAnimationFrame(drawEye);

