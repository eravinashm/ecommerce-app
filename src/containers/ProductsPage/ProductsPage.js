import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Filters from './Filters/Filters';
import Items from './Items/Items';
import SimpleAppBar from './SimpleAppBar';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      height: 500,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
});

class ProductsPage extends Component{
    state = {
        filtersArray: []
    }
    callbackFiltersArray = (filtersArray) => {
        this.setState({filtersArray: filtersArray});
    }
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Filters callbackFiltersArray={this.callbackFiltersArray}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper className={classes.paper}>
                            <SimpleAppBar />
                            <Items filtersArray={this.state.filtersArray}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

ProductsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(ProductsPage);
