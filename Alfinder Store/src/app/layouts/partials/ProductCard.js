import React from 'react'

import styles from '../../../style/shop/ProductCard.module.css'

class ProductCard extends React.Component {
    render() {
        if(typeof(this.props.item) === 'object') {
        return(
            <div className={styles.productCard}>
                <a href={"/product/" + this.props.item.product_id}>
                    <div className={styles.productCardContent}>
                    <img src={this.props.item.image ? this.props.item.image : this.props.item.images} alt={this.props.item.title + ' - Alfinder Product'} />
                    <div className={styles.info}>
                        <p className={styles.title}>{this.props.item.title.slice(0, 39)}{this.props.item.title.length > 39 ? '...' : null}</p>
                        <div className={styles.details}>
                            <p className={styles.price}>${this.props.item.price}</p>
                            <p className={styles.spec}>{this.props.item.size} . {this.props.item.type.substring(0, 7)}{this.props.item.type.length > 7 ? '...' : null}</p>
                        </div>
                        <div className={styles.details} style={{marginTop: 6}}>
                            <div className={styles.brandName}>
                                <span>{this.props.item.brand_name}</span>
                            </div>
                            <p className={styles.rate}>{this.props.item.rate} / 5.0</p>
                        </div>
                    </div>
                </div>
                </a>
            </div>
        )
     } else { return null; }
    }
}

export default ProductCard;
