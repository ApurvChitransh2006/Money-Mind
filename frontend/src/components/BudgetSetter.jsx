import axiosInstance from "../api/axiosInstance.js";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../context/ContextProvider.jsx";

function BudgetSetter() {
    const categories = ["Food", "Rent", "Entertainment", "Transport", "Utilities", "Other"];

    const { user } = useContext(myContext);
    const [budgetData, setBudgetData] = useState([]);
    const [amount, setAmount] = useState("")
    const [mainAmount, setMainAmount] = useState("")
    const [editingItem, setEditingItem] = useState(null)
    const [categoryw, setCategoryw] = useState(categories[0]); // Default to first category

    const budgetDataLoader = async () => {
        try {
            const response = await axiosInstance.get(`/budget/${user._id}`);
            setBudgetData(response.data);
        } catch (err) {
            console.error("Error fetching budget data:", err);
        }
    };

    useEffect(() => {
        budgetDataLoader();
    }, []);

    const addBudget = async (body)=>{
        try {
            const data = await axiosInstance.post(`/budget/`, body);
            budgetDataLoader()
            setAmount("");
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!mainAmount || isNaN(mainAmount)) {
            alert("Please enter a valid amount.");
            return;
        }
        addBudget({ userId: user._id, amount: mainAmount, category: categoryw });
    };

    const editButtonFunction = async (id, amount) => {
        await setAmount(amount);
        setEditingItem(id);
    }

    const saveButtonFunction = async (id) => {
        try{
            const body = {amount: amount}
            const newData = await axiosInstance.put(`/budget/${id}`, body)
            budgetDataLoader()
            setAmount("")
        } catch (err) {
            console.error("Error changing budget data:", err);
        }
        setEditingItem(null);
    }

    return (
        <div className="bg-[#222] rounded-xl shadow-lg p-3 md:p-6 flex flex-col justify-center w-full md:max-w-[700px] mx-auto mb-3">
            <div className="text-3xl md:text-4xl font-semibold text-center text-white">Budget</div>

            <div className="mt-4 flex flex-col justify-center w-full">
                {/* Form Section */}
                <div className="w-full">
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                        {/* Amount Input */}
                        <div className="w-full flex flex-wrap items-center gap-2 sm:gap-3">
                            <input
                                id="amount"
                                type="number"
                                className="flex-1 min-w-[100px] px-3 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Amount"
                                value={mainAmount}
                                onChange={(e) => setMainAmount(e.target.value)}
                            />
                        </div>

                        {/* Category (Moves Below on Mobile) */}
                        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                            <select
                                id="category"
                                className="flex-1 w-full sm:w-auto px-3 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={categoryw}
                                onChange={(e) => setCategoryw(e.target.value)}
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Large Button Below */}
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg text-lg transition duration-300">
                            Save
                        </button>
                    </form>
                </div>

                {/* Budget List Section */}
                <div className="mt-5 space-y-3 w-full">
                    {budgetData.map((item) =>
                            item.month === "2025-02" && (
                                <div key={item._id} className="grid grid-cols-12 sm:grid-cols-12 items-center my-2 bg-[#333] rounded-lg p-3 text-white shadow-md w-full">
                                    <div className="col-span-6 font-semibold">{item.category}</div>

                                    {editingItem === `${item._id}` ? (
                                        <>
                                            <div className="col-span-3">
                                                <input
                                                    className="w-full py-1 px-2 rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    type="number"
                                                />
                                            </div>
                                            <div className="col-span-3 text-center">
                                                <button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-2 md:px-4 py-1 rounded-lg transition duration-300" onClick={() => saveButtonFunction(item._id)}>
                                                    Save
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="col-span-3 text-lg font-medium">₹ {item.amount}</div>
                                            <div className="col-span-3">
                                                <button className="text-blue-400 hover:text-blue-300 text-lg px-4 transition duration-300" onClick={() => editButtonFunction(item._id, item.amount)}>
                                                    Edit
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )
                    )}
                </div>
            </div>
        </div>

    );
}

export default BudgetSetter;
