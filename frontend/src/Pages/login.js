import "../Styles/Login.css";
import { useState,useEffect } from "react";
import Cookies from 'js-cookie';

function Login(){

    const URL="http://localhost:4689"

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

    // -------------------- POST ------------------


    const SignUpAccount = async (AccountData) => {

        document.querySelector("#Loading").style="display:flex;";

        try {
        
            const response = await fetch(URL+'/api/log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(AccountData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Response data:', responseData);
            window.location.href = '/';
        } catch (error) {
            console.error('Error during POST request:', error);
        }
    };

    // -------------- LOADING --------------

    useEffect(()=>{
        if(LogData.length===0){
            document.querySelector("#Loading").style="display:flex;";
        }else{
            document.querySelector("#Loading").style="display:none;";
        }
    },[LogData])

    // -------------------------------------------------------


    // ------------------------ L O G I N ----------------------------

    const OpenLogin=()=>{
        document.querySelector("#Login-Form").style="display:flex;";
        document.querySelector("#Signup-Form").style="display:none;";
    }
    
    const VerifyLogin=(e)=>{
        e.preventDefault();
        let RegNo=document.querySelector("#Login-Regno").value;
        let Password=document.querySelector("#Login-Password").value;
        for(let Log of LogData){
            if(Log.RegNo===RegNo){
                if(Log.Password===Password){
                    Cookies.set('Account', Log._id);
                    window.location.href="/Home";
                }else{
                    alert("Password Incorrect !")
                }
            }
        }
    }

    // ---------------------------------------------------------------

    // ------------------------ S I G N U P --------------------------

    const OpenSignup=()=>{
        document.querySelector("#Login-Form").style="display:none;";
        document.querySelector("#Signup-Form").style="display:flex;";
    }

    const CreateAccount=(e)=>{
        e.preventDefault();
        const Name=document.querySelector("#Signup-Name").value;
        const RegNo=document.querySelector("#Signup-Regno").value;
        const Department=document.querySelector("#Signup-Department").value;
        const Password=document.querySelector("#Signup-Password").value;
        const ConPassword=document.querySelector("#Signup-ConPassword").value;
        if(Password===ConPassword){
            let AccountData={"Name":Name,"RegNo":RegNo,"Department":Department,"Password":Password};
            SignUpAccount(AccountData);
        }else{
            alert("Password Not Match !")
        }
    }

    // ----------------------------------------------------------------

    return(
        <>
        
        {/* ----------- M A I N ----------- */}

        <div>
            <p>Hello</p>
            <form id="Login-Form" onSubmit={VerifyLogin}>
                <p>LogIn</p>
                <input placeholder="RegNo" id="Login-Regno"></input>
                <input placeholder="Password" id="Login-Password"></input>
                <button type="submit">Submit</button>
                <p>Don't Have Account ?<button type="button" onClick={OpenSignup}> SignUp. </button></p>
            </form>
            <form id="Signup-Form" onSubmit={CreateAccount}>
                <p>SignUp</p>
                <input placeholder="Name" id="Signup-Name"></input>
                <input placeholder="RegNo" id="Signup-Regno"></input>
                <input placeholder="Department" id="Signup-Department"></input>
                <input placeholder="Password" id="Signup-Password"></input>
                <input placeholder="Confrim Password" id="Signup-ConPassword"></input>
                <button type="submit">Submit</button>
                <p>Already Have Account ?<button type="button" onClick={OpenLogin}> Login. </button></p>
            </form>
        </div>

        {/* ---------------- L O A D I N G -------------- */}

        <div id="Loading">
            <p>Loading...</p>
        </div>
        </>
    );
}

export default Login