import { useState,useEffect } from "react";

import "../Styles/Landing.css"

function Landing(){

    const URL="http://localhost:4689"
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
    let EveC=[{"Name":"None"}];
    let News=[{"Name":"None"}]
    for(let i=0;i<EveData.length;i++){
        if(EveData[i].Status=="Completed"){
            EveC.push(EveData[i])
        }else{
            News.push(EveData[i])
        }
    }
    console.log(EveC[0]);

    const Login=()=>{
        window.location.href="/Login";
    }

    return(
        <>
            <div>
                <div className="Navbar">
                    <div>
                        <p>Event Corner</p>
                    </div>
                    <div>
                        <button onClick={Login}>Login</button>
                    </div>
                </div>
                <div className="LandingCont">
                    <div className="EventCompleted">
                        <p>Event Completed</p>
                        {EveC.map((data,eid) => 
                        <div className='EventsData'>
                            <p>{data.Name}</p>
                            <p>{data.Date}</p>
                            <p>{data.Time}</p>
                            <p>{data.Venue}</p>
                            <div>
                                <button>Check It Out</button>
                            </div>
                        </div>)}
                    </div>
                    <div className="News">
                        <p>Event Updates</p>
                        {News.map((data,eid) => 
                        <div className='EventsData'>
                            <p>{data.Name}</p>
                            <p>{data.Date}</p>
                            <p>{data.Time}</p>
                            <p>{data.Venue}</p>
                            <div>
                                <button>Check It Out</button>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Landing;