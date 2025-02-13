import axiosInstance from "../api/axiosInstance.js";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../context/ContextProvider.jsx";

function BudgetSetter() {
    const categories = ["Food", "Rent", "Entertainment", "Transport", "Utilities", "Other"];
    const { user } = useContext(myContext);

    const [budgetData, setBudgetData] = useState([]);
    const [amount, setAmount] = useState("");
    const [mainAmount, setMainAmount] = useState("");
    const [editingItem, setEditingItem] = useState(null);
    const [categoryw, setCategoryw] = useState("");

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

    const addBudget = async (body) => {
        try {
            await axiosInstance.post(`/budget/`, body);
            budgetDataLoader();
            setAmount("");
            setMainAmount("");
            setCategoryw(""); // Reset category selection
        } catch (err) {
            console.log(err);
        }
    };

    const deleteBudget = async (id) => {
        try {
            await axiosInstance.delete(`/budget/${id}`);
            budgetDataLoader();
        } catch (err) {
            console.error("Error deleting budget entry:", err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!mainAmount || isNaN(mainAmount)) {
            alert("Please enter a valid amount.");
            return;
        }
        addBudget({ userId: user._id, amount: mainAmount, category: categoryw });
    };

    const editButtonFunction = (id, amount) => {
        setAmount(amount);
        setEditingItem(id);
    };

    const saveButtonFunction = async (id) => {
        try {
            await axiosInstance.put(`/budget/${id}`, { amount: amount });
            budgetDataLoader();
            setAmount("");
            setEditingItem(null);
        } catch (err) {
            console.error("Error changing budget data:", err);
        }
    };

    // Filter categories that already have a budget
    const assignedCategories = budgetData.map((item) => item.category);
    const availableCategories = categories.filter((cat) => !assignedCategories.includes(cat));

    return (
        <div className="bg-[#222] rounded-xl shadow-lg p-4 md:p-6 flex flex-col w-full md:max-w-[700px] mx-auto mb-3">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-white">Budget</h2>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
                <input
                    id="amount"
                    type="number"
                    className="w-full px-3 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter amount"
                    value={mainAmount}
                    onChange={(e) => setMainAmount(e.target.value)}
                />

                <select
                    id="category"
                    className="w-full px-3 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={categoryw}
                    onChange={(e) => setCategoryw(e.target.value)}
                    disabled={availableCategories.length === 0}
                >
                    {availableCategories.length > 0 ? (
                        availableCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>
                            No categories available
                        </option>
                    )}
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg text-lg transition duration-300"
                    disabled={!categoryw}
                >
                    Save
                </button>
            </form>

            {/* Budget List */}
            <div className="mt-5 space-y-3 w-full">
                {budgetData.map((item) => (
                    <div key={item._id} className="flex items-center justify-between bg-[#333] rounded-lg p-3 text-white shadow-md">
                        <div className="flex-1 font-semibold">{item.category}</div>

                        {editingItem === item._id ? (
                            <div className="flex gap-2">
                                <input
                                    className="w-20 px-2 py-1 rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                />
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition duration-300"
                                    onClick={() => saveButtonFunction(item._id)}
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <div className="text-lg font-medium">₹ {item.amount}</div>
                                <button
                                    className="text-blue-400 hover:text-blue-300 transition duration-300"
                                    onClick={() => editButtonFunction(item._id, item.amount)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-400 hover:text-red-300 transition duration-300"
                                    onClick={() => deleteBudget(item._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BudgetSetter;
