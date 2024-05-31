document.addEventListener("DOMContentLoaded", function() {
    var registroForm = document.getElementById('registroForm');
    registroForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var formData = new FormData(registroForm);
        var jsonData = {};
        formData.forEach(function(value, key) {
            jsonData[key] = value;
        });

        fetch('http://localhost:5000/api/users/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Usuario registrado correctamente');
            registroForm.reset();
        })
        .catch(error => {
            console.error('Error al registrar usuario:', error);
            alert('Error al registrar usuario');
        });
    });

    var loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var formData = new FormData(loginForm);
        var jsonData = {};
        formData.forEach(function(value, key) {
            jsonData[key] = value;
        });

        fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.message === 'Autenticación exitosa') {
                alert('Inicio de sesión satisfactorio');
            } else {
                alert('Error en la autenticación');
            }
            loginForm.reset();
        })
        .catch(error => {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión');
        });
    });
});


