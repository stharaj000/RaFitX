const continueBtn = document.getElementById("continueButton");

continueBtn.addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();

    if (!name) {
        alert("Please enter your name");
        return;
    }

    const onboardingData = JSON.parse(
        localStorage.getItem("onboardingData")
    ) || {};

    onboardingData.name = name;

    localStorage.setItem(
        "onboardingData",
        JSON.stringify(onboardingData)
    );

    window.location.href = "/frontend/html/OnboardingScreen/gender.html";
});