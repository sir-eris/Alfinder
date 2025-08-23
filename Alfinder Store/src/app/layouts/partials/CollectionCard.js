import React from 'react';

class CollectionCard extends React.Component {
    render() {
        return(
            <div className="product-card" style={{marginBottom: 10}}>
                <a href={"/product/" + this.props.item.product_id}>
                    <div className="product-card-content">
                    <img src={this.props.item.images ? this.props.item.images : this.props.item.image} alt={this.props.item.title + ' - Alfinder Product'} />
                    <div className="info">
                        <p className="title">{this.props.item.title.substring(0, 47)}{this.props.item.title.length > 47 ? '...' : null}</p>
                        <div className="details" style={{marginTop: 1}}>
                        <p className="price">${this.props.item.price}</p>
                        <p className="spec">{this.props.item.size} . {this.props.item.type.substring(0, 7)}{this.props.item.type.length > 7 ? '...' : null}</p>
                        </div>
                        <div className="details" style={{marginTop: 2}}>
                            <div className="brand-name">
                                <span>{this.props.item.brand_name}</span>
                            </div>
                            <p className="rate">{this.props.item.rate} / 5.0</p>
                        </div>
                    </div>
                </div>
                </a>
            </div>
        );
    }
}

export default CollectionCard;
