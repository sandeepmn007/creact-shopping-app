import React from 'react';
import data from './data.json';
import Product from './components/Product';
import Filter from './components/Filter';


// feature-1
class App extends React.Component {

  constructor() {
    super();
  }

  state = {
    products: data.products,
    size: '',
    sort: ''
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
              <Product products={this.state.products} />
            </div>
            <div className="sidebar">
              Cart Items
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
