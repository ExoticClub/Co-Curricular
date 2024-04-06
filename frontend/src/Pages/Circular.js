import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';
import "../Styles/Homes.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


function Circular(){

    const URL="http://localhost:4689";
    const LoginId=Cookies.get('Account');
    const LoginRole=Cookies.get('Account_Role');

    if(LoginRole=="AF" || LoginRole=="A1"){
        console.log("Welcome");
    }else{
        window.location.href="/Login";
    }

    if(!LoginId){
        window.location.href="/Login";
    }



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

    const [EventData, setEventData] = useState([]);

    useEffect(() => {
        const apiUrl = URL+'/api/event';
    
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            return response.json();
        })
        .then(resultData => {
            setEventData(resultData);
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

    // ------------------- API PATCH --------------------

    const patchAssociationData = async (IO,id) => {
   
        try {
          
          const response = await fetch(URL+'/api/Association/'+id, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(IO),
          });
     
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
     
          const responseData = await response.json();
          console.log('Response data:', responseData);
          alert("Updated Sucessfully !");
        } catch (error) {
          console.error('Error during PATCH request:', error);
          alert(error)
        }
      };
      

      // -------------------- POST ------------------


    const CreateNewEvent = async (FEvent) => {

        document.querySelector("#Home-Loading").style="display:flex;";

        try {
        
            const response = await fetch(URL+'/api/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(FEvent),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Response data:', responseData);
            document.querySelector("#Home-Loading").style="display:none;";
            alert("Circular Circulated !");
            window.location.href="/home"
        } catch (error) {
            console.error('Error during POST request:', error);
            document.querySelector("#Home-Loading").style="display:none;";
        }
    };



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

    

    function OpenEvent(){
        document.querySelector("#Home-Event").style="display:flex;";
    }

    
    
    const eventPoster=['Name','Date','Time','Venue','Participants','Rules','POMap','SIC','FIC']
    console.log(eventPoster,EventData)

    const [PData,setPData]=useState([])

    const ParticipantsUpdater=()=>{
        setPData([...PData,document.querySelector("#pha").value])
        document.querySelector("#pha").value="";
        console.log(PData)
    }

    const DeletePD = (n) => {
        const updatedPData = [...PData];
        updatedPData.splice(n, 1);
        console.log(updatedPData)
        setPData(updatedPData);
      };

      const [POData,setPOData]=useState([])

      const POUpdater=()=>{
          setPOData([...POData,document.querySelector("#poha").value])
          document.querySelector("#poha").value="";
          console.log(POData)
      }
  
      const DeletePOD = (n) => {
          const updatedPOData = [...POData];
          updatedPOData.splice(n, 1);
          console.log(updatedPOData)
          setPOData(updatedPOData);
        };

    const EventL1Submit=(e)=>{
        e.preventDefault();
        document.querySelector("#PName").innerHTML="Name : "+document.querySelector("#PLName").value;
        document.querySelector("#PDate").innerHTML="Date : "+document.querySelector("#PLDate").value;
        document.querySelector("#PTime").innerHTML="Time : "+document.querySelector("#PLTime").value;
        document.querySelector("#PVenue").innerHTML="Venue : "+document.querySelector("#PLVenue").value;
        document.querySelector("#PPart").innerHTML="Participants : "+PData;
        document.querySelector("#PRules").innerHTML="Rules : "+document.querySelector("#PLRules").value;
        document.querySelector("#PPOs").innerHTML="PO's : "+POData;
        document.querySelector("#PSIC").innerHTML="Student In Charge : "+document.querySelector("#PLSIC").value;
        document.querySelector("#PFIC").innerHTML="Facultie In Charge : "+document.querySelector("#PLFIC").value;
        document.querySelector("#EventL2").style="display:flex;";
    }
    const EventL2Submit=()=>{
        const FEvent={
            "Name":document.querySelector("#PLName").value,
            "Date":document.querySelector("#PLDate").value,
            "Time":document.querySelector("#PLTime").value,
            "Venue":document.querySelector("#PLVenue").value,
            "Participants":PData,
            "Rules":document.querySelector("#PLRules").value,
            "POMap":POData,
            "SIC":document.querySelector("#PLSIC").value,
            "FIC":document.querySelector("#PLFIC").value,
            "HODA":[false,""],
            "CoCA":[false,""],
            "VPA":[false,""],
            "PA":[false,""],
            "Status":"Pending"
        }
        console.log(FEvent)
        CreateNewEvent(FEvent);
    }
    const EventL2Close=()=>{
        document.querySelector("#EventL2").style="display:none;"
    }

    return(
        <>
        <div>
            <p>{UserData.Name}</p>
            <button onClick={OpenEvent}>Create Circular</button>
        </div>

        
        {/* ---------------- E V E N T -------------- */}

        <div id='Home-Event'>
            <form onSubmit={EventL1Submit} id='EventL1'>
                <p>Create Event</p>
                <div>
                    <p>Name</p>
                    <input placeholder='Name Of The Event' id='PLName' required></input>
                </div>
                <div>
                    <p>Date</p>
                    <input type='date' required id='PLDate'></input>
                </div>
                <div>
                    <p>Time</p>
                    <input type='time' required id='PLTime'></input>
                </div>
                <div>
                    <p>Venue</p>
                    <input placeholder='Venue' required id='PLVenue'></input>
                </div>
                <div>
                    <p>Participants</p>
                    <>
                        {PData.map((pd,pid) => 
                        <div className='PartIn'>
                            <p key={pd} id={"PD"+pid}>{pd}</p>
                            <button onClick={()=>DeletePD(pid)} type='button'><FontAwesomeIcon icon={faTrash} /></button>
                        </div>)}
                        <div>
                            <input placeholder='Enter Participant...' id="pha"></input>
                            <button type='button' onClick={ParticipantsUpdater}><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                    </>
                </div>
                <div>
                    <p>Rules</p>
                    <input placeholder='Rules' id='PLRules'></input>
                </div>
                <div>
                    <p>PO</p>
                    <>
                        {POData.map((pod,poid) => 
                        <div className='POIn'>
                            <p key={pod} id={"POD"+poid}>{pod}</p>
                            <button onClick={()=>DeletePOD(poid)} type='button'><FontAwesomeIcon icon={faTrash} /></button>
                        </div>)}
                        <div>
                            <input placeholder='Enter PO...' id="poha"></input>
                            <button type='button' onClick={POUpdater}><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                    </>
                </div>
                <div>
                    <p>Student In Charge</p>
                    <input placeholder='Student In Charge' required id='PLSIC'></input>
                </div>
                <div>
                    <p>Facultie In Charge</p>
                    <input placeholder='Facultie In Charge' required id='PLFIC'></input>
                </div>
                <button type='submit'>Submit</button>
            </form>
            
            <div id='EventL2'>
                <div id='EventL2L1'>
                    <p id='PName'>Name : </p>
                    <p id='PDate'>Date : </p>
                    <p id='PTime'>Time : </p>
                    <p id='PVenue'>Venue : </p>
                    <p id='PPart'>Participants : </p>
                    <p id='PRules'>Rules : </p>
                    <p id='PPOs'>PO's : </p>
                    <p id='PSIC'>Student In Charge : </p>
                    <p id='PFIC'>Facultie In Charge : </p>
                    <div>
                        <button onClick={EventL2Submit}>Submit</button>
                        <button onClick={EventL2Close}>Close</button>
                    </div>
                </div>
            </div>

        </div>

        {/* ---------------- L O A D I N G -------------- */}

        <div id="Home-Loading">
            <p>Loading...</p>
        </div>
        </>
    )
}

export default Circular;