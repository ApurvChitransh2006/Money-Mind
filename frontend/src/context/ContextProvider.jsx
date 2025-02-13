import { createContext, useState, useEffect } from "react"
import axiosInstance from "../api/axiosInstance.js";

// eslint-disable-next-line react-refresh/only-export-components
export const myContext = createContext(); // Corrected context declaration

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [transactionList, setTransactionList] = useState([])
    const [income, setIncome] = useState()
    const [expense, setExpense] = useState()

    const getTransactionlist = async () => {
        try {
            const data = await axiosInstance.get(`/trans/${user._id}`);
            setTransactionList(data.data.reverse())
            console.log(transactionList)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const calc = () => {
            let total_income = 0;
            let total_expense = 0;

            transactionList.forEach((transaction) => {
                if (transaction.type === "income") {
                    total_income += transaction.amount;
                } else {
                    total_expense += transaction.amount;
                }
            });

            setIncome(total_income);
            setExpense(total_expense);
        }
        calc()
    }, [transactionList]); // Recalculate when transactionList updates

    return (
        <myContext.Provider value={{ user, setUser, transactionList, getTransactionlist, income, expense }}>
            {children}
        </myContext.Provider>
    );
}

export default ContextProvider