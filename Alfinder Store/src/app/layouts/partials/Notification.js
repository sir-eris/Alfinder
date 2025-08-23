import React, { Component } from 'react';
import { connect } from 'react-redux';
import Noty from 'noty';

import "../../../../node_modules/noty/lib/noty.css";
import "../../../../node_modules/noty/lib/themes/nest.css";
import "../../../../node_modules/noty/lib/themes/mint.css";
import "../../../../node_modules/noty/lib/themes/relax.css";
import "../../../../node_modules/noty/lib/themes/sunset.css";
import "../../../../node_modules/noty/lib/themes/metroui.css";
import "../../../../node_modules/noty/lib/themes/semanticui.css";

// TODO: loop through errors and queue
// TODO: handle componentDidUpdate for queue

class Notification extends Component {
    constructor() {
        super();
    }

    render() {
        if (this.props.error.message !== null) {
            new Noty({
                text: this.props.error.message,
                type: 'info',
                layout: 'bottomCenter',
                timeout: 2000,
                theme: 'mint',
                // progressBar: progressBar
            }).show();
            return null;
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => ({
    error: state.notificationReducer,
});

export default connect(mapStateToProps)(Notification);

// export default function({text, type = 'info', layout = 'bottomCenter', timeOut = 3000, progressBar = false}) {
//     return new Noty({
//         text: text,
//         type: type,
//         layout: layout,
//         timeout: timeOut,
//         theme: 'mint',
//         progressBar: progressBar
//     }).show();
// };
