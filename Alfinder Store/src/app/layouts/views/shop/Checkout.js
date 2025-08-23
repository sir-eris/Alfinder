import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { placeOrder } from '../../../core/actions/order';

class Checkout extends React.Component {
    static propTypes = {
        placeOrder: PropTypes.func.isRequired,
    }

    constructor() {
        super();
        this.state = {phone: null, coupon: null, unit: null};
    }

    onInputChange(event) {
        const target = event.target;
        const value = target.name === 'terms' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    placeOrder = state => {
        const {fname, lname, email, phone, street, unit, city, satte, zipcode, country, cardName, cardNumber, expM, expY, cardCode, terms, coupon} = this.state;
        // this.props.placeOrder();
    }

    render() {
        return(
            <div id="container" className="pt-7">
                <form onSubmit={this.placeOrder}>
                    <div style={{display: 'flex', minHeight: '100vh', marginBottom: 40}}>
                        <div style={{width: '65vw'}}>
                            <div style={{width: '80%', margin: '0 auto'}}>
                                <div>
                                    <h6 style={{fontSize: 23, fontWeight: 300, marginBottom: 17}}>Shipping Information</h6>
                                </div>
                                <hr />
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div style={{width: '47%', marginBottom: 15}}>
                                        <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>First Name <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                        <input class="reverse" type="text" maxLength={100} name="fname" required />
                                        <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                                    </div>

                                    <div style={{width: '47%', marginBottom: 15}}>
                                        <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Last Name <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                        <input class="reverse" type="text" maxLength={100} name="lname" required />
                                        <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                                    </div>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div style={{width: '56%', marginBottom: 15}}>
                                        <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Email Address <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                        <input class="reverse" type="email" maxLength={100} name="email" required />
                                        <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                                    </div>
                                    <div style={{width: '38%', marginBottom: 15}}>
                                        <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Phone Number <sup style={{color: 'red', fontSize: 18}}></sup></p>
                                        <input class="reverse" type="text" maxLength={100} name="phone" required />
                                        <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                                    </div>
                                </div>

                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div style={{width: '63%', marginBottom: 15}}>
                                        <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Street Address <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                        <input class="reverse" type="text" maxLength={100} name="street" required />
                                        <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                                    </div>
                                    <div style={{width: '31%', marginBottom: 15}}>
                                        <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Unit/Suite <sup style={{color: 'red', fontSize: 18}}></sup></p>
                                        <input class="reverse" type="text" maxLength={100} name="unit" />
                                        <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                                    </div>
                                </div>

                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div style={{width: '47%', marginBottom: 15}}>
                                        <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>City <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                        <input class="reverse" type="text" maxLength={100} name="city" required />
                                        <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                                    </div>
                                    <div style={{width: '47%', marginBottom: 15}}>
                                        <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>State <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                        <input class="reverse" type="text" maxLength={100} name="state" required />
                                        <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                                    </div>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div style={{width: '47%', marginBottom: 15}}>
                                        <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Zip Code <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                        <input class="reverse" type="text" maxLength={100} name="zipcode" required />
                                        <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                                    </div>
                                    <div style={{width: '47%', marginBottom: 15}}>
                                        <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Country <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                        <input class="reverse" type="text" maxLength={100} name="country" required />
                                        <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                                    </div>
                                </div>
                            </div>
                            <div style={{width: '80%', margin: '0 auto', marginBottom: 30}}>
                                <div>
                                    <h6 style={{fontSize: 23, fontWeight: 300, marginBottom: 17}}>Payment Method</h6>
                                </div>
                                <hr />
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div style={{width: '47%', marginBottom: 15}}>
                                        <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Name on Card <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                        <input class="reverse" type="text" maxLength={100} name="cardName" required />
                                        <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                                    </div>
                                    <div style={{width: '47%', marginBottom: 15}}>
                                        <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Card Number <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                        <input class="reverse" type="text" maxLength={100} name="cardNumber" required />
                                        <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                                    </div>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div style={{width: '28%', marginBottom: 15}}>
                                        <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Exp. Month <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                        <input class="reverse" type="text" maxLength={100} name="expM" required />
                                        <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                                    </div>
                                    <div style={{width: '28%', marginBottom: 15}}>
                                        <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Exp. Year <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                        <input class="reverse" type="text" maxLength={100} name="expY" required />
                                        <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                                    </div>
                                    <div style={{width: '33%', marginBottom: 15}}>
                                        <p style={{color: '#000', marginBottom: 7, fontSize: 14}}>Card Code <sup style={{color: 'red', fontSize: 18}}>*</sup></p>
                                        <input class="reverse" type="text" maxLength={100} name="cardCode" required />
                                        <p style={{color: '#f1f2ff', fontSize: 11, fontWeight: 400}}></p>
                                    </div>
                                </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: 35}}>
                                <button className="btn primary auto">Place Order</button>
                            </div>
                        </div>
                        <div style={{width: '35vw', backgroundColor: '#eee'}}>
                            <div style={{width: '90%', margin: '0 auto'}}>
                                <div>
                                    <h6 style={{fontSize: 23, fontWeight: 300, marginBottom: 17}}>Order Summary</h6>
                                </div>
                                <hr />
                                <div style={{marginBottom: 20}}>products</div>
                                <div style={{width: '90%', margin: '0 auto'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <p>Price</p>
                                        <p>$32.99</p>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <p>Shipping</p>
                                        <p>Free</p>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <p>Tax</p>
                                        <p>$3.99</p>
                                    </div>
                                    <hr />
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <p>Total</p>
                                        <p>$36.98</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cartReducer,
});

export default connect(mapStateToProps, {
    placeOrder,
})(Checkout);
