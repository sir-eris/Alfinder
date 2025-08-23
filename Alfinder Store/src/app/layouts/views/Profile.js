import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authLogin, authLogout, authRegister } from '../../core/actions/auth';

class Profile extends React.Component {
  static propTypes = {
    authLogin: PropTypes.func.isRequired,
    authLogout: PropTypes.func.isRequired,
    authRegister: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  }

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      emailHasError: '',
      passwordHasError: '',
      error: '',

      formDisplay: 0,
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const target = event.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  toggleFormDisplay = () => {
    this.setState({formDisplay: !this.state.formDisplay});
  };

  logIn = e => {
    e.preventDefault()
    this.props.authLogin(this.state.email, this.state.password);
  };

  logOut = e => {
    e.preventDefault();
    this.props.authLogout();
  };

  register = e => {
    e.preventDefault();
    this.props.authRegister(this.state);
    
  };

    render() {
      return(
        <div id="container">
          {this.props.isAuthenticated ?
          <div className="page-container">
              <div className="page-content">
                  <div className="page-headline">
                      <h4>PROFILE</h4>
                      <p onClick={this.logOut} style={{cursor: 'pointer'}}>Log Out</p>
                  </div>
                      <hr />
                  <div className="messager-display">
                    <div style={{width: '50%', maxWidth: '500px', textAlign: 'center'}}>
                        <p style={{marginBottom: 15, fontSize: 28, fontWeight: 300}}>Download Alfinder App.</p>
                        <p style={{marginBottom: 25}}>Please download Alfinder App in order to view details about your profile. You can track your orders, view your points and much more.</p>
                        <a href="/download" target="_blank">
                            <div className="btn" style={{width: 60, margin: '0 auto', color: '#fff'}}>
                                <span>Download</span>
                            </div>
                        </a>
                    </div>
                </div>
              </div>
          </div>
          : 
            <div style={{minHeight: '50vh', paddingTop: 100, marginBottom: 50}}>
              <div id="login" style={{display: !this.state.formDisplay ? 'block' : 'none', width: '60vw', margin: '0 auto'}}>
                  <h4 style={{fontWeight: 300, fontSize: 28}}>Welcome Back</h4>
                  <hr />
                  <div style={{width: '70%', margin: '0 auto'}}>
                      <div style={{marginBottom: 15}}>
                          <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Email <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                          <input className="reverse" type="email" maxLength={100} name="email" value={this.state.email} onChange={this.onInputChange} required />
                          <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                      </div>
                      <div style={{marginBottom: 15}}>
                          <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Password <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                          <input className="reverse" type="password" maxLength={100} name="password" value={this.state.password} onChange={this.onInputChange} required />
                          <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                      </div>
                      <p style={{marginBottom: 20, textAlign: 'right', fontSize: 13}}><a href="">Forgot Password</a></p>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <button className="btn reverse auto small m-0" onClick={() => this.toggleFormDisplay()}>Register</button>
                          <button className="btn primary auto small m-0" onClick={this.logIn}>Login</button>
                      </div>
                  </div>
              </div>

              <div id="register" style={{display: this.state.formDisplay ? 'block' : 'none',  width: '60vw', margin: '0 auto'}}>
                  <h4 style={{fontWeight: 300, fontSize: 28}}>Welcome to Alfinder</h4>
                  <hr />
                  <div style={{width: '70%', margin: '0 auto'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '47%', marginBottom: 15}}>
                          <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>First Name <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                          <input className="reverse" type="text" maxLength={100} name="fname" required />
                          <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                        </div>
                        <div style={{width: '47%', marginBottom: 15}}>
                          <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Last Name <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                          <input className="reverse" type="text" maxLength={100} name="lname" required />
                          <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                        </div>
                      </div>
                      <div style={{marginBottom: 15}}>
                          <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Email Address<sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                          <input className="reverse" type="email" maxLength={100} name="email" required />
                          <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                      </div>
                      <div style={{marginBottom: 15}}>
                          <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Phone Number<sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                          <input className="reverse" type="text" maxLength={13} name="phone" required />
                          <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                      </div>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '47%', marginBottom: 15}}>
                            <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Password <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                            <input className="reverse" type="password" maxLength={100} name="password" required />
                            <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                        </div>
                          <div style={{width: '47%', marginBottom: 30}}>
                            <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Confirm Password <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                            <input className="reverse" type="password" maxLength={100} name="password_confirmation" required />
                            <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                        </div>
                      </div>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <button className="btn reverse auto small m-0" onClick={() => this.toggleFormDisplay()}>Login</button>
                          <button className="btn auto small m-0" onClick={this.register}>Register</button>
                      </div>
                  </div>
              </div>
            </div>
        }
        </div>
      );
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, {
  authLogin,
  authLogout,
  authRegister,
})(Profile);
