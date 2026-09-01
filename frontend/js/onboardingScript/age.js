const picker = document.getElementById('agePicker');
const badge = document.getElementById('ageBadge');

const min = 10, max = 102, defaultAge = 15;
const itemH = 52;

let selectedAge = defaultAge;

for (let a = min; a <= max; a++) {
    const div = document.createElement('div');

    div.className = 'picker-item';
    div.textContent = a;
    div.dataset.value = a;

    picker.appendChild(div);
}


function setSelected(age) {

    selectedAge = age;

    document.querySelectorAll('.picker-item').forEach(el => {
        el.classList.toggle('selected', parseInt(el.dataset.value) === age);
    });
    badge.textContent = 'Selected: ' + age + ' years old';
}


// center default item
picker.scrollTop = (defaultAge - min - 2) * itemH;
setSelected(defaultAge);

let scrollTimeout;
picker.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const idx = Math.round(picker.scrollTop / itemH);
        const age = min + idx + 2;


        if (age >= min && age <= max) {
            setSelected(age);
        }

    }, 0);
});




// Continue button
const continueButton = document.getElementById('continueButton');

continueButton.addEventListener('click', () => {

    const onboardingData = JSON.parse(
        localStorage.getItem('onboardingData')
    ) || {};

    onboardingData.age = selectedAge;

    localStorage.setItem(
        'onboardingData',
        JSON.stringify(onboardingData)
    );

    window.location.href = 'weight.html';
});