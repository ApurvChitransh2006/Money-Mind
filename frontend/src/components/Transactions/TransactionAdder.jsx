import { useContext, useState } from "react";
import axiosInstance from "../../api/axiosInstance.js";
import { myContext } from "../../context/ContextProvider.jsx";

const TransactionAdder = () => {
    const { user, getTransactionlist } = useContext(myContext);
    const ex_category_list = ['Food', 'Rent', 'Entertainment', 'Transport', 'Utilities', 'Other']
    const in_category_list = ['Salary', 'Pocket Money', 'Gifts', 'Other']
    const [typeTracker, setTypeTracker] = useState("income")
    const [in_category, setIn_category] = useState(in_category_list[0])
    const [ex_category, setEx_category] = useState(ex_category_list[0])
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")

    const handleForm = async (e)=>{
        e.preventDefault();
        try{
            console.log(typeTracker)
            var body = {}
            if (typeTracker == "income"){
                body={
                    userId: user._id,
                    type: typeTracker,
                    in_category: in_category,
                    amount: amount,
                    description: description
                }
            } else{
                body={
                    userId: user._id,
                    type: typeTracker,
                    ex_category: ex_category,
                    amount: amount,
                    description: description
                }
            }
            const data = await axiosInstance.post('/trans/',  body)
            console.log(data)
            setTypeTracker("income")
            setIn_category(in_category_list[0])
            setEx_category(ex_category_list[0])
            setDescription("")
            setAmount("")
            getTransactionlist()

        }catch(err){
            console.log(err)
            setTypeTracker("income")
            setIn_category(in_category_list[0])
            setEx_category(ex_category_list[0])
            setDescription("")
            setAmount("")
        }
    }

    return (
        <div className="bg-[#222] rounded-xl shadow-lg p-3 md:p-6 flex flex-col justify-center w-full md:max-w-[700px] mx-auto">
            <div className={`text-3xl md:text-4xl font-semibold text-center text-white`}>Entry</div>
            <div>
                <form onSubmit={handleForm} className={`w-full flex flex-col gap-4 mt-2`}>
                    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                        <select
                            className="flex-1 w-full  sm:w-auto px-3 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={typeTracker}
                            onChange={(e) => setTypeTracker(e.target.value)}
                        >
                            <option value="income">income</option>
                            <option value="expense">expense</option>
                        </select>
                    </div>
                    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                        {
                            (typeTracker === "income") ? (
                                <>
                                    <select
                                        className="flex-1 w-full sm:w-auto px-3 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        value={in_category}
                                        onChange={(e) => setIn_category(e.target.value)}
                                    >
                                        {in_category_list.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            ) : (
                                <>
                                    <select
                                        className="flex-1 w-full sm:w-auto px-3 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        value={ex_category}
                                        onChange={(e) => setEx_category(e.target.value)}
                                    >
                                        {ex_category_list.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )
                        }
                    </div>
                    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                        <input className={`w-full flex-1 sm:w-auto px-3 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400`} placeholder={`Description`} value={description} onChange={(e)=>setDescription(e.target.value)} type="text"/>
                    </div>
                    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                        <input className={`w-full flex-1 sm:w-auto px-3 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400`} placeholder={`Amount`} value={amount} onChange={(e)=>setAmount(e.target.value)}  type="text"/>
                    </div>
                    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg text-lg transition duration-300">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TransactionAdder