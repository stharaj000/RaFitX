document.getElementById("continueButton").addEventListener("click", () => {

    const selectedGender = document.querySelector('input[name="gender"]:checked');

    if (!selectedGender) {
        alert("Please select your gender");
        return;
    }

    const onboardingData = JSON.parse(
        localStorage.getItem("onboardingData")
    ) || {};

    onboardingData.gender = selectedGender.value;

    localStorage.setItem("onboardingData", JSON.stringify(onboardingData)
    );

    window.location.href = "/frontend/html/OnboardingScreen/age.html"


})