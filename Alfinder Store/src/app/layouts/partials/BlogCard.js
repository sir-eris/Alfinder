import React from 'react';

class BlogCard extends React.Component {
    render() {
        return(
            <div className="blog-card">
                <div className="blog-card-container">
                    <div className="blog-thumbnail"></div>
                    <div className="blog-card-content">
                        <div className="from">
                            <span>by</span>
                            <a href="">fromLink</a>
                        </div>
                        <div className="title">
                            <a href="">
                                <h2>Et consequat officia est nostrud sunt excepteur aliqua consectetur.</h2>
                            </a>
                        </div>
                        <div className="spec">
                            <span>Oct 10</span>
                            <span>3 min read</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogCard;
