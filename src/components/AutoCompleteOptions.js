import React from 'react';

class AutoCompleteOption extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
        const { item,onSelection } = this.props;
        if(Object.keys(item).length && typeof onSelection === 'function'){
            onSelection(item);
        }

    }

    render() {
        const { listItemClass, children, item} = this.props;
        return (
            <li
                {...this.props}
                onClick={this.handleClick}
                className={listItemClass}
            >

                {children}
            </li>
        );

    }
}

export default AutoCompleteOption;
