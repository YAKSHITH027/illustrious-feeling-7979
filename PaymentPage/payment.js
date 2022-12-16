

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

  //  console.log(obj);
   if (card.length ='' || cardname =='' || date=='' || cvv=='') {
    
     swal("Opps!", "Please enter card details");

   } else  if(card.length < 19){
     swal( "Enter valid card number");

   }else if(cardname =='' || cardname.length < 3){
    swal("Enter valid name");

   }else if(date.length =='' || date.length < 5){
    swal("Enter valid date");

   }else if(cvv.length =='' || cvv.length < 3){
    swal("Enter valid cvv");

   }else{
    PayArr.push(obj);
    localStorage.setItem("credit", JSON.stringify(obj));
 
    swal("THANK YOU", "Your Order Is Successful!", "success");
   }

   console.log(obj);
 }