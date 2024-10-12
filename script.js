

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
    let grad = document.getElementById('grad');
    let colors = document.querySelectorAll('.hex-color');

    let text_colors = "";
    for (let i = 0; i < colors.length - 1; i++) {
        text_colors += ", " + colors[i].innerHTML;
    }
    grad.style.background = "linear-gradient(135deg" + text_colors + ")";
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

const hex_symbols = [
    '0', '1', '2', '3',
    '4', '5', '6', '7',
    '8', '9', 'a', 'b',
    'c', 'd', 'e', 'f'
];

function validateInput(string_input) {
    if (string_input.length != 7)
        return false;
    if (string_input[0] != '#')
        return false;
    for (let s of string_input.slice(1)) {
        let hit = false;
        for (let h of hex_symbols) {
            if (s === h) {
                hit = true;
                break;
            }
        }
        // simply returning `hit` is bad
        // because we will return `true`
        // after at least one hit
        if (hit == false) {
            return false;
        }
    }
    return true;
}

function newColor() {
    const input_value = document.getElementById('new-color').value;
    if (!validateInput(input_value)) {
        return;
    }

    const new_p = document.createElement('p');
    new_p.innerHTML = input_value;
    new_p.classList.add('hex-color');

    const p_list = document.getElementById('hex-holder')
    p_list.appendChild(new_p);
}

document.getElementById('new-color')
    .addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            newColor();
            setHexColors();
            setGradColors();
        }
    });



