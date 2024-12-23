import './index.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DndPage from "./pages/DndPage";
import TodoPage from './pages/Todopage';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TodoPage />} />
                <Route path="/dnd" element={<DndPage />} />
            </Routes>
        </Router>
    );
};

export default App;