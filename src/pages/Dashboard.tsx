
import DashboardHeader from "../components/DashboardHeader";

const Dashboard = () => (
  <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8" style={{ minHeight: "calc(100vh - 0px)" }}>
    <div className="w-full max-w-2xl">
      <DashboardHeader />
      <div className="glass rounded-2xl shadow-xl p-10 mt-3">
        <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
        <p className="text-gray-600">This is the farmer financial overview. As you complete onboarding, monthly accounting tools will appear here.</p>
      </div>
    </div>
  </div>
);
export default Dashboard;

