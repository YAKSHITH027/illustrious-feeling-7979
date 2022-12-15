

let loginForm = document.querySelector("#login");
let createAccountForm = document.querySelector("#createAccount");

document.addEventListener("DOMContentLoaded", () => {
    

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });
});


loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("login");
    let lemail = document.querySelector("#loginEmail").value;
    
    let lpassword = document.querySelector("#loginPassword").value;
    console.log(lemail,lpassword);
})




document.querySelector("#createAccount").addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log(`hiii`);
})