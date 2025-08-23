import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { AiOutlineEye } from 'react-icons/ai'

import { getSlides, getRecommendations, getCollections } from '../../../core/actions/home'

import Slider from "react-animated-slider"
// import BlogCard from '../../partials/BlogCard'
// import ProductCard from '../../partials/ProductCard'
// import CollectionCard from '../../partials/CollectionCard'

import styles from '../../../../style/shop/Home.module.css'
import '../../../../style/shop/slider-animations.css'
import "react-animated-slider/build/horizontal.css"


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rate: [],
            value: [],
            seller: [],
            recommended: [],
            loadingProducts: true,

            types: [],
            loadingTypes: true,

            collections: [],
            collectionProducts: [],
            loadingCollections: true,
        };
    }

    async componentDidMount() {
        // this.props.getSlides();
        // this.props.getRecommendations();
        // this.props.getCollections();

        await this._startHome();
        await this._getCollections();
        await this._getTypes();
    }

    _startHome = async () => {
        await axios.post('https://alfinder.com/alfinder/public/api/collections')
        .then((response) => {
            this.setState({collections: response.data.data});
        });
    }

    _getCollections = async () => {
        axios.all([
            await axios.post('https://alfinder.com/alfinder/public/api/collections/products/recommended'),
            await axios.post('https://alfinder.com/alfinder/public/api/collections/products/best-sellers'),
            await axios.post('https://alfinder.com/alfinder/public/api/collections/products/great-value'),
            await axios.post('https://alfinder.com/alfinder/public/api/collections/products/top-rated'),
            // await axios.post('https://alfinder.com/alfinder/public/api/collections/collection', {
            //     collection: this.state.collections[0],
            // }),
            // await axios.post('https://alfinder.com/alfinder/public/api/collections/collection', {
            //     collection: this.state.collections[1],
            // }),
            // await axios.post('https://alfinder.com/alfinder/public/api/collections/collection', {
            //     collection: this.state.collections[2],
            // }),
        ])
        .then(axios.spread((p0, p1, p2, p3,
            // p4, p5, p6
            ) => {
            this.setState({
                recommended: p0.data.data,
                bestSellers: p1.data.data,
                greatValue: p2.data.data,
                topRated: p3.data.data,
                // collectionProducts: [
                //     [this.state.collections[0], p4.data.data],
                //     [this.state.collections[1], p5.data.data],
                //     [this.state.collections[2], p6.data.data]
                // ],
                loadingCollections: false,
                loadingProducts: false,
            });
        }));
    }

    _getTypes = async () => {
        await axios.post('https://alfinder.com/alfinder/public/api/types')
        .then((response) => {
            this.setState({types: response.data, loadingTypes: false})
        })
    }

    render() {
        const slides = [
            {
                title: "ALFINDER SHOP",
                description: "Your personalized online destination for the latest & best self-care products.",
                image: "https://i.imgur.com/ZXBtVw7.jpg",
                buttons: [
                    {
                        text: 'sign up',
                        link: '/profile'
                    },
                    {
                        text: 'sign in',
                        link: '/profile'
                    }
                ]
            },
            {
                title: "Tortor Dapibus Commodo Aenean",
                description: "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum.",
                buttons: [
                    {
                        text: 'discover',
                        link: '/'
                    }
                ],
                image: "https://i.imgur.com/DCdBXcq.jpg",
                user: {
                    name: "Erich Behrens",
                    profile: "https://i.imgur.com/0Clfnu7.png"
                },
            },
            {
                title: "Phasellus volutpat metus",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum.",
                buttons: [
                    {
                        text: 'read more',
                        link: '/'
                    }
                ],
                image: "https://i.imgur.com/DvmN8Hx.jpg",
                user: {
                    name: "Luan Gjokaj",
                    profile: "https://i.imgur.com/4KeKvtH.png"
                },
            }
        ];

        return(
            <div id={styles.main}>
                <div id={styles.mainPresenter}>
                    <div id={styles.mainCarousel}>
                        <Slider duration={4000} autoplay={true} className="slider-wrapper">
                            {slides.map((item, index) => (
                                <div
                                key={index}
                                className="slider-content"
                                >
                                    <div className="slider-img">
                                        <img src={item.image} style={{height: '100%'}} />
                                    </div>
                                    <div className="inner">
                                        <h1>{item.title}</h1>
                                        <p>{item.description}</p>
                                        {item.buttons ?
                                            <div className="buttons">
                                                {item.buttons.map(btn => <a href={btn.link}>{btn.text}</a>)}
                                            </div>
                                        : null}
                                    </div>
                                    {/* {item.user ?
                                        <section>
                                            <img src={item.user.profile} alt={item.user.name} />
                                            <span>
                                                Posted by <strong>{item.user.name}</strong>
                                            </span>
                                        </section>
                                    : null} */}
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                <div className={styles.firstSection}>
                    <div className={styles.flexColumnBetweenCenter} style={{background: 'gray'}}></div>
                    <div className={styles.flexColumnBetweenCenter}>
                        <div style={{display: 'flex', alignItems: 'center', height: '70px', width: '100%', backgroundColor: '#ccc'}}>
                            <div style={{width: '100%', padding: '0 17px', textAlign: 'center'}}>
                                <h2 style={{fontWeight: 400, fontSize: 26, textTransform: 'uppercase'}}>best sellers</h2>
                            </div>
                        </div>
                        <div style={{height: '300px', width: '100%', backgroundColor: '#ccc'}}></div>
                        <div style={{height: '90px', width: '100%', backgroundColor: '#ccc'}}></div>
                    </div>
                    <div className={styles.flexColumnBetweenCenter} style={{background: 'gray'}}></div>
                    <div className={styles.flexColumnBetweenCenter} style={{background: 'lightgray'}}></div>
                </div>

                 <div className={styles.secondSection}>
                    <div className={styles.gridRow}>
                        <div className={styles.flexColumnBetweenCenter}>
                            <div style={{width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap'}}>
                                <div style={{display: 'flex', width: '29%', height: '100%', backgroundColor: 'gray'}}>
                                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px 25px'}}>
                                        <h2>Quis ut ad veniam labore fugiat</h2>
                                        <p>Pariatur cillum ut nulla adipisicing.</p>
                                    </div>
                                </div>
                                <div style={{display: 'flex', width: '42%', height: '100%', backgroundColor: 'lightgray'}}>
                                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '32px 25px'}}>
                                        <h1 style={{textAlign: 'center'}}>Veniam enim cillum ipsum ut qui nulla ad labore minim tempor.</h1>
                                        <p>Consectetur voluptate ex reprehenderit laboris Lorem ipsum adipisicing enim occaecat consequat officia adipisicing eiusmod velit.</p>
                                    </div>
                                </div>
                                <div style={{display: 'flex', width: '29%', height: '100%', backgroundColor: 'gray'}}>
                                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px 25px'}}>
                                        <h2>Laborum consequat ea consectetur</h2>
                                        <p>Laboris dolore ex aute commodo Lorem id duis duis do occaecat fugiat deserunt et non.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.flexColumnBetweenCenter} style={{background: 'lightgray'}}></div>
                    </div>
                </div>


                <div className={styles.thirdSection}>
                    <div className={styles.squaresContainer}>
                        <div className={styles.flexColumnBetweenCenter} style={{background: 'gray'}}></div>
                        <div className={styles.flexColumnBetweenCenter} style={{background: 'lightgray'}}></div>
                        <div className={styles.flexColumnBetweenCenter} style={{background: 'lightgray'}}></div>
                        <div className={styles.flexColumnBetweenCenter} style={{background: 'gray'}}></div>
                    </div>
                </div>

                {/* BLOG SECTION */}
                <div className={styles.blogSection}>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 30}}>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '43%', height: '37vh'}}>
                            <div style={{marginLeft: 33, width: '70%'}}>
                                <h1>Duis in aliqua commodo pariatur reprehenderit</h1>
                                <br />
                                <p>Ea ullamco ad eiusmod pariatur. Dolor dolore non sint cupidatat ipsum cillum ut veniam. Ex mollit reprehenderit aute irure deserunt.</p>
                                <br />
                                <a href="" style={{marginLeft: 11, color: '#3c2d69', fontSize: 15}}>Read More</a>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '57%', height: '37vh'}}>
                            <div style={{display: 'flex', width: '100%', height: '70%', background: 'black'}}>
                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1, margin: '20px 37px'}}>
                                    <div style={{color: '#fff'}}>
                                        <h3>Do nulla voluptate aute eiusmod non velit.</h3>
                                    </div>

                                    <div style={{display: 'grid', gridAutoFlow: 'column', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gridColumnGap: 10}}>
                                        <div style={{color: '#fff'}}>
                                            <p>Item #1</p>
                                            <p>Item Description #1</p>
                                        </div>
                                        <div style={{color: '#fff'}}>
                                            <p>Item #1</p>
                                            <p>Item Description #1</p>
                                        </div>
                                        <div style={{color: '#fff'}}>
                                            <p>Item #1</p>
                                            <p>Item Description #1</p>
                                        </div>
                                        <div style={{color: '#fff'}}>
                                            <p>Item #1</p>
                                            <p>Item Description #1</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* BLOG CARDS */}
                    <div className={styles.blogCards}>
                        <div style={{display: 'flex', width: 'max-content'}}>
                            <div className={styles.flexColumnBetweenCenter} style={{width: '250px', height: '330px', margin: 10, background: '#fff'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '85%', height: '60px'}}>
                                    <p style={{fontWeight: 700, fontSize: 12, marginTop: 5}}>WELLNESS</p>
                                </div>
                                <div style={{width: '77%', height: '200px'}}>
                                    <h3 style={{fontSize: 21}}>Nisi cillum cupidatat exercitation</h3>
                                    <hr style={{margin: '13px 0', borderColor: '#000'}} />
                                    <p style={{fontWeight: 500, fontSize: 16, lineHeight: 1.3}}>Ex consectetur incididunt tempor ea ullamco nisi anim voluptate magna adipisicing ad aliqua.</p>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '81%', height: '35px'}}>
                                    <p style={{display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 12.5}}><AiOutlineEye style={{marginRight: 3}} /> 451</p>
                                    <p style={{fontWeight: 600, fontSize: 12.5}}>6" read</p>
                                    <p style={{fontWeight: 600, fontSize: 12.5}}>Dec 21</p>
                                </div>
                            </div>
                            <div className={styles.flexColumnBetweenCenter} style={{width: '250px', height: '330px', margin: 10, background: 'lightgray'}}></div>
                            <div className={styles.flexColumnBetweenCenter} style={{width: '250px', height: '330px', margin: 10, background: 'gray'}}></div>
                            <div className={styles.flexColumnBetweenCenter} style={{width: '250px', height: '330px', margin: 10, background: 'lightgray'}}></div>
                            <div className={styles.flexColumnBetweenCenter} style={{width: '250px', height: '330px', margin: 10, background: 'lightgray'}}></div>
                            <div className={styles.flexColumnBetweenCenter} style={{width: '250px', height: '330px', margin: 10, background: 'lightgray'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    slides: state.homeReducer.slides,
    recommendations: state.homeReducer.recommendations,
    collections: state.homeReducer.collections,
});

export default connect(mapStateToProps, {
    getSlides,
    getCollections,
    getRecommendations,
})(Home);
