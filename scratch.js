const options = [
    "Who should marry Chota Bheem: Indumati or Chutki?",
    "Tom (from Tom and Jerry): Villain or not?",
    "Koootosan and dagini Sherikum couple?",
    "Mandhi or Biryani?"
];

const scratchCardCover = document.querySelector('.scratch-card-cover');
const scratchCardCanvas = document.querySelector('.scratch-card-canvas');
const scratchCardText = document.querySelector('.scratch-card-text');
const nextButton = document.getElementById('next-button');

let context = scratchCardCanvas.getContext('2d');
let isDrawing = false;

const devicePixelRatio = window.devicePixelRatio || 1;

const canvasWidth = scratchCardCanvas.offsetWidth * devicePixelRatio;
const canvasHeight = scratchCardCanvas.offsetHeight * devicePixelRatio;

scratchCardCanvas.width = canvasWidth;
scratchCardCanvas.height = canvasHeight;

context.scale(devicePixelRatio, devicePixelRatio);
context.fillStyle = 'black'; // Color to cover the scratch area
context.fillRect(0, 0, canvasWidth, canvasHeight);

// Handle scratching logic
scratchCardCanvas.addEventListener('pointerdown', (e) => {
    isDrawing = true;
    scratchCardCover.classList.remove('shine');
    const { x, y } = getPosition(e);
    plot(x, y);

    scratchCardCanvas.addEventListener('pointermove', onScratch);
});

window.addEventListener('pointerup', () => {
    isDrawing = false;
    scratchCardCanvas.removeEventListener('pointermove', onScratch);
    checkScratchComplete();
});

const onScratch = (e) => {
    if (!isDrawing) return;
    const { x, y } = getPosition(e);
    plot(x, y);
};

const checkScratchComplete = () => {
    const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
    const pixelData = imageData.data;

    let blackPixelCount = 0;

    for (let i = 0; i < pixelData.length; i += 4) {
        const red = pixelData[i];
        const green = pixelData[i + 1];
        const blue = pixelData[i + 2];
        const alpha = pixelData[i + 3];

        if (red === 0 && green === 0 && blue === 0 && alpha === 255) {
            blackPixelCount++;
        }
    }

    const blackFillPercentage = (blackPixelCount / (canvasWidth * canvasHeight / 4)) * 100; // 25% threshold

    if (blackFillPercentage >= 45) {
        scratchCardCover.classList.add('hidden');
        const randomOption = options[Math.floor(Math.random() * options.length)];
        scratchCardText.textContent = randomOption;
        nextButton.classList.remove('hidden'); // Show the next button
    }
}

const getPosition = ({ clientX, clientY }) => {
    const { left, top } = scratchCardCanvas.getBoundingClientRect();
    return {
        x: (clientX - left) * devicePixelRatio,
        y: (clientY - top) * devicePixelRatio,
    };
}

const plot = (x, y) => {
    context.beginPath();
    context.arc(x, y, 20, 0, Math.PI * 2); // Increase the scratch area radius
    context.fill();
}

// Next button functionality
nextButton.addEventListener('click', () => {
    // Pass the scratched option via URL or store it
    const scratchedOption = scratchCardText.textContent;
    window.location.href = `result.html?option=${encodeURIComponent(scratchedOption)}`; // Redirect to the result page with the option
});
