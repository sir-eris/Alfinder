import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { authRegister, authLogin, authTempPass } from '../../../../core/actions/auth'

  class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loginView: false,
            fname: '',
            lname: '',
            email: '',
            phone: '',
            company: '',
            role: '',
            password: '',
            emailError: false,
            passwordError: false,
            registerError: '',
        }
        
        this.handleInputChange = this.handleInputChange.bind(this)
        this.toggleLoginView = this.toggleLoginView.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    
    handleInputChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value.trim()
        this.setState({[event.target.name]: value})
    }

    toggleLoginView = () => {
        this.setState({loginView: !this.state.loginView})
    }
    
    handleLogin = async () => {
        if (this.props.isLoading) {
            return
        }

        if (this.state.email === '') {
            this.setState({
                emailError: true,
                passwordError: false,
            });
            return
        }
        if (this.state.password === '' && this.props.tempPass != null) {
            this.setState({
                emailError: false,
                passwordError: true,
            });
            return
        }
        if (this.state.email !== '' && this.state.password !== '' && this.props.tempPass !== null)  {
            this.setState({
                emailError: false,
                passwordError: false,
            });
        }

        
        if (this.props.tempPass === null && this.props.success !== false) {
            this.props.authTempPass(this.state.email)
        } else {
            this.props.authLogin(this.state.email, this.state.password)
        }
    }

    handleRegister = async () => {
        if (this.props.isLoading) {
            return
        }

        this.setState({registerError: ''})
        const {fname, lname, email, phone, role, company} = this.state
        const fields = [fname, lname, email, phone, role, company]
        for (var i = fields.length - 1; i >= 0; i--) {
            if (!fields[i] || fields[i] === '' || fields[i] === null || fields[i] === undefined) {
                this.setState({
                    registerError: 'Please complete all required fields.'
                })
                return
            }
        }

        this.props.authRegister(fname, lname, email, phone, role, company)
    }

    render() {
        return (
            <div className="App">
                <Helmet>
                    <title>{ this.state.loginView ? 'Login' : 'Register'}  - Alfinder</title>
                    <meta name="”robots”" content="noindex, nofollow" />
                </Helmet>
                {this.state.loginView || (this.props.registerSuccess && this.props.registerSuccess === true) ? 
                    <div style={{display: 'flex', width: '100vw', minHeight: '100vh', minWidth: 1100}}>
                        <div style={{width: '40%', backgroundColor: '#261F3C'}}>
                            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', width: '100%', height: '100vh', minHeight: 500}}>
                                <div style={{paddingRight: 50, paddingLeft: 50, marginBottom: 185}}>
                                    <h1 style={{fontSize: 16, letterSpacing: 5, marginBottom: 12, color: '#555'}}>Partners Login</h1>
                                    <h2 style={{color: '#fff', marginBottom: 30}}>Login to your Dashboard to manage your account. </h2>
                                    <p style={{color: '#fff'}}>Feel free to contact our Tech Support team with your questions.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '60%', paddingBottom: 30, backgroundColor: '#fff'}}>
                        <div style={{width: '40vw',}}>
                            {this.props.success === false ? 
                                <p style={{color: 'red', marginBottom: 20, textAlign: 'center'}}>Check your credentials and try again.</p>
                            :
                            null
                            }
                            {this.props.tempPass !== null ? 
                                <p style={{color: 'green', marginBottom: 20, textAlign: 'center'}}>A temporary password was sent to you email.</p>
                            :
                            null
                            }
                            {this.props.tempPassFail === true ? <p style={{color: 'red', marginBottom: 20, textAlign: 'center'}}>Check your email and try again.</p> : null}
                            <div style={{marginBottom: 15}}>
                                <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Email Address <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                <input type="email" className="reverse" maxLength={100} name="email" value={this.state.email} onChange={this.handleInputChange} required />
                                <p style={{color: '#000', fontSize: 11, fontWeight: 400}}>{this.state.emailError ? 'This field is required.' : ''}</p>
                            </div>
                            <div style={{marginBottom: 45}}>
                                <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Temporary Password <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                {this.props.tempPass !== null || this.props.success === false ?
                                    <input type="password" className="reverse" maxLength={50} name="password" value={this.state.password} onChange={this.handleInputChange} required/>
                                :
                                    <input type="password" className="reverse disabled" maxLength={50} name="password" value={this.state.password} onChange={this.handleInputChange} required disabled/>
                                }
                                <p style={{color: '#000', fontSize: 11, fontWeight: 400}}>{this.state.passwordError ? 'This field is required.' : ''}</p>
                            </div>
                            
                            <p style={{cursor: 'pointer', color: 'blue', fontSize: 14}} onClick={this.toggleLoginView}>{this.state.loginView || (this.props.registerSuccess && this.props.registerSuccess === true) ? 'Create an account' : 'Back to Login'}</p>
                        
                        </div>
                        

                        <div style={{width: '40vw', textAlign: 'center'}}>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                            <button type="submit" className="btn" style={{width: '32%', marginRight: 0}} onClick={this.handleLogin}>{this.props.tempPass !== null || this.props.success === false ? 'Login' : 'Send Temp Password'}</button>
                            </div>
                        </div>
                        </div>
                    </div>
                :
                    <div style={{display: 'flex', width: '100vw', minHeight: '100vh', minWidth: 1100}}>
                        <div style={{width: '40%', backgroundColor: '#261F3C'}}>
                            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', width: '100%', height: '100vh', minHeight: 500}}>
                                <div style={{paddingRight: 50, paddingLeft: 50, marginBottom: 185}}>
                                    <h1 style={{fontSize: 16, letterSpacing: 5, marginBottom: 12, color: '#555'}}>Partners Login</h1>
                                    <h2 style={{color: '#fff', marginBottom: 30}}>Register for a free account and analyze the market before anyone else. </h2>
                                    <p style={{color: '#fff'}}>Feel free to contact our Tech Support team with your questions.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '60%', paddingBottom: 30, backgroundColor: '#fff'}}>
                        <div style={{width: '40vw',}}>
                           <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{marginBottom: 15, width: '45%'}}>
                                    <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>First Name <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                    <input type="text" className="reverse" maxLength={100} name="fname" value={this.state.fname} onChange={this.handleInputChange} required />
                                </div>
                                <div style={{marginBottom: 15, width: '45%'}}>
                                    <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Last Name <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                    <input type="text" className="reverse" maxLength={100} name="lname" value={this.state.lname} onChange={this.handleInputChange} required />
                                </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{marginBottom: 15, width: '45%'}}>
                                    <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Phone Number <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                    <input type="text" className="reverse" maxLength={100} name="phone" value={this.state.phone} onChange={this.handleInputChange} required />
                                </div>
                                <div style={{marginBottom: 15, width: '45%'}}>
                                <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Email Address <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                <input type="email" className="reverse" maxLength={100} name="email" value={this.state.email} onChange={this.handleInputChange} required />
                            </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{marginBottom: 15, width: '45%'}}>
                                    <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Comapny <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                    <input type="text" className="reverse" maxLength={100} name="company" value={this.state.company} onChange={this.handleInputChange} required />
                                </div>
                                <div style={{marginBottom: 15, width: '45%'}}>
                                    <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Role <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                    <input type="text" className="reverse" maxLength={100} name="role" value={this.state.role} onChange={this.handleInputChange} required />
                                </div>
                            </div>
                        <div>
                        
                        <p style={{color: 'red'}}>{this.state.registerError}</p>
                        <p style={{cursor: 'pointer', color: 'blue', fontSize: 14}} onClick={this.toggleLoginView}>{this.state.loginView || (this.props.registerSuccess && this.props.registerSuccess === true) ? 'Create an account' : 'Back to Login'}</p>
                        
                        </div>
                        </div>
                            <div style={{width: '40vw', textAlign: 'center'}}>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <button type="submit" className="btn" style={{width: '32%', marginRight: 0}} onClick={this.handleRegister}>Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoading,
  isAuthenticated: state.authReducer.isAuthenticated,
  username: state.authReducer.username,
  success: state.authReducer.success,
  registerSuccess: state.authReducer.registerSuccess,
  tempPass: state.authReducer.tempPass,
  tempPassFail: state.authReducer.tempPassFail,
  error: state.authReducer.error,
})

export default connect(mapStateToProps, {
  authLogin,
  authRegister,
  authTempPass,
})(Login)
