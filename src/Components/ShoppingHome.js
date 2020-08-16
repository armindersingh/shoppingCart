import React from 'react';
import ProductCard from './ProductCard';
import FilterComponent from './FilterComponent';
import logo from '../logo.svg';
import "./ShoppingHome.css";
import contact from '../contact.png';
import cart from '../cart.png';

const ShoppingHome = (props) => {
    let searchProductInput;

    let handleSearchInputClick = (event) => { if(event.keyCode === 13) props.searchProducts(searchProductInput.value) }

    return (
        <div className="parentContainer">
            <header>
                <aside className="leftAside">
                    <img src={logo} alt="Logo Unavailable"></img>
                </aside>
                <main className="headerMain">
                    <input type="text" placeholder="Search Product by title" ref={(input) => searchProductInput = input} onKeyUp={(event) => {handleSearchInputClick(event)}}></input>
                </main>
                <aside className="rightAside">
                    <div><div><img src={contact} alt="no contactImage available"></img></div><span>{props.userData[0].username}</span></div>
                    <div><div><img src={cart} alt="no cartImage available"></img></div><span>{props.totalItemsInCart}</span></div>
                </aside>
            </header>
            <main className="mainContainer">
                <aside>
                    <div className="filterResetFilterHeadings"><p>Filters</p><button onClick={props.resetFilters}>Reset Filters</button></div>
                    {props.filterList.map((filterListItem, index) => {
                        if(filterListItem.type !== 'PRICE')
                            return <FilterComponent key={index} filterObj={filterListItem} filterProducts={(type, value, checked) => props.filterProducts(type, value, checked)}/>
                        else return null;
                    })} 
                </aside>
                <article>
                    {props.productsList.length === 0 ? <h4>No Products Found</h4> : props.productsList.map((product) => {
                        return <ProductCard key={product.id} obj={product} addOrRemove={(id, operation) => props.addOrRemove(id, operation)}/>
                    })}
                </article>
            </main>
        </div>
    )
}

export default ShoppingHome;