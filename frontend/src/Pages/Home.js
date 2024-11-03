import { useState,useEffect } from "react";
import Cookies from 'js-cookie';
import "../Styles/Home.css"

function Home(){
    const LoginId=Cookies.get('Account');
    const LoginRole=Cookies.get('Account_Role');
    const [UPEvent,setUPEvent]=useState(["No Events..."]);
    const [LAEvent,setLAEvent]=useState(["No Events..."]);

    const LogOut = ()=>{
        Cookies.set('Account',"" );
        Cookies.set('Account_Role', "");
        window.location.href="/Login";
    }

    

    const [data,setdata]=useState([]);
    useEffect(() => {
        if (LoginRole == "A1") {
            setdata([["Circular","/Circular"],["Report"],["Poster"],["Magazine"],["Social"]]);
        }else if (LoginRole == "AF") {
            setdata([["Association","/Association"],["Circular","/Circular"],["Report"],["Poster"],["Magazine"],["Social"]]);
        }else if(LoginRole=="HOD"||LoginRole=="VP"||LoginRole=="P"){
            setdata([["Approve","/Approve"]]);
        }else if(LoginRole=="Poster"){
            setdata([["Poster","/Poster"]])
        }else if(LoginRole=="Magazine"){
            setdata([["Magazine","Magazine"]])
        }else if(LoginRole=="Social"){
            setdata([["Social","/Social"]])
        }
      }, [LoginRole])


    return(
        <>
            <div className="h">
                <div className="Navbar">
                    <div>
                        <p>Home</p>
                    </div>
                    <div className="nav-cet">
                        
                        <a onClick={()=>{window.location.href="/Event"}}>Event</a>
                        {data.map((d,eid) => 
                            <a onClick={()=>{window.location.href=d[1]}}>{d[0]}</a>)}
                    </div>
                    <div className="nav-rig">
                        <a onClick={LogOut}>Logout</a>
                    </div>
                </div>
                

                <div>
                    <p>{LoginRole}</p>
                </div>
            </div>
        </>
    )
}
export default Home;