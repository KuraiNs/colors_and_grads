
window.onload = () => {
    setHexColors();
    setGradColors();
}; 

function setHexColors() {
    let colors = document.querySelectorAll('.hex-color');
    for (let c of colors) {
        c.style.background = c.innerHTML;
    }
}

function setGradColors() {
    const colors = document.getElementsByClassName('hex-color');
    const grad = document.getElementById('grad');
    
    if (colors.length === 0) {
        grad.style.background = 'transparent';
    } else if (colors.length === 1) {
        grad.style.background = colors[0].innerHTML;
    } else {
        let text_colors = "";
        for (let i = 0; i < colors.length; i++) {
            text_colors += ", " + colors[i].innerHTML;
        }
        grad.style.background = "linear-gradient(135deg" + text_colors + ")";
    }
}

function popColor() {
    let pre_pop = document.getElementById('hex-holder').lastElementChild;
    if (pre_pop != null) {
        pre_pop.remove();
        setGradColors();
    } else {
        let pop_button = document.getElementById('pop-color');
        pop_button.style.backgroundColor = "#ff8888"
        setTimeout(() => {
            pop_button.style.backgroundColor = '';
        }, 1000);
    }
}

function validateInput(string_input) {
    const hexPattern = /^#?[0-9a-fA-F]{1,6}$/;
    return hexPattern.test(string_input);
}

function padHexColor(hex) {
    let hexValue = hex.startsWith('#') ? hex.slice(1) : hex;

    while (hexValue.length < 6) {
        hexValue += '0';
    }

    return `#${hexValue}`;
}

function newColor() {
    let input_value = document.getElementById('new-color').value;

    if (!validateInput(input_value)) {
        return;
    }

    input_value = padHexColor(input_value.toLowerCase());

    const new_p = document.createElement('p');
    new_p.innerHTML = input_value;
    new_p.classList.add('hex-color');

    const p_list = document.getElementById('hex-holder');
    p_list.appendChild(new_p);


    setHexColors();
    setGradColors();
}

document.getElementById('new-color')
    .addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            newColor();
        }
    });
