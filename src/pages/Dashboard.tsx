
import DashboardHeader from "../components/DashboardHeader";

const Dashboard = () => (
  <div className="flex flex-col flex-1 min-h-screen bg-transparent">
    <DashboardHeader />
    <div className="glass rounded-2xl shadow-xl p-10 mt-3 mx-4 md:mx-8 flex-1">
      <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
      <p className="text-gray-600">This is the farmer financial overview. As you complete onboarding, monthly accounting tools will appear here.</p>
    </div>
  </div>
);

export default Dashboard;

