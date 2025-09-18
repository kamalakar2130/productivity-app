import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import LogTracker from "./pages/LogTracker.jsx";
import Planner from "./pages/Planner.jsx";
import Profile from "./pages/Profile.jsx";
import FocusSession from "./pages/FocusSession.jsx";
import TodoList from "./pages/TodoList.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logTracker" element={<LogTracker />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/focusSession" element={<FocusSession />} />
          <Route path="/todoList" element={<TodoList />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
