import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import "../Styles/Event.css";

function Event() {
    const URL = "http://localhost:4689";
    const LoginId = Cookies.get('Account');
    const LoginRole = Cookies.get('Account_Role');

    // State to hold event data
    const [EveData, setEveData] = useState([]);
    const [sumData, setSumData] = useState({});
    const [showSummary, setShowSummary] = useState(false);

    // Fetch event data
    useEffect(() => {
        const apiUrl = URL + '/api/event';
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(resultData => setEveData(resultData))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const Login = () => {
        window.location.href = "/Login";
    }

    const opnSum = (eid) => {
        const event = EveData[eid];
        if (event.Status === "None") {
            alert("Event Not Completed Yet!");
        } else {
            setSumData(event);
            setShowSummary(true);
        }
    }

    const closeSummary = () => {
        setShowSummary(false);
    }

    return (
        <div className="dashboard">
            <div className="navbar">
                <div className="navbar-title">Event Dashboard</div>
                <div>
                    {!LoginId && <button className="btn-primary" onClick={Login}>Login</button>}
                </div>
            </div>
            <div className="event-container">
                <h2>Upcoming & Ongoing Events</h2>
                <div className="event-grid">
                    {EveData.map((data, eid) => (
                        <div className='event-card' key={eid}>
                            <h3>{data.Name}</h3>
                            <p><strong>Date:</strong> {data.Date}</p>
                            <p><strong>Time:</strong> {data.Time}</p>
                            <p><strong>Venue:</strong> {data.Venue}</p>
                            <div className="event-actions">
                                {data.Status === "None" && <button className="btn-participate">Participate</button>}
                                {data.Status === "Completed" && <button className="btn-check" onClick={() => opnSum(eid)}>Check Summary</button>}
                                {data.Status === "Pending" && <p className="status-pending">Pending Review...</p>}
                                {!data.Status && <p className="status-invalid">Invalid Event</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showSummary && (
                <div className="summary-modal">
                    <div className="summary-content">
                        <button className="btn-close" onClick={closeSummary}>X</button>
                        <h2>Event Summary</h2>
                        <p><strong>Summary:</strong> {sumData.Summary}</p>
                        <p><strong>Feedback:</strong> {sumData.Feedback}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Event;
