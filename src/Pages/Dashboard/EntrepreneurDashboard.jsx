import EntrepreneurCard from "../../Components/Entrepreneur/EntrepreneurCard";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";

const EntrepreneurDashboard = () => {
  return (
    <div className="flex justify-around">
        <Sidebar/>
        <EntrepreneurCard/>
    </div>
  );
};

export default EntrepreneurDashboard;