import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import AnalyticsCharts from "../ChartComponent";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const HomepageComponent = () => {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [treshold, setTreshold] = useState(500);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    const localData = localStorage.getItem("inventory");
    if (localData) {
      setInventory(JSON.parse(localData));
    }
  }, []);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedInventory = [...inventory].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredInventory = sortedInventory.filter((item) => {
    const query = searchQuery.toLowerCase();
    if (searchQuery.includes("-")) {
      const [min, max] = searchQuery.split("-").map(Number);
      return item.value >= min && item.value <= max;
    }
    return (
      item.name.toLowerCase().includes(query) ||
      item.serialNumber.toLowerCase().includes(query)
    );
  });

  const totalValue = filteredInventory.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const handleExport = () => {
    const localData = localStorage.getItem("inventory");
    if (localData) {
      const blob = new Blob([localData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "inventory.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const importedData = JSON.parse(reader.result);
          if (Array.isArray(importedData)) {
            localStorage.setItem("inventory", JSON.stringify(importedData));
            alert("Inventory successfully imported.");
            window.location.href = "/";
          } else {
            alert("Invalid file format.");
          }
        } catch (err) {
          alert("Error reading file: " + err);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-2">
        <h1 className="text-2xl font-bold text-center mb-6">
          Inventory Tracking
        </h1>

        <div className="mb-4 flex justify-between">
          <input
            type="text"
            placeholder="Search by Name, Serial, Value Range (ex 100-500)"
            className="border rounded p-2 w-full md:w-1/3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => {
              window.location.href = `/add`;
            }}
            className="ml-4 px-4 hover:bg-lime-200 hover: rounded-full"
          >
            <i class="fa fa-plus"></i>
          </button>
        </div>

        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-lime-600 text-white">
              <th
                className="p-2 cursor-pointer text-left"
                onClick={() => handleSort("name")}
              >
                Name
              </th>
              <th
                className="p-2 cursor-pointer text-left"
                onClick={() => handleSort("serialNumber")}
              >
                Serial Number
              </th>
              <th
                className="p-2 cursor-pointer text-left"
                onClick={() => handleSort("value")}
              >
                Value
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <tr
                  className={
                    parseFloat(item.value) > treshold ? "bg-red-100" : ""
                  }
                >
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.serialNumber}</td>
                  <td className="p-2">${item.value.toFixed(2)}</td>
                  <td>
                    <i
                      class="fa fa-search cursor-pointer hover: rounded-full hover:text-green-200"
                      onClick={() => {
                        window.location.href = `/item/${item.serialNumber}`;
                      }}
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-2 text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between mt-6 text-right">
          <div className="flex flex-col">
            <div className="text-left">
              <label className="mr-2">Price Treshold:</label>
              <input
                type="number"
                className="border rounded p-1 w-20 md:w-18 lg:w-20"
                value={treshold}
                onChange={(e) => setTreshold(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <button
                className="mr-4 text-lime-600 rounded hover:text-lime-500"
                onClick={() => handleExport()}
              >
                Export
                <i class="ml-2 fa fa-cloud-download"></i>
              </button>

              <label className="text-blue-600 cursor-pointer rounded hover:text-blue-400">
                Import
                <i class="ml-2 fa fa-cloud-upload"></i>
                <input
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={handleImport}
                />
              </label>
            </div>
          </div>

          <div className="text-lg font-bold">
            Total Value: ${totalValue.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="mt-5 max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-2">
        <AnalyticsCharts inventory={inventory} />
      </div>
    </div>
  );
};

export default HomepageComponent;
