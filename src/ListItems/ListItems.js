import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, NativeSelect, Typography } from '@material-ui/core';
import Items from './Items';

// Styles
const useStyles = makeStyles({
   box: {
      margin: '0 0',
   },
   wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
   },
});

const ListItems = (props) => {
   const classes = useStyles();

   const [items, setItems] = useState({
      articles: [],
      totalCount: 0,
   });

   const [sortedItems, setSortedItems] = useState([]);
   const [value, setValue] = useState();

   // Initiate useEffect when component mount
   useEffect(() => {
      GetItemsFromRicardo();
   }, []);

   // useEffect when sorting options are chosen
   useEffect(() => {
      switch (value) {
         case 'lower':
            return setSortedItems([...items.articles].sort(compareLowest));
         case 'higher':
            return setSortedItems([...items.articles].sort(compareHighest));
         case 'ending':
            return setSortedItems([...items.articles].sort(compareEnddate));
         default:
            return setSortedItems(items.articles);
      }
   }, [value, items]);

   // Fetch list of items from Ricardo API
   const GetItemsFromRicardo = async () => {
      const searchText = props.match.params.searchText;

      await fetch(
         `https://www.ricardo.ch/api/frontend/recruitment/search/?searchText=${searchText}&apiToken=${process.env.REACT_APP_API_TOKEN}`,
         {
            method: 'GET',
         }
      )
         .then((response) => response.json())
         .then((data) => {
            return setItems({
               articles: data.articles,
               totalCount: data.totalCount,
            });
         });
   };

   // Function to sort by lowest price
   const compareLowest = (a, b) => {
      if (a.buyNowPrice < b.buyNowPrice) {
         return -1;
      }
      if (a.buyNowPrice > b.buyNowPrice) {
         return 1;
      }
      return 0;
   };

   // Function to sort by highest price
   const compareHighest = (a, b) => {
      if (a.buyNowPrice > b.buyNowPrice) {
         return -1;
      }
      if (a.buyNowPrice < b.buyNowPrice) {
         return 1;
      }
      return 0;
   };

   // Function to sort by ending date
   const compareEnddate = (a, b) => {
      if (a.endDate < b.endDate) {
         return -1;
      }
      if (a.endDate > b.endDate) {
         return 1;
      }
      return 0;
   };

   const handleSelectChange = (event) => {
      setValue(event.target.value);
   };

   return (
      <Box className={classes.box}>
         <Box className={classes.wrapper}>
            <Typography variant='body2' color='textPrimary' component='p'>
               Total count: {items.articles.length}{' '}
            </Typography>
            <Box className={classes.wrapper}>
               <Typography
                  variant='body2'
                  color='textPrimary'
                  component='p'
                  style={{ fontSize: '18px', marginRight: '0.2rem' }}
               >
                  Sort by:
               </Typography>{' '}
               <NativeSelect value={value} style={{ fontSize: '18px' }} onChange={handleSelectChange} name='itemSort'>
                  <option value={'default'}>Relevance</option>
                  <option value={'lower'}>Lowest price</option>
                  <option value={'higher'}>Highest price</option>
                  <option value={'ending'}>Ending soon</option>
               </NativeSelect>
            </Box>
         </Box>

         <Items sortedItems={sortedItems} />
      </Box>
   );
};

export default withRouter(ListItems);
