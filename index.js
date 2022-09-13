// alert('Hello. Welcome to Horizon Supply Co: Post Human - Survival Horror Collection')

// let selectedProduct = parseInt(prompt('Select the product you want to buy: \n 1) Basic tee \n 2) Nomad Hoodie \n 3) Black Jewelry \n 4) $100 Giftcard \n 5) Post Human: Survival Horror CD'))
let shoppingTotal = 0
let continueShopping = true
let shoppingDecision
let products = []
let shoppingCart = []
const selectTag = document.getElementById('product__list')

class Product{
    constructor(name, price, code, quantity, id, img){
        this.name = name
        this.price = price
        this.code = code
        this.quantity = quantity
        this.id = id
        this.img = img

        this.changeId = (newId) => {
            this.id = newId
        }
        this.soldUnits = (sellUnits) => {
            this.quantity = this.quantity - sellUnits
        }
        this.addUnits = (addUnits) =>{
            this.quantity = this.quantity + addUnits
        }
        this.promoPrice = (newPrice) => {
            this.price = this.price * 0.5
        }
    }
    viewProducts(){
        const card = `
        <div class = "card">
                <p>${this.name}</p>
            <div>
                <img class="product-image" src=${this.img} alt="Tshirt Image"/>
            </div>
            <div>
                <p>${'$' + this.price}</p>
            </div>
            <div class="btn-container">
                <button id=${this.id} class="btnAdd">Add to cart</button>
            </div>
        </div>
    `
    const container = document.getElementById('container')
    container.innerHTML += card
    }
    addEvent(){
        const btnAdd = document.getElementById(this.id)
        const chosenProduct = products.find(product => product.id == this.id)
        btnAdd.addEventListener('click', () => addToCart(chosenProduct))
    }
}

const tshirt = new Product('Basic Tee', 25, 001, 150, 1, './img/tshirt.png')
tshirt.promoPrice()
const hoodie = new Product('Nomad Hoodie', 75, 002, 75, 2, './img/hoodie.jpg')
hoodie.soldUnits(10)
const jewelry = new Product('Nomad Jewelry Collection', 50, 003, 50, 3, './img/jewelry.png')
const giftcard = new Product('$100 giftcard', 100, 004, 25, 4, './img/giftcard.jpg')
giftcard.addUnits(10)
const record = new Product('Post Human: Survival Horror', 50, 005, 250, 5, './img/phsh.jpg')
record.changeId('PHSH010')

products.push(tshirt, hoodie, jewelry, giftcard, record)
console.log(products)

products.forEach(e => {
    e.viewProducts()
})

products.forEach(e => {
    e.addEvent()
})

function addToCart(product){
    const addingToCart = shoppingCart.find(prod => prod.id == product.id)

    if(!addingToCart){
        shoppingCart.push({...product, totalQuantity: 1})
} else{
    const filterCart = shoppingCart.filter(prod => prod.id != product.id)
    shoppingCart = [...filterCart, {...addingToCart, totalQuantity: addingToCart.totalQuantity +1}
    ]
}
console.log(shoppingCart)
}

while (continueShopping === true) {
    if (selectedProduct === 1) {
        shoppingCart.push(products[0])
    } else if (selectedProduct === 2) {
        shoppingCart.push(products[1])
    } else if (selectedProduct === 3) {
        shoppingCart.push(products[2])
    } else if (selectedProduct === 4) {
        shoppingCart.push(products[3])
    } else if (selectedProduct === 5) {
        alert('We are sorry! Temporarily sold out')
    } else {
        selectedProduct = parseInt(prompt('404 NOT FOUND. Please enter a valid number: \n 1) Basic tee \n 2) Nomad Hoodie \n 3) Black Jewelry n 4) $100 Giftcard \n 5) Post Human: Survival Horror CD'))
    }

    decision = parseInt(prompt('Do you want to continue shopping? \n 1) Yes, I am not done shopping \n 2) No, I am done shopping'))
    if (decision === 1) {
        selectedProduct = parseInt(prompt('Select the product you want to buy: \n 1) Basic tee \n 2) Nomad Hoodie \n 3) Black Jewelry n 4) $100 Giftcard \n 5) Post Human: Survival Horror CD'))
    } else if (decision === 2) {
        continueShopping = false
    }
}

for (const iterator of shoppingCart) {
    shoppingTotal = shoppingTotal + iterator.price
}

alert('Your total without shipping charges and taxes is ' + shoppingTotal + ' USD')

function shippingCost(totalAmount) {
    let shipping = 0

    if (totalAmount <= 25) {
        shipping = 0
    } else if (totalAmount > 25 <= 100) {
        shipping = 15
    } else {
        shipping = 20
    }

    totalAmount = totalAmount + shipping
    return totalAmount
}

let shippingTotalCost = shippingCost(shoppingTotal)
alert('Your total with shipping is: $' + shippingTotalCost + ' USD')

function taxesCost(totalAmount) {
    let taxes = totalAmount * (8 / 100)
    return totalAmount + taxes
}

let taxesTotalPrice = taxesCost(shippingTotalCost)
alert('Your total including shipping cost and taxes is $' + taxesTotalPrice + ' USD')

alert('Thanks for shopping with us!')