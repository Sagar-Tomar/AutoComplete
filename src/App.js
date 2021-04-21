import React, {useEffect, useState} from "react";
import './App.css';
import AutoComplete from "./components/AutoComplete";
import {fetchNameAutoComplete} from "./services/api";
import AutoCompleteOption from "./components/AutoCompleteOptions";


function App() {
    const [namesDataSource, setNamesDataSource] = useState([]);
    const [autocompleteValue, setAutoCompleteValue] = useState('');

    function getAutoCompleteDataSource(searchText) {
        setAutoCompleteValue(searchText);
        fetchNameAutoComplete(searchText).then(response => {
            const {info, results = []} = response;
            setNamesDataSource(results);
        }).catch(e => {
            console.log('error', e);
            setNamesDataSource([]);
        })
    }

    function handleSelectOption(fullDetailsObj) {
        const { name } = fullDetailsObj;
        setAutoCompleteValue(name);
    }

    return (
        <div className="appContainer">
            <AutoComplete
                inputStyles={{
                    padding: 10,
                    width: '100%'
                }}
                placeholder='Search'
                width='50%'
                onSearchChange={getAutoCompleteDataSource}
                onSelect={handleSelectOption}
                value={autocompleteValue}
                dataSource={namesDataSource}
                uniqueKey='id'
                displayKey='name'
             />
        </div>
    );
}

export default App;
