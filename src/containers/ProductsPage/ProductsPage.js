import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Filters from './Filters/Filters';
import Items from './Items/Items';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
});

class ProductsPage extends Component{
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                    <Paper className={classes.paper}><Filters /></Paper>
                    </Grid>
                    <Grid item xs={9}>
                    <Paper className={classes.paper}><Items /></Paper>
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
