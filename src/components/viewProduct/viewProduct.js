import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './viewProduct';

function ViewProduct(props){
    console.log(" ViewProduct props ", props.products);
    let search = new URLSearchParams(props.location.search);
    let id = search.get("id"), selected = null;
    
    if(id != "" && id != undefined && id != null && props.products != undefined){
        console.log(" products ", props.products);
        selected = props.products.map(product => {
            if(product.id == id.toString())
                return product;
        });
    }

    return(
        <div className="view-product">
                {selected != null && 
                    <div className="clicked-product">
                        <div>
                            <img src={selected.img} />
                        </div>
                    <div className="details">
                        <ul>
                            <li>{selected.name}</li>
                            <li>{selected.price}</li>
                            <li>
                                <button className="buy-btn product-btn">Add to Cart</button>
                                <button className="buy-btn product-btn">Buy Now</button>
                            </li>
                        </ul>
                    </div>
                </div>
            }
            <div className="remaining-products">
            
            </div>
        </div>
    )
}

export default withRouter(ViewProduct);
