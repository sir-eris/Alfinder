import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { subscribe } from '../../core/actions/subscribe'

import styles from '../../../style/shop/Footer.module.css'

class Subscribe extends Component {
    static propTypes = {
        subscribe: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        e.preventDefault();
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    subscribe = e => {
        e.preventDefault();
        this.props.subscribe(this.state.subscriberEmail);
    }

    render() {
        return(
            <div id={styles.subscribe}>
                <div style={{maxWidth: 600, width: '90%', margin: '0 auto'}}>
                   <div style={{marginBottom: 30, color: '#fff'}}>
                        <h3 style={{fontSize: 34, fontWeight: 400, textTransform: 'uppercase'}}>Stay In The Know.</h3>
                        <p>Subscribe to get updates about new wellness recipies, products, blogs, and much more.</p>
                   </div>
                   {this.props.subscriber.code !== 7 ? (
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                        <div style={{display: 'flex', flexDirection: 'column', width: '100%', marginRight: 40,}}>
                          <p style={{color: '#fff', marginBottom: 4, fontSize: 14}}>Email <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                          <input type="email" maxLength={100} name="subscriberEmail" onChange={this.onInputChange} style={{color: '#FFF'}} required />
                        </div>
                        {/* <input type="email" name="subscriberEmail" onChange={this.onInputChange} style={{marginRight: 30, color: '#FFF'}} /> */}
                        <button className="btn reverse no-shadow" onClick={this.subscribe} style={{maxWidth: 180, height: 41}}>Subscribe</button>
                    </div>
                   ) : (
                       <div style={{display: 'flex'}}>
                            <p style={{color: '#fff', fontSize: 18}}>{this.props.subscriber.message}</p>
                        </div>
                   )}
                </div>
            </div>
        );
    }
}

const mapStateToProp = state => ({
    subscriber: state.subscriberReducer
});

export default connect(mapStateToProp, {
    subscribe,
})(Subscribe);
