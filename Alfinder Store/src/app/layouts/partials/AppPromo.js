import React from 'react';

import Background from './../../../assets/bckgrnd.png';

class AppPromo extends React.Component {
    render() {
        return(
            <div id="appPromo">
                <div style={{backgroundImage: `url(${Background})`}}>
                    <div className="head">
                        <h4>Download Alfinder App</h4>
                        <p>Officia velit exercitation est aliqua excepteur sunt qui fugiat.</p>
                    </div>
                    <div className="content"></div>
                </div>
            </div>
        );
    }
}

export default AppPromo;
