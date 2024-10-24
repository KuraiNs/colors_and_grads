document.addEventListener('DOMContentLoaded', () => {
    setHexColors();
    setGradColors();
    addEventListeners();
    loadGradientAngle();
});

// Global variable to store gradient angle
let gradientAngle = 135;

// Functions to set hex and gradient colors
function setHexColors() {
    const colors = document.querySelectorAll('.hex-color');
    colors.forEach(color => {
        color.style.background = color.textContent;
    });
}

function setGradColors() {
    const colors = Array.from(document.getElementsByClassName('hex-color'));
    const grad = document.getElementById('grad');
    
    if (colors.length === 0) {
        grad.style.background = 'transparent';
    } else if (colors.length === 1) {
        grad.style.background = colors[0].textContent;
    } else {
        const textColors = colors.map(color => color.textContent).join(', ');
        grad.style.background = `linear-gradient(${gradientAngle}deg, ${textColors})`;
    }
}

// Function to remove a color from the list
function removeColor(colorElement) {
    colorElement.remove();
    setGradColors();
}

// Function to add a new color to the list
function addColor(value) {
    value = value.trim();
    if (!validateInput(value)) return;
    
    value = padHexColor(value.toLowerCase());
    const newColorElement = document.createElement('p');
    newColorElement.textContent = value;
    newColorElement.classList.add('hex-color');
    newColorElement.addEventListener('click', () => removeColor(newColorElement));
    
    document.getElementById('hex-holder').appendChild(newColorElement);
    setHexColors();
    setGradColors();
}

// Function to remove the last color in the list
function popColor() {
    const hexHolder = document.getElementById('hex-holder');
    const lastColor = hexHolder.lastElementChild;
    
    if (lastColor) {
        removeColor(lastColor);
    } else {
        const popButton = document.getElementById('pop-color');
        popButton.style.backgroundColor = '#ff8888';
        setTimeout(() => {
            popButton.style.backgroundColor = '';
        }, 1000);
    }
}

// Helper functions for validating and formatting input
function validateInput(stringInput) {
    const hexPattern = /^#?[0-9a-fA-F]{1,6}$/;
    return hexPattern.test(stringInput);
}

function padHexColor(hex) {
    let hexValue = hex.startsWith('#') ? hex.slice(1) : hex;
    while (hexValue.length < 6) {
        hexValue += '0';
    }
    return `#${hexValue}`;
}

// Function to handle adding new colors from input
function newColor() {
    const inputValue = document.getElementById('new-color').value;
    const inputValues = inputValue.split(';');
    
    inputValues.forEach(value => addColor(value));
}

// Function to update gradient based on current colors and angle
function updateGradient() {
    const colors = Array.from(document.getElementsByClassName('hex-color')).map(el => el.textContent);
    const gradElement = document.getElementById('grad');
    gradientAngle = document.getElementById('angle-range').value;
    
    if (colors.length > 0) {
        gradElement.style.backgroundImage = `linear-gradient(${gradientAngle}deg, ${colors.join(', ')})`;
    } else {
        gradElement.style.backgroundImage = 'transparent';
    }
}

// Function to add event listeners
function addEventListeners() {
    // Add event listener for angle range input
    document.getElementById('angle-range').addEventListener('input', updateGradient);
    
    // Add event listeners for color click removal
    document.getElementById('hex-holder').addEventListener('click', (event) => {
        if (event.target.classList.contains('hex-color')) {
            removeColor(event.target);
        }
    });
    
    // Add event listener for adding new color on Enter key press
    document.getElementById('new-color').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            newColor();
        }
    });
}

// Button event listener to pop color
document.getElementById('pop-color').addEventListener('click', popColor);

// Load the gradient angle from the variable
function loadGradientAngle() {
    document.getElementById('angle-range').value = gradientAngle;
    updateGradient();
}
