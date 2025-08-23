import React from 'react';

class Review extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasReviews: false,
            reviews: [],

            name: null,
            email: null,
            rate: null,
            subject: null,
            body: null,
        };
    }

    async componentDidMount() {
        await this._getReviews();
    }

    _getReviews = async () => {
        let id = this.props.id;
    };

    _submitReview = async () => {};

    render() {
        return(
            <div id="review">
                
            </div>
        );
    }
}

export default Review;
