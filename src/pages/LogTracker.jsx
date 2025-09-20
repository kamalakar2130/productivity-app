import { useEffect, useState } from "react";

export default function LogTracker() {
  const [logs, setLogs] = useState(
    () => JSON.parse(localStorage.getItem("logs")) || []
  );
  const [formData, setFormData] = useState({
    type: "",
    desc: "",
    date: "",
    start: "",
    end: "",
    other: "",
  });
  const [showOther, setShowOther] = useState(false);
  const [warning, setWarning] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const hrs = String(today.getHours()).padStart(2, "0");
    const mins = String(today.getMinutes()).padStart(2, "0");
    setFormData((prev) => ({
      ...prev,
      date: `${yyyy}-${mm}-${dd}`,
      end: `${hrs}:${mins}`,
    }));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (id === "logType") setShowOther(value === "Other");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { type, desc, date, start, end, other } = formData;
    let finalType = type;
    const inputDate = new Date(date);
    const inputStart = new Date(`${date}T${start}`);
    const inputEnd = new Date(`${date}T${end}`);
    const now = new Date();

    if (inputDate > now) {
      setWarning("Date cannot be in the future.");
      return;
    }
    if (inputStart > inputEnd) {
      setWarning("Start time cannot be after end time.");
      return;
    }
    if (inputEnd > now) {
      setWarning("End time cannot be in the future.");
      return;
    }
    if (showOther) finalType = other.trim() || "Other";

    const newLog = { id: Date.now(), type: finalType, desc, date, start, end };
    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    localStorage.setItem("logs", JSON.stringify(updatedLogs));

    setFormData({
      type: "",
      desc: "",
      date: formData.date,
      start: "",
      end: formData.end,
      other: "",
    });
    setShowOther(false);
    setWarning("");
  };

  const filteredLogs = logs
    .filter(
      (log) =>
        log.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.desc.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") return new Date(a.date) - new Date(b.date);
      if (sortBy === "type") return a.type.localeCompare(b.type);
      if (sortBy === "desc") return a.desc.localeCompare(b.desc);
      return 0;
    });

  return (
    <main className="font-sans text-gray-800">
      <header className="bg-white text-black mt-4 py-4 px-8 text-center shadow-md">
        <h1 className="text-2xl font-bold">Daily Log Tracker</h1>
      </header>

      {warning && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
          ⚠️ {warning}
        </div>
      )}

      <section className="max-w-4xl mx-auto mt-8 px-4">
        {/* Log Form */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-extrabold text-[#2727ff] text-center mb-6">
            Add New Log
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="logType" className="block font-semibold">
                Type:
              </label>
              <select
                id="logType"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:border-[#2a2a72] focus:ring-2 focus:ring-[#2a2a72]"
              >
                <option value="">Select Type</option>
                <option value="Git Commit">Git Commit</option>
                <option value="Tutorial">Tutorial Learned</option>
                <option value="Skill">Skill Mastered</option>
                <option value="Job">Job Applied</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {showOther && (
              <div className="md:col-span-2">
                <label htmlFor="other" className="block font-semibold">
                  Other:
                </label>
                <input
                  id="other"
                  type="text"
                  value={formData.other}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:border-green-600 focus:ring-2 focus:ring-green-400"
                />
              </div>
            )}
            <div className="md:col-span-2">
              <label htmlFor="desc" className="block font-semibold">
                Description:
              </label>
              <textarea
                id="desc"
                value={formData.desc}
                onChange={handleChange}
                rows="3"
                required
                className="w-full p-2 border rounded focus:border-[#2a2a72] focus:ring-2 focus:ring-[#2a2a72]"
              ></textarea>
            </div>
            <div>
              <label htmlFor="date" className="block font-semibold">
                Date:
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:border-[#2a2a72] focus:ring-2 focus:ring-[#2a2a72]"
              />
            </div>
            <div>
              <label htmlFor="start" className="block font-semibold">
                Start Time:
              </label>
              <input
                id="start"
                type="time"
                value={formData.start}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:border-[#2a2a72] focus:ring-2 focus:ring-[#2a2a72]"
              />
            </div>
            <div>
              <label htmlFor="end" className="block font-semibold">
                End Time:
              </label>
              <input
                id="end"
                type="time"
                value={formData.end}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:border-[#2a2a72] focus:ring-2 focus:ring-[#2a2a72]"
              />
            </div>
            <button
              type="submit"
              className="md:col-span-2 bg-[#2a2a72] text-white py-2 rounded font-bold hover:bg-[#ff6f61] transform hover:scale-105 transition"
            >
              ➕ Add Log
            </button>
          </form>
        </div>

        {/* Search & Sort */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <label className="font-semibold mr-2">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="default">Default</option>
              <option value="date">Date</option>
              <option value="type">Type</option>
              <option value="desc">Description</option>
            </select>
          </div>
          <div>
            <label className="font-semibold mr-2">Search:</label>
            <input
              type="text"
              placeholder="Search Logs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
        </div>

        {/* Logs */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-[#2a2a72] text-center mb-6">
            All Logs
          </h3>
          <div className="flex flex-col gap-4">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="border-l-4 border-[#2a2a72] bg-gray-50 p-4 rounded shadow hover:border-[#ff6f61] hover:bg-white hover:shadow-lg transform hover:scale-[1.01] transition"
              >
                <strong>{log.type}</strong>
                <br />
                {log.desc}
                <br />
                <small>
                  📅 {log.date} ⏰ {log.start} - {log.end}
                </small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
