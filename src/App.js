import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LoginComponent from './Components/Login';
import './App.css';
import singletonUtilsObj from './Utils/utils';
import ShoppingHome from './Components/ShoppingHome';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn : false,
      userData : [],
      productsList : [],
      filterList : [],
      totalItemsInCart : 0,
      filteredProductList : []
    }
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={(props) => (<div className="loginContainer"><LoginComponent {...props} loginClicked={(...args) => this.loginClicked(...args)}/></div>)}></Route>
        <Route exact path="/ShoppingHome" render={(props) => <ShoppingHome {...props} userData={this.state.userData} productsList={this.state.filteredProductList.length > 0 ? this.state.filteredProductList : this.state.productsList} searchProducts={(val) => this.searchProducts(val)} filterList={this.state.filterList} addOrRemove={(id, operation) => this.addOrRemove(id, operation)} totalItemsInCart={this.state.totalItemsInCart} filterProducts={(type, value, checked) => this.filterProducts(type, value, checked)} resetFilters={this.resetFilters}/>} />
      </div>
    );
  }

  filterProducts = (type, value, checked) => {

    let productsList = Object.assign([], this.state.productsList);
    let filteredProductList = Object.assign([], this.state.filteredProductList);
    if(checked) {
      if(type === 'color') {
        productsList.forEach((item) => {
          if(item.colour.color === value) filteredProductList.push(item)
        });
      } else {
        productsList.forEach((item) => {
          if(item.brand === value) filteredProductList.push(item)
        });
      }
    } else if(filteredProductList.length > 0 && !checked){
      if(type === 'color') {
        filteredProductList = filteredProductList.filter((item) => {
          return item.colour.color !== value;
        })
      } else {
        filteredProductList = filteredProductList.filter((item) => {
          return item.brand !== value;
        })
      }
    }

    this.setState({filteredProductList: filteredProductList});
  }

  resetFilters = () => {
    let filteredProductList = [];
    this.setState({filteredProductList: filteredProductList});
  }

  addOrRemove = (id, operation) => {
    let productsList = Object.assign([], this.state.productsList);
    let product = productsList.find((item) => item.id === id);
    let totalItemsInCart;
    if(operation == 'add') {
      product.cartCount += 1; 
      totalItemsInCart = this.state.totalItemsInCart + 1;
    } else {
      product.cartCount = product.cartCount !== 0 ? product.cartCount - 1 : product.cartCount;
      totalItemsInCart = this.state.totalItemsInCart !== 0 ? this.state.totalItemsInCart - 1 : this.state.totalItemsInCart;
    }
    this.setState({productsList : productsList, totalItemsInCart : totalItemsInCart});
  }

  loginClicked = async (...creds) => {
    if(creds[1] !== 'delta' || creds[0] !== 'amigo') {
      alert('Invalid username or password');
      return;
    }
    let url = `https://xebiascart.herokuapp.com/users?username=${creds[0]}`;
    let userData = await singletonUtilsObj.fetchData(url);
    let productsListUrl = 'https://xebiascart.herokuapp.com/products';
    let productsList = await singletonUtilsObj.fetchData(productsListUrl);
    productsList.forEach((item) => item.cartCount = 0);
    let filterListUrl = 'https://xebiascart.herokuapp.com/filters';
    let filterList = await singletonUtilsObj.fetchData(filterListUrl);
    this.setState({isLoggedIn: true, userData : userData, productsList : productsList, filterList: filterList});
    this.props.history.push('/ShoppingHome');
  }

  searchProducts = async (val) => {
    let searchUrl = `https://xebiascart.herokuapp.com/products`;
    searchUrl = val ? `${searchUrl}?title=${val}` : searchUrl;
    let productsList = Object.assign([], this.state.productsList);
    productsList = await singletonUtilsObj.fetchData(searchUrl);

    if(productsList) {
      productsList.forEach((item) => item.cartCount = 0);
      let filteredProductList = [];
      this.setState({productsList:productsList, filteredProductList: filteredProductList});
    }
  }

}

export default withRouter(App);
