import React from 'react';
import { withRouter } from 'react-router-dom';
import Product from '../products/product/product';
import './viewProduct.css';
import Slider from 'react-slick';
import campstoolSmall from './shopping-cart/campstool-1_160x160.jpg';
// import campstoolBig from './shopping-cart/campstool-1_1024x1024@2x.jpg';
import MagnifyGlass from '../MagnifyGlass/MagnifyGlass';
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";

class ViewProduct extends React.Component {

    render(){
        let search = new URLSearchParams(this.props.location.search);
        let id = search.get("id"), selected = null;
        
        if(id != "" && id != undefined && id != null && this.props.products != undefined){
            selected = this.props.products.filter(product => product.id == id.toString());
        }
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true
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
                                            <button className="buy-btn product-btn" onClick={() => this.props.callbackCart(selected[0])}>Add to Cart</button>
                                            <button className="buy-btn product-btn">Buy Now</button>
                                        </li>
                                    </ul>
                                </div>
                        </div>
                    }
                    <div className="remaining-products">
                        {this.props.products.length > 0 &&
                            <Slider {...settings}>
                                {this.props.products.map(product => <Product key={product.id} product={product} {...this.props} />)}
                            </Slider>
                        }  
                    </div>
                </div>
        </React.Fragment>
        )
    }
}

export default withRouter(ViewProduct);
