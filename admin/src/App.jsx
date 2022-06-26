import { Routes, Route } from "react-router-dom";
import { Login, Main } from "./pages";
import Error from "./components/Error";
function App() {
  return (
    <Routes className="left">
      <Route exact path="/*" element={<Main />} />
      <Route exact path="Login" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
