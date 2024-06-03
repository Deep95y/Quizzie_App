import axios from "axios";

const AuthEditQuiz = async(quizId, quiztitle, slides) => {

    try{
       const editLink = `${import.meta.env.VITE_API_URL}/quiz/editQuiz`;
       const token = localStorage.getItem("token");
       axios.defaults.headers.common["Authorization"] = token; 
       const Response = await axios.patch(editLink,{ 
        id: quizId,
        title: quiztitle,
        slides: slides.slidedata
       });

       if (Response.status == 200){
        return Response.data._id
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

export default AuthEditQuiz;