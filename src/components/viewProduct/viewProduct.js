import React from 'react';
import { withRouter } from 'react-router-dom';
import './viewProduct';

function ViewProduct(props){
    let search = new URLSearchParams(props.location.search);
    let id = search.get("id");
    console.log(" props ", id);
    return(
        <div className="view-product">
            <div className="clicked-product">
                <img src="" />
                <div className="details">
                    <ul>
                        <li>className</li>
                        <li>price</li>
                        <li>
                            <button className="add-btn product-btn">Add to Cart</button>
                            <button className="buy-btn product-btn">Buy Now</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="remaining-products">

            </div>
        </div>
    )
}

export default withRouter(ViewProduct);