import React, { useState } from "react";
import axios from "axios";

const QRCodeGenerator = () => {
  const [tableNumber, setTableNumber] = useState("");
  const [qrCode, setQRCode] = useState("");

  const handleGenerate = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/qrcode/generate", { tableNumber })
      .then((response) => setQRCode(response.data.qrCode))
      .catch((error) => console.error("Error generating QR code:", error));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Generate QR Code</h2>
      <form onSubmit={handleGenerate}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Table Number</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Generate
        </button>
      </form>
      {qrCode && (
        <div className="mt-6">
          <img src={qrCode} alt="QR Code" className="mx-auto" />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
