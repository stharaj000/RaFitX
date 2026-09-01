const picker = document.getElementById('heightPicker');
const itemH = 52;
const badge = document.getElementById('heightBadge');
const min = 120, max = 220, def = 143;
let selectedHeight = def;

// console.log("loded");


function build() {
    picker.innerHTML = '';
    for (let v = min; v <= max; v++) {
        const div = document.createElement('div');
        div.className = 'picker-item';
        div.dataset.value = v;
        div.innerHTML = v + (v === def ? ' <span class="unit">cm</span>' : '');
        picker.appendChild(div);
    }
    picker.scrollTop = (def - min - 2) * itemH;
    setSelected(def);
}
function setSelected(val) {

    selectedHeight = val;

    picker.querySelectorAll('.picker-item').forEach(item => {
        const isSel = parseInt(item.dataset.value) === val;
        item.classList.toggle('selected', isSel);
        item.innerHTML = item.dataset.value + (isSel ? ' <span class="unit">cm</span>' : '');
    });
    badge.textContent = 'Selected: ' + val + ' cm';
}
build();
let t;
picker.addEventListener('scroll', () => {
    clearTimeout(t);
    t = setTimeout(() => {
        const idx = Math.round(picker.scrollTop / itemH + 2);
        setSelected(min + idx);
    }, 0);
});



const continueButton = document.getElementById("continueButtonn");

continueButton.addEventListener('click', () => {
    const onboardingData = JSON.parse(
        localStorage.getItem('onboardingData')
    ) || {};

    onboardingData.height = selectedHeight;

    localStorage.setItem(
        'onboardingData',
        JSON.stringify(onboardingData)
    );

    window.location.href = 'goal.html';
});