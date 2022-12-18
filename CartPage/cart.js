

const handleRemove=(el)=>{

    let cartArr = JSON.parse(localStorage.getItem('cart'));

    cartArr = cartArr.filter((element) => {
        return element.id !== el.id;
    })

    localStorage.setItem('cart',JSON.stringify(cartArr))

    append(cartArr)
    handlePriceCalculation();
    target.innerHTML = navbar()

    
}


const handlePriceCalculation =() => {
        const cartArr = JSON.parse(localStorage.getItem('cart'))
        let sum = 0;

        cartArr.map((el)=>{
            sum = sum + el.price * el.qty;
           
        })
     

        sum = Math.round(sum)

     

        const span = document.querySelector("#totalPrice_span");
        span.innerText = sum;
   

        localStorage.setItem('totalPrice',JSON.stringify(sum))
}

handlePriceCalculation();

const handleQuantity=(el, type)=> {

    let cartArr = JSON.parse(localStorage.getItem('cart'));
 //increment
    if(type == "+"){
        
      cartArr= cartArr.map((element)=>{
            if(element.id == el.id){
                return {...element,qty:element.qty+1}

            }else{
                return element;
            }
        })


        localStorage.setItem('cart',JSON.stringify(cartArr))

        append(cartArr);
        handlePriceCalculation();

    }else{
        //decrement
        cartArr= cartArr.map((element)=>{
            if(element.id === el.id ){
            
               console.log(element.qty)

               if(element.qty <= 0){
                return element
               }
          
                return {...element,qty:element.qty-1}
            }else{
                return element;
            }
    })

    localStorage.setItem('cart',JSON.stringify(cartArr))
    handlePriceCalculation()
    append(cartArr)
   
}


}

const append = (data) => {

    const container = document.querySelector('#cartProducts_div')
    container.innerHTML = null;;

    data.map((el) => {

        const  mainDiv = document.createElement('div')
        const imageDiv = document.createElement('div');
        const contentDiv = document.createElement('div')
        const buttonDiv = document.createElement('div')
        const img = document.createElement('img')
        const titleP= document.createElement('p');
        const categoryP= document.createElement('p');
        const priceP = document.createElement('p');
        const qtyP = document.createElement('p');

        const increatmentButton = document.createElement('button');
        const decrementButton = document.createElement('button');
        const removeButton = document.createElement('button')

        img.src = el.image;
        titleP.innerText = el.title;
        categoryP.innerText=el.category;
        priceP.innerText = `Price -`+`₹`+`${el.price}`;
        increatmentButton.innerText = "+"
        decrementButton.innerText = '-';
        removeButton.innerText = "Remove"
        qtyP.innerText = 'Quantity-' +`${el.qty}`
        qtyP.style.color = 'black'

        removeButton.style.backgroundColor = 'rgb(238, 83, 83)'
        removeButton.style.color = 'black'
        
        increatmentButton.style.color = 'white'
        

        increatmentButton.addEventListener('click',()=>{
            handleQuantity(el,'+')
        })

        decrementButton.addEventListener('click',()=>{
            handleQuantity(el,'-')
        })

        removeButton.addEventListener('click',()=>{
            handleRemove( el);
        })

        imageDiv.append(img);
        contentDiv.append(titleP,categoryP,priceP,qtyP)
        buttonDiv.append( decrementButton,increatmentButton,removeButton);
        mainDiv.append(imageDiv,contentDiv,buttonDiv)
        container.append(mainDiv)

    })

}


const getData = () => {


    const cartArr = JSON.parse(localStorage.getItem('cart'))
    append(cartArr);
}

getData()


const addressbutton = document.querySelector("#addressPage_button");
addressbutton.addEventListener("click",()=>{

    const cartArr = JSON.parse(localStorage.getItem("cart"));
    // if(!cartArr || cartArr.length === 0) {
    //     alert("Nothing in cart")
    //     return;
    // }

    window.location.href="../PaymentPage/payment.html"
});