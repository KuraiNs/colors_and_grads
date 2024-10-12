

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
    for (let i = 0; i < colors.length - 2; i++) {
        text_colors += colors[i].innerHTML + ", ";
    }
    // avoid trailing comma
    text_colors += colors[colors.length - 1].innerHTML

    grad.style.background =
        "linear-gradient(135deg, "
        + text_colors + ")";
}

function popColor() {
    const colors = document.querySelectorAll('.hex-color');
    if (colors.length > 0) {
        const pop_temp = colors[colors.length - 1];
        pop_temp.parentNode.removeChild(pop_temp);
    }
    else {
        let pop_button = document.getElementById('pop-color');
        pop_button.style.backgroundColor = "#ff8888"
        setTimeout(() => {
            pop_button.style.backgroundColor = '';
        }, 1000);
    }
}

function newColor() {
    const input_value = document.getElementById('new-color').value;

    const new_p = document.createElement('p');
    new_p.innerHTML = input_value;

    const p_list = document.getElementById('hex-holder')
    p_list.appendChild(new_p);
}

document.getElementById('new-color')
    .addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            newColor();
        }
    });



