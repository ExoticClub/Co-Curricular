import { useState,useEffect } from "react";
import Cookies from 'js-cookie';
import "../Styles/Event.css"


function Event(){

    const URL="http://localhost:4689"

    const LoginId=Cookies.get('Account');
    const LoginRole=Cookies.get('Account_Role');

    // FETCH DATA EVENT

    const [EveData, setEveData] = useState([]);

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
            setEveData(resultData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);
    console.log(EveData);
    

    const Login=()=>{
        window.location.href="/Login";
    }
    const [sumData, setSumData] = useState({});

    const opnSum = (eid) => {
        if(EveData[eid].Status=="None"){
            alert("Event Not Completed Yet !")
        }else{
            setSumData(EveData[eid]);
            document.querySelector(".sum").style="display:flex;";
        }
    }

    return(
        <>
            <div>
                <div className="Navbar">
                    <div>
                        <p>Event Corner</p>
                    </div>
                    <div>
                        {LoginId==""&&<button onClick={Login}>Login</button>}
                    </div>
                </div>
                <div className="EventCont">
                    <p>Events</p>
                    <div className="EventShow">
                        
                        {EveData.map((data,eid) => 
                        <div className='EventsData'>
                            <p>{data.Name}</p>
                            <p>{data.Date}</p>
                            <p>{data.Time}</p>
                            <p>{data.Venue}</p>
                            <div>
                                {data.Status=="None"&& <button>Participate</button>}
                                {data.Status=="Completed"&& <button onClick={()=>opnSum(eid)}> Check It Out</button>}
                                {data.Status=="Pending"&& <p>Pending For Review...</p>}
                                {!data.Status&& <p>Invalid</p>}
                                
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
            <div className="sum">
                <p>Summary</p>
                <p>{sumData.Summary}</p>
                <p>{sumData.Feedback}</p>
            </div>
        </>
    )
}
export default Event;