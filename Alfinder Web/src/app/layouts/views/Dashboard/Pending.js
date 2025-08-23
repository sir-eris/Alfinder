import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPendingRequests } from '../../../core/actions/request'


class Pending extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.getPendingRequests()
    }

    render() {
        if (this.props.requests != null) {
            const requests = JSON.parse(this.props.requests)
            if (requests.length > 0) {
                return (
                    <div id="dashboard">
                        <div className="title">
                            <p>Alfinder Inc. / Dashboard / Pending Requests</p>
                        </div>

                        {requests.map(req => 
                        <div className="container pendings">
                            <div className="row">
                                <div className="pending-item">
                                    <h6>Status</h6>
                                    <p>{req.fields.status}</p>
                                </div>
                                <div className="pending-item">
                                    <h6>Submitted On</h6>
                                    <p>{req.fields.meta.created_at}</p>
                                </div>
                                <div className="pending-item">
                                    <h6>Expected Completion</h6>
                                    {/* <p>{req.fields.meta.expected_completion}</p> */}
                                    <p>3 - 5 days</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="pending-item">
                                    <h6>Client</h6>
                                    <p>{req.fields.client}</p>
                                </div>
                                <div className="pending-item">
                                    <h6>Analysis Type</h6>
                                    <p>{req.fields.analysisA}</p>
                                </div>
                                <div className="pending-item">
                                    <h6>Analysis Type</h6>
                                    <p>{req.fields.analysisB}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="pending-item">
                                    <h6>Current Average Monthly Expenditure</h6>
                                    <p>{req.fields.expenditures}</p>
                                </div>
                                <div className="pending-item">
                                    <h6>Current Average Monthly Return</h6>
                                    <p>{req.fields.returns}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="pending-item">
                                    <h6>Requirement(s)</h6>
                                    <p>{req.fields.requirements}</p>
                                </div>
                                <div className="pending-item">
                                    <h6>Expectation(s)</h6>
                                    <p>{req.fields.expectations}</p>
                                </div>
                            </div>
                            <div className="row">
                                 <div className="pending-item">
                                    <h6>Who is the market/audience your client is currently targeting?</h6>
                                    <p>{req.fields.current_target}</p>
                                </div>
                                <div className="pending-item">
                                    <h6>Describe any information, data, specific details or statistics that you currently have about your client.</h6>
                                    <p>{req.fields.description}</p>
                                </div>
                                <div className="pending-item">
                                    <h6>Explain what is your goal and what specific sort of result and analysis is going to help you achieve your goals for your client.</h6>
                                    <p>{req.fields.goal}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="pending-item">
                                    <h6>Notes</h6>
                                    <p>{req.fields.note}</p>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                )
            } else {
                return (
                    <div className="empty-container">
                        <p>No Pending Requests.</p>
                    </div>
                )
            }
        } else {
            return (
                <div className="empty-container">
                    <p>No Pending Requests.</p>
                </div>
            )
        }
    }
}


const mapStateToProps = state => ({
    requests: state.requestReducer.requests,
    username: state.authReducer.username,
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, {
    getPendingRequests
})(Pending);

