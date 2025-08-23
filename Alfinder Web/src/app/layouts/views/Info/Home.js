import React from 'react'
import { Helmet } from 'react-helmet'
import { BsCheckCircle } from 'react-icons/bs'
import { RiDonutChartLine } from 'react-icons/ri'
import { GiConvergenceTarget } from 'react-icons/gi'
import { AiOutlineSafety, AiOutlineTeam } from 'react-icons/ai'



class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <meta name="”robots”" content="index,nofollow" />
        </Helmet>
        <div>
          <div className="home-landing">
            <div className="home-landing-container">
              <h2>Alfinder - Already. All. Finder.</h2>
              <h1>The most flexible behavioral data analysis solution, enabling industry leaders to predict market behaviors and learn audiences.</h1>
              <h5>Contact For Pricing.</h5>
            </div>
            <div className="btn-container">
                
                <a href="/request-demo">
                  <div className="btn">
                    <p style={{color: '#fff', fontWeight: '500', fontSize: 17}}>Request Free Demo</p>
                  </div>
                </a>
              </div>
          </div>

          
          <div className="options">
            <h3 className="sec-title">Get closer to your market by optimizing parameters relative to your target, needs, and industry.</h3>
            <div className="options-container">
              <div className="options-content">
                <div className="options-text-container">
                  <p className="option-text">Spending Behaviors.</p>
                  {/* <p className="option-subtitle">Easy to use, fast, and affordable.</p> */}
                </div>
              </div>
              <div className="options-content">
                <div className="options-text-container">
                  <p className="option-text">Lifestyle Tendencies.</p>
                  {/* <p className="option-subtitle">Easy to use, fast, and affordable.</p> */}
                </div>
              </div>
              <div className="options-content">
                <div className="options-text-container">
                  <p className="option-text">Mindset Identifiers.</p>
                  {/* <p className="option-subtitle">Less than 7% margin of error.</p> */}
                </div>
              </div>
              <div className="options-content">
                <div className="options-text-container">
                  <p className="option-text">Idealism Indicators.</p>
                  {/* <p className="option-subtitle">Based on real-time user data.</p> */}
                </div>
              </div>
              
              <div className="options-content">
                <div className="options-text-container">
                  <p className="option-text">Habitual Characteristics.</p>
                  {/* <p className="option-subtitle">Based on real-time user data.</p> */}
                </div>
              </div>
              <div className="options-content">
                <div className="options-text-container">
                  <p className="option-text">Historical Performers.</p>
                  {/* <p className="option-subtitle">Based on real-time user data.</p> */}
                </div>
              </div>
              <div className="options-content">
                <div className="options-text-container">
                  <p className="option-text">Forehanded Markers.</p>
                  {/* <p className="option-subtitle">Based on real-time user data.</p> */}
                </div>
              </div>
              <div className="options-content">
                <div className="options-text-container">
                  <p className="option-text">And More.</p>
                  <p className="option-subtitle">Flexible to your requirements.</p>
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

          <div className="aspects">
            <div className="aspect-item sm">
              <div className="aspect-item-icons">
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

            <div className="aspect-item sm">
              <div className="aspect-item-icons">
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 110, height: 110}}>
                  <RiDonutChartLine size={58} />
                </div>
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

            <div className="aspect-item lg">
              <div className="aspect-item-icons">
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
                    <span style={{color: '#fff', fontWeight: '500', fontSize: 17}}>Explore Solutions</span>
                  </div>
                </a>
            </div>
          </div>



          <div className="catch-sec">
            <h3 className="sec-title">Using fewer parameters we uncover invaluable information about your target market, current audience, industry markers, and much more with unimaginable accuracy.</h3>
            <div className="catch-container">
              <div className="catch-content">
                <h5>70%</h5>
                <p>Less Input.</p>
              </div>
              <div className="catch-content">
                <h5>93%</h5>
                <p>Accuracy.</p>
              </div>
            </div>
          </div>
  
          
          <div className="industry-info">
            <div style={{color: '#FFF', textAlign: 'center', maxWidth: 600, marginBottom: 80, paddingRight: 50, paddingLeft: 50}}>
              <h4 style={{marginBottom: 12, textTransform: 'uppercase', fontSize: 30}}>Do Less. Find More.</h4>
              <p style={{fontSize: 24, lineHeight: 1.3}}>Alfinder is not industry specific. Although certain industries are more data driven, we are not limited by it.</p>
            </div>

            <div className="industry-content">
              <div className="industry-info-item">
                <div style={{width: '80%', margin: '0 auto'}}>
                  <p style={{fontSize: 23, color: '#FFF', marginBottom: 11, textTransform: 'uppercase'}}>I. Marketing and Advertising</p>
                  <p style={{color: '#FFF'}}>More often than not companies such as marketing and advertising agencies rely on the data that they have no influence on. They take the information, guesstimate the parameters on third party softwares until they achieve the result that satisfies their clients.</p>
                  <p style={{color: '#FFF'}}>However, this is only due to vague data protection and failure of understanding.</p>
                  <p style={{color: '#FFF'}}>The ideal way of processing and configuring data is to know how to read and comprehend it in such a way that gives you power over your competitors. We help companies understand their users deeper, better, and cheaper. Sure, knowing if someone is a dog person or a cat person can help with targeting, but knowing what type of hobbies they enjoy and what sort of idealogies or fears they have can provide a deeper connection.</p>
                </div>
              </div>
              <div className="industry-info-item">
                <div style={{width: '80%', margin: '0 auto'}}>
                  <p style={{fontSize: 23, color: '#FFF', marginBottom: 11, textTransform: 'uppercase'}}>II. Social Media and E-commerce</p>
                  <p style={{color: '#FFF'}}>One of the biggest challenges that every e-commerce business faces when starting a new product line or launching a new sector or stealing customers from their competitors is how to make the expansion before spending everything on marketing.</p>
                  <p style={{color: '#FFF'}}>Same thing happens to social media campaigns when deciding to expand.</p>
                  <p style={{color: '#FFF'}}>The solution relies on specific target audience studying. Differentiating the ones who are willing to purchase new products or follow new trends in advance provides leverage. To date, no platform or application allows companies to configure audiences based on parameters such as <b>neediness</b> or <b>desirability</b>.</p>
                </div>
              </div>
              <div className="industry-info-item">
                <div style={{width: '80%', margin: '0 auto'}}>
                  <p style={{fontSize: 23, color: '#FFF', marginBottom: 11, textTransform: 'uppercase'}}>III. Artificial Intelligence and Big Data</p>
                  <p style={{color: '#fff'}}>Companies with large amounts of data often struggle with categorizing and cleaning of their databases. This could happen in various industries from healthcare to clothing. In return, industry leaders start selling and reselling their data in an attempt to find a need for it.</p>
                  <p style={{color: '#fff'}}>Our remarkable engine is capable of recognizing invaluable information in what seems to be useless data to most companies. Even at medium to low amounts of data our results stand out with less than 7% margin of error.</p>
                </div>
              </div>
              <div className="industry-info-item">
                <div style={{width: '80%', margin: '0 auto'}}>
                  <p style={{fontSize: 23, color: '#FFF', marginBottom: 11, textTransform: 'uppercase'}}>IV. Medicine and Psychology</p>
                  <p style={{color: '#fff'}}>In the world of psychology and behavioral medicine, each person is categorized into specific baskets. Doctors and psychologists may examine your mental health and ask questions about your past and everyday life actions, but none will consider your interests, goals, and favors.</p>
                  <p style={{color: '#fff'}}>Alfinder combines the power of behavioral psychology with the strength and resilience of AI and processing power to give you awareness about your audience. Though research shows great promise in doing so, there has not been a real solution for businesses to take advantage of.</p>
                </div>
              </div>
            </div>
          </div>
  
          <div className="trust-info">
            <div className="trust-info-item">
              <p style={{textTransform: 'capitalize', marginBottom: 25, color: '#000', fontSize: 26, fontWeight: '400', lineHeight: 1.4}}>Trusted Data Transparency.</p>
              <p style={{color: '#000', fontSize: 18, lineHeight: 1.7, paddingLeft: 5, marginBottom: 12}}>We take all measures to amplify transparency of what we do while protecting user data at all costs. We take into measure the importance of data privacy when designing and implementing our API and make sure to share the process with transparency.</p>
              <p style={{color: '#000', fontSize: 18, lineHeight: 1.7, paddingLeft: 5}}>Despite all business practices, at Alfinder, our goal is to connect, redirect and transfer target audiences to their desired destination.</p>
              <p style={{color: '#000', fontSize: 18, lineHeight: 1.7, paddingLeft: 5}}>We believe, in any case, if the customer is not interested, poking them with repetitive messages, ads and banners will only result in deficit spending and failure.</p>
            </div>
            <div className="trust-info-item">
              <p style={{textTransform: 'capitalize', marginBottom: 25, color: '#000', fontSize: 26, fontWeight: '400', lineHeight: 1.4}}>Protecting customer privacy by eliminating unnecessary data collection & tracking.</p>
              <p style={{color: '#000', fontSize: 18, lineHeight: 1.7, paddingLeft: 5, marginBottom: 12}}>We take all measures to amplify transparency of what we do while protecting user data at all costs. We take into measure the importance of data privacy when designing and implementing our API and make sure to share the process with transparency.</p>
              <p style={{color: '#000', fontSize: 18, lineHeight: 1.7, paddingLeft: 5}}>Despite all business practices, at Alfinder, our goal is to connect, redirect and transfer target audiences to their desired destination.</p>
              <p style={{color: '#000', fontSize: 18, lineHeight: 1.7, paddingLeft: 5}}>We believe, in any case, if the customer is not interested, poking them with repetitive messages, ads and banners will only result in deficit spending and failure.</p>
            </div>
          </div>
  
          <div style={{margin: '50px 0', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <a href="/request-demo">
              <div className="btn">
                <p style={{color: '#fff', fontWeight: '400', fontSize: 17}}>Request Free Demo</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
    }
  }

export default Home
