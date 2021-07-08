import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
   formStyle: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '60px',
      margin: '2rem 0rem',
   },
   textField: {
      width: '80%',
      marginRight: '1rem',
   },
   button: {
      height: '100%',
   },
});

const Home = (props) => {
   const classes = useStyles();

   const [searchInput, setSearchInput] = useState('');
   const handleSearchInput = (event) => {
      setSearchInput(event.target.value);
   };

   const handleSearchButton = (event) => {
      event.preventDefault();
      if (searchInput.length) {
         props.history.push(`/search/${searchInput}`);
      }
   };

   return (
      <form className={classes.formStyle} onSubmit={handleSearchButton}>
         <TextField
            className={classes.textField}
            id='outlined-basic'
            label='Search text'
            variant='outlined'
            onChange={handleSearchInput}
         />
         <Button
            className={classes.button}
            component='button'
            type='submit'
            variant='contained'
            color='primary'
            startIcon={<SearchIcon />}
            disabled={!searchInput.length ? true : false}
         >
            Search
         </Button>
      </form>
   );
};

export default withRouter(Home);
