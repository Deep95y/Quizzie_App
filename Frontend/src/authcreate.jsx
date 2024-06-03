import axios from "axios";

const AuthCreate = async(quiztitle, quiztype, slides) => {

    try{
       const CreateLink = `${import.meta.env.VITE_API_URL}/quiz/createData`;
       const token = localStorage.getItem("token");
       console.log(token);
       axios.defaults.headers.common["Authorization"] = token; 
       const Response = await axios.post(CreateLink,{ 
        title: quiztitle, 
        type: quiztype,
        slides: slides.slidedata 
       });
       if (Response.data.status == "success"){
        return Response.data.data._id
    } 
    else{
       console.error("unsuccessful");
    }
       
    }
    catch(error){
        console.log(error); 
        alert("something went wrong"); 
    }
}

export default AuthCreate;