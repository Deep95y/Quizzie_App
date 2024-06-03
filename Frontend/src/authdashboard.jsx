import axios from "axios";

const AuthDashboard = async () => {
    try {
        const dashboardLink = `${import.meta.env.VITE_API_URL}/quiz/getSummary`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;

        const response = await axios.get(dashboardLink);
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error; // Throw the error to be handled by the calling function
    }
};

export default AuthDashboard;
