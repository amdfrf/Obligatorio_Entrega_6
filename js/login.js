let email = document.getElementById("floatingInput");
let password = document.getElementById("floatingPassword");
let button = document.getElementById("Input");


function verifications(){
    if (password.value == "" || email.value == ""){
        alert("Uno de los campos esta vacio");
    }   else {
        window.location = "portada.html";
    }
}




button.addEventListener("click", function(){
    verifications();
    localStorage.setItem("usuario", email.value)
})