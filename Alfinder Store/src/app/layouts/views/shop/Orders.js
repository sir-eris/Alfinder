import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrders } from '../../../core/actions/order';

import CartProductCard from '../../partials/CartProductCard';

class Orders extends React.Component {
    static propTypes = {
        orders: PropTypes.array.isRequired,
        isAuthenticated: PropTypes.bool,
        getOrders: PropTypes.func.isRequired,
    };

    // componentDidMount() {
    //     this.props.getOrders();
    // }

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
                <div className="page-container">
                    <div className="page-content">
                        <div className="page-headline">
                            <h4>Orders</h4>
                            <p>2 items</p>
                        </div>
                            <hr />
                        <div className="product-list-display">
                            <div className="order-item">
                                order # <br />
                                order status <br />
                                Details <br />
                                products <br />
                                total <br />
                                date <br />
                                payment <br />
                                address <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    orders: state.orderReducer,
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, {
    getOrders,
})(Orders);
