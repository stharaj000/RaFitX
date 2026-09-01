document.getElementById("finishButton").addEventListener("click", async () => {

    const selectedGoal = document.querySelector('input[name="goal"]:checked');

    if (!selectedGoal) {
        alert("Please select your Goal");
        return;
    }

    const onboardingData = JSON.parse(
        localStorage.getItem("onboardingData")
    ) || {};


    onboardingData.goal = selectedGoal.value;


    console.log("Sending onboarding data:", onboardingData);


    //Getting JWT
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You are not logged in.");
        window.location.href = "/frontend/html/login.html";
        return;
    }


    try {
        const response = await fetch("http://localhost:5000/api/onboarding", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(onboardingData)
        });

        const data = await response.json();

        console.log("Server response:", data);


        if (data.success) {

            // Onboarding is complete
            localStorage.removeItem("onboardingData");

            alert("Onboarding completed!");

            window.location.href =
                "/frontend/html/dashboard.html";

        } else {

            alert(data.message);
        }
    } catch (error) {

        console.error("Onboarding error:", error);

        alert("Something went wrong.");
    }


})