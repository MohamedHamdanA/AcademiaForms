import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import CreateForm from "./routes/CreateForm";
import FormSubmission from "./routes/FormSubmission";
import ViewSubmissions from "./routes/ViewSubmissions";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-form" element={<CreateForm />} />
          <Route path="/submit-form/:formId" element={<FormSubmission />} />
          <Route
            path="/view-submissions/:formId"
            element={<ViewSubmissions />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
