import { useState,useEffect } from "react";
import Cookies from 'js-cookie';
import "../Styles/Home.css"

function Home(){
    const LoginId=Cookies.get('Account');
    const LoginRole=Cookies.get('Account_Role');
    const [UPEvent,setUPEvent]=useState(["No Events..."]);
    const [LAEvent,setLAEvent]=useState(["No Events..."]);

    return(
        <>
            <div>
                <p>{LoginRole}</p>
                {/* ------------ UPCOMING EVENTS ---------------- */}
                <div id="Upcoming_Events"> 
                    {UPEvent.map((cont)=>(
                        <p>{cont}</p>
                    ))}
                </div>
                {/* ------------ PAST EVENTS ---------------- */}
                <div id="Past_Events">
                    {LAEvent.map((cont)=>(
                        <p>{cont}</p>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Home;