import {useContext, useEffect, useState} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { myContext } from "../context/ContextProvider.jsx";
import axiosInstance from "../api/axiosInstance.js";

const Chart = () => {
    const [data, setData] = useState([]);
    const { user, transactionList } = useContext(myContext);

    useEffect(() => {
        axiosInstance.get(`/special/category-wise-data?userId=${user._id}`)
            .then(response => {
                console.log("Fetched Data:", response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error("API Error:", error.response ? error.response.data : error.message);
            });
    }, [user, transactionList]);

    return (
        <div className={`bg-[#222] rounded-xl shadow-lg p-3 md:p-6 w-full md:max-w-[700px] mx-auto mb-3`}>
            <ResponsiveContainer width="100%" height={400} >
                <LineChart data={data} margin={{ bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Line type="monotone" dataKey="budget" stroke="#8884d8" name="Budget" />
                    <Line type="monotone" dataKey="expense" stroke="#82ca9d" name="Expense" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
