import React from 'react';
import { connect } from 'react-redux';
import { getWishlist, removeFromWishlist, clearWishlist } from '../../../core/actions/wishlist';


import CartProductCard from '../../partials/CartProductCard';

class Wishlist extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.getWishlist();
    }

    removeFromWishlist = id => {
        this.props.removeFromWishlist(id);
    };

    clearWishlist = () => {
        this.props.clearWishlist();
    };

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
                < div className = "messager-display" >
                    <div style={{width: '50%', maxWidth: '500px', textAlign: 'center'}}>
                        <p style={{marginBottom: 15, fontSize: 28, fontWeight: 300}}>Sign In To See Your Wishlist.</p>
                        <p style={{marginBottom: 25}}>Please sign in to your account in order to proceed to your wishlist. If you don't have an account Sign Up for free and enjoy shopping at Alfinder.</p>
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
                            <h4>WishList</h4>
                        </div>
                            <hr />
                        <div className="product-list-display">
                            <CartProductCard item={info} />
                            <CartProductCard item={info} />
                            <CartProductCard item={info} />
                            <CartProductCard item={info} />
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    wishlist: state.wishlistReducer,
    products: state.wishlistReducer.products,
});

export default connect(mapStateToProps, {
    getWishlist,
    clearWishlist,
    removeFromWishlist,
})(Wishlist);
