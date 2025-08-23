import React from 'react'
import { connect } from 'react-redux'


class Home extends React.Component {
    
    render() {
        let status = "OK"
        // status = this.props.status
        let username = "null"
        // username = this.props.username

        if(status && username) {
            return (
                <div id="dashboard">
                    <div className="title">
                        <p>Alfinder Inc. / Dashboard</p>
                    </div>
                    <div className="container actions">
                        {status && status === 'OK' ?
                            <a href={"/partners/" + username + "/submit-analysis"}>
                                <div className="action-item">
                                    <p className="action-item-text">Submit New Analysis</p>
                                </div>
                            </a>
                            :
                            <div className="action-item placeholder">
                                <p className="action-item-text">Submit New Analysis</p>
                            </div>
                        }

                        {status && status === 'OK' ?
                            <a href={"/partners/" + username + "/pending-requests"}>
                                <div className="action-item">
                                    <p className="action-item-text">Pending Requests</p>
                                </div>
                            </a>
                        :
                            <div className="action-item placeholder">
                                <p className="action-item-text">Pending Requests</p>
                            </div>
                        }

                        {status && status === 'OK' ?
                            <a href={"/partners/" + username + "/analysis"}>
                                <div className="action-item">
                                    <p className="action-item-text">Completed Results</p>
                                </div>
                            </a>
                        :
                            <div className="action-item placeholder">
                                <p className="action-item-text">Completed Results</p>
                            </div>
                        }

                        <a href={"/partners/" + username + "/settings"}>
                            <div className="action-item">
                                <p className="action-item-text">Settings & Profiles</p>
                            </div>
                        </a>

                        {status && status === 'OK' ?
                            <a href={"/partners/" + username + "/client/create"}>
                                <div className="action-item">
                                    <p className="action-item-text">Create New Client</p>
                                </div>
                            </a>
                        :
                            <div className="action-item placeholder">
                                <p className="action-item-text">Create New Client</p>
                            </div>
                        }
                        <div className="action-item placeholder">
                            <p className="action-item-text">Custom Quick Action</p>
                        </div>
                        <div className="action-item placeholder">
                            <p className="action-item-text">Custom Quick Action</p>
                        </div>
                        <div className="action-item placeholder">
                            <p className="action-item-text">Custom Quick Action</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <p>Loading...</p>
        }
    }
}

const mapStateToProps = state => ({
    status: state.authReducer.status,
    username: state.authReducer.username,
    isAuthenticated: state.authReducer.isAuthenticated,
})

export default connect(mapStateToProps, {})(Home)