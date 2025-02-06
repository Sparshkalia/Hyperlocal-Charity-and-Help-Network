"use client";
import {useState} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {useRouter} from 'next/navigation';
import Glogo from './Glogo.png';
import Alogo from './Alogo.png';
import axios from 'axios';

const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const route = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', {
                username: email,
                password: password,
            }, {
                withCredentials: true
            });
    
            const userId = response.data.user_id;
            localStorage.setItem("userId", userId);
            route.push("/mainWeb");
    
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <StyledWrapper>
        <div className="flex justify-center items-center min-h-screen">
            <form className="form flex justify-center" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex-column">
                    <label>Email </label>
                </div>
                <div className="inputForm">
                    <input type="text" className="input text-black" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)} size="40"/>
                </div>
                <div className="flex-column">
                    <label>Password </label>
                </div>
                <div className="inputForm text-black">
                    <input type="password" className="input" placeholder="Enter your Password" value={password} onChange={(e)=>setPassword(e.target.value)} size="40"/>
                </div>
                <div className="flex-row">
                    <div>
                        <input type="checkbox" />
                        <label>Remember me </label>
                    </div>
                    <span className="span hover:underline">Forgot password?</span>
                </div>
                <button className="button-submit">Sign In</button>
                <p className="p">
                    Don't have an account? <span className="span hover:underline">Sign Up</span>
                </p>
                <p className="p line">Or With</p>
                <div className="flex-row">
                    <button className="btn google text-black p-2">
                        <Image src={Glogo} alt="Google" width={30} height={30} className="mx-2" />
                        Google
                    </button>
                    <button className="btn apple text-black p-2">
                        <Image src={Alogo} alt="Apple" width={30} height={30} className="mx-2" />
                        Apple
                    </button>
                </div>
            </form>
        </div>
    </StyledWrapper>
    );
};


const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #C0C0C0;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    background-color: #FFFFFF;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    transition: 0.2s ease-in-out;
  }

 .input {
    padding-left: 10px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
}
  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .button-submit:hover {
    background-color: #252727;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #2d79f3;
    ;
  }`;


export default Form;
