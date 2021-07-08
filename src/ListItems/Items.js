import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Card, CardContent, CardMedia, Typography } from '@material-ui/core';

// Styles
const useStyles = makeStyles({
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

const Items = ({ sortedItems }) => {
   const classes = useStyles();

   return (
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
   );
};

export default Items;
