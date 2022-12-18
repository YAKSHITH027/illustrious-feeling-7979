
let adminData = JSON.parse(localStorage.getItem("adminData")) || [];


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
    // console.log("login");
    

    let lemail = document.querySelector("#loginEmail").value;
    
    let lpassword = document.querySelector("#loginPassword").value;

    if(lemail.length == 0 && lpassword.length == 0){
        swal("Please fill all inputs")
    }else{
        let flag = false;
        adminData.forEach(e => {
        
        if(lemail == e.email && lpassword == e.password){
            flag = true
            localStorage.setItem("adminName",e.firstName);
        }
    })
    if(flag == true){
        swal("Congratulation SignIn successful!!", "Redirecting you to AdminPage", "success");



        window.location.href = "../Adminpage/admin.html";
        lemail = "";
        lpassword ="";
    }else{
        swal("Wrong Credential", "Please enter correct email/password", "error");
        lemail = "";
        lpassword ="";
    }
    }

})













createAccountForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    // console.log(`hiii`);
    // let userData = localStorage.getItem("userData") || [];

    let firstName = document.querySelector("#signupfirstname").value;

    let lastName = document.querySelector("#signuplastname").value;


    let userName = document.querySelector("#signupUsername").value;

    let email = document.querySelector("#signupEmail").value;

    let password = document.querySelector("#signupPassword").value;

    let obj = {
        firstName,
        lastName,
        userName,
        email,
        password
    }

    if(firstName.length == 0 || lastName.length == 0|| userName.length == 0|| email.length == 0|| password.length == 0){
        swal("Please fill all inputs");
    }else{
        adminData.push(obj);
    localStorage.setItem("adminData",JSON.stringify(adminData));
 
    swal("Congratulation SignUp successful!!", "Redirecting you to login Page", "success");

    firstName ="";
    lastName ="";
    userName ="";
    email ="";
    password ="";

    setTimeout(() => {
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    },2500);


    
    }

    


    // loginForm.classList.remove("form--hidden");
    // createAccountForm.classList.add("form--hidden");

    console.log(obj);
})













const togglePassword = document.querySelector('#togglePassword');
  const lpassword = document.querySelector('#loginPassword');
  const spassword = document.querySelector('#signupPassword');


  const togglePassword2 = document.querySelector('#togglePassword2');
  togglePassword2.addEventListener('click', function (e) {
    console.log("hi")
    // toggle the type attribute
    const type = spassword.getAttribute('type') === 'password' ? 'text' : 'password';
    spassword.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});








  togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const atype = lpassword.getAttribute('type') === 'password' ? 'text' : 'password';
    lpassword.setAttribute('type', atype);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});







