import React, { Component } from "react"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    BsCollection,
    BsDownload,
} from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai"

import { getProduct, getProductSuggestions, getRelatedProducts } from '../../../core/actions/product'
import { addToCart } from '../../../core/actions/cart'
import ProductCard from '../../partials/ProductCard'

import styles from '../../../../style/shop/Product.module.css'

class Product extends Component {
    static propTypes = {
        getProduct: PropTypes.func.isRequired,
        getRelatedProducts: PropTypes.func.isRequired,
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getProduct(id);
        // this.props.getRelatedProducts(id, this.props.product.category);
        this.props.getProductSuggestions(id, this.props.product.category);
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
        return (
            <div id={styles.container} className="pt-4">
                <div className={styles.productDisplay}>
                    <div className={styles.productImg}>
                        <div className={styles.productImgContent}>
                            <img src={this.props.product.images} alt={'Alfinder Product - ' + this.props.product.title} />
                        </div>
                    </div>
                    <div className={styles.productInformation}>
                        <div>
                            <div className={styles.productInformationTitle}>
                                <p className={styles.alfinderTag}>Only at Alfinder</p>
                                {/* <div className="brand-name">
                                    <small>{this.props.product.brand_name}</small>
                                </div> */}
                                <h2>{this.props.product.title}</h2>
                                <p className={styles.productPrice}>${this.props.product.price}</p>
                            </div>

                            <div className={styles.productInfos}>
                                <div className={styles.productInfo + ' ' + styles.props}>
                                    {this.props.product.vegan ? <div id="vegan" className={styles.productProp}></div> : null}
                                    {!this.props.product.luten_free ? <div id={styles.glutenFree} className={styles.productProp}></div> : null}
                                    {this.props.product.cruelty_free ? <div id={styles.crueltyFree} className={styles.productProp}></div> : null}
                                </div>
                                <div className={styles.productInfo}>
                                    <span>Size</span>
                                    <p>{this.props.product.size}</p>
                                </div>
                                <div className={styles.productInfo}>
                                    <span>type</span>
                                    <p>{this.props.product.type}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.actionButtons}>
                                <div onClick={this.props.addToCart.bind(this, this.props.product.product_id)} className="btn primary">
                                    <span>Add To Cart</span>
                                </div>
                                <div className="btn primary">
                                    <span>Quick Buy</span>
                                </div>
                                <div className={styles.whishlistBtn}>
                                    <AiOutlineHeart size={31} />
                                </div>
                            </div>
                            <div className={styles.productPolicies}>
                                <div>
                                    <BsCollection size={17} />
                                    <p>Free, Fast Delivery</p>
                                </div>
                                <div style={{backgroundColor: '#000', width: 1, padding: 0, height: 20}}></div>
                                <div>
                                    <BsDownload size={17} />
                                    <p>Simple Returns</p>
                                </div>
                                <div style={{backgroundColor: '#000', width: 1, padding: 0, height: 20}}></div>
                                <div>
                                    <BsDownload size={17} />
                                    <p>Simple Returns</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={styles.productDetails}>
                        <div className={styles.productDetail}>
                            <h5>Description</h5>
                            <p>{this.props.product.description}</p>
                        </div>
                        <div className={styles.productDetail}>
                            <h5>Directions</h5>
                            <p>{this.props.product.directions}</p>
                        </div>
                    </div>
                    <div className={styles.productDetails}>
                        <div className={styles.productDetail}>
                            <h5>Ingredients</h5>
                            <p>{this.props.product.ingredients}</p>
                        </div>
                        <div className={styles.productDetail}>
                            <h5>Additional Notes</h5>
                            <p>{this.props.product.note}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.relatedProducts}>
                    <div className={styles.productCarousel}>
                        <div className={styles.productCarouselHeadline}>
                            <h4>Frequently Paired With</h4>
                        </div>
                        <div className={styles.productCarouselContent} style={{width: 7 * 195}}>
                            <ProductCard item={info} />
                            <ProductCard item={info} />
                            <ProductCard item={info} />
                            <ProductCard item={info} />
                            <ProductCard item={info} />
                            <ProductCard item={info} />
                            <ProductCard item={info} />
                        </div>
                    </div>
                </div>


                <div className={styles.relatedProducts}>
                    <div className={styles.productCarousel}>
                        <div className={styles.productCarouselHeadline}>
                            <h4>You might also like</h4>
                        </div>
                        <div className={styles.productCarouselContent} style={{width: this.props.productSuggestions.length * 195}}>
                            {this.props.productSuggestions.map(product => (
                                <ProductCard key={product.product_id} item={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProp = state => ({
    product: state.productReducer,
    // relatedProducts: state.productReducer.relatedProducts,
    productSuggestions: state.productReducer.productSuggestions,
});

export default connect(mapStateToProp, {
    getProduct,
    // getRelatedProducts,
    getProductSuggestions,
    addToCart,
})(Product);
