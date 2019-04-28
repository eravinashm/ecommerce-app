import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

import ProductService from '../../../services/Products/Products';
// import MediaCard from '../../../components/MediaCard/MediaCard';
import './Items.css';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 240,
      width: 300,
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
});
  
class Items extends Component{
  state = {
      spacing: '16',
      products: null,
      hasError: false,
      filtersArray: [],
      responseData: null,
      sortBy: ''
  };
  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };    
  async componentDidMount(){
    await this.fetchResponseData();
    this.cellRenderer(this.state.filtersArray);
  }
  /*
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.filtersArray !== prevState.filtersArray){
      return{ filtersArray: nextProps.filtersArray};
    }
  }
  */
  componentWillReceiveProps(nextProps){
    if(nextProps.filtersArray !== this.state.filtersArray){
      this.setState({filtersArray: nextProps.filtersArray, sortBy: nextProps.sortBy});
      if(nextProps.sortBy !== this.state.sortBy){
        this.cellRenderer(nextProps.filtersArray, nextProps.sortBy);
      }  
    }
    else if(nextProps.sortBy !== this.props.sortBy){
      this.cellRenderer(this.state.filtersArray, nextProps.sortBy);
    }
  }
  
  fetchResponseData = async() => {
      let responseData = await ProductService();
      if(responseData !== null){
        this.setState({responseData: responseData});
      }
  }
  sortAsc( a, b ) {
    if ( a.price < b.price ){
      return -1;
    }
    if ( a.price > b.price ){
      return 1;
    }
    return 0;
  }  
  sortDesc( a, b ) {
    if ( a.price < b.price ){
      return 1;
    }
    if ( a.price > b.price ){
      return -1;
    }
    return 0;
  }  
  cellRenderer = (filtersArray, sortBy) => {
    if(filtersArray !== undefined && filtersArray.length > 0){
      let tempArray = [];
      this.state.responseData.forEach(function(product, index){
        for(let id of filtersArray){
          if(product.brand_id === id)
            tempArray.push(product);
        }
      })
      if(tempArray.length > 0){
        if(sortBy === 'priceAsc')
          tempArray.sort(this.sortAsc);
        if(sortBy === 'priceDesc')
          tempArray.sort(this.sortDesc);        
        this.setState({products: tempArray});
      }
    }else if(sortBy !== ''){
        let updatedData = this.state.responseData;
        if(sortBy === 'priceAsc')
         updatedData.sort(this.sortAsc);
        if(sortBy === 'priceDesc')
         updatedData.sort(this.sortDesc);        
         this.setState({products: updatedData});
    }else{
          this.setState({products: this.state.responseData});
    }
  }

  render(){
      let products = this.state.products;
      const { classes } = this.props;
      const { spacing } = this.state;
      if(products === null){
          return <div>No data</div>;
      }
      return (
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid container className={classes.demo} spacing={Number(spacing)}>
              {
              products.map((product, index) => {
                let linkPath = '/product?id='+product.id;
                return(
                  <NavLink to={linkPath} key={index}>
                <Grid key={index} item>
                  <Paper className={classes.paper} >
                      <ul>
                        <li>                        
                          <img src={product.img} alt={product.name} className="ecommerce-app-image" />
                        </li>
                        <li>{product.name}</li>
                        <li>{product.brand_id}</li>
                        <li>$ {product.price}</li>
                      </ul>  
                  </Paper>
                </Grid>
                </NavLink>
              )})}
            </Grid>
          </Grid>
        </Grid>
      );    
   }
}

Items.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
const mapStateToProps = state => {
  // console.log(state.sortByReducer.sortBy);
  return{
    sortBy: state.sortByReducer.sortBy
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Items));
  
