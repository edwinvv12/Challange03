import React from "react";
import TodoPage from "./pages/TodoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoAdd from "./pages/TodoAdd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/todo-add" element={<TodoAdd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
