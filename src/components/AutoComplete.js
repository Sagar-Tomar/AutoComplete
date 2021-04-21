import * as React from 'react';
import AutoCompleteOption from "./AutoCompleteOptions";

class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOptions: true,
            activeIndex: 0,
        };
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleAutoCompleteOptionClicked = this.handleAutoCompleteOptionClicked.bind(this);
        // this.handleInputBlur = this.handleInputBlur.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleSearchInputChange(e) {
        const {value} = e.target;
        const {onSearchChange} = this.props;
        if (onSearchChange && typeof onSearchChange === 'function') {
            this.setState({
                showOptions: true,
                activeIndex: 0
            });
            onSearchChange(value);
        }
    };

    handleKeyDown(e) {
        const {activeIndex} = this.state;
        const {dataSource} = this.props;
        if (e.keyCode === 13) {
            this.setState({
                showOptions: false,
                activeIndex: 0
            }, () => {
                if (dataSource && dataSource[activeIndex]) {
                    this.handleAutoCompleteOptionClicked(dataSource[activeIndex])
                }
            });
        } else if (e.keyCode === 38) {
            if (activeIndex === 0) {
                return;
            }

            this.setState({activeIndex: activeIndex - 1});
        } else if (e.keyCode === 40) {
            if (activeIndex === dataSource.length - 1) {
                this.setState({
                    activeIndex: 0
                })
            } else {
                this.setState({activeIndex: activeIndex + 1});
            }


        }
    }

    handleAutoCompleteOptionClicked(fullObj) {
        const {onSelect} = this.props;
        if (onSelect && typeof onSelect === 'function') {
            onSelect(fullObj);
            this.setState({
                showOptions: false
            })
        }
    }

    render() {
        const {inputStyles, placeholder,type = 'text', value, width, uniqueKey, displayKey, children, dataSource} = this.props;
        const {showOptions, activeIndex} = this.state;
        console.log('children', children);
        return (
            <div style={{width}}>
                <input
                    type={type}
                    style={{...inputStyles}}
                    onChange={this.handleSearchInputChange}
                    onKeyDown={this.handleKeyDown}
                    value={value}
                    placeholder={placeholder}

                />

                {Array.isArray(dataSource) && dataSource.length && showOptions ? (
                    <ul className="autoCompleteOptionsList">
                        {dataSource.map((item, index) => {
                            let listItemClass = "listItemClass";
                            if (index === activeIndex) {
                                listItemClass = "activeListItemClass"
                            }
                            return (
                               <AutoCompleteOption className={listItemClass} key={item[uniqueKey]} onClick={(item) =>  this.handleAutoCompleteOptionClicked(item)} >
                                   {item[displayKey]}
                               </AutoCompleteOption>

                            );
                        })}
                    </ul>
                ) : (
                    <ul className="autoCompleteOptionsList">
                        {children}
                    </ul>
                )}


            </div>
        )
    }
}

export default AutoComplete;
