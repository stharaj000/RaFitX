const signInBtn = document.getElementById("signInBtn");

signInBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill All fields!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            }
            )
        });

        const data = await response.json();

        console.log(data);

        if (data.success) {
            localStorage.setItem("token", data.token);
            alert("Login Successfully");
            window.location.href = "/frontend/html/dashboard.html";
        }
        else {
            alert(data.message);
        }


    } catch (error) {
        console.error(error)
        alert("Internal Server Error.")
    }

})