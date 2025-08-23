import React from 'react';
import { Helmet } from 'react-helmet';

class Solutions extends React.Component {
  render() {
    return (
      <div className="App">
        <Helmet>
            <title>{ 'Solutions - Alfinder' }</title>
            <meta name="”robots”" content="index,follow" />
        </Helmet>
          <div>
              <div className="solutions-landing">
                  <div className="solutions-landing-container">
                    <h2>Solutions & Services</h2>
                    <h1>From the strength of machine learning pattern recognition to the power of behaviors with 70% fewer parameters and up to 93% accuracy.</h1>
                    <h5>Flexible, Efficient, Convenient and Reliable.</h5>
                  </div>
              </div> 
              
              <div className="solutions-container">
                <div className="solution-item">
                    <div className="solution-content">
                      <h4>Interactive Recognition</h4>
                      <p>Certain aspects of your databases indicate information regarding interactions done with your business. We identify those markers and analyse them for you.</p>
                      <p>We help you locate all possible outcomes and ways you can employ the analysis to reduce your marketing costs and increase customer engagement.</p>
                      <ul>
                        <li>Increase market interaction with your products.</li>
                        <li>No processing limits.</li>
                        <li>No need for external inputs.</li>
                        <li>Real time behavioral analysis based on your needs.</li>
                      </ul>
                    </div>
                    <div>
                      <a href="/contact-us">
                        <div className="btn">
                            <p style={{fontWeight: '400', fontSize: 17}}>Contact Us</p>
                        </div>
                      </a>
                    </div>
                  </div>

                <div className="solution-item">
                    <div className="solution-content">
                      <h4>Big Data Analyzer</h4>
                      <p>Our Big Data Analyzer analyses and categorizes your databases in such a way that pushes you closer to your goals. We provide a detailed report of the process and work with your teams on how you can benefit from the analysis. </p>
                      <p>The process depends on the load of your data and specific needs you have. Our engine requires up to 70% less data while processing your requirements.</p>
                      <ul>
                        <li>Most flexible solution for taking advantage of your data.</li>
                        <li>Real time behavioral analysis based on your needs.</li>
                        <li>Processing limits may apply.</li>
                      </ul>
                    </div>
                    <div>
                      <a href="/contact-us">
                        <div className="btn">
                            <p style={{fontWeight: '400', fontSize: 17}}>Contact Us</p>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="solution-item">
                    <div className="solution-content">
                      <h4>Audience Studying</h4>
                      <p>Audience Studying helps you move away from guesstimating which audience is best for business. You can closely monitor your target market with real time analysis and avoid the risk of excess spending on marketing campaigns that don't perform well.</p>
                      <p>In order to run effective marketing campaigns targeting a new market or your current audience you must know who you are making your pitch to.</p>
                      <ul>
                        <li>Provides detailed report on weak performers within your audience and how you can improve.</li>
                        <li>Using behavioral data analysis.</li>
                        <li>Flexible to your needs and requirements.</li>
                      </ul>
                    </div>
                    <div>
                      <a href="/contact-us">
                        <div className="btn">
                            <p style={{fontWeight: '400', fontSize: 17}}>Contact Us</p>
                        </div>
                      </a>
                    </div>
                  </div>

                <div className="solution-item">
                    <div className="solution-content">
                      <h4>Peer-to-Peer Analysis</h4>
                      <p>Our Peer-to-Peer Analysis unveils the unique connections that each data point can make with another. Whether for e-commerce or social platforms, understanding ways to connect your audience to each other expedites your growth.</p>
                      <ul>
                        <li>Find potential connections within your audience to increase sales.</li>
                        <li>Using Behavioral Data Analysis.</li>
                        <li>Not load dependent.</li>
                        <li>Analysis based on your requirements and industry.</li>
                      </ul>
                    </div>
                    <div>
                      <a href="/contact-us">
                        <div className="btn">
                            <p style={{fontWeight: '400', fontSize: 17}}>Contact Us</p>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="solution-item">
                    <div className="solution-content">
                      <h4>Target Market Analysis</h4>
                      <p>With the usage of your current target market we can help you increase your sales by up to 20%. Our engine allows us to deeply connect to your audience and help you distinguish your customers based on their needs, habits, spending behaviors, etc.</p>
                      <p>This gives you the ability to not only target your market based on their interest in your products, but how they will react to it beforehand.</p>
                      <ul>
                        <li>Allows you to predict market reactions before you make a big decision.</li>
                        <li>Real time behavioral analysis.</li>
                        <li>Detailed report specific to your company.</li>
                      </ul>
                    </div>
                    <div>
                      <a href="/contact-us">
                        <div className="btn">
                            <p style={{fontWeight: '400', fontSize: 17}}>Contact Us</p>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="solution-item">
                    <div className="solution-content">
                      <h4>Market Retargeting</h4>
                      <p>If you are launching a new product line or expanding into a new market, knowing the reaction of your new customers before your launch can appear to be invaluable.</p>
                      <p>This helps you carefully plan your new target audience, marketing campaigns, expansion budgets, and market needs beforehand.</p>
                      <ul>
                        <li>Helps you avoid making blind decisions before every new launch.</li>
                        <li>No processing limits.</li>
                        <li>May require external data based on your industry.</li>
                      </ul>
                    </div>
                    <div>
                      <a href="/contact-us">
                        <div className="btn">
                            <p style={{fontWeight: '400', fontSize: 17}}>Contact Us</p>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="solution-item">
                    <div className="solution-content">
                      <h4>Privacy Breach Protection</h4>
                      <p>As the digitalization of our lives increases so does online monitoring and tracking. We have developed a model that helps companies avoid the need for monitoring their customers without loosing valuable information.</p>
                      <p>This allows people to comfortably browse thier favorite sites without worrying about unwanted tracking.</p>
                    </div>
                    <div>
                      <div className="btn">
                          <p style={{fontWeight: '400', fontSize: 17}}>Launching Soon</p>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        );
      }
    }
  
  export default Solutions;