const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }


    try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        console.log(data);

        if (data.success) {
            localStorage.setItem("token", data.token);

            alert("Account created successfully!");

            window.location.href = "/frontend/html/onboardingScreen/name.html"
        }
        else {
            alert(data.message);
        }


    } catch (error) {
        console.error(error);
        alert("Server error");
    }



})