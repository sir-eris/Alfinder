import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { submitRequest } from '../../../core/actions/request'
import { getClients } from '../../../core/actions/client'


class Request extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: '',
            client: '',
            analysisA: '',
            analysisB: '',
            expenditure: '',
            returns: '',
            requirements: '',
            expectations: '',
            current_target: '',
            description: '',
            goal: '',
            note: '',
            terms: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value.trim();
        this.setState({[event.target.name]: value});
    }

    componentDidMount() {
        this.props.getClients()
    }

  handleSubmit = async () => {
    const {
        client,
        analysisA,
        analysisB,
        expenditure,
        returns,
        requirements,
        expectations,
        current_target,
        description,
        goal,
        note,
        terms,
    } = this.state

    const fields = [
        client,
        analysisA,
        expenditure,
        returns,
        requirements,
        expectations,
        current_target,
        description,
        goal,
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

    this.props.submitRequest(
        client,
        analysisA,
        analysisB,
        expenditure,
        returns,
        requirements,
        expectations,
        current_target,
        description,
        goal,
        note
    )
  }


    render() {
        let clients = null
        if (this.props.clients) {
            clients = JSON.parse(this.props.clients)
        }
        return (
            <div id="dashboard">
                <div className="title">
                    <p>Alfinder Inc. / Dashboard / Submit New Analysis</p>
                </div>

                {clients !== null && clients.length > 0 ? 
                    this.props.success ? 
                        <div style={{height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', fontSize: 22}}>
                            <p style={{marginBottom: 8}}>Request Submitted Successfully.</p>
                        </div>
                    :

                    <div className="container request">
                        <div className="container-title">
                            <h5>Please fill out the form below.</h5>
                            <p>This is an Alfinder SmartForm. Explain with as much detail as possible.</p>
                        </div>
                        <div className="form">
                            <div className="row">
                                <div className="input-container th">
                                    <label for="client">Client <span>*</span></label>
                                    <select type="text" name="client" id="client" className="input" onChange={this.handleInputChange} >
                                        <option value=""> {clients === null ? 'loading' : 'select'}</option>
                                        {clients !== null ? clients.map(client => 
                                            <option value={client.pk}>{client.fields.name}</option>
                                        ) : null}
                                    </select>
                                </div>
                                <div className="input-container th">
                                    <label for="analysisA">Analysis Type<span>*</span></label>
                                    <select type="text" name="analysisA" id="analysisA" className="input" onChange={this.handleInputChange} >
                                        <option value="">seelct</option>
                                        <option value="audience-studying">Audience Studying</option>
                                        <option value="target-market-analysis">Target Market Analysis</option>
                                        <option value="market-retargeting">Market Retargeting</option>
                                        <option value="interactive-recognition">Interactive Recognition</option>
                                        <option value="peer-to-peer">Peer-to-Peer Analysis</option>
                                    </select>
                                </div>
                                <div className="input-container th">
                                    <label for="analysisB">Analysis Type</label>
                                    <select type="text" name="analysisB" id="analysisB" className="input" onChange={this.handleInputChange} >
                                        <option value="">seelct</option>
                                        <option value="audience-studying">Audience Studying</option>
                                        <option value="target-market-analysis">Target Market Analysis</option>
                                        <option value="market-retargeting">Market Retargeting</option>
                                        <option value="interactive-recognition">Interactive Recognition</option>
                                        <option value="peer-to-peer">Peer-to-Peer Analysis</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-container tw">
                                    <label for="expenditure">Current Average Monthly Expenditure <span>*</span></label>
                                    <select type="text" name="expenditure" id="expenditure" className="input" onChange={this.handleInputChange}>
                                        <option value="">select</option>
                                        <option value="10">{"< $10,000"}</option>
                                        <option value="25">$10,000 - $25,000</option>
                                        <option value="50">$25,000 - $50,000</option>
                                        <option value="80">$50,000 - $80,000</option>
                                        <option value="110">$80,000 - $110,000</option>
                                        <option value="+">{"> $110,000"}</option>
                                    </select>
                                </div>
                                <div className="input-container tw">
                                    <label for="returns">Currenst Average Monthly Return <span>*</span></label>
                                    <select type="text" name="returns" id="returns" className="input" onChange={this.handleInputChange} >
                                        <option value="">select</option>
                                        <option value="10">{"< 10%"}</option>
                                        <option value="25">10% - 15%</option>
                                        <option value="30">15% - 30%</option>
                                        <option value="45">30% - 45%</option>
                                        <option value="65">45% - 65%</option>
                                        <option value="80">65% - 80%</option>
                                        <option value="+">{"> 80%"}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-container">
                                    <label for="requirements">Requirement(s) <span>*</span></label>
                                    <input type="text" name="requirements" id="requirements" className="input" onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-container">
                                    <label for="expectations">Expectation(s) <span>*</span></label>
                                    <input type="text" name="expectations" id="expectations" className="input" onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-container">
                                    <label for="current_target">Who is the market/audience your client is currently targeting? <span>*</span></label>
                                    <textarea type="text" name="current_target" id="current_target" className="input" onChange={this.handleInputChange}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-container">
                                    <label for="description">Describe any information, data, specific details or statistics that you currently have about your client. <span>*</span></label>
                                    <textarea type="text" name="description" id="description" className="input" onChange={this.handleInputChange}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-container">
                                    <label for="goal">Explain what is your goal and what specific sort of result and analysis is going to help you achieve your goals for your client. <span>*</span></label>
                                    <textarea type="text" name="goal" id="goal" className="input" onChange={this.handleInputChange}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-container">
                                    <label for="note">Notes</label>
                                    <textarea type="text" name="note" id="note" className="input" onChange={this.handleInputChange}></textarea>
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
                
                : <div style={{height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', fontSize: 22}}>
                        <a href={'/partners/' + this.props.username + '/client/create'} className="btn" style={{fontSize: 16}}>Create your first client</a>
                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    clients: state.clientReducer.clients,
    success: state.requestReducer.success,
    username: state.authReducer.username,
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, {
    getClients,
    submitRequest
})(Request);


