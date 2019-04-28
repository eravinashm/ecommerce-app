import React, {Component} from 'react';
// import Checkbox from '@material-ui/core/Checkbox';

import BrandsService from '../../../services/Brands/Brands';

class Filters extends Component{
    state = {
        brands: [],
        filtersArray: []
    }
    componentDidMount(){
        this.fetchBrandsData();
    }
    fetchBrandsData = async() => {
        let data = await BrandsService();
        if(data.length > 0){
            this.setState({brands: data});
            //console.log(data)
        }
    } 
    changeHandler = (event, brandId) => {
        // console.log(event.target.checked)
        if(event.target.checked){
            if(!this.state.filtersArray.includes(brandId)){
                let updatedArray = [...this.state.filtersArray, brandId];
                this.props.callbackFiltersArray(updatedArray);
                this.setState({filtersArray: updatedArray});
            }
        }else{
                let filtersArray = [...this.state.filtersArray];
                let updatedArray = filtersArray.filter(function(value, index, arr){
                    return value !== brandId
                });
                this.props.callbackFiltersArray(updatedArray);
                this.setState({filtersArray: updatedArray});
        }
    }
    render(){
        let brands = this.state.brands;
        if(brands.length === 0){
            return(<div>No Filters</div>)
        }
        return(
            <div>
                <h3>Brands</h3>
                <ul>
                {
                    brands.map((brand, index) => {
                        return(
                        <li key={index}>
                            ({brand.id})
                            <input type='checkbox' 
                                onClick={(event) => this.changeHandler(event, brand.id)} />
                            {brand.name}
                        </li>)
                    }) 
                }   
                </ul>
            </div>
        )
    }
}

export default Filters;