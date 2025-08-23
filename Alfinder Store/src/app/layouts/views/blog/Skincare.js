import React from 'react';
import { Helmet } from 'react-helmet';

import Background from '../../../../assets/bckgrnd.png';

  class Skincare extends React.Component {
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
              <title>{ 'Benefits of CBD products for your Skin - Alfinder' }</title>
              <meta name="”robots”" content="noindex, nofollow" />
          </Helmet>
        {this.state.width >= 1100 ? (
            <div>
              <div style={{display: 'flex', width: '100vw', height: '75vh', paddingTop: 80, alignItems: 'flex-end', justifyContent: 'flex-start', backgroundImage: `url(${Background})`}}>
                <div style={{marginLeft: 100, marginBottom: 80}}>
                  <div style={{textAlign: 'left', marginBottom: 12}}>
                  </div>
                  <h1 style={{fontSize: 20, letterSpacing: 7, marginBottom: 12, color: '#555'}}>SKINCARE</h1>
                  <h1 style={{textAlign: 'left', color: '#3c2d64', fontWeight: '400', fontSize: 58, lineHeight: 1.2, paddingRight: 50, marginBottom: 20}}>The Skin Benefits of CBD</h1>
                  <p style={{color: '#261F3C', fontSize: 20, fontWeight: '600', maxWidth: 500}}>"A restorative solution for all skin types including acne-prone and sensitive skin, CBD is a natural plant compound that’s been shown to help reduce inflammation and support the skin’s natural healing process."</p>
                </div>
              </div>

              <div style={{width: '90%', margin: '0 auto', marginBottom: 50, marginTop: 50}}>
                <div style={{}}>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 50}}>
                    <div style={{width: '45%'}}>
                      <div style={{}}>
                          <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>What does it do?</p>
                          <p style={{fontSize: 14, lineHeight: 1.5}}>CBD has been studied for its relaxing, pain-relieving, and anti-anxiety properties when taken internally, but recent research has shown that it also has calming and therapeutic benefits when applied topically to the skin. It has been shown to help reduce pain and inflammation caused by inflammatory skin conditions, and may even help ease the discomfort of headaches. CBD also has potent antioxidant effects, which means it may help counteract signs of aging caused by free radicals.</p>
                      </div>
                    </div>
                    <div style={{width: '45%'}}>
                      <div style={{}}>
                          <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>What is is used for?</p>
                          <p style={{fontSize: 14, lineHeight: 1.5}}>CBD is safe and effective for all skin types, but especially helpful to people who struggle with inflammatory skin conditions, skin sensitivity, headaches, skin dryness, and acne. Because of its powerful anti-inflammatory properties, CBD can help support the skin’s natural healing process, shortening the lifespan of breakouts and eczema/psoriasis flare-ups. If you are struggling with skin issues, consider using CBD as an effective skin care solution.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{}}>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 50}}>
                    <div style={{width: '45%'}}>
                      <div style={{}}>
                          <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Reduces Signs of Aging Skin</p>
                          <p style={{fontSize: 14, lineHeight: 1.5, marginBottom: 9}}>As you age, your skin, which is the largest organ, also starts to show signs such as red skin tone, skin dullness, and wrinkles. To keep the skin in perfect condition, you need to use anti-aging creams or lotions. Although there are several products available in the market that can reduce the aging effects, most of them are not effective like CBD oil products.</p>
                          <p style={{fontSize: 14, lineHeight: 1.5, marginBottom: 9}}>CBD oil plays a vital role in keeping your skin hydrated and healthy. It has antioxidant properties that allow the products to reduce the visible signs of aging on your skin. Hemp plants that produce CBD oil contain two fatty acids, Omega 6 and Omega 3, that stimulates the production of collagen and thus preventing excessive water loss. This helps in keeping your skin hydrated and good looking.</p>
                          <p style={{fontSize: 14, lineHeight: 1.5, marginBottom: 9}}>Furthermore, CBD oil is gentle to use with fewer side effects, unlike most medications. CBD oil’s properties make it stand out from the antioxidants with similar claims. It doesn’t just make your skin look better; CBD promotes your overall health.</p>
                      </div>
                    </div>
                    <div style={{width: '45%'}}>
                      <div style={{}}>
                          <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Finally</p>
                          <p style={{fontSize: 14, lineHeight: 1.5}}>People spend a lot of money on cosmetic products that promise to keep their skin in perfect condition. But such unnatural products can do more harm than good. Using natural remedies is the best way to go.  While there are plenty of options on the market, none seems to match CBD oil. CBD oil helps treat various skin conditions like eczema, psoriasis, and acne helps in managing aging and dry skin. The benefits to enjoy are overwhelming, which is why you should consider adding CBD oil products for skin care to your routine.</p>
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
                  <h1 style={{fontSize: 16, letterSpacing: 5, marginBottom: 12, color: '#555'}}>SKINCARE</h1>
                  <h1 style={{textAlign: 'left', color: '#3c2d64', fontWeight: '400', fontSize: 42, lineHeight: 1.2, paddingRight: 50, marginBottom: 20}}>The Skin Benefits of CBD</h1>
                  <p style={{color: '#261F3C', fontSize: 18, fontWeight: 600, maxWidth: 400, paddingRight: 30}}>"A restorative solution for all skin types including acne-prone and sensitive skin, CBD is a natural plant compound that’s been shown to help reduce inflammation and support the skin’s natural healing process."</p>
                </div>
              </div>

              <div style={{width: '90%', margin: '0 auto', marginBottom: 50, marginTop: 50}}>
                <div style={{}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0}}>
                    <div style={{width: '95%', marginBottom: 30}}>
                      <div style={{}}>
                        <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>What does it do?</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>CBD has been studied for its relaxing, pain-relieving, and anti-anxiety properties when taken internally, but recent research has shown that it also has calming and therapeutic benefits when applied topically to the skin. It has been shown to help reduce pain and inflammation caused by inflammatory skin conditions, and may even help ease the discomfort of headaches. CBD also has potent antioxidant effects, which means it may help counteract signs of aging caused by free radicals.</p>
                      </div>
                    </div>
                    <div style={{width: '95%', marginBottom: 30}}>
                      <div style={{}}>
                        <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>What is is used for?</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>CBD is safe and effective for all skin types, but especially helpful to people who struggle with inflammatory skin conditions, skin sensitivity, headaches, skin dryness, and acne. Because of its powerful anti-inflammatory properties, CBD can help support the skin’s natural healing process, shortening the lifespan of breakouts and eczema/psoriasis flare-ups. If you are struggling with skin issues, consider using CBD as an effective skin care solution.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginBottom: 50}}>
                    <div style={{width: '95%', marginBottom: 30}}>
                      <div style={{}}>
                        <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Reduces Signs of Aging Skin</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>As you age, your skin, which is the largest organ, also starts to show signs such as red skin tone, skin dullness, and wrinkles. To keep the skin in perfect condition, you need to use anti-aging creams or lotions. Although there are several products available in the market that can reduce the aging effects, most of them are not effective like CBD oil products.</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>CBD oil plays a vital role in keeping your skin hydrated and healthy. It has antioxidant properties that allow the products to reduce the visible signs of aging on your skin. Hemp plants that produce CBD oil contain two fatty acids, Omega 6 and Omega 3, that stimulates the production of collagen and thus preventing excessive water loss. This helps in keeping your skin hydrated and good looking.</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>Furthermore, CBD oil is gentle to use with fewer side effects, unlike most medications. CBD oil’s properties make it stand out from the antioxidants with similar claims. It doesn’t just make your skin look better; CBD promotes your overall health.</p>
                      </div>
                    </div>
                    <div style={{width: '95%', marginBottom: 30}}>
                      <div style={{}}>
                        <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Finally</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>People spend a lot of money on cosmetic products that promise to keep their skin in perfect condition. But such unnatural products can do more harm than good. Using natural remedies is the best way to go. While there are plenty of options on the market, none seems to match CBD oil. CBD oil helps treat various skin conditions like eczema, psoriasis, and acne helps in managing aging and dry skin. The benefits to enjoy are overwhelming, which is why you should consider adding CBD oil products for skin care to your routine.</p>
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
  
  export default Skincare;