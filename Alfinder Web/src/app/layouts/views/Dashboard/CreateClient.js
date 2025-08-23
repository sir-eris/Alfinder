import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createClient } from '../../../core/actions/client'


class CreateClient extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: '',
            name: '',
            address: '',
            website: '',
            phone: '',
            industry: '',
            size: '',
            revenue: '',
            is_physical: false,
            terms: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value.trim();
        this.setState({[event.target.name]: value});
    }

  handleSubmit = async () => {
    const {
        name,
        address,
        website,
        phone,
        industry,
        size,
        revenue,
        is_physical,
        terms,
    } = this.state

    const fields = [
        name,
        address,
        website,
        phone,
        industry,
        size,
        revenue,
        terms,
    ]

    for (var i = fields.length - 1; i >= 0; i--) {
        if (!fields[i] || fields[i] === '' || fields[i] === null || fields[i] === undefined) {
            this.setState({
                error: 'Please Complete All Required Fields Before Submitting A New Request.'
            })
            return
        }
    }

    this.props.createClient(
        name,
        address,
        website,
        phone,
        industry,
        size,
        revenue,
        is_physical,
    )
  }


    render() {
        return (
            <div id="dashboard">
                <div className="title">
                    <p>Alfinder Inc. / Dashboard / Add New Client</p>
                </div>

                {this.props.success ? 
                        <div style={{height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', fontSize: 22}}>
                            <p style={{marginBottom: 8}}>Client Created Successfully.</p>
                        </div>
                    :

                <div className="container request">
                    <div className="container-title">
                        <h5>Please fill out the form below.</h5>
                    </div>
                    <div className="form">
                        <div className="row">
                            <div className="input-container th">
                                <label for="name">Company Name <span>*</span></label>
                                <input type="text" name="name" id="name" className="input" onChange={this.handleInputChange} />
                            </div>
                            <div className="input-container th">
                                <label for="website">Website <span>*</span></label>
                                <input type="text" name="website" id="website" className="input" onChange={this.handleInputChange} />
                            </div>
                            <div className="input-container th">
                                <label for="phone">Phone Number <span>*</span></label>
                                <input type="text" name="phone" id="phone" className="input" onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="row">
                        <div className="input-container th">
                                <label for="industry">Industry <span>*</span></label>
                                <select type="text" name="industry" id="industry" className="input" onChange={this.handleInputChange} >
                                    <option value="">seelct</option>
                                    <option value="Education">Education</option>
                                    <option value="E-commerce">E-commerce</option>
                                    <option value="Software">Software</option>
                                    <option value="Hardware">Hardware</option>
                                    <option value="Real Estate">Real Estate</option>
                                    <option value="AI/ML">AI/ML</option>
                                    <option value="Food & Beverage">Food & Beverage</option>
                                    <option value="Consulting">Consulting</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="input-container th">
                                <label for="revenue">Revenue(USD) <span>*</span></label>
                                <select type="text" name="revenue" id="revenue" className="input" onChange={this.handleInputChange}>
                                    <option value="">select</option>
                                    <option value="< $500k">{"< $500k"}</option>
                                    <option value="$500k - $1mil">$500k - $1mil</option>
                                    <option value="$1mil - $3.5mil">$1mil - $3.5mil</option>
                                    <option value="$3.5mil - $5mil">$3.5mil - $5mil</option>
                                    <option value="$5mil - $8mil">$5mil - $8mil</option>
                                    <option value="$8mil - $15mil">$8mil - $15mil</option>
                                    <option value="> $15mil">{"> $15mil"}</option>
                                </select>
                            </div>
                            <div className="input-container th">
                                <label for="size">Size <span>*</span></label>
                                <select type="text" name="size" id="size" className="input" onChange={this.handleInputChange} >
                                    <option value="">select</option>
                                    <option value="< 5">{"< 5"}</option>
                                    <option value="5 - 10">5 - 10</option>
                                    <option value="10 - 25">10 - 25</option>
                                    <option value="25 - 40">25 - 40</option>
                                    <option value="40 - 65">40 - 65</option>
                                    <option value="65 - 90">65 - 90</option>
                                    <option value="> 90">{"> 90"}</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-container">
                                <label for="address">Address <span>*</span></label>
                                <input type="text" name="address" id="address" className="input" onChange={this.handleInputChange} />
                            </div>
                        </div>
                         <div className="row">
                            <div style={{marginBottom: 40}}>
                                <input type="checkbox" name="terms" id="terms" className="input" onChange={this.handleInputChange} />
                                <label for="terms">By sumbitting this form you agree to Alfinder Inc.'s' <a href="/terms">Terms & Conditions.</a></label>
                            </div>
                        </div>
                        <p style={{color: 'red', marginBottom: 40}}>{this.state.error}</p>
                        <div className="input-container">
                            <button type="submit" className="btn" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    success: state.clientReducer.success,
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, {
    createClient
})(CreateClient);


