import React from 'react';
import axios from 'axios';

import CollectionCard from '../../partials/CollectionCard';

import styles from '../../../../style/shop/Collection.module.css'


class Collections extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            collections: [],
            collectionProducts: [],
            loadingCollections: false,
        }
    }

    componentDidMount() {
        // this._getCollections();
    }

    _getCollections = async () => {
        await axios.post('https://alfinder.com/alfinder/public/api/collections/full')
        .then((response) => {
            this.setState({collections: response.data, loadingCollections: false})
        }, (error) => { console.log(error) });
    };

    render() {
        return (
            <div id={styles.container}>
                <div className={styles.content}>
                    <div className={styles.sideBar}>
                        <div style={{height: 74}}></div>
                        <div className={styles.searchFilter}>
                            <div className={styles.searchFilterAccordion}>
                                <div className={styles.searchFilterAccordionItem + ' ' + styles.wide}>
                                    <div className={styles.quickPicks}>
                                        <p>title</p>
                                        <p>Hello</p>
                                        <p>Item number</p>
                                        <p>number</p>
                                        <p>1234</p>
                                        <p>Hello</p>
                                        <p>item #1</p>
                                        <p>Good Me</p>
                                        <p>Items</p>
                                        <p>Hello</p>
                                        <p>item #2</p>
                                    </div>
                                </div>
                                <div className={styles.searchFilterAccordionItem}>
                                    <p>Accordion Title</p>
                                    <ul>
                                        <li>Item number title</li>
                                        <li>Item number title</li>
                                        <li>Item number title</li>
                                        <li>Item number title</li>
                                    </ul>
                                </div>
                                <div className={styles.searchFilterAccordionItem}>
                                    <p>Accordion Title</p>
                                    <ul>
                                        <li>Item number title</li>
                                        <li>Item number title</li>
                                        <li>Item number title</li>
                                        <li>Item number title</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.context}>
                        <div className={styles.headline}>
                            <h1>Category</h1>
                            <small>Sort By: Featured</small>
                        </div>

                        <div style={{marginRight: 10}}>
                            <div className={styles.gridItems}>
                                <div className={styles.gridItem}></div>
                                <div className={styles.gridItem}></div>
                                <div className={styles.gridItem}></div>
                                <div className={styles.gridItem}></div>
                                <div className={styles.gridItem}></div>
                                <div className={styles.gridItem}></div>
                                <div className={styles.gridItem}></div>
                                <div className={styles.gridItem}></div>
                                <div className={styles.gridItem}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // render() {
    //     return(
    //         <div id="container" className="pt-7">
    //             {!this.state.loadingCollections ?
    //                 <section className="presenter">
    //                 {this.state.collections.map(item => 
    //                         <div className="product-carousel">
    //                             <div>
    //                                 <div className="product-carousel-headline">
    //                                     <h4>{item.collection.title}</h4>
    //                                     <p>{item.collection.subtitle}</p>
    //                                 </div>
    //                                 <div className="product-carousel-content" style={{width: item.products.length * 195}}>
    //                                     {item.products.map(p => <CollectionCard item={p} />)}
    //                                 </div>
    //                             </div>
    //                         </div>
    //                 )}
    //                 </section>
    //             : null}
    //         </div>
    //     );
    // }
}

export default Collections;
