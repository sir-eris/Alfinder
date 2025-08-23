import React from 'react'
import { Helmet } from 'react-helmet'

  class Support extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        width: 0,
        height: 0,
        submitted: false,
        error: false,
        email: '',
        name: '',
        subject: '',
        message: '',
        emailError: false,
        nameError: false,
        subjectError: false,
        messageError: false
      };
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInputChange(event) {
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value.trim();
      this.setState({[event.target.name]: value});
    }
    
    handleSubmit = async () => {
      if (this.state.email === '') {
        this.setState({
          emailError: true,
          nameError: false,
          subjectError: false,
          messageError: false
        });
        return;
      }
      if (this.state.name === '') {
        this.setState({
          emailError: false,
          nameError: true,
          subjectError: false,
          messageError: false
        });
        return;
      }
      if (this.state.subject === '') {
        this.setState({
          emailError: false,
          nameError: false,
          subjectError: true,
          messageError: false
        });
        return;
      }
      if (this.state.message === '') {
        this.setState({
          emailError: false,
          nameError: false,
          subjectError: false,
          messageError: true
        });
        return;
      }
      
      try {
        let res = await fetch('https://api.alfinder.com/messages',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            source: 'support',
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message,
          })
        });
        let responseJson = await res.json();
        if (responseJson === true) {
          this.setState({
            email: '',
            name: '',
            subject: '',
            message: '',
            submitted: true,
            error: false, 
            emailError: false,
            nameError: false,
            subjectError: false,
            messageError: false
          });
        } else {
          this.setState({error: true, submitted: false});
        }
      } catch (e) {
        this.setState({error: true, submitted: false});
      }
    };
    
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
              <title>{ 'Support - Alfinder' }</title>
              <meta name="”robots”" content="noindex, nofollow" />
          </Helmet>
        {this.state.width >= 1000 ? (
            <div>
              <div style={{display: 'flex', width: '100vw', minHeight: '100vh'}}>
                <div style={{width: '40%', backgroundColor: '#261F3C'}}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', width: '100%', height: '100vh', minHeight: 500}}>
                        <div style={{paddingRight: 50, paddingLeft: 50, marginBottom: 100}}>
                          <h1 style={{fontSize: 16, letterSpacing: 5, marginBottom: 12, color: '#555'}}>TECH SUPPORT</h1>
                          <h2 style={{color: '#fff', marginBottom: 30}}>Technical support can't get any closer to you. Let us know what's wrong and we will resolve it for you.</h2>
                          <p style={{color: '#fff'}}>Our technical support team will get back to you within 72 hours.</p>
                        </div>
                    </div>
                  </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '60%', paddingTop: 100, paddingBottom: 30, backgroundColor: '#fff'}}>
                    <div style={{width: '40vw',}}>
                        <div style={{marginBottom: 15}}>
                            <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Email Address <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                            <input type="email" className="reverse" maxLength={100} name="email" value={this.state.email} onChange={this.handleInputChange} required />
                            <p style={{color: '#000', fontSize: 11, fontWeight: 400}}>{this.state.emailError ? 'This field is required.' : ''}</p>
                        </div>
                        <div style={{marginBottom: 15}}>
                            <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Full Name<sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                            <input type="text" className="reverse" maxLength={50} name="name" value={this.state.name} onChange={this.handleInputChange} required />
                            <p style={{color: '#000', fontSize: 11, fontWeight: 400}}>{this.state.nameError ? 'This field is required.' : ''}</p>
                        </div>
                        <div style={{marginBottom: 15}}>
                            <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Subject <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                            <input type="text" className="reverse" maxLength={100} name="subject" value={this.state.subject} onChange={this.handleInputChange} required />
                            <p style={{color: '#000', fontSize: 11, fontWeight: 400}}>{this.state.subjectError ? 'This field is required.' : ''}</p>
                        </div>
                        <div style={{marginBottom: 20}}>
                          <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Message<sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                          <textarea  name="message" className="reverse" maxLength={300} value={this.state.message} onChange={this.handleInputChange} required ></textarea>
                          <p style={{color: '#000', fontSize: 11, fontWeight: 400}}>{this.state.messageError ? 'This field is required.' : ''}</p>
                        </div>
                    </div>
                    <div style={{width: '40vw', textAlign: 'center'}}>
                      <p style={{color: 'red', fontWeight: '600', fontSize: 15}}>{this.state.error ? 'Please Try Again' : ''}</p>
                      <p style={{color: '#63BC46', fontWeight: '600', fontSize: 15}}>{this.state.submitted ? 'Your Message Was Successfully Sent' : ''}</p>
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button type="submit" className="btn" style={{width: '32%', marginRight: 0}} onClick={this.handleSubmit}>SEND</button>
                      </div>
                    </div>
                  </div>  
              </div>
            </div>
          ) : (
            <div>
              <div style={{display: 'flex', flexDirection: 'column', width: '100vw'}}>
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: 120, paddingBottom: 50, backgroundColor: '#261F3C'}}>
                    <div style={{paddingRight: 50, paddingLeft: 50}}>
                      <h1 style={{fontSize: 15, letterSpacing: 3, marginBottom: 12, color: '#555'}}>TECH SUPPORT</h1>
                      <h2 style={{color: '#fff', marginBottom: 30}}>Technical support can't get any closer to you. Let us know what's wrong and we will resolve it for you.</h2>
                      <p style={{color: '#fff'}}>Our technical support team will get back to you within 72 hours.</p>
                    </div>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingBottom: 30, paddingTop: 30, backgroundColor: '#fff'}}>
                    <div style={{width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <div style={{margin: '0 auto', width: '80vw'}}>
                          <div style={{marginBottom: 15}}>
                              <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Email Address <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                              <input type="email" className="reverse" maxLength={100} name="email" value={this.state.email} onChange={this.handleInputChange} required />
                              <p style={{color: '#000', fontSize: 11, fontWeight: 400}}>{this.state.emailError ? 'This field is required.' : ''}</p>
                          </div>
                          <div style={{marginBottom: 15}}>
                              <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Full Name<sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                              <input type="text" className="reverse" maxLength={50} name="name" value={this.state.name} onChange={this.handleInputChange} required />
                              <p style={{color: '#000', fontSize: 11, fontWeight: 400}}>{this.state.nameError ? 'This field is required.' : ''}</p>
                          </div>
                          <div style={{marginBottom: 15}}>
                            <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Subject <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                            <input type="text" className="reverse" maxLength={100} name="subject" value={this.state.subject} onChange={this.handleInputChange} required />
                            <p style={{color: '#000', fontSize: 11, fontWeight: 400}}>{this.state.subjectError ? 'This field is required.' : ''}</p>
                        </div>
                          <div style={{marginBottom: 20}}>
                              <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Message<sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                              <textarea name="message" className="reverse" maxLength={300} value={this.state.message} onChange={this.handleInputChange} required></textarea>
                              <p style={{color: '#000', fontSize: 11, fontWeight: 400}}>{this.state.messageError ? 'This field is required.' : ''}</p>
                          </div>
                      </div>
                      <div style={{width: '60vw', textAlign: 'center'}}>
                        <p style={{color: 'red', fontWeight: '600', fontSize: 15}}>{this.state.error ? 'Please Try Again' : ''}</p>
                        <p style={{color: '#63BC46', fontWeight: '600', fontSize: 15}}>{this.state.submitted ? 'Your Message Was Successfully Sent' : ''}</p>
                        <button type="submit" style={{width: '100%'}} onClick={this.handleSubmit}>SEND</button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          )}
          </div>
      );
        }
      }
  
  export default Support
  