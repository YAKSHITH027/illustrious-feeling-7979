

 document.querySelector("#buttonpaynow").addEventListener("click", payment);

 let PayArr = [];
 function payment(event) {
   event.preventDefault();

   let card = document.querySelector("#cardnumber").value;
   let cardname = document.querySelector("#nameofcard").value;
   let date = document.querySelector("#dateofbirth").value;
   let cvv = document.querySelector("#cvv").value;

   let obj = {
     card,
     cardname,
     date,
     cvv,
   };

   console.log(obj);
   if (card < 16 || cardname == "" || date < 5 || cvv < 3) {
     // alert("Payment pending");
     swal("Opps", "Some Thing went wrong");
   } else {
     PayArr.push(obj);
     localStorage.setItem("credit", JSON.stringify(obj));

     swal("THANK YOU", "Your Order Is Successful!", "success");

     // setTimeout(() => {
     //   window.location.href = "order.html";
     // }, 3000);
   }
   console.log(obj);
 }