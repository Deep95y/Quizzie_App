import axios from "axios";

const DeleteQuiz = ({id, setshowbox, fetchDetailedSummary}) => {

    const confirmDelete = async (id) => {
        try {
            const deleteLink = `${import.meta.env.VITE_API_URL}/quiz/deleteById/${id}`;
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.delete(deleteLink);
            setshowbox(false);
            fetchDetailedSummary();
            return response.data;
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            throw error;
        }
    };

    return(
        <>
        <div style={{height:'10rem',width:'30rem',borderRadius:'.9375rem',borderStyle:'none',margin:'auto',background:'white',display:'flex',flexDirection:'column',marginTop:'10%'}}>
              <div style={{marginLeft:'6rem',fontSize:'2rem'}}>Are you confirm you<div style={{marginLeft:'2.5rem',position:'absolute',marginBottom:'10px'}}>want to delete?</div></div>
               <div style={{display:'flex',flexDirection:'row',marginTop:'12%',marginLeft:'3rem'}}>
                     <div><button type="button" style={{height:'2rem',width:'9.375rem',background:'#FF4B4B',borderRadius:'.5rem',borderStyle:'none',color:'white',paddingLeft:'30px',fontSize:'15px'}} onClick={() => confirmDelete(id)}>Confirm Delete</button></div>
                     <div><button type="button" style={{height:'2rem',width:'9.375rem',background:'#EDEDED',borderRadius:'.5rem',borderStyle:'none',marginLeft:'1.25rem',paddingLeft:'35px',fontSize:'15px'}} onClick={() => setshowbox(false)}>Cancel</button></div>
               </div>
        </div>
        </>
    );
}

export default DeleteQuiz;