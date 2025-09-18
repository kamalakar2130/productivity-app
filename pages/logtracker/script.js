`use strict`;
// Set up date and time inputs with today's date and current page reloaded time
addDateTime = () => {
  const dateInput = document.getElementById("logDate");
  const timeInput = document.getElementById("logEnd");

  const today = new Date();

  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInput.value = `${yyyy}-${mm}-${dd}`;

  const hrs = String(today.getHours()).padStart(2, "0");
  const mins = String(today.getMinutes()).padStart(2, "0");
  timeInput.value = `${hrs}:${mins}`;
};

const form = document.getElementById("logForm");
const logList = document.getElementById("logList");

let logs = JSON.parse(localStorage.getItem("logs")) || [];

// Display logs from localStorage on load
window.addEventListener("DOMContentLoaded", () => {
  logs.forEach(addLogToDOM); // Create type options for the last log
  createTypeOptions(logs);
  addDateTime();
});

//other type handling
let isOther = false;
const selectType = document.getElementById("logType");
selectType.addEventListener("change", () => {
  const otherType = document.querySelector(".other-input");
  const val = selectType.value;
  if (val === "Other") {
    otherType.classList.remove("hide");
    isOther = true;
  } else {
    otherType.classList.add("hide");
    isOther = false;
  }
});

// On form submit

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let type = document.getElementById("logType").value;
  const desc = document.getElementById("logDesc").value;
  const date = document.getElementById("logDate").value;
  const start = document.getElementById("logStart").value;
  const end = document.getElementById("logEnd").value;

  //form validation
  const warnFrame = document.getElementById("warningFrame");
  const overlay = document.querySelector(".overlay");
  inputDate = new Date(date);
  inputStart = new Date(`${date}T${start}`);
  inputEnd = new Date(`${date}T${end}`);
  const now = new Date();
  let warning = "";
  if (inputDate > now) {
    // warning if date is in the future
    warning = `Date cannot be in the future. Current date is ${now.toLocaleDateString()}. Add it to the To Do list instead.`;
  } else if (inputStart > inputEnd) {
    warning = "Start time cannot be after end time.";
  } else if (inputEnd > now) {
    warning = "Make log entry after end time or set the end time to now.";
  }
  if (warning !== "") {
    warnFrame.classList.remove("hide");
    overlay.classList.remove("hide");
    const message = document.querySelector(".message");
    message.textContent = warning;
    warnFrame.style.display = "block";
    // Automatically close the warning frame after 15 seconds
    setTimeout(() => {
      warnFrame.classList.add("hide");
      warnFrame.style.display = "none";
      overlay.classList.add("hide");
    }, 15000);
    warnButton = document.querySelector(".warnClose");
    warnButton.addEventListener("click", () => {
      warnFrame.classList.add("hide");
      warnFrame.style.display = "none";
      overlay.classList.add("hide");
    });
    // Close warning frame on Escape key or overlay click
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        warnFrame.classList.add("hide");
        warnFrame.style.display = "none";
        overlay.classList.add("hide");
      }
    });

    overlay.addEventListener("click", () => {
      warnFrame.classList.add("hide");
      warnFrame.style.display = "none";
      overlay.classList.add("hide");
      addDateTime(); // Reset date and time inputs
    });

    return;
  }
  if (isOther) {
    const otherType = document.getElementById("logOther").value;
    const typeSelect = document.getElementById("logType");
    type = otherType.trim() || "Other"; // Fallback to "Other" if empty;
    const newOption = document.createElement("option");
    newOption.value = otherType;
    newOption.textContent = otherType;
    typeSelect.appendChild(newOption);
  }

  const logData = { type, desc, date, start, end, id: Date.now() };

  logs.push(logData);
  localStorage.setItem("logs", JSON.stringify(logs));

  addLogToDOM(logData);
  form.reset();
  addDateTime();
});

// Create and show log in UI
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

// create unavailable type options dynamically
function createTypeOptions(logs) {
  let i = 0;
  while (i < logs.length) {
    const typeOptions = Array.from(document.querySelectorAll("#logType option"))
      .map((option) => option.value)
      .filter((value) => value !== "Other" && value !== ""); // Exclude "Other" and empty values
    // Check if the type is already in the typeOptions array
    const newType = logs[i]?.type;
    if (!typeOptions.includes(newType)) {
      typeOptions.push(newType);
    }
    // Check if the type is already in the select options
    if (!newType || newType === "Other") {
      i++;
      continue; // Skip empty or "Other" types
    }
    // Check if the type is already available in the select options
    const existingOption = document.querySelector(`option[value="${newType}"]`);
    if (existingOption) {
      i++;
      continue; // Skip if the type is already available
    }
    // If the type is not available, create a new option
    const typeSelect = document.getElementById("logType");
    const available = !Array.from(typeSelect.options).some(
      (option) => option.value === newType
    );
    if (available) {
      const newOption = document.createElement("option");
      newOption.value = newType;
      newOption.textContent = newType;
      typeSelect.appendChild(newOption);
    }
    i++;
  }
}

//  sort the logs by date, time and duration
// sort logs by description and type as well
function logsSorting() {
  const logs = Array.from(document.querySelectorAll("#logList li"));
  logs.sort((a, b) => {
    const dateA = new Date(a.querySelector(".log-date").textContent);
    const dateB = new Date(b.querySelector(".log-date").textContent);
    return dateA - dateB; // Sort by date
  });
  logs.forEach((log) => logList.appendChild(log)); // Reorder logs in the UI
  const logItems = Array.from(logList.children);
  logItems.sort((a, b) => {
    const descA = a.querySelector(".log-desc").textContent.toLowerCase();
    const descB = b.querySelector(".log-desc").textContent.toLowerCase();
    return descA.localeCompare(descB); // Sort by description
  });
  logItems.forEach((log) => logList.appendChild(log)); // Reorder logs
  const logItems2 = Array.from(logList.children);
  logItems2.sort((a, b) => {
    const typeA = a.querySelector(".log-type").textContent.toLowerCase();
    const typeB = b.querySelector(".log-type").textContent.toLowerCase();
    return typeA.localeCompare(typeB); // Sort by type
  });
  logItems2.forEach((log) => logList.appendChild(log)); // Reorder
}

const sortButton = document.getElementById("sortLogs");

// Note: The above code is for a log tracker application that allows users to log their activities with various types, descriptions, dates, and times.
// It handles form submission, validation, and displays logs in the UI.
// The code also manages the "Other" type input dynamically and creates options for unavailable types based on existing logs.
// The logs are stored in localStorage, allowing persistence across page reloads.

// make date, time from localStorage ready for Analytics, heatmap, streak, etc.
// so we can use them in the dashboard. first we need to convert the date and time to a format that can be used in the dashboard
// time spent on each log in minutes, hours, etc.
// Heat map is like a day which a log is entered will hav a color basically a grid of days
// Streak is like a number of consecutive days with logs and longest streak
// Analytics is like a summary of logs, total logs, total time spent, etc.
