import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCart, removeFromCart, clearCart, updateCart } from '../../../core/actions/cart'

import CartProductCard from '../../partials/CartProductCard'

import styles from '../../../../style/shop/Cart.module.css'

class Cart extends React.Component {
    static propTypes = {
        cart: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        getCart: PropTypes.func.isRequired,
        // removeFromCart: PropTypes.func,
        // clearCart: PropTypes.func,
        // updateCart: PropTypes.func,
    };

    componentDidMount() {
        // this.props.getCart();
    }

    render() {
        let info = {
            "product_id": "P_93874593876463",
            "title": "Dolore laboris ex ex cupidatat.",
            "type": "OIL",
            "brand_name": "JOY ORGAICS",
            "price": "32.99",
            "rate": "4.8",
            "size": "60 ct",
            "images": "https://premiumjane.com/wp-content/uploads/2019/03/Capsules-min.jpg"
        }
        
        return(
            <div id="container">
                {!this.props.isAuthenticated ?
                <div className="messager-display">
                    <div style={{width: '50%', maxWidth: '500px', textAlign: 'center'}}>
                        <p style={{marginBottom: 15, fontSize: 28, fontWeight: 300}}>Sign In To See Your Cart.</p>
                        <p style={{marginBottom: 25}}>Please sign in to your account in order to proceed to your cart. If you don't have an account <a href="">Sign Up</a> for free and enjoy shopping at Alfinder.</p>
                        <a href="/profile">
                            <div className="btn" style={{width: 60, margin: '0 auto', color: '#fff'}}>
                                <span>Sign In</span>
                            </div>
                        </a>
                    </div>
                </div>
                : 
                <div className="page-container">
                    <div className="page-content">
                        <div className="page-headline">
                            <h4>CART</h4>
                            <p>2 items</p>
                        </div>
                            <hr />
                        <div className={styles.productListDisplay}>
                            <CartProductCard item={info} />
                            <CartProductCard item={info} />
                            <CartProductCard item={info} />
                            <CartProductCard item={info} />
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <a href="/" className="btn" style={{width: 'auto', textTransform: 'capitalize'}}>countinue shipping</a>
                            <a href="/checkout" className="btn primary" style={{width: 'auto', textTransform: 'capitalize'}}>proceed to checkout</a>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cartReducer,
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, {
    getCart,
    // removeFromCart,
    // clearCart,
    // updateCart,
})(Cart);
