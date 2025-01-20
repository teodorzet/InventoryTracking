import { Route, Routes } from "react-router-dom";
import HomepageComponent from "./HomepageComponent";
import ItemAddComponent from "./ItemAddComponent";
import ItemComponent from "./ItemComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomepageComponent />} />
      <Route path="/add" element={<ItemAddComponent />} />
      <Route path="/item/:serialNumber" element={<ItemComponent />} />
    </Routes>
  );
}

export default App;
