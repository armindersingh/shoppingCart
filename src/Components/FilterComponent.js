import React from 'react';
import './FilterComponent.css';

const FilterComponentForBrandOrColour = (props) => {
    let check;
    return (
        <div>
            {props.filterValues.map((filterItem, index) => {
                return <div key={index}> <input type="checkbox" name={filterItem.title} value={filterItem.color || filterItem.value} onChange={(event) => props.filterProducts(filterItem.color?'color':'brand', filterItem.color || filterItem.value, event.target.checked)} ref={(input) => check = input}></input>
                <label htmlFor={filterItem.title}>{filterItem.title}</label> </div>
            })}
        </div>
    )
}

const FilterComponent = (props) => {
    return (
        <div className="filterDiv">
            <p>{props.filterObj.type}</p>
            {props.filterObj.type === 'BRAND' || props.filterObj.type === 'COLOUR' ? <FilterComponentForBrandOrColour filterValues={props.filterObj.values} filterProducts={(type, value, checked) => props.filterProducts(type, value, checked)}/> : null }
        </div>
    )
}

export default FilterComponent;