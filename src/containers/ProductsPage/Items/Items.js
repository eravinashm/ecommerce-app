import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

import ProductService from '../../../services/Products/Products';
import MediaCard from '../../../components/MediaCard/MediaCard';
import './Items.css';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
});
  
class Items extends Component{
    state = {
        spacing: '16',
        products: null,
        hasError: false
    };
    handleChange = key => (event, value) => {
        this.setState({
          [key]: value,
        });
    };    
    componentDidMount(){
        this.fetchResponseData();
    }
    fetchResponseData = async() => {
        let responseData = await ProductService();
        // debugger;
        if(responseData !== null){
            console.log(responseData);
            this.setState({products: responseData});
            /*this.setState(prevState => ({
                products: {
                    ...prevState.products,
                    responseData
                }
            }))
            */
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
                products.map((product, index) => (
                  <Grid key={index} item>
                    <Paper className={classes.paper} >
                        <img src={product.img} alt={product.name} />
                        {product.name}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        );    
   }
}

Items.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Items);
  
