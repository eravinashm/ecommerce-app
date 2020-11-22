import React from 'react';
import { withRouter } from 'react-router-dom';
import Product from '../products/product/product';
import './viewProduct.css';
import Slider from 'react-slick';
import campstoolSmall from './shopping-cart/campstool-1_160x160.jpg';
import campstoolBig from './shopping-cart/campstool-1_1024x1024@2x.jpg';
import MagnifyGlass from '../MagnifyGlass/MagnifyGlass';

class ViewProduct extends React.Component {
    addToCart = product  => {
        let { cart } = this.props;
        cart.push(product);
        this.props.callbackCart(cart);
    }

    render(){
        let search = new URLSearchParams(this.props.location.search);
        let id = search.get("id"), selected = null;
        
        if(id != "" && id != undefined && id != null && this.props.products != undefined){
            selected = this.props.products.filter(product => product.id == id.toString());
        }
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return(
            <React.Fragment>
                <div className="view-product">
                        {selected[0] != null && 
                            <div className="clicked-product">
                                <div className="clicked-small-images">
                                    <img src={campstoolSmall} alt="" />
                                    <img src={campstoolSmall} alt="" />
                                    <img src={campstoolSmall} alt="" />
                                </div>
                                <MagnifyGlass>
                                    <img className="magniflier" src={selected[0].img} width="300" />
                                </MagnifyGlass>
                                <div className="details">
                                    <ul>
                                        <li>{selected[0].name}</li>
                                        <li>${selected[0].price}</li>
                                        <li>
                                            <button className="buy-btn product-btn" onClick={() => this.addToCart(selected)}>Add to Cart</button>
                                            <button className="buy-btn product-btn">Buy Now</button>
                                        </li>
                                    </ul>
                                </div>
                        </div>
                    }
                    {/* <div className="remaining-products">
                        {this.props.products.length > 0 &&
                            <React.Fragment>
                                {this.props.products.map(product => <Product key={product.id} product={product} {...this.props} addToCart={this.addToCart}/>)}
                            </React.Fragment>
                        }  
                    </div> */}
                </div>
                <Slider {...settings}>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </Slider>
        </React.Fragment>
        )
    }
}

export default withRouter(ViewProduct);
