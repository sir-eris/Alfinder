import React from 'react';
import { Helmet } from 'react-helmet';

import Background from '../../../../assets/bckgrnd.png';

  class Wellness extends React.Component {
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
                  <title>{ 'Benefits of CBD products for your Well Being - Alfinder' }</title>
                  <meta name="”robots”" content="noindex, nofollow" />
              </Helmet>
        {this.state.width >= 1100 ? (
            <div>
              <div style={{display: 'flex', width: '100vw', height: '75vh', paddingTop: 80, alignItems: 'flex-end', justifyContent: 'flex-start', backgroundImage: `url(${Background})`}}>
                <div style={{marginLeft: 100, marginBottom: 80}}>
                  <div style={{textAlign: 'left', marginBottom: 12}}>
                  </div>
                  <h1 style={{fontSize: 20, letterSpacing: 7, marginBottom: 12, color: '#555'}}>WELLNESS</h1>
                  <h1 style={{textAlign: 'left', color: '#3c2d64', fontWeight: '400', fontSize: 58, lineHeight: 1.2, paddingRight: 50, marginBottom: 20}}>CBD Can Help Your Health and Well-Being</h1>
                  {/* <p style={{color: '#261F3C', fontSize: 20, fontWeight: '600', maxWidth: 500}}>Dolore quis magna est enim tempor voluptate cupidatat ut labore duis cillum commodo nostrud.</p> */}
                </div>
              </div>

              <div style={{width: '90%', margin: '0 auto', marginBottom: 50, marginTop: 50}}>
                <div style={{}}>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 50}}>
                    <div style={{width: '45%'}}>
                      <div style={{}}>
                          <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Can Relieve Pain</p>
                          <p style={{fontSize: 14, lineHeight: 1.5}}>CBD has been studied for its relaxing, pain-relieving, and anti-anxiety properties when taken internally, but recent research has shown that it also has calming and therapeutic benefits when applied topically to the skin. It has been shown to help reduce pain and inflammation caused by inflammatory skin conditions, and may even help ease the discomfort of headaches. CBD also has potent antioxidant effects, which means it may help counteract signs of aging caused by free radicals.</p>
                      </div>
                    </div>
                    <div style={{width: '45%'}}>
                      <div style={{}}>
                          <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Sleep and Insomnia</p>
                          <p style={{fontSize: 14, lineHeight: 1.5}}>CBD oil is thought to help users achieve a more restful night sleep, increasing the overall amount of sleep and reducing insomnia. Research has indicated that CBD may interact with our serotonin (which plays an important role in our mood and anxiety) and GABA (calming excess activity and promoting relaxation) receptors, though further studies are still needed. Thought to be due to its anti-anxiety properties, CBD promotes relaxation, allowing for a more restful nights sleep.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{}}>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 50}}>
                    <div style={{width: '45%'}}>
                      <div style={{}}>
                          <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Can Help Regulate Your Weight</p>
                          <p style={{fontSize: 14, lineHeight: 1.5, marginBottom: 9}}>If you struggle with your weight, cannabidiol may be able to help with that as well. The oil can help the body convert unhealthy body fat to good body fat and improve your ability to burn calories. CBD oil allows the body to regulate blood sugar and heat the body more easily.</p>
                      </div>
                    </div>
                    <div style={{width: '45%'}}>
                      <div style={{}}>
                          <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Addiction</p>
                          <p style={{fontSize: 14, lineHeight: 1.5}}>According to one 2013 study, CBD may be an effective aid in reducing or stopping smoking. Research revealed that when CBD was used as part of an inhaler, participants reduced the number of cigarettes they smoked each day by 40%.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
              <div style={{margin: '50px 0', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              <a href="/shop" target="_blank" rel="noopener noreferrer">
                <div style={{display: 'flex', width: 300, margin: '0 auto', marginRight: '5px', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#261F3C', borderRadius: 50, boxShadow: '1px 0 5px rgba(0, 0, 0, 0.4)'}}>
                  <p style={{color: '#fff', fontWeight: '400', fontSize: 17}}>SHOP NOW</p>
                </div>
              </a>
              <a href="https://apps.apple.com/us/app/alfinder-shop-wellness/id1505168467">
                <div style={{display: 'flex', width: 300, margin: '0 auto', marginLeft: '5px', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 50, boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)'}}>
                  <p style={{color: '#000', fontWeight: '400', fontSize: 17}}>DOWNLOAD NOW</p>
                </div>
              </a>
            </div>
            </div>
          ) : (
            <div>
              <div style={{display: 'flex', width: '100vw', height: '60vh', paddingTop: 80, alignItems: 'flex-end', justifyContent: 'flex-start', backgroundImage: `url(${Background})`}}>
                <div style={{marginLeft: 20, marginBottom: 30}}>
                  <div style={{textAlign: 'left', marginBottom: 12}}>
                  </div>
                  <h1 style={{fontSize: 16, letterSpacing: 5, marginBottom: 12, color: '#555'}}>WELLNESS</h1>
                  <h1 style={{textAlign: 'left', color: '#3c2d64', fontWeight: '400', fontSize: 42, lineHeight: 1.2, paddingRight: 50, marginBottom: 20}}>CBD Can Help Your Health and Well-Being</h1>
                </div>
              </div>

              <div style={{width: '90%', margin: '0 auto', marginBottom: 50, marginTop: 50}}>
                <div style={{}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0}}>
                    <div style={{width: '95%', marginBottom: 30}}>
                      <div style={{}}>
                        <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Can Relieve Pain</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>CBD has been studied for its relaxing, pain-relieving, and anti-anxiety properties when taken internally, but recent research has shown that it also has calming and therapeutic benefits when applied topically to the skin. It has been shown to help reduce pain and inflammation caused by inflammatory skin conditions, and may even help ease the discomfort of headaches. CBD also has potent antioxidant effects, which means it may help counteract signs of aging caused by free radicals.</p>
                      </div>
                    </div>
                    <div style={{width: '95%', marginBottom: 30}}>
                      <div style={{}}>
                        <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Sleep and Insomnia</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>CBD oil is thought to help users achieve a more restful night sleep, increasing the overall amount of sleep and reducing insomnia. Research has indicated that CBD may interact with our serotonin (which plays an important role in our mood and anxiety) and GABA (calming excess activity and promoting relaxation) receptors, though further studies are still needed. Thought to be due to its anti-anxiety properties, CBD promotes relaxation, allowing for a more restful nights sleep.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginBottom: 50}}>
                    <div style={{width: '95%', marginBottom: 30}}>
                      <div style={{}}>
                        <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Can Help Regulate Your Weight</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>If you struggle with your weight, cannabidiol may be able to help with that as well. The oil can help the body convert unhealthy body fat to good body fat and improve your ability to burn calories. CBD oil allows the body to regulate blood sugar and heat the body more easily.</p>
                      </div>
                    </div>
                    <div style={{width: '95%', marginBottom: 30}}>
                      <div style={{}}>
                        <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Addiction</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>According to one 2013 study, CBD may be an effective aid in reducing or stopping smoking. Research revealed that when CBD was used as part of an inhaler, participants reduced the number of cigarettes they smoked each day by 40%.</p>
                      </div>
                    </div>
                  </div>
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
  
  export default Wellness;