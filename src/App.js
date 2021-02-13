import React from 'react';
import data from './data.json';
import Product from './components/Product';
import Filter from './components/Filter';
import Cart from './components/Cart';


// feature-1
class App extends React.Component {

  constructor() {
    super();
  }

  state = {
    products: data.products,
    size: '',
    sort: '',
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
  }

  addToCartHander = (products) => {
    const cartItems = [...this.state.cartItems];
    let alreadyInCart = false
    cartItems.forEach(item => {
      if (products._id === item._id) {
        item.count++;
        alreadyInCart = true
      }
    })
    if (!alreadyInCart) {
      cartItems.push({ ...products, count: 1 })
    }
    this.setState({
      cartItems
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }

  removeFromCart = (products) => {
    const cartItems = [...this.state.cartItems];
    this.setState({
      cartItems: cartItems.filter(flt => products._id !== flt._id)
    })
    localStorage.setItem('cartItems', JSON.stringify(cartItems.filter(flt => products._id !== flt._id)))
  }

  filterProducts = (e) => {
    //impl
    if (e.target.value === '') {
      this.setState({
        size: e.target.value,
        products: data.products,
      })
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(product =>
          product.availableSizes.indexOf(e.target.value) >= 0),
      })
    }
  }

  sortProducts = (event) => {
    //impl
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state) => ({
      sort: sort,
      products: state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id < b._id
                ? 1
                : -1
        ),
    }));
  }

  createOrder = (order) => {
    alert('Need to save order for ' + order.name)
  }


  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping App </a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Product addToCart={this.addToCartHander} products={this.state.products} />
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} createOrder={this.createOrder} removeFromCart={this.removeFromCart} />
            </div>
          </div>
        </main>
        <footer>
          All Right Recieved
        </footer>
      </div>
    );
  }
}

export default App;
