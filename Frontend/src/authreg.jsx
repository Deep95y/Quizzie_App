
import axios from "axios";
import React from 'react';


const AuthReg = async(formData) => {
    
    try{
        const Reglink = `${import.meta.env.VITE_API_URL}/auth/signup`;
        const Response = await axios.post(Reglink, formData);
    }
    catch(error){
        console.log(error);
        alert("Something went wrong")
    }
}

export default AuthReg;