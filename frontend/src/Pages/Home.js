import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';
import "../Styles/Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


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
                console.log("==="+roler);
            }
        }
    },[AssoData,selectedOption,roler])

    console.log("XA",XAssociation)

    function SubmitNewAssociation(e){
        e.preventDefault();
        let NewRoller=[...roler]
        for(let i=0;i<NewRoller.length;i++){
            for(let j=0;j<NewRoller[i][1].length;j++){
                let person=document.querySelector("#R"+i+"P"+j).value
                NewRoller[i][1][j]=person
            }
        }
        console.log(NewRoller)
        let ID=XAssociation._id
        patchAssociationData({"OBs":NewRoller},ID)
        
    }

    function AddPerson(n){
        const updatedRoler = [...roler];
        updatedRoler[n][1].push("New Person");
        setRoler(updatedRoler);
    }
    const DeletePerson = (roleIndex, personIndex) => {
        const updatedRoler = [...roler];
        updatedRoler[roleIndex][1].splice(personIndex, 1);
        setRoler(updatedRoler);
      };


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
            <form id="Home-Association-Form" onSubmit={SubmitNewAssociation}>
                <p>{XAssociation.Name}</p>
                {roler.map((role, index) => (
                    <div key={"R"+index} className='Association-Container'>
                        <div key={"O"+index} className='Topic'>
                            <p>{role[0]}</p>
                            <button onClick={()=>AddPerson(index)} type='button'><FontAwesomeIcon icon={faPlus} /></button>
                            <button type='button'><FontAwesomeIcon icon={faUser} /></button>
                        </div>
                        
                        {role[1] && role[1].map((Person, personIndex) => (
                            <div key={"Z"+personIndex}>
                                <input key={"P"+personIndex} id={"R"+index+"P"+personIndex} Value={Person} />
                                <button onClick={() => DeletePerson(index, personIndex)} type="button"><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        ))}
                        
                    </div>
                ))}
                <button type='submit'>Submit</button>
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