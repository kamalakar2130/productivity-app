const form = document.getElementById("logForm");
const logList = document.getElementById("logList");

let logs = JSON.parse(localStorage.getItem("logs")) || [];

// 📌 Display logs from localStorage on load
window.addEventListener("DOMContentLoaded", () => {
  logs.forEach(addLogToDOM);
});

// 📌 On form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const type = document.getElementById("logType").value;
  const desc = document.getElementById("logDesc").value;
  const date = document.getElementById("logDate").value;
  const start = document.getElementById("logStart").value;
  const end = document.getElementById("logEnd").value;

  const logData = { type, desc, date, start, end };

  logs.push(logData);
  localStorage.setItem("logs", JSON.stringify(logs));

  addLogToDOM(logData);
  form.reset();
});

// 📌 Create and show log in UI
function addLogToDOM(log) {
  const logItem = document.createElement("div");
  logItem.className = "log-card";
  logItem.innerHTML = `
    <strong>${log.type}</strong><br />
    ${log.desc}<br />
    <small>📅 ${log.date} ⏰ ${log.start} - ${log.end}</small>
  `;
  logList.appendChild(logItem);
}
