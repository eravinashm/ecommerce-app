import React,{Component} from 'react';

import EachProduct from '../../services/Products/EachProduct';
import './ProductPage.css';

class ProductPage extends Component{
    state = {
        id: '', 
        hasError: false, 
        productData: null
    }
    componentDidMount(){
        var searchParams = new URLSearchParams(this.props.location.search);
        let id = searchParams.get('id');
        this.setState({id});
        this.fetchServiceData(id);
    }
    fetchServiceData = async(id) => {
        let productData = await EachProduct(id);
        console.log(productData);
        this.setState({productData})
    }
    componentDidCatch(){
        this.setState({hasError: true});
    }
    render(){
        if(this.state.hasError){
            return <p>Some Error occured. Refresh the page.</p>;
        }
        return(
            <div>
                {this.state.productData !== null ? 
                    <ul className="product-data">
                        <li>
                            <span className="label">Name:-</span> &nbsp;
                            <span className="data">{this.state.productData.name}</span>
                        </li>
                        <li><img src={this.state.productData.img} alt="image"/></li>
                        <li>
                            <span className="label">Description:-</span>&nbsp; 
                            <span className="data">{this.state.productData.description}</span>
                        </li>
                        <li>
                            <span className="label">Price</span>
                            <span className="data">{this.state.productData.price}</span>
                        </li>
                    </ul>
                    : <p>Data Not Available</p> }
            </div>
        )
    }
}

export default ProductPage;