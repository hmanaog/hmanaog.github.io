import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Card, CardContent, CardMedia, Typography } from '@material-ui/core';

// Styles
const useStyles = makeStyles({
   cardMedia: {
      minHeight: '230px',
      maxHeight: '690px',
      maxWidth: '517px',
      minWidth: '172px',
   },
   box: {
      margin: '1rem 1rem 1rem 1.5rem',
   },
   fontBold: {
      fontWeight: 'bold',
   },
   fontNormal: {
      fontWeight: 'normal',
   },
   hrLine: {
      width: '80%',
   },
});

const Article = (props) => {
   const classes = useStyles();

   const [article, setArticle] = useState({});
   const [seller, setSeller] = useState({});

   // Initiate useEffect when component mount
   useEffect(() => {
      GetArticleFromRicardo();
   }, []);

   // Fetch article info and user info from Ricardo API
   const GetArticleFromRicardo = async () => {
      const articleId = props.match.params.articleId;
      await fetch(
         `https://www.ricardo.ch/api/frontend/recruitment/article-details/?articleId=${articleId}&apiToken=${process.env.REACT_APP_API_TOKEN}`,
         {
            method: 'GET',
         }
      )
         .then((response) => response.json())
         .then(async (data) => {
            setArticle(data);

            const sellerId = data.sellerId;
            await fetch(
               `https://www.ricardo.ch/api/frontend/recruitment/user/?userId=${sellerId}&apiToken=${process.env.REACT_APP_API_TOKEN}`,
               {
                  method: 'GET',
               }
            )
               .then((response) => response.json())
               .then((data) => {
                  setSeller(data);
               });
         });
   };

   return (
      <Grid container spacing={3}>
         <Grid item xs={12} sm={6}>
            <CardMedia className={classes.cardMedia} component='img' image={article.imageUrl} title={article.title} />
         </Grid>
         <Grid item xs={12} sm={6}>
            <Card>
               <CardContent style={{ padding: '0' }}>
                  <Box className={classes.box}>
                     <Typography variant='h4' color='textPrimary'>
                        {article.title}{' '}
                     </Typography>
                     {!article.subtitle ? undefined : (
                        <Typography variant='subtitle2' color='textPrimary'>
                           {article.subtitle}{' '}
                        </Typography>
                     )}
                  </Box>
                  <hr className={classes.hrLine} />
                  <Box className={classes.box}>
                     <Typography className={classes.fontBold} variant='body2' color='textPrimary'>
                        Seller:{' '}
                        <Box className={classes.fontNormal} component='span'>
                           {seller.name}
                        </Box>{' '}
                     </Typography>
                     <Typography className={classes.fontBold} variant='body2' color='textPrimary'>
                        Price:{' '}
                        <Box className={classes.fontNormal} component='span'>
                           {article.price} CHF
                        </Box>
                     </Typography>
                  </Box>
                  <hr className={classes.hrLine} />
                  <Box className={classes.box}>
                     <div
                        dangerouslySetInnerHTML={{
                           __html: article.descriptionHtml,
                        }}
                     />
                  </Box>
               </CardContent>
            </Card>
         </Grid>
      </Grid>
   );
};

export default withRouter(Article);
