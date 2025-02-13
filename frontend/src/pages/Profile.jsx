import { useContext, useState } from "react";
import { myContext } from "../context/ContextProvider.jsx";
import axiosInstance from "../api/axiosInstance.js";
import Appnav from "../components/PageEssentials/Appnav.jsx";

const Profile = () => {
    const { user, setUser } = useContext(myContext);
    const [editingField, setEditingField] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const saveForm = async () => {
        try {
            setLoading(true);
            const updatedUser = await axiosInstance.put(`/user/${user._id}`, user);
            setMessage("Profile updated successfully!");
            setEditingField(null);
        } catch (error) {
            setMessage("Error updating profile. Please try again.");
            console.error("Error updating user:", error);
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
        }
    };

    return (
        <>
            <Appnav init={user.username[0]} />
            <div className="h-[80vh] flex justify-center items-center text-white">
                <div className="bg-[#222] shadow-lg rounded-xl w-full max-w-md p-6 flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-4">Profile</h1>

                    {message && (
                        <div className="mb-4 text-sm font-semibold text-center bg-green-500 text-white px-4 py-2 rounded-md w-full">
                            {message}
                        </div>
                    )}

                    <div className="w-full space-y-4">
                        {/* User ID (Read-Only) */}
                        <div className="flex items-center justify-between bg-[#555] px-4 py-3 rounded-lg">
                            <span className="font-semibold">ID:</span>
                            <span>{user._id}</span>
                        </div>

                        {/* Username Field */}
                        <div className="flex flex-col gap-2 bg-[#555] px-4 py-3 rounded-lg">
                            <label className="font-semibold">Name:</label>
                            {editingField === "username" ? (
                                <div className="flex gap-2">
                                    <input
                                        className="flex-1 px-3 py-2 text-black rounded-md focus:outline-none"
                                        value={user.username}
                                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                                        type="text"
                                    />
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
                                        onClick={saveForm}
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-between">
                                    <span>{user.username}</span>
                                    <button
                                        className="text-blue-400 hover:text-blue-500"
                                        onClick={() => setEditingField("username")}
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col gap-2 bg-[#555] px-4 py-3 rounded-lg">
                            <label className="font-semibold">Email:</label>
                            {editingField === "email" ? (
                                <div className="flex gap-2">
                                    <input
                                        className="flex-1 px-3 py-2 text-black rounded-md focus:outline-none"
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        type="text"
                                    />
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
                                        onClick={saveForm}
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-between">
                                    <span>{user.email}</span>
                                    <button
                                        className="text-blue-400 hover:text-blue-500"
                                        onClick={() => setEditingField("email")}
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
