import React from 'react';

class WishlistProductCard extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        if(typeof(this.props.item) === 'object') {
        return(
            <div className="product-card">
                <div className="product-card-content">
                    <a href={"/product/" + this.props.item.product_id}>
                        <img src={this.props.item.image ? this.props.item.image : this.props.item.images} alt={this.props.item.title + ' - Alfinder Product'} />
                    </a>
                    <div className="info">
                    <p className="title">{this.props.item.title.substring(0, 22)}{this.props.item.title.length > 22 ? '...' : null}</p>
                        <div className="details">
                        <p className="price"><span style={{color: '#555', fontSize: 12}}>PRICE</span> ${this.props.item.price}</p>
                        <p className="spec">{this.props.item.size} . {this.props.item.type.substring(0, 7)}{this.props.item.type.length > 7 ? '...' : null}</p>
                        </div>
                        <div className="details">
                            <a href="">
                                <p className="remove">remove</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
     } else { return null; }
    }
}

export default WishlistProductCard;
