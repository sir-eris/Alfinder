import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { submitDemo } from '../../../core/actions/message'



class Demo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: '',
            terms: '',
            legal_name: '',
            industry: '',
            focus: '',
            url: '',
            phone: '',
            address: '',
            requirements: '',
            expectations: '',
            fname: '',
            lname: '',
            role: '',
            email: '',
            contact_phone: '',
            note: '',
            term: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value.trim();
        this.setState({[event.target.name]: value});
    }

  handleSubmit = async () => {
  	const { terms, legal_name, industry, focus, url, phone, address, requirements, expectations, fname, lname, role, email, contact_phone, note } = this.state
  	
  	let fields = [terms, legal_name, industry, focus, url, phone, address, requirements, expectations, fname, lname, role, email, contact_phone, note]
  	for (var i = fields.length - 1; i >= 0; i--) {
  		var f = fields[i]
  		if (!f || f === '' || f === null || f === undefined) {
	  		this.setState({
	  			error: 'Please complete all indicated fields.'
	  		})
	  		return
  		}
  	}

  	this.props.submitDemo(
  		legal_name,
  		industry,
  		focus,
  		url,
  		phone,
  		address,
  		requirements,
  		expectations,
  		fname,
  		lname,
  		role,
  		email,
  		contact_phone,
  		note
  	)
  }


    render() {
        if (this.props.isAuthenticated) {
            window.location = '/partners/' + this.props.username
        }
        return (
            <div className="demo-landing">
                <div className="container request">
                    <div className="container-title">
                        <h2>Request Demo</h2>
                        <h1>Fill out the form to take a look at what Alfinder can do.</h1>
                        <h5>This is an Alfinder SmartForm. Explain with as much detail as possible.</h5>
                    </div>
                    {this.props.success ? 
                    	<div style={{height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', fontSize: 22}}>
                    		<p style={{marginBottom: 8}}>Your Request Was Submitted Successfully.</p>
                    		<p>We will contact you to set up your demo.</p>
                    	</div>
                    :
                    <div className="form">
                        <div className="row">
                            <div className="input-container th">
                                <label for="legal_name">Company Name <span>*</span></label>
                                <input type="text" name="legal_name" id="legal_name" className="input" onChange={this.handleInputChange} />
                            </div>
                            <div className="input-container th">
                                <label for="industry">Industry <span>*</span></label>
                                <input type="text" name="industry" id="industry" className="input" onChange={this.handleInputChange} />
                            </div>
                            <div className="input-container th">
                                <label for="focus">Focus <span>*</span></label>
                                <input type="text" name="focus" id="focus" className="input" onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-container th">
                                <label for="url">Website <span>*</span></label>
                                <input type="text" name="url" id="url" className="input" onChange={this.handleInputChange} />
                            </div>
                            <div className="input-container th">
                                <label for="phone">Phone Number <span>*</span></label>
                                <input type="text" name="phone" id="phone" className="input" onChange={this.handleInputChange} />
                            </div>
                            <div className="input-container th">
                                <label for="address">Address <span>*</span></label>
                                <input type="text" name="address" id="address" className="input" onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="row" style={{alignItems: 'stretch'}}>
                            <div className="input-container tw">
                                <label for="requirements">How much do you think market prediction could help your comapny? <span>*</span></label>
                                <textarea type="text" name="requirements" id="requirements" className="input" onChange={this.handleInputChange} />
                            </div>
                            <div className="input-container tw">
                                <label for="expectations">In what areas are you looking to increase productivity and decrease operation costs? <span>*</span></label>
                                <textarea type="text" name="expectations" id="expectations" className="input" onChange={this.handleInputChange} />
                            </div>
                        </div>

                        <p style={{marginBottom: 14, fontSize: 22, fontWeight: 600}}>Contact Person</p>
                        <hr />
                        <div className="row">
                            <div className="input-container th">
                                <label for="fname">First Name <span>*</span></label>
                                <input type="text" name="fname" id="fname" className="input" onChange={this.handleInputChange} />
                            </div>
                            <div className="input-container th">
                                <label for="lname">Last Name <span>*</span></label>
                                <input type="text" name="lname" id="lname" className="input" onChange={this.handleInputChange} />
                            </div>
                             <div className="input-container th">
                                <label for="role">Role <span>*</span></label>
                                <input type="text" name="role" id="role" className="input" onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-container tw">
                                <label for="email">Email Address <span>*</span></label>
                                <input type="text" name="email" id="email" className="input" onChange={this.handleInputChange} />
                            </div>
                            <div className="input-container tw">
                                <label for="contact_phone">Phone Number <span>*</span></label>
                                <input type="text" name="contact_phone" id="contact_phone" className="input" onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-container">
                                <label for="note">Additional Notes</label>
                                <textarea type="text" name="note" id="note" className="input" onChange={this.handleInputChange}></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div style={{marginBottom: 40}}>
                                <input type="checkbox" name="terms" id="terms" className="input" onChange={this.handleInputChange} />
                                <label for="terms">By sumbitting this form you agree to Alfinder Inc.'s' <a href="/terms">Terms & Conditions.</a></label>
                            </div>
                        </div>
                        <div className="input-container">
                        	<p style={{color: 'red'}}>{this.state.error}</p>
                        	<p style={{marginBottom: 27, color: 'red', textAlign: 'center'}}>{this.state.terms}</p>
                            <button type="submit" className="btn" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
	success: state.messageReducer.success,
    username: state.authReducer.username,
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, {
    submitDemo
})(Demo);


