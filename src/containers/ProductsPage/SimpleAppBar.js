import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleAppBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectType: '',
      name: 'hai',
      labelWidth: 0,
    };  
    this.InputLabelRef = React.createRef();
  }

  componentDidMount() {
    // this.setState({labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth });
  }

  handleChange = event => {
    this.setState({selectType: event.target.value});
    this.props.sortBy(event.target.value);
  };
  
  render(){
  
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">SortBy:</InputLabel>
                <Select
                  value={this.state.selectType}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'selectType',
                    id: 'selectType',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                  <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
          </form>            
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispathToProps = dispatch => {
  return{
    // dispatching plain actions
    sortBy: (value) => {
      // console.log(value);
      return dispatch({type: 'SORT_BY', sortBy: value})
    }
  }
}
export default connect(null, mapDispathToProps)(withStyles(styles)(SimpleAppBar));