


const append =(data)=> {
    const container = document.querySelector("#products_div")
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
        priceP.innerText = el.price;
        increatmentButton.innerText = "+"
        decrementButton.innerText = '-';
        removeButton.innerText = "Remove"
        qtyP.innerText = 'Quantity-' +`${el.qty}`
        qtyP.style.color = 'yellow'

        removeButton.style.backgroundColor = 'red'
        removeButton.style.color = 'white'

        increatmentButton.style.background = 'teal'
        decrementButton.style.backgroundColor ='teal'

        increatmentButton.style.color = 'white'
        increatmentButton.style.color ='white';

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
    const CartArr = JSON.parse(localStorage.getItem("cart"))
    append(CartArr)
    console.log(CartArr)
    
}
getData()
