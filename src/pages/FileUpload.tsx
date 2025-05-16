
const FileUpload = () => (
  <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8" style={{ minHeight: "calc(100vh - 0px)" }}>
    <div className="glass rounded-2xl shadow-xl p-10 w-full max-w-xl mt-16">
      <h1 className="text-3xl font-bold mb-2">Upload Your Documents</h1>
      <p className="text-gray-600 mb-6">Quickly upload your accounting or farm documents here.</p>
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white/50">
        <span className="text-xl text-gray-500 mb-2">Click or drag files to upload</span>
        {/* Placeholder for future upload component */}
        <button className="mt-4 px-5 py-2 rounded bg-[#336633] text-white font-semibold hover:bg-[#255426] transition">Select Files</button>
      </div>
    </div>
  </div>
);
export default FileUpload;
