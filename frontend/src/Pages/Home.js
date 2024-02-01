import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';
import "../Styles/Home.css";

function Home(){

    const URL="http://localhost:4689";
    const LoginId=Cookies.get('Account');

    // ---------------------- API FETCH --------------------------

    const [LogData, setLogData] = useState([]);

    useEffect(() => {
        const apiUrl = URL+'/api/log';
    
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            return response.json();
        })
        .then(resultData => {
            setLogData(resultData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    // ---------------------- API FETCH --------------------------

    const [AssoData, setAssoData] = useState([]);

    useEffect(() => {
        const apiUrl = URL+'/api/Association';
    
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            return response.json();
        })
        .then(resultData => {
            setAssoData(resultData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    console.log(AssoData)


     // -------------- LOADING --------------
    const [UserData,setUserData]=useState({})
    useEffect(()=>{
        if(LogData.length===0){
            document.querySelector("#Home-Loading").style="display:flex;";
        }else{
            document.querySelector("#Home-Loading").style="display:none;";
            for(let l of LogData){
                if(l._id===LoginId){
                    console.log(l)
                    setUserData(l);
                }
            }
        }
    },[LogData,LoginId])

    console.log(UserData)

    // -------------------------------------------------------
    
    // ----------------------------------------------------------------------------

    function OpenAssociation(){
        document.querySelector("#Home-Association").style="display:flex;";
        document.querySelector("#Home-Event").style="display:none;";
        document.querySelector("#Home-Report").style="display:none;";
    }

    function OpenEvent(){
        document.querySelector("#Home-Association").style="display:none;";
        document.querySelector("#Home-Event").style="display:flex;";
        document.querySelector("#Home-Report").style="display:none;";
    }

    function OpenReport(){
        document.querySelector("#Home-Association").style="display:none;";
        document.querySelector("#Home-Event").style="display:none;";
        document.querySelector("#Home-Report").style="display:flex;";
    }

    const [selectedOption, setSelectedOption] = useState("Association");
      
    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const[XAssociation,setXAssociation]=useState({})
    const[roler,setRoler]=useState([])
    useEffect(()=>{
        for(let A of AssoData){
            if(A.Name===selectedOption){
                document.querySelector("#Home-Association-Form").style="display:flex;";
                setXAssociation(A)
                setRoler(A.OBs)
            }
        }
    },[AssoData,selectedOption])

    console.log("XA",XAssociation)


    return(
        <>
        <div>
            <p>{UserData.Name}</p>
            <button onClick={OpenAssociation}>Association</button>
            <button onClick={OpenEvent}>Create Event</button>
            <button onClick={OpenReport}>Create Report</button>
        </div>

        {/* ---------------- A S S O C I A T I O N -------------- */}

        <div id="Home-Association">
            <select id="Home-dropdown" value={selectedOption} onChange={handleDropdownChange}>
                <option value="Technebiz">Technebiz</option>
                <option value="ACM">ACM</option>
                <option value="CSI">CSI</option>
            </select>
            <form id="Home-Association-Form">
                <p>{XAssociation.Name}</p>
                {roler.map((role, index) => (
                    <div key={"R"+index}>
                        <p>{role[0]}</p>
                        {role[1] && role[1].map((Person, personIndex) => (
                            <input key={"P"+personIndex} placeholder={Person} />
                        ))}
                    </div>
                ))}
            </form>
        </div>

        {/* ---------------- E V E N T -------------- */}

        <div id='Home-Event'>
            <form>
                <p>Create Event</p>
            </form>
        </div>

        {/* ---------------- R E P O R T -------------- */}

        <div id='Home-Report'>
            <form>
                <p>Create Report</p>
            </form>
        </div>

        {/* ---------------- L O A D I N G -------------- */}

        <div id="Home-Loading">
            <p>Loading...</p>
        </div>
        </>
    )
}

export default Home;