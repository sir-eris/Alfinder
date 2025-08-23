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
            <title>{ 'Solutions - Alfinder' }</title>
        </Helmet>
      {this.state.width >= 1100 ? (
            <div>
            <div style={{display: 'flex', width: '100vw', height: '45vh', paddingTop: 80, alignItems: 'flex-end', justifyContent: 'flex-start'}}>
              <div style={{marginLeft: 100, marginBottom: 80}}>
                <div style={{textAlign: 'left', marginBottom: 12}}>
                </div>
                <h1 style={{fontSize: 20, letterSpacing: 7, marginBottom: 12, color: '#555'}}>ABOUT US</h1>
                <h1 style={{textAlign: 'left', color: '#3c2d64', fontWeight: '400', fontSize: 58, lineHeight: 1.2, paddingRight: 50, marginBottom: 20}}>How Did We Come To Life</h1>
                <p style={{color: '#261F3C', fontSize: 20, fontWeight: '600'}}>From the strength of patter recognition to the power of behaviors.</p>
              </div>
            </div>
            
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50, marginBottom: 50}}>
                <div style={{width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <p style={{fontWeight: 300, fontSize: 32}}>WHAT</p>
                </div>
                <div style={{width: '60%', justifyContent: 'center', alignItems: 'center', paddingRight: 50}}>
                  <p style={{textTransform: 'uppercase', fontWeight: 300, fontSize: 18}}>Self-care is our passion and our reason for being.</p>
                  <p>Alfinder was built with your wellness in mind.
Think about us as your personal online shopping destination for the latest and best in personal care. We exist to help you live the life you want by connecting you with the best brands to take best care of yourself.</p>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50, marginBottom: 50}}>
                <div style={{width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <p style={{fontWeight: 300, fontSize: 32}}>WHY</p>
                </div>
                <div style={{width: '60%', justifyContent: 'center', alignItems: 'center', paddingRight: 50}}>
                  <p style={{textTransform: 'uppercase', fontWeight: 300, fontSize: 18}}>Each person is unique.</p>
                  <p>There's no one like you. No one has your eyes,
your hair, your skin, your style. And because you are unique, you need to find what is right for you. Alfinder helps you make quality purchases to enhance your wellness and your life, and we make it easy for you.</p>
<p>Moreover, when it comes to personal self-care, Alfinder makes it easy for you to stay on top of your game and ahead of the curve. From tried and trusted brands to the latest trends and technology, we bring it to you - All in the palm of your hand.</p>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50, marginBottom: 100}}>
                <div style={{width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <p style={{fontWeight: 300, fontSize: 32}}>HOW</p>
                </div>
                <div style={{width: '60%', justifyContent: 'center', alignItems: 'center', paddingRight: 50}}>
                  <p style={{textTransform: 'uppercase', fontWeight: 300, fontSize: 18}}>Wellness is the future.</p>
                  <p>
With so many products available today, how do
you know what's right for you? Alfinder not only provides you access to the best self-care products, but also makes it possible for you to make informed decisions based on reviews and recommendations from our community of self-care enthusiasts.</p>
                  <p>It's in our DNA to connect you with the best brands for your best life. We believe finding what's right for you should be easier, faster and simpler. Alfinder provides the fastest and simplest way to find the best wellness products that's right for you.</p>
                </div>
            </div>

            <div style={{margin: '50px 0', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <a href="https://apps.apple.com/us/app/alfinder-shop-wellness/id1505168467">
              <div className="btn">
                <p style={{fontWeight: '400', fontSize: 17}}>Contact Us</p>
              </div>
            </a>
          </div>
            </div>
      ) : (
        <div> 
            <div style={{display: 'flex', width: '100vw', height: '60vh', paddingTop: 80, alignItems: 'flex-end', justifyContent: 'flex-start'}}>
              <div style={{marginLeft: 20, marginBottom: 30}}>
                <div style={{textAlign: 'left', marginBottom: 12}}>
                </div>
                <h1 style={{fontSize: 16, letterSpacing: 5, marginBottom: 12, color: '#555'}}>ABOUT US</h1>
                <h1 style={{textAlign: 'left', color: '#3c2d64', fontWeight: '400', fontSize: 42, lineHeight: 1.2, paddingRight: 50, marginBottom: 20}}>You Deserve To Know Everything</h1>
                <p style={{color: '#261F3C', fontSize: 18, fontWeight: 600, maxWidth: 400, paddingRight: 30}}>The online destination where you can find the latest and best self-care brands for your life.</p>
              </div>
            </div>
            
            <div style={{width: '80%', margin: '50px auto',}}>
              <p style={{fontSize: 20, fontWeight: 400, marginBottom: 7}}>WHAT</p>
              <div style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <p style={{textTransform: 'uppercase', fontWeight: 300, fontSize: 16}}>SELF-CARE IS OUR PASSION AND OUR REASON FOR BEING.</p>
              <p style={{fontSize: 14}}>Alfinder was built with your wellness in mind. Think about us as your personal online shopping destination for the latest and best in personal care. We exist to help you live the life you want by connecting you with the best brands to take best care of yourself.</p>
              </div>
            </div>
            <div style={{width: '80%',  margin: '50px auto'}}>
              <p style={{fontSize: 20, fontWeight: 400, marginBottom: 7}}>WHY</p>
              <div style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <p style={{textTransform: 'uppercase', fontWeight: 300, fontSize: 16}}>EACH PERSON IS UNIQUE.</p>
                <p style={{fontSize: 14}}>There's no one like you. No one has your eyes, your hair, your skin, your style. And because you are unique, you need to find what is right for you. Alfinder helps you make quality purchases to enhance your wellness and your life, and we make it easy for you.</p>
                <p style={{fontSize: 14}}>Moreover, when it comes to personal self-care, Alfinder makes it easy for you to stay on top of your game and ahead of the curve. From tried and trusted brands to the latest trends and technology, we bring it to you - All in the palm of your hand.</p>
              </div>
            </div>
            <div style={{width: '80%',  margin: '50px auto'}}>
              <p style={{fontSize: 20, fontWeight: 400, marginBottom: 7}}>HOW</p>
              <div style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <p style={{textTransform: 'uppercase', fontWeight: 300, fontSize: 16}}>Wellness is the future.</p>
                <p style={{fontSize: 14}}>With so many products available today, how do you know what's right for you? Alfinder not only provides you access to the best self-care products, but also makes it possible for you to make informed decisions based on reviews and recommendations from our community of self-care enthusiasts.</p>
                <p style={{fontSize: 14}}>It's in our DNA to connect you with the best brands for your best life. We believe finding what's right for you should be easier, faster and simpler. Alfinder provides the fastest and simplest way to find the best wellness products that's right for you.</p>
              </div>
            </div>
            
            <div style={{margin: '50px 0'}}>
            <div style={{marginBottom: '50px'}}>
          <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'center'}}>
                <a href="/shop">
                  <div style={{display: 'flex', width: 200, margin: '0 auto', height: 50, marginBottom: '15px', justifyContent: 'center', alignItems: 'center', backgroundColor: '#261F3C', borderRadius: 50, boxShadow: '1px 0 5px rgba(0, 0, 0, 0.4)'}}>
                    <p style={{color: '#fff', fontWeight: '400', fontSize: 17}}>SHOP NOW</p>
                  </div>
                </a>

                <a href="https://apps.apple.com/us/app/alfinder-shop-wellness/id1505168467" target="_blank" rel="noopener noreferrer">
                  <div style={{display: 'flex', width: 200, margin: '0 auto', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 50, boxShadow: '1px 0 5px rgba(0, 0, 0, 0.15)'}}>
                    <p style={{color: '#000', fontWeight: '400', fontSize: 15}}>DOWNLOAD</p>
                  </div>
                </a>
              </div>
          </div>
          </div>
          </div>
        )};
        </div>
        );
      }
    }
  
  export default About;