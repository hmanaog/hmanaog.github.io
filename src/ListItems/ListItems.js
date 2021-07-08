import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, NativeSelect, Grid, Card, CardContent, CardMedia, Typography } from '@material-ui/core';

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
   grid: {
      marginTop: '1rem',
   },
   link: {
      textDecoration: 'none',
   },
   card: {
      minHeight: '320px',
   },
   cardContent: {
      padding: '0',
   },
   cardMedia: {
      height: '150px',
      width: 'auto',
   },
   boxInCard1: {
      margin: '1rem 0.5rem 0rem 0.7rem',
      minHeight: '50px',
   },
   boxInCard2: {
      margin: '0rem 0.5rem 0rem 0.7rem',
      minHeight: '50px',
   },
   fontBold: {
      fontWeight: '700',
   },
   fontSize: {
      fontSize: '14px',
   },
   priceBox: {
      padding: '0.5rem 0.5rem 0rem 0.4rem',
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

         <Grid className={classes.grid} container spacing={3}>
            {sortedItems &&
               sortedItems.map((item, index) => {
                  return (
                     <Grid item xs={12} sm={3} key={index}>
                        <Link className={classes.link} to={`/article/${item.id}`}>
                           <Card className={classes.card}>
                              <CardContent className={classes.cardContent} style={{ padding: '0' }}>
                                 <CardMedia className={classes.cardMedia} image={item.imageUrl} title={item.title} />
                                 <Box className={classes.boxInCard1} component='div'>
                                    <Typography
                                       className={classes.fontBold}
                                       variant='body2'
                                       color='textPrimary'
                                       component='p'
                                    >
                                       {item.title}{' '}
                                    </Typography>
                                 </Box>
                                 <Box className={classes.boxInCard2} component='div'>
                                    <Typography
                                       className={classes.fontSize}
                                       variant='subtitle2'
                                       color='textPrimary'
                                       component='p'
                                    >
                                       Ending on:{' '}
                                       <Box className={classes.fontBold} component='span'>
                                          {item.endDate.replace(/T/i, ' at ').slice(0, -1)}
                                       </Box>{' '}
                                    </Typography>
                                 </Box>
                                 <Box className={classes.priceBox}>
                                    <Typography variant='body2' color='textPrimary'>
                                       {item.buyNowPrice === null ? 0 : item.buyNowPrice} CHF{' '}
                                    </Typography>
                                 </Box>
                              </CardContent>
                           </Card>
                        </Link>
                     </Grid>
                  );
               })}
         </Grid>
      </Box>
   );
};

export default withRouter(ListItems);
