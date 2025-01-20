import { useEffect, useState } from "react";

const ItemComponent = () => {
  const [serialNumber, setSerialNumber] = useState(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!serialNumber) {
      setSerialNumber(window.location.href.split("/").pop());
    }

    const localData = localStorage.getItem("inventory");
    if (localData) {
      const inventory = JSON.parse(localData);
      const foundItem = inventory.find(
        (entry) => entry.serialNumber === serialNumber
      );
      setItem(foundItem);
    }
  }, [serialNumber]);

  const deleteItem = () => {
    const localData = localStorage.getItem("inventory");
    if (localData) {
      const inventory = JSON.parse(localData);
      const updatedInventory = inventory.filter(
        (item) => item.serialNumber !== serialNumber
      );
      localStorage.setItem("inventory", JSON.stringify(updatedInventory));

      window.location.href = "/";
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading item details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">{item.name}</h1>
        <img
          src={item.photo || "/placeholder.png"}
          alt={item.name}
          className="w-full h-auto rounded mb-4"
        />
        <div className="text-gray-700">
          <p>
            <strong>Serial Number:</strong> {item.serialNumber}
          </p>
          <p>
            <strong>Value:</strong> ${item.value.toFixed(2)}
          </p>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => (window.location.href = `/`)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back
          </button>
          <button
            onClick={() => deleteItem()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemComponent;
