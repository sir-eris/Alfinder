import React from 'react';
import { Helmet } from 'react-helmet';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <div className="App">
        <Helmet>
            <title>{ 'About Us - Alfinder' }</title>
        </Helmet>
          <div>
          <div className="about-landing">
              <div className="about-landing-container">
                  <h1>About Us</h1>
                  <h2>How did we come to life and why we believe in what we do.</h2>
                  <h5>The A-Z of Alfinder.</h5>
              </div>
            </div>
          
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 50}}>
              <div style={{width: '35%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <p style={{fontWeight: 300, fontSize: 32}}>WHAT</p>
              </div>
              <div style={{width: '60%', justifyContent: 'center', alignItems: 'center', paddingRight: 50}}>
                <p style={{fontWeight: 500, fontSize: 18, marginBottom: 9}}>Helping companies learn their audience and accurately target them.</p>
                <p>Businesses with an ample amount of customers, have access to more information than they can ever process. This issue becomes a barrier for management and development teams trying to minimize fixed and acquisition costs while increasing productivity.</p>
                <p>We provide a variety of services for such companies who seek solutions for their needs. We try to usher companies in the process and help them use their customer data in the best way possible.</p>
              </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50, marginBottom: 50}}>
              <div style={{width: '35%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <p style={{fontWeight: 300, fontSize: 32}}>WHY</p>
              </div>
              <div style={{width: '60%', justifyContent: 'center', alignItems: 'center', paddingRight: 50}}>
                <p style={{fontWeight: 500, fontSize: 18, marginBottom: 9}}>Eliminating privacy breeches on online customers due to excess monitoring.</p>
                <p>One of the rising problems with the increased amount of online presence is taking advantage of people's privacy. Unfortunately, this happens everyday without you and I having anything to do or say about it.</p>
                <p>In an attempt to protect customers, users, and browsers from undergoing such unwanted attacks, we provide a set of solutions that securely eliminates the need for excess tracking and monitoring.</p>
              </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50, marginBottom: 100}}>
              <div style={{width: '35%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <p style={{fontWeight: 300, fontSize: 32}}>HOW</p>
              </div>
              <div style={{width: '60%', justifyContent: 'center', alignItems: 'center', paddingRight: 50}}>
                <p style={{fontWeight: 500, fontSize: 18, marginBottom: 9}}>Without behavioral comprehension AI becomes very limited to what it can do for us.</p>
                <p>With the exponential growth of digitalization of our lives, data not only becomes more valuable than ever before, but we will be overwhelmed with the amount of it. Without a safe and secure solution to comprehend the collections from online users and customers, data collection becomes irrelevant.</p>
                <p>With the sequential growth of behavioral analysis, we are closer to fully understand and comprehend each other than ever before.</p>
                <p>We combine the two mega powerhouses and derive invaluable information regarding company leader's collections in a safe and secure manner while keeping in mind maximum transparency about what we do.</p>
              </div>
          </div>

          <div style={{margin: '50px 0', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <a href="/solutions">
            <div className="btn">
              <p style={{fontWeight: '400', fontSize: 17}}>Explore Solutions</p>
            </div>
          </a>
        </div>
          </div>
        </div>
        );
      }
    }
  
  export default About
  