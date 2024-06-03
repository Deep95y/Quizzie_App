import axios from "axios";

const AuthQuizAnalysisDetails = async (id) => {
    try {
        const analysisdetails_link = `${import.meta.env.VITE_API_URL}/quiz/GetQuizAnalysisDetails/${id}`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;

        const response = await axios.get(analysisdetails_link);
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error; // Throw the error to be handled by the calling function
    }
};

export default AuthQuizAnalysisDetails;
