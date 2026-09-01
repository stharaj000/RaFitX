const weightValues = {
    currentWeight: 55,
    goalWeight: 75
};

function buildPicker(id, min, max, def, unit, type) {

    const el = document.getElementById(id);
    const itemH = 56;

    for (let v = min; v <= max; v++) {

        const div = document.createElement('div');

        div.className = 'picker-item';
        div.dataset.value = v;

        div.innerHTML = v + (v === def ? ' <span class="unit">' + unit + '</span>' : '');
        el.appendChild(div);

    }


    function setSelected(val) {

        el.querySelectorAll('.picker-item').forEach(item => {

            const isSel = parseInt(item.dataset.value) === val;
            item.classList.toggle('selected', isSel);
            item.innerHTML = item.dataset.value + (isSel ? ' <span class="unit">' + unit + '</span>' : '');

        });

        weightValues[type] = val;
    }


    el.scrollTop = (def - min - 1) * itemH;
    setSelected(def);

    let t;
    el.addEventListener('scroll', () => {
        clearTimeout(t);
        t = setTimeout(() => {
            const idx = Math.round(el.scrollTop / itemH);
            const value = min + idx + 1;

            if (value >= min && value <= max) {
                setSelected(value);
            }

        }, 0);
    });
}


buildPicker(
    'currentPicker',
    30,
    160,
    55,
    'kg',
    'currentWeight'
);

buildPicker(
    'goalPicker',
    30,
    160,
    75,
    'kg',
    'goalWeight'
);


document.getElementById("continueButton").addEventListener("click", () => {

    const onboardingData = JSON.parse(
        localStorage.getItem("onboardingData")
    ) || {};

    onboardingData.currentWeight =
        weightValues.currentWeight;

    onboardingData.goalWeight =
        weightValues.goalWeight;

    localStorage.setItem(
        "onboardingData",
        JSON.stringify(onboardingData)
    );

    window.location.href = "height.html";
});