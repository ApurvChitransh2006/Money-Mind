import {useContext, useEffect, useState} from "react";
import axiosInstance from "../api/axiosInstance.js";
import { myContext } from "../context/ContextProvider.jsx";

const DashProfile = () => {
    const { user, income, expense } = useContext(myContext)

    return (
        <div className={`bg-[#222] rounded-xl shadow-lg p-3 md:p-6 flex flex-col justify-center w-full md:max-w-[700px] mx-auto mt-16`}>
            <div className={`text-3xl capitalize`}>Hey, {user.username}!</div>
            <div className={`grid grid-cols-12 mt-3`}>
                <div className={`col-span-12 md:col-span-4 bg-[#333] mx-2 my-2 rounded-lg px-3 py-1 text-white shadow-md flex flex-col`}>
                    <div className={`text-md text-start`}>Total Income:</div>
                    <div className={`text-3xl text-end`}>₹ {income}</div>
                </div>
                <div className={`col-span-12 md:col-span-4 bg-[#333] mx-2 my-2 rounded-lg px-3 py-1 text-white shadow-md flex flex-col`}>
                    <div className={`text-md text-start`}>Total Expense:</div>
                    <div className={`text-3xl text-end`}>₹ {expense}</div>
                </div>
                <div className={`col-span-12 md:col-span-4 ${((income-expense)>0)?`bg-[#232]`:`bg-[#322]`} mx-2 my-2 rounded-lg px-3 py-1 text-white shadow-md flex flex-col`}>
                    <div className={`text-md text-start`}>Total Saving:</div>
                    <div className={`text-3xl text-end`}>₹ {income-expense}</div>
                </div>
            </div>
        </div>
    )
}

export default DashProfile