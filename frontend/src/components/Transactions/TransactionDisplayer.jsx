import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance.js";
import { myContext } from "../../context/ContextProvider.jsx";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";

const TransactionDisplayer = () => {
    const { user, transactionList, getTransactionlist } = useContext(myContext);

    const [editingId, setEditingId] = useState(null);
    const [editAmount, setEditAmount] = useState("");
    const [editDescription, setEditDescription] = useState("");

    useEffect(() => {
        getTransactionlist();
    }, []);

    const deletetrans = async (id) => {
        try {
            await axiosInstance.delete(`/trans/${id}`);
            getTransactionlist();
        } catch (e) {
            console.log(e);
        }
    };

    const editTransaction = (transaction) => {
        setEditingId(transaction._id);
        setEditAmount(transaction.amount);
        setEditDescription(transaction.description);
    };

    const saveTransaction = async (id) => {
        try {
            await axiosInstance.put(`/trans/${id}`, { amount: editAmount, description: editDescription });
            getTransactionlist();
            setEditingId(null);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="bg-[#222] rounded-xl shadow-lg p-4 md:p-6 flex flex-col w-full md:max-w-[700px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-white">Transactions</h2>
            <div className="w-full mt-4 max-h-screen overflow-y-auto flex flex-col gap-2">
                {transactionList.map((transaction) => (
                    <div
                        key={transaction._id}
                        className={`rounded-lg px-4 py-2 text-white shadow-md w-full flex justify-between items-center ${
                            transaction.type === "income" ? "bg-[#343]" : "bg-[#433]"
                        }`}
                    >
                        <div className="flex-1">
                            {/* Editing Mode */}
                            {editingId === transaction._id ? (
                                <>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-1"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        className="w-full px-2 py-1 rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        value={editAmount}
                                        onChange={(e) => setEditAmount(e.target.value)}
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="text-lg font-semibold">
                                        {transaction.type === "income" ? transaction.in_category : transaction.ex_category}
                                    </div>
                                    <div className="text-sm text-gray-300">{transaction.description}</div>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Amount Display */}
                            {editingId === transaction._id ? (
                                <button
                                    className="text-green-400 hover:text-green-300 transition duration-300"
                                    onClick={() => saveTransaction(transaction._id)}
                                >
                                    <MdSave size={24} />
                                </button>
                            ) : (
                                <div className="text-lg font-medium whitespace-nowrap">₹ {transaction.amount}</div>
                            )}

                            {/* Edit Button */}
                            {editingId !== transaction._id && (
                                <button
                                    className="text-blue-400 hover:text-blue-300 transition duration-300"
                                    onClick={() => editTransaction(transaction)}
                                >
                                    <MdEdit size={22} />
                                </button>
                            )}

                            {/* Delete Button */}
                            <button
                                className="text-red-400 hover:text-red-300 transition duration-300"
                                onClick={() => deletetrans(transaction._id)}
                            >
                                <MdDelete size={22} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionDisplayer;
