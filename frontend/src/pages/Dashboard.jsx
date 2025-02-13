import { useContext } from 'react'
import { myContext } from '../context/ContextProvider.jsx'
import Appnav from '../components/PageEssentials/Appnav.jsx'
import BudgetSetter from '../components/BudgetSetter'
import TransactionAdder from '../components/Transactions/TransactionAdder.jsx'
import TransactionDisplayer from '../components/Transactions/TransactionDisplayer.jsx'
import DashProfile from "../components/DashProfile.jsx";
import Chart from '../components/Chart';

const Dashboard = () => {
    const { user } = useContext(myContext)
    return (
        <>
            <Appnav init={user.username[0]} />
            <div className='text-white w-full flex flex-col justify-center items-center px-2 md:px-12 gap-12'>
                <DashProfile/>
                <TransactionAdder/>
                <TransactionDisplayer/>
                <BudgetSetter/>
                <Chart/>
            </div>
        </>
    )
}

export default Dashboard