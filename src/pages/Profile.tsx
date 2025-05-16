
const Profile = () => (
  <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8" style={{ minHeight: "calc(100vh - 0px)" }}>
    <div className="glass rounded-2xl shadow-xl p-10 w-full max-w-xl mt-16">
      <h1 className="text-3xl font-bold mb-2">Profile & Farm Information</h1>
      <p className="text-gray-600 mb-6">Tell us more about your farm to personalize your dashboard.</p>
      {/* Placeholder for future onboarding form */}
      <div className="flex flex-col gap-4">
        <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse"></div>
        <div className="h-4 w-2/3 rounded bg-gray-200 animate-pulse"></div>
        <div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  </div>
);
export default Profile;
