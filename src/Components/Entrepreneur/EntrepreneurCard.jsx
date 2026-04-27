import Sidebar from "../Sidebar";
import CollaborationAndInvestors from "./CollaborationAndInvesters";
import DashboardWelcome from "./DashboardWelcome";



const EntrepreneurCard = () => {
  return (
    <div className=" bg-[#ffffff] rounded ">
    
       <DashboardWelcome/>
       <CollaborationAndInvestors/>
       </div>
  );
};

export default EntrepreneurCard;