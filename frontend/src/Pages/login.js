import "../Styles/Login.css";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

function Login() {
    const URL = "http://localhost:4689";

    // ---------------------- API FETCH --------------------------
    const [LogData, setLogData] = useState([]);

    useEffect(() => {
        const apiUrl = URL + '/api/log';

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
        document.querySelector("#Loading").style = "display:flex;";

        try {
            const response = await fetch(URL + '/api/log', {
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
    useEffect(() => {
        if (LogData.length === 0) {
            document.querySelector("#Loading").style = "display:flex;";
        } else {
            document.querySelector("#Loading").style = "display:none;";
        }
    }, [LogData]);

    // ------------------------ LOGIN ----------------------------
    const OpenLogin = () => {
        document.querySelector("#Login-Form").style = "display:flex;";
        document.querySelector("#Signup-Form").style = "display:none;";
    };

    const VerifyLogin = (e) => {
        e.preventDefault();
        
        const RegNo = document.querySelector("#Login-Regno").value;
        const Password = document.querySelector("#Login-Password").value;

        if (!RegNo || !Password) {
            alert("Please fill in all fields.");
            return;
        }

        let validLogin = false;
        for (let Log of LogData) {
            if (Log.RegNo === RegNo) {
                if (Log.Password === Password) {
                    Cookies.set('Account', Log._id);
                    Cookies.set('Account_Role', Log.Role);
                    window.location.href = "/Home";
                    validLogin = true;
                    break;
                } else {
                    alert("Password Incorrect!");
                    validLogin = true;
                }
            }
        }
        
        if (!validLogin) {
            alert("Registration Number not found.");
        }
    };

    // ------------------------ SIGNUP --------------------------
    const OpenSignup = () => {
        document.querySelector("#Login-Form").style = "display:none;";
        document.querySelector("#Signup-Form").style = "display:flex;";
    };

    const CreateAccount = (e) => {
        e.preventDefault();
        
        const Name = document.querySelector("#Signup-Name").value;
        const RegNo = document.querySelector("#Signup-Regno").value;
        const Department = document.querySelector("#Signup-Department").value;
        const Password = document.querySelector("#Signup-Password").value;
        const ConPassword = document.querySelector("#Signup-ConPassword").value;

        if (!Name || !RegNo || !Department || !Password || !ConPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (Password !== ConPassword) {
            alert("Passwords do not match!");
            return;
        }

        const AccountData = { "Name": Name, "RegNo": RegNo, "Department": Department, "Password": Password };
        SignUpAccount(AccountData);
    };

    return (
        <>
            {/* ----------- M A I N ----------- */}
            <div>
                
                <form id="Login-Form" onSubmit={VerifyLogin}>
                    <p>LogIn</p>
                    <input placeholder="RegNo" id="Login-Regno" />
                    <input placeholder="Password" id="Login-Password" type="password" />
                    <button type="submit">Submit</button>
                    <p>Don't Have Account? <button type="button" onClick={OpenSignup}> SignUp. </button></p>
                </form>
                <form id="Signup-Form" onSubmit={CreateAccount} style={{ display: 'none' }}>
                    <p>SignUp</p>
                    <input placeholder="Name" id="Signup-Name" />
                    <input placeholder="RegNo" id="Signup-Regno" />
                    <input placeholder="Department" id="Signup-Department" />
                    <input placeholder="Password" id="Signup-Password" type="password" />
                    <input placeholder="Confirm Password" id="Signup-ConPassword" type="password" />
                    <button type="submit">Submit</button>
                    <p>Already Have Account? <button type="button" onClick={OpenLogin}> Login. </button></p>
                </form>
            </div>

            {/* ---------------- L O A D I N G -------------- */}
            <div id="Loading" style={{ display: 'none' }}>
                <p>Loading...</p>
            </div>
        </>
    );
}

export default Login;
