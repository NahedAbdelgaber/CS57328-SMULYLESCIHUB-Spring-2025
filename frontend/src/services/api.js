import axios from "axios";

const API_URL = "http://localhost:8081/api/employees";

export const getEmployees = async() => {
    return await axios.get(API_URL);
};

export const addEmployee = async(employee) => {
    return await axios.post(API_URL, employee, {
        headers: {"Content-Type": "application/json"}
    });
};

export const deleteEmployee = async(id) => {
    return await axios.delete(`${API_URL}/${id}`);
};