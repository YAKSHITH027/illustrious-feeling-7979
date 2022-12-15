




const handlelAddToCartClick=(el) => {

    // alert('I am running')

    
    let cartArr = JSON.parse(localStorage.getItem('cart')) || []


    let flag = false;
    cartArr.map((element)=>{
        if(element.id == el.id){
            flag = true;
        }
    })

    if(flag){
        alert('Data already Present')
        return;
    }

    el.qty =1;
    cartArr.push(el);

    //store it on local storage with key
    localStorage.setItem('cart',JSON.stringify(cartArr))
    target.innerHTML =navbar();
    alert("Data added to cart");
}

const append = (data) => {

    const container = document.querySelector("#products_div")
    container.innerHTML = null;

    data.map((el) => {

        const  mainDiv = document.createElement('div')
        const imageDiv = document.createElement('div');
        const contentDiv = document.createElement('div')
        const buttonDiv = document.createElement('div')
        const img = document.createElement('img')
        const titleP= document.createElement('p');
        const categoryP= document.createElement('p');
        const priceP = document.createElement('p');
        const buybutton = document.createElement('button');
        const addToCartButton = document.createElement('button');

        img.src = el.image;
        titleP.innerText = el.title;
        categoryP.innerText=el.category;
        priceP.innerText = el.price;
        buybutton.innerText = "Buy";
        addToCartButton.innerText = 'Add To Cart';

        addToCartButton.addEventListener('click',() => {
            handlelAddToCartClick(el)
        })

        imageDiv.append(img);
        contentDiv.append(titleP,categoryP,priceP)
        buttonDiv.append(buybutton,addToCartButton);
        mainDiv.append(imageDiv,contentDiv,buttonDiv)
        container.append(mainDiv)
    })

}

const getData = async () => {
    try {
        const response = await fetch('https://relince-data-sever-fp05-318.onrender.com/products');
        const data = await response.json();
        console.log(data)
        append(data)
    } catch (error) {
        console.log(error)
    }
}
getData()
