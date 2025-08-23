import React from 'react';
import { Helmet } from 'react-helmet';
import { BsCheckCircle } from 'react-icons/bs';
import { RiDonutChartLine } from 'react-icons/ri';
import { GiConvergenceTarget } from 'react-icons/gi';
import { AiOutlineSafety, AiOutlineTeam } from 'react-icons/ai';

import BG from '../../../../assets/bckgrnd.png';
import BestPrice from '../../../../assets/bg-1.png';
import Background from '../../../../assets/app.png';
import FreeReturn from '../../../../assets/bg-4.png';
import FreeShipping from '../../../../assets/bg-3.png';
import CustomerService from '../../../../assets/bg-2.png';
// import AppPreview1 from '../../../../assets/app_preview_1.png';
// import AppPreview2 from '../../../../assets/app_preview_2.png';
// import AppPreview3 from '../../../../assets/app_preview_3.png';

class Home extends React.Component {
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
              <meta name="”robots”" content="index,follow" />
            </Helmet>
          {this.state.width >= 900 ? (
            <div>
            <div style={{display: 'flex', width: '100vw', height: '100vh', minHeight: 600, alignItems: 'center', justifyContent: 'space-between', marginBottom: 17, backgroundColor: '#fff'}}>
              <div style={{width: '45vw', height: '70%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                <div style={{marginLeft: 120, marginBottom: 20}}>
                  <h1 style={{fontSize: 20, letterSpacing: 7, marginBottom: 12, color: '#555'}}>ALFINDER</h1>
                  <p style={{textAlign: 'left', color: '#3c2d64', fontWeight: '400', fontSize: 58, lineHeight: 1.2}}>ALREADY.</p>
                  <p style={{textAlign: 'left', color: '#3c2d64', fontWeight: '400', fontSize: 58, lineHeight: 1.2}}>ALL.</p>
                  <p style={{textAlign: 'left', color: '#3c2d64', fontWeight: '400', fontSize: 58, lineHeight: 1.2}}>FINDER.</p>
                  <h1 style={{color: '#000', fontWeight: 400, fontSize: 22, margin: '10px 0 5px', lineHeight: 1.35}}>The most flexible behavioral data analysis solution, enabling industry leaders to learn their audience - with higher accuracy and fewer inputs.</h1>
                  <p style={{color: '#000', fontWeight: 400, fontSize: 14, marginBottom: '20px'}}>Contact us for pricing.</p>
                </div>
                <div style={{flexDirection: 'row', display: 'flex', marginLeft: 120}}>
                  <a href="/contact-us">
                    <div className="btn">
                      <p style={{color: '#fff', fontWeight: '500', fontSize: 17}}>Contact Us</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="app-icon">
                <img src={Background} style={{minWidth: 500, width: '40vw', marginRight: '5vw'}} alt="Alfinder Inc." />
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', width: '100vw', alignItems: 'center', justifyContent: 'center', margin: '0 auto', marginBottom: 100}}>
              <h2 style={{maxWidth: 750, textAlign: 'center', marginBottom: 55, fontSize: 27, fontWeight: 400, textTransform: 'capitalize'}}>Get closer to your audience by optimizing parameters relative to your target, needs, and industry.</h2>
              <div className="options-container">
                <div className="options-content">
                  <div className="options-text-container">
                    <p className="option-text">Spending Behaviors</p>
                    <p>Easy to use, fast, and affordable.</p>
                  </div>
                </div>
                <div className="options-content">
                  <div className="options-text-container">
                    <p className="option-text">Lifestyle Types</p>
                    <p>Easy to use, fast, and affordable.</p>
                  </div>
                </div>
                <div className="options-content">
                  <div className="options-text-container">
                    <p className="option-text">Mindset Identifiers</p>
                    <p>Less than 7% margin of error.</p>
                  </div>
                </div>
                <div className="options-content">
                  <div className="options-text-container">
                    <p className="option-text">Idealism Indicators</p>
                    <p>Based on real-time user data.</p>
                  </div>
                </div>

                <div className="options-content">
                  <div className="options-text-container">
                    <p className="option-text">Habitual Characteristics</p>
                    <p>Based on real-time user data.</p>
                  </div>
                </div>
                <div className="options-content">
                  <div className="options-text-container">
                    <p className="option-text">Historical Performers</p>
                    <p>Based on real-time user data.</p>
                  </div>
                </div>
                <div className="options-content">
                  <div className="options-text-container">
                    <p className="option-text">Farseeing Markers</p>
                    <p>Based on real-time user data.</p>
                  </div>
                </div>
                <div className="options-content">
                  <div className="options-text-container">
                    <p className="option-text">And More</p>
                    <p>Based on real-time user data.</p>
                  </div>
                </div>
              </div>
            </div>

{/* # how you look at actions.
# how you react in the world.
# what directly affects your reactions.
# what indirectly affects your reactions.
# how you think for your reactions.
# how you fear about your reactions. */}

            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: ' 0 140px auto'}}>
              <div style={{display: 'flex', width: '45%', alignItems: 'center', justifyContent: '', marginBottom: 60}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 110, height: 110}}>
                    <GiConvergenceTarget size={55} />
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 110, height: 110}}>
                    <BsCheckCircle size={58} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <div style={{marginLeft: '25px'}}>
                  <h3 style={{textAlign : 'left', fontSize: 20, marginBottom: 9, fontWeight: 600, textTransform: 'uppercase'}}>Growth & Expansion</h3>
                    <div>
                      <p style={{color: '#000', textAlign: 'left', fontSize: 19, lineHeight: 1.5}}>Our goal is to help industry leaders succeed in their path to growth and expansion. By handing them a tighter grasp of their current and future market, we enable them to make more cost effective decisions about their business. We help them identify their audience and sharpen their understanding about them.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{display: 'flex', width: '45%', alignItems: 'center', justifyContent: 'center', marginBottom: 60}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around',}}>
                  <RiDonutChartLine size={58} />
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <div style={{marginLeft: '25px'}}>
                  <h3 style={{textAlign : 'left', fontSize: 20, marginBottom: 9, fontWeight: 600, textTransform: 'uppercase'}}>Effective & Convenient</h3>
                    <div>
                      <p style={{color: '#000', textAlign: 'left', fontSize: 19, lineHeight: 1.5}}>By combining the strength of machine learning patter recognition capabilities with the power of behavioral data analysis, we become the easiest solution for expansion through market analysis. Companies can reduce their marketing spending and focus on increasing their customer engagement and reducing customer acquisition costs.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 40}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 110, height: 110}}>
                    <AiOutlineTeam size={58} />
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 110, height: 110}}>
                    <AiOutlineSafety size={58} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <div style={{marginLeft: '25px'}}>
                    <h3 style={{textAlign : 'left', fontSize: 20, marginBottom: 9, fontWeight: 600, textTransform: 'uppercase'}}>Safe & Easy</h3>
                    <div>
                      <p style={{color: '#000', textAlign: 'left', fontSize: 19, lineHeight: 1.5}}>Due to the nature of our platform, everything is handled automatically. This also means that we do not manipulate any data while processing nor do we store it. Our model is tuned to handle a limitless amount of parameters based on each industry's standards.</p>
                      <p style={{color: '#000', textAlign: 'left', fontSize: 19, lineHeight: 1.5, marginBottom: 12}}>No matter how large or small the data pool, our technical team helps with every step of the process.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{margin: '0 auto 100px'}}>
                <a href="/solutions">
                    <div className="btn">
                      <span style={{color: '#fff', fontWeight: '500', fontSize: 17}}>Solutions & Services</span>
                    </div>
                  </a>
              </div>
            </div>


            <div className="ind-info-sec">
              <div style={{color: '#FFF', textAlign: 'center', maxWidth: 600, marginBottom: 80, paddingRight: 50, paddingLeft: 50}}>
                <h4 style={{marginBottom: 12, textTransform: 'uppercase', fontSize: 30}}>Do Less. Find More.</h4>
                <p style={{fontSize: 24, lineHeight: 1.3}}>Alfinder is not industry specific. Although certain industries are more data driven, we are not limited by it.</p>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 40, paddingLeft: 40}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100vw', height: 400}}>
                  <div style={{width: '50%'}}>
                    <div style={{width: '80%', margin: '0 auto'}}>
                      <p style={{fontSize: 23, color: '#FFF', marginBottom: 11, textTransform: 'uppercase'}}>I. Marketing and Advertising</p>
                      <p style={{color: '#FFF'}}>More often than not companies such as marketing and advertising agencies rely on the data that they have no influence on. They take the information, play with it until they achieve the result that satisfies their clients.</p>
                      <p style={{color: '#FFF'}}>However, this is only due to extensive data protection and failure of understanding.</p>
                      <p style={{color: '#FFF'}}>The ideal way of processing and configuring data is to know how to read and comprehend it in such a way that gives you power over your competitors. Alfinder does that for you. We can help you understand your users deeper, better, and cheaper. Sure, knowing if someone is a dog person or a cat person can help you target them, but knowing what type of hobbies they enjoy and what sort of idealogies or fears they have can give you a deeper knowledge.</p>
                    </div>
                  </div>
                  <div style={{width: '50%'}}>
                    <div style={{width: '80%', margin: '0 auto'}}>
                      <p style={{fontSize: 23, color: '#FFF', marginBottom: 11, textTransform: 'uppercase'}}>II. Social Media and E-commerce</p>
                      <p style={{color: '#FFF'}}>One of the biggest challenges that every e-commerce business faces when starting a new product line or launching a new sector or stealing customers from their competitors is how to make the expansion before spending everything on marketing.</p>
                      <p style={{color: '#FFF'}}>Same thing happens to social media campaigns when deciding to expand.</p>
                      <p style={{color: '#FFF'}}>The solution relies on specific target audiences. The ones who are willing to purchase your new product or follow your new trend. However, this is far from reality. To date, no platform or application allows you to configure your audience based on their <b>neediness</b> or <b>desirability</b>.</p>
                      <p>
                        {/* <a href="/wellness" style={{fontSize: 13}}>Learn More</a> */}
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100vw', height: 400}}>
                  <div style={{width: '50%'}}>
                    <div style={{width: '80%', margin: '0 auto'}}>
                      <p style={{fontSize: 23, color: '#FFF', marginBottom: 11, textTransform: 'uppercase'}}>III. Artificial Intelligence and Big Data</p>
                      <p style={{color: '#fff'}}>In the world of psychology and behavioral medicine, each person is categorized into specific baskets. Doctors and psychologists may examine your mental health and ask questions about your past and everyday life actions, but none will consider your interests, goals, and favors.</p>
                      <p style={{color: '#fff'}}>Alfinder combines the power of behavioral psychology with the strength and resilience of AI and processing power to give you awareness about your audience. Though research shows great promise in doing so, there has not been a real solution for businesses to take advantage of.</p>
                      <p>
                        {/* <a href="/hair-care" style={{fontSize: 13}}>Learn More</a> */}
                      </p>
                    </div>
                  </div>
                  <div style={{width: '50%'}}>
                    <div style={{width: '80%', margin: '0 auto'}}>
                      <p style={{fontSize: 23, color: '#FFF', marginBottom: 11, textTransform: 'uppercase'}}>IV. Medicine and Psychology</p>
                      <p style={{color: '#fff'}}>In the world of psychology and behavioral medicine, each person is categorized into specific baskets. Doctors and psychologists may examine your mental health and ask questions about your past and everyday life actions, but none will consider your interests, goals, and favors.</p>
                      <p style={{color: '#fff'}}>Alfinder combines the power of behavioral psychology with the strength and resilience of AI and processing power to give you awareness about your audience. Though research shows great promise in doing so, there has not been a real solution for businesses to take advantage of.</p>
                      <p>
                        {/* <a href="/hair-care" style={{fontSize: 13}}>Learn More</a> */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', backgroundColor: '#fff', width: '90vw', margin: '0 auto 70px auto', paddingTop: 70, paddingBottom: 70}}>
              <div style={{width: '45%'}}>
                <p style={{textTransform: 'capitalize', marginBottom: 25, color: '#000', fontSize: 26, fontWeight: '400', lineHeight: 1.4}}>Trusted Data Transparency.</p>
                <p style={{color: '#000', fontSize: 18, lineHeight: 1.7, paddingLeft: 5, marginBottom: 12}}>We take all measures to amplify transparency of what we do while protecting user data at all costs. We take into measure the importance of data privacy when designing and implementing our API and make sure to share the process with transparency.</p>
                <p style={{color: '#000', fontSize: 18, lineHeight: 1.7, paddingLeft: 5}}>Despite all business practices, at Alfinder, our goal is to connect, redirect and transfer target audiences to their desired destination.</p>
                <p style={{color: '#000', fontSize: 18, lineHeight: 1.7, paddingLeft: 5}}>We believe, in any case, if the customer is not interested, poking them with repetitive messages, ads and banners will only result in deficit spending and failure.</p>
              </div>
              <div style={{width: '45%'}}>
                <p style={{textTransform: 'capitalize', marginBottom: 25, color: '#000', fontSize: 26, fontWeight: '400', lineHeight: 1.4}}>Protecting customer privacy by eliminating unnecessary data collection & tracking.</p>
                <p style={{color: '#000', fontSize: 18, lineHeight: 1.7, paddingLeft: 5, marginBottom: 12}}>We take all measures to amplify transparency of what we do while protecting user data at all costs. We take into measure the importance of data privacy when designing and implementing our API and make sure to share the process with transparency.</p>
                <p style={{color: '#000', fontSize: 18, lineHeight: 1.7, paddingLeft: 5}}>Despite all business practices, at Alfinder, our goal is to connect, redirect and transfer target audiences to their desired destination.</p>
                <p style={{color: '#000', fontSize: 18, lineHeight: 1.7, paddingLeft: 5}}>We believe, in any case, if the customer is not interested, poking them with repetitive messages, ads and banners will only result in deficit spending and failure.</p>
              </div>
            </div>

            <div style={{margin: '50px 0', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              <a href="/contact-us">
                <div className="btn">
                  <p style={{color: '#fff', fontWeight: '400', fontSize: 17}}>Contact Us</p>
                </div>
              </a>
            </div>
            </div>
          ) : (
            <div>
            <div style={{display: 'flex', width: '100vw', height: '90vh', minHeight: 500, alignItems: 'center', justifyContent: 'center', paddingTop: 0, backgroundColor: '#fff'}}>
              <div style={{marginTop: 0}}>
                <div style={{margin: '0 auto 70px', width: '85%'}}>
                  <h1 style={{fontSize: 20, letterSpacing: 7, marginBottom: 12, color: '#555'}}>ALFINDER</h1>
                  <h1 style={{textAlign: 'left', color: '#3c2d64', fontWeight: '400', fontSize: 50, lineHeight: 1.1}}>ALREADY.</h1>
                  <h1 style={{textAlign: 'left', color: '#3c2d64', fontWeight: '400', fontSize: 50, lineHeight: 1.1}}>ALL.</h1>
                  <h1 style={{textAlign: 'left', color: '#3c2d64', fontWeight: '400', fontSize: 50, lineHeight: 1.1}}>FINDER.</h1>
                  <p style={{color: '#333', fontWeight: 400, fontSize: 20, marginTop: '10px', marginBottom: 10}}>Learn your audience and target them with accuracy.</p>
                  <p style={{color: '#333', fontWeight: 400, marginBottom: '20px'}}>Contact us for pricing.</p>
                </div>
                <div style={{flexDirection: 'column', display: 'flex', marginTop: 20}}>
                  <a href="/contact-us">
                    <div style={{display: 'flex', width: 200, margin: '0 auto', height: 50, marginBottom: '12px', justifyContent: 'center', alignItems: 'center', backgroundColor: '#261F3C', borderRadius: 50, boxShadow: '1px 0 5px rgba(0, 0, 0, 0.4)'}}>
                      <p style={{color: '#fff', fontWeight: '400', fontSize: 17}}>CONTACT US</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', width: '100vw', alignItems: 'center', justifyContent: 'center', margin: '0 auto', paddingTop: 40, paddingBottom: 40, marginBottom: 110}}>
              <div style={{width: '85%'}}>
                <h2 style={{textAlign: 'center', marginBottom: 30, fontSize: 22, fontWeight: 400, textTransform: 'uppercase'}}>Understanding audiences has never been easier.</h2>
                <p style={{textAlign: 'justify', fontSize: 16, fontWeight: 600, color: '#000', padding: '0 15px', borderLeft: '4px solid #6755a4'}}>Connect to your customers, understand them, and serve them better. With Alfinder you have the combined power of customer behavioral data with real-time AI driven analysis. You receive detailed reports about your audience based on your needs.</p>
              </div>
            </div>

            <div className="options-container">
              <div className="options-content">
                <div className="options-text-container">
                  <p className="option-text">CONVENIENT</p>
                  <small>Easy to use, fast, and affordable.</small>
                </div>
              </div>
              <div className="options-content">
                <div className="options-text-container">
                  <p className="option-text">Accurate</p>
                  <small>Less than 7% margin of error.</small>
                </div>
              </div>
            </div>
            <div className="options-container">
              <div className="options-content">
                <div className="options-text-container">
                  <p className="option-text">Data Driven</p>
                  <small>Based on real-time user data.</small>
                </div>
              </div>
              <div className="options-content">
                <div className="options-text-container">
                  <p className="option-text">Personalized</p>
                  <small>Supported by behavioral analysis.</small>
                </div>
              </div>
            </div>

            <div style={{width: '100vw', margin: '0 auto', marginBottom: 70}}>
            {/* <h2 style={{marginBottom: 60, textTransform: 'uppercase', fontSize: 24, fontWeight: '300', textAlign: 'center'}}>Do Less. Find More.</h2> */}
              <div style={{width: '90%', marginBottom: 50, textAlign: 'center', marginLeft: '5%'}}>
              {/* <img width={250} src={AppPreview1} alt="Alfinder iPhone App Preview" /> */}
                <h3 style={{textAlign : 'left', fontSize: 17, marginBottom: 9, fontWeight: 400, marginTop: '20px', textTransform: 'uppercase'}}>EVERYTHING IS MADE UNIQUE TO YOUR NEEDS.</h3>
                <p style={{color: '#000', textAlign: 'left', fontSize: 15, paddingLeft: 5, paddingRight: 15}}>Whether you are a marketing agency and would like to have a better understanding of your clients' audience or you are an e-commerce management company in search for a better way to define your audiences, Alfinder will give you the necessary power and data to do so.</p>
              </div>

              <div style={{width: '90%', marginBottom: 50, textAlign: 'center', marginLeft: '5%'}}>
              {/* <img width={250} src={AppPreview3} alt="Alfinder iPhone App Preview" /> */}
                <h3 style={{textAlign : 'left', fontSize: 17, marginBottom: 9, fontWeight: 400, marginTop: '20px', textTransform: 'uppercase'}}>AS SPECIFIC AS YOU NEED.</h3>
                <p style={{color: '#000', textAlign: 'left', fontSize: 15, paddingLeft: 5, paddingRight: 15}}>We provide generic details about each customer such as <b>daily interests</b>, <b>hobby type</b>, <b>activity type</b>. Along with personalized information such as <b>adaptability</b>, <b>purchasing power</b>, <b>product selection</b>. But it doesn't end there. Although we have access to more data and are able to analyze each and every customer based on your needs, you get to tell us what types of information you are looking for and to what extent your needs are.</p>

                </div>

              <div style={{width: '90%', marginBottom: 50, textAlign: 'center', marginLeft: '5%'}}>
              {/* <img width={250} src={AppPreview2} alt="Alfinder iPhone App Preview" /> */}
                <h3 style={{textAlign : 'left', fontSize: 17, marginBottom: 9, fontWeight: 400, marginTop: '20px', textTransform: 'uppercase'}}>One. Two. Three.</h3>
                <p style={{color: '#000', textAlign: 'left', fontSize: 15, paddingLeft: 5, paddingRight: 15}}>Integrating with Alfinder is a breeze. You can choose to integrate Alfinder as part of your sign-up process or ask your customers separately as you see fit.

You also have the freedom to personalize the integration based on your branding and add your touches to the program by taking advantage of our API.

Thanks to our expert team we can also customize any step of the process to suit your needs. Don't hesitate to contact our <a href="/support">Technical Support Team</a> with your questions..</p>
                </div>
            </div>


            <div style={{width: '100vw', height: 'auto', paddingTop: 60, paddingBottom: 50, marginBottom: 70, backgroundColor: '#3c2d64'}}>
              <div style={{color: '#FFF', textAlign: 'center', paddingRight: 50, paddingLeft: 50, marginBottom: 20}}>
                {/* <h2 style={{textTransform: 'uppercase', fontSize: 22, fontWeight: '300'}}>Alfinder.</h2> */}
                <h2 style={{marginBottom: 30, textTransform: 'uppercase', fontSize: 22, fontWeight: '300'}}>Do Less. Find More.</h2>
                <hr style={{borderColor: '#6755a4'}} />
              </div>
              <div style={{}}>
                <div style={{width: '100%'}}>
                  <div style={{width: '80%', margin: '0 auto'}}>
                    <p style={{fontWeight: 300, color: '#FFF', fontSize: 20, marginBottom: 7}}>Marketing and Advertising</p>
                    <div style={{marginBottom: 50}}>
                    <p style={{color: '#FFF', textAlign: 'justify'}}>More often than not companies such as marketing and advertising agencies rely on the data that they have no influence on. They take the information, play with it until they achieve the result that satisfies their clients.

However, this is only due to extensive data protection and failure of understanding.

The ideal way of processing and configuring data is to know how to read and comprehend it in such a way that gives you power over your competitors. Alfinder does that for you. We can help you understand your users deeper, better, and cheaper. Sure, knowing if someone is a dog person or a cat person can help you target them, but knowing what type of hobbies they enjoy and what sort of idealogies or fears they have can give you a deeper knowledge.</p>
                      <p>
                        {/* <a href="/skincare" style={{fontSize: 13}}>Learn More</a> */}
                      </p>
                    </div>
                  </div>

                  <div style={{width: '80%', margin: '0 auto'}}>
                    <p style={{fontWeight: 300, color: '#FFF', fontSize: 20, marginBottom: 7}}>Social Media and E-commerce</p>
                    <div style={{marginBottom: 50}}>
                      <p style={{color: '#FFF', textAlign: 'justify'}}>One of the biggest challenges that every e-commerce business faces when starting a new product line or launching a new sector or stealing customers from their competitors is how to make the expansion before spending everything on marketing.

Same thing happens to social media campaigns when deciding to expand.

The solution relies on specific target audiences. The ones who are willing to purchase your new product or follow your new trend. However, this is far from reality. To date, no platform or application allows you to configure your audience based on their neediness or desirability.</p>
                      <p>
                        {/* <a href="/wellness" style={{fontSize: 13}}>Learn More</a> */}
                      </p>
                    </div>
                  </div>

                  <div style={{width: '80%', margin: '0 auto'}}>
                    <p style={{fontWeight: 300, color: '#FFF', fontSize: 20, marginBottom: 7}}>Medicine and Psychology</p>
                    <div style={{marginBottom: 50}}>
                      <p style={{color: '#FFF', textAlign: 'justify'}}>In the world of psychology and behavioral medicine, each person is categorized into specific baskets. Doctors and psychologists may examine your mental health and ask questions about your past and everyday life actions, but none will consider your interests, goals, and favors.

Alfinder combines the power of behavioral psychology with the strength and resilience of AI and processing power to give you awareness about your audience. Though research shows great promise in doing so, there has not been a real solution for businesses to take advantage of.</p>
                      <p>
                        {/* <a href="/hair-care" style={{fontSize: 13}}>Learn More</a> */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{backgroundColor: '#fff', width: '100vw', paddingTop: 70, paddingBottom: 70, marginBottom: 70}}>
              <div style={{width: '75%', marginLeft: '7%'}}>
                <p style={{textTransform: 'uppercase', marginBottom: 12, color: '#000', fontSize: 26, fontWeight: '300', lineHeight: 1.2}}>Trusted Data Transparency.</p>
                <p style={{color: '#000', fontSize: 15, paddingLeft: 5}}>We take all measures to amplify transparency of what we do while protecting user data at all costs. We take into measure the importance of data privacy when designing and implementing our API and make sure to share the process with transparency.

Despite all business practices, at Alfinder, our goal is to connect, redirect and transfer target audiences to their desired destination.

We believe, in any case, if the customer is not interested, poking them with repetitive messages, ads and banners will only result in deficit spending and failure.</p>
              </div>
            </div>

            <div style={{marginBottom: '50px'}}>
              <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'center'}}>
                <a href="/contact-us">
                  <div style={{display: 'flex', width: 200, margin: '0 auto', height: 50, marginBottom: '15px', justifyContent: 'center', alignItems: 'center', backgroundColor: '#261F3C', borderRadius: 50, boxShadow: '1px 0 5px rgba(0, 0, 0, 0.4)'}}>
                    <p style={{color: '#fff', fontWeight: '400', fontSize: 17}}>CONTACT US</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          )}
        </div>
      );
      }
    }

export default Home;
