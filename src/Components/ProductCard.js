import React from 'react';
import './ProductCard.css';
import plus from '../plus.png';
import minus from '../minus.png';

const ProductCard = (props) => {
    return (
        <div className="container">
            <img src={props.obj.image} alt='ProductImage unavailable'/>
            <div className="productInfo">
                <div>
                    <p style={{margin:0}}>{props.obj.title}</p>
                    <p>{props.obj.brand}</p>
                    <p>{props.obj.discount}%</p>
                </div>
                <div className="rightDiv">
                    <span>{props.obj.colour['title']}</span> <div style={{backgroundColor: props.obj.colour['color'], display:"inline-block", height:'10px', width:'10px'}}></div>

                    <div className="plusSignDiv"><div onClick={() => props.addOrRemove(props.obj.id, 'add')}><img src={plus} alt="no plusImage available"></img></div><span>{props.obj.cartCount > 0 ? props.obj.cartCount : 'Add'}</span>{props.obj.cartCount > 0 ? <div onClick={() => props.addOrRemove(props.obj.id, 'minus')}><img src={minus} alt="no minusImage available"></img></div> : null}</div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;