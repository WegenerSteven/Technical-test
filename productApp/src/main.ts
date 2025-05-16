import './style.css'
import { productDatabase } from './productDatabase'
import data from './data/data.json' // Make sure data.json is in src/


const startApp = async () => {
  const database = new productDatabase()
  await database.initDB()
  renderProducts(data)
}

const renderProducts = (products: any[]) => {
  const productList = document.getElementById('product-list')
  if (!productList) return

  productList.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-img"/>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description || ''}</p>
        <span class="product-price">$${product.price.toFixed(2)}</span>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  `).join('')
}


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
 <h1>Desserts</h1> 
  <div class="container">     
    <div id="product-list" class= "product-list"></div>
    <div id="cart-container" class="cart-container">
      <h2>Your Cart <span class="cart-count">(0)</span></h2>
      <div class="cart-items">        
            <div class="order-list"></div>
      </div>
      <button id="confirm-order" class="cart-confirm-btn">Confirm Order</button>
      <div id="confirmation-message" class="confirmation-message hidden">Order Confirmed!</div>
    </div>
  </div>
`

startApp().catch(console.error)

