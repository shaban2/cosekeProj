import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/LoginPage";
import UserDataTable from "./components/Table";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/table/:token" element={<UserDataTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
