import React from 'react';

  class Page404 extends React.Component {
      render() {
          return (
            <div className="App">
                <div style={{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <p style={{color: '#3c2d64', borderBottom: '1px solid #201A32', fontSize: 40}}>Page Not Found</p>
                </div>
            </div>
          );
      }
  }
  
  export default Page404;