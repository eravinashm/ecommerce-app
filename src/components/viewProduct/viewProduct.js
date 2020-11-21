import React from 'react';
import { withRouter } from 'react-router-dom';
import Product from '../products/product/product';
import './viewProduct.css';

function ViewProduct(props){
    let search = new URLSearchParams(props.location.search);
    let id = search.get("id"), selected = null;
    
    if(id != "" && id != undefined && id != null && props.products != undefined){
        selected = props.products.filter(product => product.id == id.toString());
    }
    const addToCart = product  => {
        let { cart } = props;
        cart.push(product);
        props.callbackCart(cart);
    }
    return(
        <React.Fragment>
            <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/gh/kenwheeler/slick@1.9.0/slick/slick.css" />    
            <div className="view-product">
                    {selected[0] != null && 
                        <div className="clicked-product">
                            <div>
                                <img src={selected[0].img} />
                            </div>
                        <div className="details">
                            <ul>
                                <li>{selected[0].name}</li>
                                <li>{selected[0].price}</li>
                                <li>
                                    <button className="buy-btn product-btn" onClick={() => addToCart(selected)}>Add to Cart</button>
                                    <button className="buy-btn product-btn">Buy Now</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
                <div className="remaining-products">
                    {props.products.length > 0 &&
                        <React.Fragment>
                            {props.products.map(product => <Product product={product} {...props} addToCart={addToCart}/>)}
                        </React.Fragment>
                    }  
                </div>
            </div>
        </React.Fragment>
    )
}

export default withRouter(ViewProduct);
