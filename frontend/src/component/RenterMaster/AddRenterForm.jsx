import React, { useState } from "react";
import axios from "axios";

const formInputStyle =
  "w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200";

const AddRenterForm = ({ API_URL, fetchRenters, setShowForm }) => {
  const [formData, setFormData] = useState({
    renterName: "",
    fullAddress: "",
    age: "",
    numberOfStayers: "",
    aadhaarCard: null,
    panCard: null,
    passportPhoto: null,
    otherDocument: null,
    contact1: "",
    contact2: "",
    remarks: "",
  });

  // Handle text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  // Submit form data to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();

      // Append non-file fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value && typeof value !== "object") {
          form.append(key, value);
        }
      });

      // Append files
      if (formData.aadhaarCard) {
        form.append("aadhaarCard", formData.aadhaarCard);
      }
      if (formData.panCard) {
        form.append("panCard", formData.panCard);
      }
      if (formData.passportPhoto) {
        form.append("passportPhoto", formData.passportPhoto);
      }
      if (formData.otherDocument) {
        form.append("otherDocument", formData.otherDocument);
      }

      // POST to server
      await axios.post(`${API_URL}renter`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Renter data saved successfully!");

      // Refresh renters table
      fetchRenters();

      // Reset form
      setFormData({
        renterName: "",
        fullAddress: "",
        age: "",
        numberOfStayers: "",
        aadhaarCard: null,
        panCard: null,
        passportPhoto: null,
        otherDocument: null,
        contact1: "",
        contact2: "",
        remarks: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error saving renter data:", error);
      alert("Failed to save renter data!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
        Add New Renter
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Renter Name + Age */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="renterName"
            placeholder="Renter Name"
            value={formData.renterName}
            onChange={handleInputChange}
            className={formInputStyle}
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
            className={formInputStyle}
          />
        </div>

        {/* Full Address */}
        <textarea
          name="fullAddress"
          placeholder="Full Address"
          value={formData.fullAddress}
          onChange={handleInputChange}
          className={`${formInputStyle} h-32`}
        ></textarea>

        {/* Row 2: Number of Stayers + Contact Number 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="number"
            name="numberOfStayers"
            placeholder="Number of Stayers"
            value={formData.numberOfStayers}
            onChange={handleInputChange}
            className={formInputStyle}
          />
          <input
            type="text"
            name="contact1"
            placeholder="Contact Number 1"
            value={formData.contact1}
            onChange={handleInputChange}
            className={formInputStyle}
          />
        </div>

        {/* Row 3: Contact Number 2 + Remarks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="contact2"
            placeholder="Contact Number 2"
            value={formData.contact2}
            onChange={handleInputChange}
            className={formInputStyle}
          />
          <textarea
            name="remarks"
            placeholder="Remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            className={`${formInputStyle} h-32`}
          ></textarea>
        </div>

        {/* Row 4: Aadhaar Card + PAN Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Aadhaar Card
            </label>
            <input
              type="file"
              name="aadhaarCard"
              onChange={handleFileChange}
              className={formInputStyle}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              PAN Card
            </label>
            <input
              type="file"
              name="panCard"
              onChange={handleFileChange}
              className={formInputStyle}
            />
          </div>
        </div>

        {/* Row 5: Passport Photo + Other Document */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Passport Size Photo
            </label>
            <input
              type="file"
              name="passportPhoto"
              onChange={handleFileChange}
              className={formInputStyle}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Other Document
            </label>
            <input
              type="file"
              name="otherDocument"
              onChange={handleFileChange}
              className={formInputStyle}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRenterForm;