import axios from "axios";

const AuthLogin = async(formData) => { 
 
    try{
      
       const Reglink = `${import.meta.env.VITE_API_URL}/auth/login`;
       const Response = await axios.post(Reglink, formData);
       localStorage.setItem("token", Response.data.jwToken);
       if (Response.data.status == "Login successful"){
            window.location.href = '/sidebar';
        } 
        else{
           console.error("login unsuccessful");
        }
    } 
    catch(error){
        console.log(error);
        alert("Something went wrong")
    }
}

export default AuthLogin;