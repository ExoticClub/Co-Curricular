// CircularPreview.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./CircularPreview.css";
import logo from "./rit.png";

function CircularPreview() {
    const location = useLocation();
    const navigate = useNavigate();
    const eventDetails = location.state?.eventDetails;

    if (!eventDetails) {
        return (
            <div>
                <p>Error: No event details found. Please go back and fill out the form.</p>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    const renderList = (list) => {
        if (!Array.isArray(list)) {
            return <p>No items available</p>;
        }

        return list.length > 0 ? (
            <ul>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        ) : (
            <p>No items available</p>
        );
    };

    const renderPOMapping = () => {
        const poLabels = ["PO 1", "PO 2", "PO 3", "PO 4", "PO 5", "PO 6", "PO 7", "PO 8", "PO 9", "PO 10"];
        const poMapping = eventDetails.POMap || [];

        const isAnyPOSelected = poMapping.some(po => po);

        if (!isAnyPOSelected) {
            return <p>No PO Mapping available</p>;
        }
        console.log(poMapping)

        return (
            <table border="1" cellSpacing="0" cellPadding="5">
                <thead>
                    <tr>
                        <th>POs</th>
                        {poMapping.map((label, index) => (
                            poMapping[index] ? <th key={index}>{label}</th> : null
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        {poMapping.map((po, index) => (
                            po ? <td key={index}>✔</td> : null
                        ))}
                    </tr>
                </tbody>
            </table>
        );
    };

    const handleFormSubmit = () => {
        navigate('/authentication', { state: { eventDetails } }); // Pass eventDetails to the Authentication page
    };

    return (
        <>
            <div className="wrapper">
                <div className="header">
                    <div className="ritimage">
                        <img src={logo} alt="RIT Logo" />
                    </div>
                    <div>
                        <h1>RAMCO INSTITUTE OF TECHNOLOGY</h1>
                        <p>RAJAPALAYAM</p>
                        <p>DEPARTMENT OF COMPUTER SCIENCE AND BUSINESS SYSTEMS</p>
                        <h1>RIT – {eventDetails.Assocition || 'Not specified'}</h1>
                        <h1>CIRCULAR</h1>
                    </div>
                </div>

                <div className="details">
                    <div className="left">
                        <p><strong>Chief Patron:</strong>{eventDetails.ChiefPatron || 'Not specified'}</p>
                        <p><strong>Patron:</strong> {eventDetails.Patron || 'Not specified'}</p>
                        <p><strong>President:</strong> {eventDetails.President || 'Not specified'}</p>
                        <p><strong>Faculty Advisors:</strong> {renderList(eventDetails.FacultyAdvisors)}</p>
                        <p><strong>Secretary:</strong> {renderList(eventDetails.Secretary)}</p>
                        <p><strong>Joint Secretary:</strong> {renderList(eventDetails.JointSecretary)}</p>
                        <p><strong>Treasurer:</strong> {renderList(eventDetails.Treasurer)}</p>
                        <p><strong>Joint-Treasurer:</strong> {renderList(eventDetails.JointTreasurer)}</p>
                        <p><strong>Magazine Preparation:</strong> {renderList(eventDetails.MagazinePreparation)}</p>
                        <p><strong>Poster Designer:</strong> {renderList(eventDetails.PosterDesigner)}</p>
                        <p><strong>Event Organizer:</strong> {renderList(eventDetails.EventOrganizer)}</p>
                        <p><strong>Social Media Activities:</strong> {renderList(eventDetails.SocialMediaActivities)}</p>
                    </div>

                    <div className="right">
                        <p><b>Event Name:</b> {eventDetails.Name}</p><br />
                        <p><b>Date:</b> {eventDetails.Date}</p><br />
                        <p><b>Time:</b> {eventDetails.Time}</p><br />
                        <p><b>Venue:</b>{eventDetails.Venue}</p><br />
                        <p><b>Participant:</b>{eventDetails.participant}</p><br />
                        <div className="rules">
                            <p><strong>Rules:</strong><br /></p>
                            {Array.isArray(eventDetails.Rules) ? (
                                <ul>
                                    {eventDetails.Rules.map((rule, index) => (
                                        <li key={index}>{rule}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No rules available</p>
                            )}
                        </div>
                        <div className="po-mapping">
                            <p><strong>PO Mapping:</strong></p>
                            {renderPOMapping()}
                        </div>
                        <div>
                            <p><strong>Student In-charge(s):</strong><br />{renderList(eventDetails.SIC)}</p>
                        </div>
                        <div className="faculty-in-charge">
                            <p><strong>Faculty In-charge(s):</strong><br />{renderList(eventDetails.FIC)}</p>
                        </div>
                        <div>
                            <p><strong>HOD:</strong> </p>
                            <p><strong>Co-Curricular Coordinator:</strong> </p>
                            <p><strong>Vice Principal:</strong> </p>
                            <p><strong>Principal:</strong> </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="actions">
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={handleFormSubmit}>Submit</button>
            </div>
        </>
    );
}

export default CircularPreview;
