import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "../Styles/Circular.css";

function Circular() {
    const URL = "http://localhost:4689";
    const LoginId = Cookies.get('Account');
    const LoginRole = Cookies.get('Account_Role');
    const navigate = useNavigate();

    const [LogData, setLogData] = useState([]);
    const [UserData, setUserData] = useState({});
    const [PData, setPData] = useState([]);
    const [POData, setPOData] = useState([]);
    const [rolesData, setRolesData] = useState({
        FacultyAdvisors: [],
        Secretary: [],
        JointSecretary: [],
        Treasurer: [],
        JointTreasurer: [],
        MagazinePreparation: [],
        PosterDesigner: [],
        EventOrganizer: [],
        SocialMediaActivities: [],
    });
    const [isFormVisible, setIsFormVisible] = useState(false); // State for form visibility

    const homeLoadingRef = useRef(null);
    const homeEventRef = useRef(null);

    useEffect(() => {
        if (!LoginId || (LoginRole !== "AF" && LoginRole !== "A1")) {
            window.location.href = "/Login";
        }
    }, [LoginId, LoginRole]);

    useEffect(() => {
        fetch(URL + '/api/log')
            .then(response => response.json())
            .then(resultData => setLogData(resultData))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        if (LogData.length > 0) {
            const user = LogData.find(l => l._id === LoginId);
            if (user) {
                setUserData(user);
            }
            if (homeLoadingRef.current) {
                homeLoadingRef.current.style.display = 'none';
            }
        } else if (homeLoadingRef.current) {
            homeLoadingRef.current.style.display = 'flex';
        }
    }, [LogData, LoginId]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setRolesData({
            ...rolesData,
            [id]: value.split(',').map(item => item.trim())
        });
    };

    const handleDataUpdater = (data, setData, inputId) => {
        const value = document.querySelector(`#${inputId}`).value;
        if (value) {
            setData([...data, value]);
            document.querySelector(`#${inputId}`).value = "";
        }
    };

    const handleDataDelete = (index, data, setData) => {
        setData(data.filter((_, i) => i !== index));
    };

    const ParticipantsUpdater = () => handleDataUpdater(PData, setPData, "participant");
    const POUpdater = () => handleDataUpdater(POData, setPOData, "poha");

    const DeletePD = (index) => handleDataDelete(index, PData, setPData);
    const DeletePOD = (index) => handleDataDelete(index, POData, setPOData);

    const EventL1Submit = (e) => {
        e.preventDefault();

        const eventDetails = {
            Name: document.querySelector("#PLName").value,
            Date: document.querySelector("#PLDate").value,
            Time: document.querySelector("#PLTime").value,
            Venue: document.querySelector("#PLVenue").value,
            Participant: PData,
            Rules: document.querySelector("#PLRules").value.split('\n'),
            POMap: POData,
            SIC: document.querySelector("#SIC").value.split('\n'),
            FIC: document.querySelector("#FIC").value,
            ChiefPatron: document.querySelector("#CPName").value,
            Patron: document.querySelector("#PName").value,
            Assocition: document.querySelector("#AName").value,
            President: document.querySelector("#P1Name").value,
            ...rolesData,
        };

        // Navigate to the preview page with event details
        navigate('/CircularPreview', { state: { eventDetails } });
    };

    const OpenEvent = () => {
        setIsFormVisible(true);
        if (homeEventRef.current) {
            homeEventRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the form
        }
    };

    const CloseEvent = () => {
        setIsFormVisible(false); // Hide the form
    };

    return (
        <div className="container">
            {!isFormVisible && (
                <div>
                    <h1>Create Circular Event</h1>
                    <button onClick={OpenEvent}>Create Circular</button>
                </div>
            )}
            
            {isFormVisible && (
                <div id="Home-Event" ref={homeEventRef}>
                    <button onClick={CloseEvent} className="close-btn">
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                    <form onSubmit={EventL1Submit} id="EventL1">
                        {/* Form fields remain the same */}
                        <div>
                            <p>Association</p>
                            <input placeholder="Enter The Association Name" id="AName" required />
                        </div>
                        <div>
                            <p>Chief Patron</p>
                            <input placeholder="Enter The Chief Patron Name" id="CPName" required />
                        </div>
                        <div>
                            <p>Patron</p>
                            <input placeholder="Enter The Patron Name" id="PName" required />
                        </div>
                        <div>
                            <p>President</p>
                            <input placeholder="Enter The President Name" id="P1Name" required />
                        </div>
                        <div>
                            <p>Faculty Advisors</p>
                            <input placeholder="Enter The Faculty Advisors" id="FacultyAdvisors" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <p>Secretary</p>
                            <input placeholder="Enter The Secretary Name" id="Secretary" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <p>Joint Secretary</p>
                            <input placeholder="Enter The Joint Secretary Name" id="JointSecretary" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <p>Treasurer</p>
                            <input placeholder="Enter The Treasurer Name" id="Treasurer" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <p>Joint-Treasurer</p>
                            <input placeholder="Enter The Joint-Treasurer Name" id="JointTreasurer" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <p>Magazine Preparation</p>
                            <input placeholder="Enter The Magazine Preparation Name" id="MagazinePreparation" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <p>Poster Designer</p>
                            <input placeholder="Enter The Poster Designer Name" id="PosterDesigner" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <p>Event Organizer</p>
                            <input placeholder="Enter The Event Organizer Name" id="EventOrganizer" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <p>Social Media Activities</p>
                            <input placeholder="Enter The Social Media Activities" id="SocialMediaActivities" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <p>Event Name</p>
                            <input placeholder="Enter Event Name" id="PLName" required />
                        </div>
                        <div>
                            <p>Date</p>
                            <input type="date" id="PLDate" required />
                        </div>
                        <div>
                            <p>Time</p>
                            <input type="time" id="PLTime" required />
                        </div>
                        <div>
                            <p>Venue</p>
                            <input placeholder="Enter Venue" id="PLVenue" required />
                        </div>
                        <div>
                            <p>Participant</p>
                            <input placeholder="Enter The participant" id="participant" onChange={handleInputChange} required />
                        </div>
                        <div>
                            <p>Rules</p>
                            <textarea placeholder="Rules" id="PLRules" />
                        </div>
                        <div>
                            <p>PO Mapping</p>
                            <>
                                {POData.map((po, index) => (
                                    <div className="PartIn" key={index}>
                                        <p>{po}</p>
                                        <button onClick={() => DeletePOD(index)} type="button">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                ))}
                                <div>
                                    <input placeholder="Enter PO Mapping..." id="poha" />
                                    <button type="button" onClick={POUpdater}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </>
                        </div>
                        <div>
                            <p>SIC</p>
                            <input placeholder="Enter SIC" id="SIC" required />
                        </div>
                        <div>
                            <p>Faculty In Charge</p>
                            <input placeholder="Faculty In Charge" id="FIC" required />
                        </div>
                        <div>
                            <button type="submit">Submit Event</button>
                        </div>
                    </form>
                </div>
            )}
            <div ref={homeLoadingRef} style={{ display: 'none' }}>
                Loading...
            </div>
        </div>
    );
}

export default Circular;
