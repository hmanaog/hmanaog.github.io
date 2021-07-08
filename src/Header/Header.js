import React from 'react';
import { withRouter } from 'react-router-dom';
import ricardoLogo from '../Assets/logo.svg';

import { Container, Box } from '@material-ui/core';

const styles = {
   // border: 'solid 1px blue',
   display: 'flex',
   alignItems: 'center',
   height: '60px',
};

const Header = (props) => {
   const handleClickLogo = () => {
      props.history.push('/');
   };

   return (
      <div style={{ backgroundColor: 'white' }}>
         <Container maxWidth='lg'>
            <Box style={styles}>
               <img
                  src={ricardoLogo}
                  alt='ricardo'
                  style={{
                     width: '112px',
                     height: '24px',
                     cursor: 'pointer',
                  }}
                  onClick={handleClickLogo}
               />
            </Box>
         </Container>
      </div>
   );
};

export default withRouter(Header);
