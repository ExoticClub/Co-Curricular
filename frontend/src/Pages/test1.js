import React, { useState } from 'react';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [output, setOutput] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        // Split the input by commas and trim whitespace
        const inputs = inputValue.split(',').map(value => value.trim()).filter(value => value);
        setOutput(inputs);
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
            <h1>Enter Multiple Inputs</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter inputs separated by commas"
                    style={{ marginRight: '10px' }}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div className="output-container" style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
                {output.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </div>
    );
}

export default App;
