document.getElementById('Sign-In-btn').addEventListener('click', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (validate(email, 'Email') && validate(password, 'Password')) {
        const data = { email, password };

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful',
                    }).then(() => {
                        // Redirect to another page or perform other actions upon successful login
                        window.location.href = '/dashboard'; // Example redirection
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: data.message, // Add more info if available
                    });
                }
            })
            .catch(err => {
                console.error('Error during fetch:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'An error occurred',
                    text: err.message // Add more error details if available
                });
            });
    }

});

function validate(value, field_name) {
    if (!value) {
        Swal.fire({
            icon: 'warning',
            title: 'Please enter ' + field_name
        });
        return false;
    } else {
        return true;
    }
}
