import React from 'react'

import styles from '../../../style/shop/ProductCard.module.css'

class CartProductCard extends React.Component {
    render() {
        if(typeof(this.props.item) === 'object') {
        return(
            <div className={styles.productCard}>
                <div className={styles.productCardContent}>
                    <a href={"/product/" + this.props.item.product_id}>
                        <img src={this.props.item.image ? this.props.item.image : this.props.item.images} alt={this.props.item.title + ' - Alfinder Product'} />
                    </a>
                    <div className={styles.info}>
                        <p className={styles.title}>{this.props.item.title.substring(0, 47)}{this.props.item.title.length > 47 ? '...' : null}</p>
                        <div className={styles.details}>
                        <p className={styles.price}>${this.props.item.price}</p>
                        <p className={styles.spec}>{this.props.item.size} . {this.props.item.type.substring(0, 7)}{this.props.item.type.length > 7 ? '...' : null}</p>
                        </div>
                        <div className={styles.details}>
                            <p className={styles.quantity}><span style={{color: '#555', fontSize: 12}}>QTY.</span>  1</p>
                            <a href="">
                                <p className={styles.remove}>remove</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
     } else { return null; }
    }
}

export default CartProductCard;
