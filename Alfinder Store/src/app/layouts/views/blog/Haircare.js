import React from 'react';
import { Helmet } from 'react-helmet';

import Background from '../../../../assets/bckgrnd.png';

  class Haircare extends React.Component {
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
                  <title>{ 'Benefits of CBD products for your Hair - Alfinder' }</title>
                  <meta name="”robots”" content="noindex, nofollow" />
              </Helmet>
        {this.state.width >= 1100 ? (
          <div>
              <div style={{display: 'flex', width: '100vw', height: '75vh', paddingTop: 80, alignItems: 'flex-end', justifyContent: 'flex-start', backgroundImage: `url(${Background})`}}>
                <div style={{marginLeft: 100, marginBottom: 80}}>
                  <div style={{textAlign: 'left', marginBottom: 12}}>
                  </div>
                  <h1 style={{fontSize: 20, letterSpacing: 7, marginBottom: 12, color: '#555'}}>HAIRACRE</h1>
                  <h1 style={{textAlign: 'left', color: '#3c2d64', fontWeight: '400', fontSize: 58, lineHeight: 1.2, paddingRight: 50, marginBottom: 20}}>CBD Oil Protects & Nourishes Your Hair</h1>
                  <p style={{color: '#261F3C', fontSize: 20, fontWeight: 600, maxWidth: 500}}>CBD hair Products For Longer, Stronger, Healthier Hair.</p>
                </div>
              </div>

              <div style={{width: '90%', margin: '0 auto', marginBottom: 50, marginTop: 50}}>
                <div style={{}}>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 50}}>
                    <div style={{width: '45%'}}>
                      <div style={{}}>
                          <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Helps Hair Grow</p>
                          <p style={{fontSize: 14, lineHeight: 1.5}}>CBD oil is high in protein, vitamins and minerals too. These properties are proven to stimulate hair growth for many, moisturizing and nourishing the hair, making it stronger and grow thicker and healthier, as well as help hair loss, improve thinning hair, and increase health.</p>
                      </div>
                    </div>
                    <div style={{width: '45%'}}>
                      <div style={{}}>
                          <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Strengthens and Protects Hair</p>
                          <p style={{fontSize: 14, lineHeight: 1.5}}>Hair is mostly made out of protein, which is why experts recommend a protein treatment for weak, broken hair. CBD oil contains important amino acids, which are the building blocks of protein. When used regularly, it can help strengthen and fortify your hair. Also, CBD oil is full of fatty acids that provide moisture and seal the cuticle. It’s also rich in antioxidants like vitamins A, C and E, helping to protect the hair from environmental damage.</p>
                      </div>
                    </div>
                  </div>

                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 50}}>
                    <div style={{width: '45%'}}>
                      <div style={{}}>
                          <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Improves Scalp Health</p>
                          <p style={{fontSize: 14, lineHeight: 1.5, marginBottom: 9}}>CBD oil contains high doses of calcium, phosphorus, magnesium, potassium and vitamin E – all of which are great for the scalp. It’s also a natural anti-inflammatory, which makes it ideal for common scalp conditions like psoriasis or folliculitis. Moreover, it balances your scalp’s natural production of sebum (or oil), whether you have too much or too little. CBD is an adaptogen, meaning it regulates sebum production so it is great for oily, dry or normal hair types. It also helps to heal dry, flaky scalp as well as eczema and psoriasis.</p>
                      </div>
                    </div>
                    <div style={{width: '45%'}}>
                      <div style={{}}>
                          <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Keeps Hair Moisturized</p>
                          <p style={{fontSize: 14, lineHeight: 1.5}}>The moisturizing properties in hemp oil can both improve the follicles and the scalp which helps create a perfect environment for growing hair.</p>
                      </div>
                    </div>
                  </div>

                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 50}}>
                    <div style={{width: '45%'}}>
                      <div style={{}}>
                          <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Improves Hair Elasticity</p>
                          <p style={{fontSize: 14, lineHeight: 1.5, marginBottom: 9}}>Because of the lipids present in CBD oil, the increase in elasticity, volume and shine is typically noticed.</p>
                      </div>
                    </div>
                    <div style={{width: '45%'}}>
                      <div style={{}}>
                          <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Preventing Breakage of Hair</p>
                          <p style={{fontSize: 14, lineHeight: 1.5}}>When hair loses moisture, it can become very dry and break more easily. CBD oil helps maintain the natural texture of hair, preventing water loss and adding moisture to the hair and scalp. This is especially important in drier climates where hair tends to lose moisture more quickly.</p>
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
                  <h1 style={{fontSize: 16, letterSpacing: 5, marginBottom: 12, color: '#555'}}>HAIRCARE</h1>
                  <h1 style={{textAlign: 'left', color: '#3c2d64', fontWeight: '400', fontSize: 42, lineHeight: 1.2, paddingRight: 50, marginBottom: 20}}>CBD Oil Protects & Nourishes Your Hair</h1>
                  <p style={{color: '#261F3C', fontSize: 18, fontWeight: 600, maxWidth: 500}}>CBD hair Products For Longer, Stronger, Healthier Hair.</p>
                </div>
              </div>

              <div style={{width: '90%', margin: '0 auto', marginBottom: 50, marginTop: 50}}>
                <div style={{}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0}}>
                    <div style={{width: '95%', marginBottom: 30}}>
                      <div style={{}}>
                        <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Helps Hair Grow</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>CBD oil is high in protein, vitamins and minerals too. These properties are proven to stimulate hair growth for many, moisturizing and nourishing the hair, making it stronger and grow thicker and healthier, as well as help hair loss, improve thinning hair, and increase health.</p>
                      </div>
                    </div>
                    <div style={{width: '95%', marginBottom: 30}}>
                      <div style={{}}>
                        <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Strengthens and Protects Hair</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>Hair is mostly made out of protein, which is why experts recommend a protein treatment for weak, broken hair. CBD oil contains important amino acids, which are the building blocks of protein. When used regularly, it can help strengthen and fortify your hair. Also, CBD oil is full of fatty acids that provide moisture and seal the cuticle. It’s also rich in antioxidants like vitamins A, C and E, helping to protect the hair from environmental damage.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginBottom: 50}}>
                    <div style={{width: '95%', marginBottom: 30}}>
                      <div style={{}}>
                        <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Improves Scalp Health</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>CBD oil contains high doses of calcium, phosphorus, magnesium, potassium and vitamin E – all of which are great for the scalp. It’s also a natural anti-inflammatory, which makes it ideal for common scalp conditions like psoriasis or folliculitis. Moreover, it balances your scalp’s natural production of sebum (or oil), whether you have too much or too little. CBD is an adaptogen, meaning it regulates sebum production so it is great for oily, dry or normal hair types. It also helps to heal dry, flaky scalp as well as eczema and psoriasis.</p>
                      </div>
                    </div>
                    <div style={{width: '95%', marginBottom: 30}}>
                      <div style={{}}>
                        <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Keeps Hair Moisturized</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>The moisturizing properties in hemp oil can both improve the follicles and the scalp which helps create a perfect environment for growing hair.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginBottom: 50}}>
                    <div style={{width: '95%', marginBottom: 30}}>
                      <div style={{}}>
                        <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Improves Hair Elasticity</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>Because of the lipids present in CBD oil, the increase in elasticity, volume and shine is typically noticed.</p>
                      </div>
                    </div>
                    <div style={{width: '95%', marginBottom: 30}}>
                      <div style={{}}>
                        <p style={{maxWidth: '70%', fontWeight: '600', fontSize: 17, marginBottom: 5}}>Preventing Breakage of Hair</p>
                        <p style={{fontSize: 14, lineHeight: 1.5}}>When hair loses moisture, it can become very dry and break more easily. CBD oil helps maintain the natural texture of hair, preventing water loss and adding moisture to the hair and scalp. This is especially important in drier climates where hair tends to lose moisture more quickly.</p>
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
  
  export default Haircare;