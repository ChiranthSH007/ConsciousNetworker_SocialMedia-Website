window.onload = function () {
    google.accounts.id.initialize({
        client_id: '978255236750-vcqrekgroa7duh5igffakejo0i8pnm2u.apps.googleusercontent.com',
        callback: handleCredentialResponse
    });

    const parent = document.getElementById('google_btn');
    google.accounts.id.renderButton(parent, { theme: "filled_blue" });
    google.accounts.id.prompt();
}


function handleCredentialResponse(response){
console.log("handleCredentialResponse called"); // Debugging statement
console.log("Encoded JWT ID Token: " + response.credential);
}
