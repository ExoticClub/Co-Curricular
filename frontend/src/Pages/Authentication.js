import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed
import { useLocation, useNavigate } from 'react-router-dom';

function Authentication() {
    const location = useLocation();
    const navigate = useNavigate();
    const eventDetails = location.state?.eventDetails;

    const [regNo, setRegNo] = useState(''); // State for registration number
    const [error, setError] = useState('');
    const [exists, setExists] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!regNo.trim()) {
            setError('Registration number cannot be empty.');
            return;
        }

        setError('');

        try {
            const response = await axios.post('http://localhost:4689/api/log/checkRegNo', { regNo });
            setExists(response.data.exists);
            if (response.data.exists) {
                // Proceed with form submission or other logic
                console.log('Registration Number/User ID:', regNo);
                console.log('Event Details:', eventDetails);
                navigate('/success'); // Redirect or handle success
            } else {
                setError('Registration number does not exist.');
            }
        } catch (err) {
            console.error('Error checking registration number:', err);
            setError('Error checking registration number.');
        }
    };

    return (
        <div>
            <h1>Authentication</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Registration Number/User ID:
                    <input
                        type="text"
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {exists === true && <p style={{ color: 'green' }}>Registration number exists.</p>}
            {exists === false && <p style={{ color: 'red' }}>Registration number does not exist.</p>}
        </div>
    );
}

export default Authentication;
