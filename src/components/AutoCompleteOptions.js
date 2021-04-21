import React from 'react';

class AutoCompleteOption extends React.Component {
    render() {
        const { listItemClass, children} = this.props;
        return (
            <li
                className={listItemClass}
                {...this.props}
            >

                {children}
            </li>
        );

    }
}

export default AutoCompleteOption;
