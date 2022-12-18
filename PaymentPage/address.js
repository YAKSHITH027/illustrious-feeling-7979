



 document.querySelector("#button").addEventListener("click", payment);

 let total_amount=JSON.parse(localStorage.getItem('totalPrice'))

  let Payarr=[]
 function payment(event) {
   event.preventDefault();

   let fullname = document.querySelector(".inputspace").value;
   let pincode= document.querySelector(".inputspace").value;
   let state= document.querySelector(".inputspace").value;
   let street = document.querySelector(".inputspace").value;
   let mobile = document.querySelector(".inputspace").value;
   let city= document.querySelector(".inputspace").value;
   let building= document.querySelector(".inputspace").value;
   let landmark = document.querySelector(".inputspace").value;

   let obj = {
     fullname,
     pincode,
     state,
     street,
     mobile,
     city,
     building,
     landmark

   };

//    console.log(obj);
   if (fullname =='' || pincode == "" || state =='' || street =='' || mobile=='' || city=='' || building =='') {
    
     swal("Opps!", "Please fill all required details");
   } else {

    Payarr.push(obj);
    localStorage.setItem("credit", JSON.stringify(obj));
    swal("THANK YOU", "Address saved", "success");
    // swal( 'fill correct name')
    

     setTimeout(() => {
       window.location.href = "payment.html";
     }, 3000);
   }

   document.querySelector('#t_amount').innerHtml = total_amount
   console.log(obj);
 }

 let cartarr=JSON.parse(localStorage.getItem('cart'))
 
//  let total=cartarr.reduce((prevalue,curvalue)=>{
//   return prevalue+curvalue.price
//  },0)
//    console.log(total)

    let totalAmount_addres =JSON.parse(localStorage.getItem('totalPrice'))
console.log(totalAmount_addres)

const spantag = document.querySelector("#totalPrice_span");
spantag.innerText = totalAmount_addres;