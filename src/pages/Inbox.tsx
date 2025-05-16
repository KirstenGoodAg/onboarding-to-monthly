
const Inbox = () => (
  <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8" style={{ minHeight: "calc(100vh - 0px)" }}>
    <div className="glass rounded-2xl shadow-xl p-10 w-full max-w-xl mt-16">
      <h1 className="text-3xl font-bold mb-2">Inbox</h1>
      <p className="text-gray-600 mb-6">Here you'll see messages and notifications from your farm advisor and Good Agriculture.</p>
      <div className="flex flex-col gap-3">
        <div className="h-12 rounded bg-gray-100 px-4 flex items-center text-gray-500">No messages yet.</div>
      </div>
    </div>
  </div>
);
export default Inbox;
