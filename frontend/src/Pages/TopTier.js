import { useState,useEffect } from "react";
import Cookies from 'js-cookie';
import "../Styles/Event.css"

function TopTier(){

    const LoginId=Cookies.get('Account');
    const LoginRole=Cookies.get('Account_Role');

    if(LoginRole=="CoC"||LoginRole=="HOD"||LoginRole=="VP"||LoginRole=="P"){
        console.log("Welcome");
    }else{
        window.location.href="/Login";
    }

    console.log(LoginId)
    if(!LoginId){
        window.location.href="/Login";
    }

    const URL="http://localhost:4689"

    // PATCH EVENT 

    const handlePatchData = (updatedData,id) => {
        const apiUrl = URL + '/api/event/' + id;
        
        fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // You may need to include other headers like authorization token
            },
            body: JSON.stringify(updatedData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Handle success if needed
                console.log('PATCH request successful');
                window.location.href="/Approve";
            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem with the PATCH request:', error);
            });
    };

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
    const [apr, setApr] = useState([]);

    useEffect(() => {
        const filteredData = EveData.filter(i => {
            if (LoginRole === "CoC") {
                return !i.CoCA[0];
            } else if (LoginRole === "HOD") {
                return i.CoCA[0] && !i.HODA[0];
            } else if (LoginRole === "VP") {
                return i.CoCA[0] && i.HODA[0] && !i.VPA[0];
            } else if (LoginRole === "P") {
                return i.CoCA[0] && i.HODA[0] && i.VPA[0] && !i.PA[0];
            }
            return false; // Default case
        });

        // Extract only the relevant information you need in the list
        const listData = filteredData.map(i => (i));

        setApr(listData);
    }, [LoginRole, EveData]);

    console.log("Approve : ", apr);



    const Approve = (id) => {
        let roler = LoginRole + "A";
        let apo = {};
        const curDate=new Date();
        apo[roler] = ["true",curDate];
        console.log(apo);
        handlePatchData(apo, id);
    };

    const LogOut = ()=>{
        Cookies.set('Account', );
        Cookies.set('Account_Role', );
        window.location.href="/Login";
    }

    return(
        <>
            <div>
                <div className="Navbar">
                    <div>
                        <p>Event Corner</p>
                    </div>
                    <div className="nav-cet">
                        <a>Event</a>
                        <p>Approve</p>
                    </div>
                    <div className="nav-rig">
                        <a onClick={LogOut}>Logout</a>
                    </div>
                </div>
                <div>
                    <div>
                        {apr.map((data,eid) => 
                            <div>
                                <p>{data.Name}</p>
                                <button onClick={()=>Approve(data._id)}>Approve</button>
                                <button>Reject</button>
                            </div>)}
                        {apr.length==0 && <p>Nothing Is Pending...</p>}
                    </div>
                </div>
            </div>
        </>
    )
}
export default TopTier;