import { useState } from "react";

const ItemAddComponent = () => {
  const [name, setName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleAddItem = () => {
    if (!name || !serialNumber || !value) {
      setError("Please fill out all fields.");
      return;
    }

    if (isNaN(value)) {
      setError("Please enter a valid value.");
      return;
    }

    const newItem = {
      name,
      serialNumber,
      value: parseFloat(value),
      photo,
    };

    const localData = localStorage.getItem("inventory");
    const inventory = localData ? JSON.parse(localData) : [];
    inventory.push(newItem);
    localStorage.setItem("inventory", JSON.stringify(inventory));

    window.location.href = `/`;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      setTimeout(() => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setPhoto(canvas.toDataURL("image/png"));
        stream.getTracks().forEach((track) => track.stop());
      }, 3000);
    } catch (err) {
      console.error("Error accessing camera", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Add New Item</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Serial Number
          </label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Value ($)
          </label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Photo
          </label>
          <div className="flex justify-between items-center">
            <input
              type="file"
              accept="image/*"
              className="w-56 border rounded p-2"
              onChange={handlePhotoChange}
            />
            <p>or</p>
            {"mediaDevices" in navigator &&
              navigator.mediaDevices.getUserMedia && (
                <button
                  onClick={handleTakePhoto}
                  className="w-40 h-12 bg-lime-600 text-white rounded hover:bg-lime-500"
                >
                  Take Photo
                </button>
              )}
          </div>
          {photo && (
            <img
              src={photo}
              alt="Item"
              className="mt-4 max-w-full h-auto rounded"
            />
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-500"
          >
            Add Item
          </button>
          <button
            onClick={() => (window.location.href = `/`)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemAddComponent;
