import React from 'react';
import data from './data.json';
import Product from './components/Product'


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

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping App </a>
        </header>
        <main>
          <div className="content">
            <div className="main">
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
