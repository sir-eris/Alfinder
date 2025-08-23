import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAnalysis } from '../../../core/actions/request'
// import Chart from 'chart.js/auto'

import Page404 from '../../errors/404'


class Result extends React.Component {
    constructor() {
        super()

        this.chart1 = React.createRef()
        this.chart2 = React.createRef()
        this.chart3 = React.createRef()
    }

    componentDidMount() {
        let path = window.location.href.split('/')
        let request_id = path[path.length-1]

        this.props.getAnalysis(request_id)
    }

    componentDidUpdate() {
        // var ctx1 = this.chart1.current
        // var chart1 = new Chart(ctx1, {
        //     data: {
        //       labels: [1, 2, 3, 4, 5, 6],
        //       datasets: [{
        //         type: 'bar',
        //         label: 'Current Dataset',
        //         data: [59, 80, 81, 56, 55, 40],
        //         fill: false,
        //         backgroundColor: 'rgba(0, 255, 0, 0.2)',
        //         borderColor: 'rgba(0, 255, 0, 0.7)',
        //         borderWidth: 1,
        //       },{
        //         type: 'line',
        //         label: 'Expanded Dataset',
        //         data: [27, 33, 40, 68, 65, 79],
        //         borderColor: 'red',
        //         tension: 0.2,
        //         fill: {
        //             target: 'origin',
        //             above: 'rgb(255, 0, 0)',   // Area will be red above the origin
        //             below: 'rgb(0, 0, 255)'    // And blue below the origin
        //         },
        //       }]
        //     },
        //     options: {
        //         responsive: true,
        //         maintainAspectRatio: false,
        //         layout: {
        //             padding: {
        //                 top: 10,
        //             }
        //         },
        //         scales: {
        //             y: {
        //                 beginAtZero: true
        //             }
        //         }
        //     }
        // })

        // var ctx2 = this.chart2.current
        // var chart2 = new Chart(ctx2, {
        //     type: 'line',
        //     data: {
        //       labels: [1, 2, 3, 4, 5, 6],
        //       datasets: [{
        //         label: 'Female - Extended',
        //         data: [43, 64, 69, 78, 65, 89],
        //         fill: false,
        //         borderColor: 'red',
        //         tension: 0.2,
        //       },{
        //         label: 'Male - Extended',
        //         data: [82, 39, 56, 45, 49, 50],
        //         fill: false,
        //         borderColor: 'blue',
        //         tension: 0.2,
        //       }]
        //     },
        //     options: {
        //         responsive: true,
        //         maintainAspectRatio: false,
        //         layout: {
        //             padding: {
        //                 top: 10,
        //             }
        //         },
        //         scales: {
        //             y: {
        //                 beginAtZero: false
        //             }
        //         }
        //     }
        // })

        // var ctx3 = this.chart3.current
        // var chart3 = new Chart(ctx3, {
        //     type: 'radar',
        //     data: {
        //       labels: [
        //         '15',
        //         '20',
        //         '25',
        //         '30',
        //         '35',
        //         '40',
        //         '45'
        //       ],
        //       datasets: [{
        //         label: 'Current',
        //         data: [65, 59, 90, 81, 56, 55, 40],
        //         fill: true,
        //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
        //         borderColor: 'rgb(255, 99, 132)',
        //         pointBackgroundColor: 'rgb(255, 99, 132)',
        //         pointBorderColor: '#fff',
        //         pointHoverBackgroundColor: '#fff',
        //         pointHoverBorderColor: 'rgb(255, 99, 132)'
        //       }, {
        //         label: 'Extension',
        //         data: [93, 87, 40, 19, 76, 27, 40],
        //         fill: true,
        //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
        //         borderColor: 'rgb(54, 162, 235)',
        //         pointBackgroundColor: 'rgb(54, 162, 235)',
        //         pointBorderColor: '#fff',
        //         pointHoverBackgroundColor: '#fff',
        //         pointHoverBorderColor: 'rgb(54, 162, 235)'
        //       }]
        //     },
        //     options: {
        //         responsive: true,
        //         maintainAspectRatio: false,
        //         elements: {
        //           line: {
        //             borderWidth: 3
        //           }
        //         },
        //         layout: {
        //             padding: {
        //                 top: 10,
        //             }
        //         },
        //     }
        // })
    }

    render() {
        if (this.props.request != null) {
            const req = JSON.parse(this.props.request)[0]
            const analysis = JSON.parse(this.props.analysis)[0]
            if (req && analysis) {
                return (
                    <div id="dashboard">
                        <div className="title">
                            <p>Alfinder Inc. / Dashboard / Request Analysis / {req.pk}</p>
                        </div>

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
                            
                            <div className="results">
                                <div className="result-item">
                                    <h6>Results</h6>
                                    <div className="details">
                                        {Object.entries(analysis.fields.results.params).map(i => <p>{i[0]}: {i[1]}</p>)}
                                    </div>
                                    <div className="analysis">
                                        <p style={{fontSize: 18, fontWeight: 600, marginBottom: 4}}>Summary</p>
                                        <p className="summary">{analysis.fields.results.summary}</p>
                                        <div className="graphs">
                                            <div className="chart-container">
                                                <p>Market outreach percentage based on expenditure and current audience analysis. </p>
                                                <canvas ref={this.chart1}></canvas>
                                            </div>
                                            <div className="chart-container">
                                                <p>Next 6 month projections after extending target market to already defined measures.</p>
                                                <canvas ref={this.chart2}></canvas>
                                            </div>
                                            <div className="chart-container">
                                                <p>Per measurements with accordance to the pool, the extension of the dataset to the already defined specifications suggests great influence on the market and performance of the marketing activities.</p>
                                                <canvas ref={this.chart3}></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return <p>Loading...</p>
            }
        } else {
            return <Page404 />
        }
    }
}


const mapStateToProps = state => ({
    analysis: state.requestReducer.analysis,
    request: state.requestReducer.request,
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, {
    getAnalysis
})(Result);

