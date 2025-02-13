import {useContext, useEffect, useState} from "react";
import axiosInstance from "../../api/axiosInstance.js";
import { myContext } from "../../context/ContextProvider.jsx";
import { MdDelete } from "react-icons/md";


const TransactionDisplayer = () => {
    const { user, transactionList, getTransactionlist } = useContext(myContext)

    useEffect(() => {
        getTransactionlist()
    }, []);

    useEffect(() => {
        console.log("hhh", transactionList);
    }, [transactionList]);

    const deletetrans = async (id) => {
        try {
            const msg = await axiosInstance.delete(`/trans/${id}`)
            getTransactionlist()
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="bg-[#222] rounded-xl shadow-lg p-3 md:p-6 flex flex-col justify-center w-full md:max-w-[700px] mx-auto">
            <div className={`text-3xl md:text-4xl font-semibold text-center text-white`}>Transactions</div>
            <div className="w-full mt-3 max-h-screen overflow-y-auto flex flex-col items-start sm:items-center gap-1 sm:gap-3">
                {transactionList.map((transaction) => (
                    (transaction.type === 'income')?(
                        <div key={transaction._id} className={`bg-[#343] rounded-lg px-3 py-1 text-white shadow-md w-full`}>
                            <div className={`flex justify-between`}>
                                <div className={`flex flex-col`}>
                                    <div className={`text-lg`}>{transaction.in_category}</div>
                                    <div className={` text-sm`}>{transaction.description}</div>
                                </div>
                                <div className={`text-2xl flex `}>
                                    <div className={`whitespace-nowrap`}>₹ {transaction.amount}</div>
                                    <div><button onClick={()=>deletetrans(transaction._id)}><MdDelete className={`pt-1 hover:text-red-600`}/></button></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key={transaction._id} className={`bg-[#433] rounded-lg px-3 py-1 text-white shadow-md w-full`}>
                            <div className={`flex justify-between`}>
                                <div className={`flex flex-col`}>
                                    <div className={`text-lg`}>{transaction.ex_category}</div>
                                    <div className={` text-sm`}>{transaction.description}</div>
                                </div>
                                <div className={`text-2xl flex items-center`}>
                                    <div className={`whitespace-nowrap`}>₹ {transaction.amount}</div>
                                    <div><button onClick={()=>deletetrans(transaction._id)}><MdDelete className={`pt-1 hover:text-red-600`}/></button></div>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default TransactionDisplayer