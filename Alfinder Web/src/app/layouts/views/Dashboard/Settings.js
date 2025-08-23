import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    getInfo,
    updateInfo,
    updateAdmin,
    updateBilling,
} from '../../../core/actions/settings'


class Settings extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            phone: '',
            url: '',
            size: '',
            years: '',
            focus: '',
            address: '',
            industry: '',
            infoError: '',

            contact_role: '',
            contact_email: '',
            contact_phone: '',
            adminError: '',

            billing_plan: '',
            billing_acc_type: '',
            billing_acc_number: '',
            billing_rt_number: '',
            billing_bank: '',
            billing_zipcode: '',
            billing_acc_name: '',
            billingError: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        
        this.updateInfo = this.updateInfo.bind(this)
        this.updateAdmin = this.updateAdmin.bind(this)
        this.updateBilling = this.updateBilling.bind(this)
    }

    componentDidMount() {
        this.props.getInfo()
    }

    handleInputChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value.trim();
        this.setState({[event.target.name]: value});
    }

    updateInfo = async () => {
        this.setState({infoError: ''})
        const {phone, url, size, years, focus, address, industry} = this.state
        const fields = [phone, url, size, years, focus, address, industry]
        for (var i = fields.length - 1; i >= 0; i--) {
            if (!fields[i] || fields[i] === '' || fields[i] === null || fields[i] === undefined) {
                this.setState({
                    infoError: 'Please complete all required fields.'
                })
                return
            }
        }

        this.props.updateInfo(phone, url, size, years, focus, address, industry)
    }

    updateAdmin = async () => {
        this.setState({adminError: ''})
        const {contact_role, contact_phone} = this.state
        const fields = [contact_role, contact_phone]
        for (var i = fields.length - 1; i >= 0; i--) {
            if (!fields[i] || fields[i] === '' || fields[i] === null || fields[i] === undefined) {
                this.setState({
                    adminError: 'Please complete all required fields.'
                })
                return
            }
        }

        this.props.updateAdmin(
            contact_role, contact_phone
        )
    }

    updateBilling = async () => {
        this.setState({billingError: ''})
        const {billing_plan, billing_acc_type, billing_acc_number, billing_rt_number, billing_bank, billing_zipcode, billing_acc_name} = this.state
        const fields = [billing_plan, billing_acc_type, billing_acc_number, billing_rt_number, billing_bank, billing_zipcode, billing_acc_name]
        for (var i = fields.length - 1; i >= 0; i--) {
            if (!fields[i] || fields[i] === '' || fields[i] === null || fields[i] === undefined) {
                this.setState({
                    billingError: 'Please complete all required fields.'
                })
                return
            }
        }
        this.props.updateBilling(billing_plan, billing_acc_type, billing_acc_number, billing_rt_number, billing_bank, billing_zipcode, billing_acc_name)
    }


    render() {
        if (this.props.settings) {
            const entity = JSON.parse(this.props.settings.entity)[0]
            const admin = JSON.parse(this.props.settings.admin)[0]
            const billing = JSON.parse(this.props.settings.billing)[0]
            if(entity && admin && billing) {
                return (
                    <div id="dashboard">
                        <div className="title">
                            <p>Alfinder Inc. / Dashboard / Settings & Profiles</p>
                        </div>

                        <div className="container request">
                            <div className="container-title">
                                <h5>Review settings and make changes.</h5>
                                <p style={{marginBottom: 20}}>Here you can make changes to your compnay information, manage admins, and view your billing information.</p>
                                {this.props.success === true ? <p style={{color: 'green'}}>Information successfully updated.</p> : null}
                            </div>
                            <div className="form">
                                <p style={{marginBottom: 14, fontSize: 22, fontWeight: 600}}>Company Information</p>
                                <hr />

                                <div className="row">
                                    <div className="input-container th">
                                        <label for="legal_name">Legal Name</label>
                                        <input type="text" name="legal_name" id="legal_name" className="input" value={entity.fields.legal_name} disabled />
                                    </div>
                                    <div className="input-container th">
                                        <label for="username">Username</label>
                                        <input type="text" name="username" id="username" className="input" value={entity.fields.username} disabled />
                                    </div>
                                    <div className="input-container th">
                                        <label for="phone">Phone Number</label>
                                        <input type="text" name="phone" id="phone" className="input" defaultValue={entity.fields.phone} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="input-container th">
                                        <label for="url">Official Website</label>
                                        <input type="text" name="url" id="url" className="input" defaultValue={entity.fields.url} onChange={this.handleInputChange} />
                                    </div>
                                    <div className="input-container th">
                                        <label for="industry">Industry</label>
                                        <input type="text" name="industry" id="industry" className="input" defaultValue={entity.fields.industry} onChange={this.handleInputChange} />
                                    </div>
                                     <div className="input-container th">
                                        <label for="size">Compnay Size</label>
                                        <input type="text" name="size" id="size" className="input" defaultValue={entity.fields.size} onChange={this.handleInputChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-container th">
                                        <label for="focus">Work Focus</label>
                                        <input type="text" name="focus" id="focus" className="input" defaultValue={entity.fields.focus} onChange={this.handleInputChange} />
                                    </div>
                                    <div className="input-container th">
                                        <label for="revenue">Revenue</label>
                                        <input type="text" name="revenue" id="revenue" className="input" defaultValue={entity.fields.revenue} onChange={this.handleInputChange} />
                                    </div>
                                     <div className="input-container th">
                                        <label for="years">Years In Business</label>
                                        <input type="text" name="years" id="years" className="input" defaultValue={entity.fields.years} onChange={this.handleInputChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-container">
                                        <label for="address">Address</label>
                                        <input type="text" name="address" id="address" className="input" defaultValue={entity.fields.address} onChange={this.handleInputChange} />
                                    </div>
                                </div>

                                <p style={{color: 'red'}}>{this.state.infoError}</p>

                                <div className="input-container">
                                    <button type="submit" className="btn" style={{margin: '0 0 0 auto'}} onClick={this.updateInfo}>Update Company Information</button>
                                </div>
                                

                                <p style={{marginBottom: 14, fontSize: 22, fontWeight: 600}}>Admins</p>
                                <hr />

                                <div className="row">
                                    <div className="input-container th">
                                        <label for="contact_fname">First Name</label>
                                        <input type="text" name="contact_fname" id="contact_fname" className="input" value={admin.fields.f_name} disabled />
                                    </div>
                                    <div className="input-container th">
                                        <label for="contact_lname">Last Name</label>
                                        <input type="text" name="contact_lname" id="contact_lname" className="input" value={admin.fields.l_name} disabled />
                                    </div>
                                    <div className="input-container th">
                                        <label for="contact_email">Email Address</label>
                                        <input type="text" name="contact_email" id="contact_email" className="input" value={admin.fields.email} disabled />
                                    </div>
                                </div>
                                <div className="row">
                                     <div className="input-container th">
                                        <label for="contact_role">Role</label>
                                        <input type="text" name="contact_role" id="contact_role" className="input" defaultValue={admin.fields.role} onChange={this.handleInputChange} />
                                    </div>
                                    <div className="input-container th">
                                        <label for="contact_phone">Phone</label>
                                        <input type="text" name="contact_phone" id="contact_phone" className="input" defaultValue={admin.fields.phone} onChange={this.handleInputChange} />
                                    </div>
                                     <div className="input-container th">
                                        <label for="contact_status">Status</label>
                                        <input type="text" name="contact_status" id="contact_status" className="input" value={admin.fields.status} disabled />
                                    </div>
                                </div>

                                <p style={{color: 'red'}}>{this.state.adminError}</p>

                                <div className="input-container">
                                    <button type="submit" className="btn" style={{margin: '0 0 0 auto'}} onClick={this.updateAdmin}>Update Admin</button>
                                </div>

                                <p style={{marginBottom: 14, fontSize: 22, fontWeight: 600}}>Billing & Payment</p>
                                <hr />

                                {billing.fields.status !== 'OK' ?
                                    <div>
                                        <div className="row">
                                            <div className="input-container">
                                                <label for="billing_plan">Plan</label>
                                                <select type="text" name="billing_plan" id="billing_plan" className="input" onChange={this.handleInputChange}>
                                                    <option value="">select</option>
                                                    <option value="$250 / Analysis  - Billed Monthly">$250 / Analysis  - Billed Monthly</option>
                                                    <option value="$7,500 / Month - Unlimited Analysis - Cancel anytime">$7,500 / Month - Unlimited Analysis - Cancel anytime</option>
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-container th">
                                                <label for="billing_acc_type">Account Type</label>
                                                <select type="text" name="billing_acc_type" id="billing_acc_type" className="input" onChange={this.handleInputChange}>
                                                    <option value="">select</option>
                                                    <option value="checking">Checking</option>
                                                    <option value="savings">Savings</option>
                                                </select>
                                            </div>
                                            <div className="input-container th">
                                                <label for="billing_acc_number">Account Number</label>
                                                <input type="text" name="billing_acc_number" id="billing_acc_number" className="input" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="input-container th">
                                                <label for="billing_rt_number">Routing Number</label>
                                                <input type="text" name="billing_rt_number" id="billing_rt_number" className="input" onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-container th">
                                                <label for="billing_bank">Bank Name</label>
                                                <input type="text" name="billing_bank" id="billing_bank" className="input" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="input-container th">
                                                <label for="billing_zipcode">Zip Code</label>
                                                <input type="text" name="billing_zipcode" id="billing_zipcode" className="input" onChange={this.handleInputChange} />
                                            </div>
                                            <div className="input-container th">
                                                <label for="billing_acc_name">Name on Account</label>
                                                <input type="text" name="billing_acc_name" id="billing_acc_name" className="input" onChange={this.handleInputChange} />
                                            </div>
                                        </div>

                                        <p style={{color: 'red'}}>{this.state.billingError}</p>

                                        <div className="input-container">
                                            <button type="submit" className="btn" style={{margin: '0 0 0 auto'}} onClick={this.updateBilling}>Update Plan & Payment</button>
                                        </div>
                                    </div>

                                :
                                    <div className="row">
                                        <div className="input-container tw">
                                                <label for="">Plan</label>
                                                <select type="text" name="" id="" className="input" disabled>
                                                    <option value="">{billing.fields.plan}</option>
                                                </select>
                                            </div>
                                            <div className="input-container tw">
                                                <label for="">Account</label>
                                                <select type="text" name="" id="" className="input" disabled>
                                                    <option value="">{billing.fields.account_type} - {billing.fields.account_number}</option>
                                                </select>
                                            </div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                )
            } else {
                return <p>Loading...</p>
            }
        } else {
            return <p>Loading Error</p>
        }
    }
}


const mapStateToProps = state => ({
    success: state.settingsReducer.success,
    settings: state.settingsReducer.settings,
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, {
    getInfo,
    updateInfo,
    updateAdmin,
    updateBilling,
})(Settings);


