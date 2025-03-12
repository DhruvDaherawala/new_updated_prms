import React from 'react';

const formInputStyle = 'w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200';

export default function ChildPropertyForm({ formData, onInputChange, onSubmit, onClose, parentProperties, floorError }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
      <div className="bg-white w-[800px] max-h-[70vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">{formData.id ? 'Edit Child Property' : 'Add New Child Property'}</h2>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="">Property Name</label>
              <select name="property_id" value={formData.property_id} onChange={onInputChange} className={formInputStyle} required>
                <option value="">Select Parent Property</option>
                {parentProperties.map((parent) => (
                  <option key={parent.id} value={parent.id}>
                    {parent.propertyName} - {parent.ownerName} (Max Floors: {parent.numberOfFloors})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="">Floor Number</label>
              <input
                type="number"
                name="floor"
                placeholder="Floor"
                value={formData.floor}
                onChange={onInputChange}
                className={formInputStyle}
                required
              />

              {floorError && <p className="text-red-600 text-sm mt-1">{floorError}</p>}
            </div>
          </div>
          <label htmlFor="">Child Property Title</label>
          <input
            type="text"
            name="title"
            placeholder="Child Property Title"
            value={formData.title}
            onChange={onInputChange}
            className={formInputStyle}
            required
          />

          <label htmlFor="">Description</label>
          <textarea
            name="description"
            placeholder="Child Property Description"
            value={formData.description}
            onChange={onInputChange}
            className={`${formInputStyle} h-32`}
            required
          />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="">Number of Rooms</label>
              <input
                type="number"
                name="rooms"
                placeholder="Number of Rooms"
                value={formData.rooms}
                onChange={onInputChange}
                className={formInputStyle}
                required
              />
            </div>
            <div>
              <label htmlFor="">Washroom</label>
              <input
                type="number"
                name="washroom"
                placeholder="Number of Washrooms"
                value={formData.washroom}
                onChange={onInputChange}
                className={formInputStyle}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="">Gas Availability</label>
              <input
                type="text"
                name="gas"
                placeholder="Gas Availability"
                value={formData.gas}
                onChange={onInputChange}
                className={formInputStyle}
              />
            </div>
            <div>
              <label htmlFor="">Electricity Availability</label>
              <input
                type="text"
                name="electricity"
                placeholder="Electricity Availability"
                value={formData.electricity}
                onChange={onInputChange}
                className={formInputStyle}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="">Deposit Amount</label>
              <input
                type="number"
                name="deposit"
                placeholder="Deposit Amount"
                value={formData.deposit}
                onChange={onInputChange}
                className={formInputStyle}
                required
              />
            </div>
            <div>
              <label htmlFor="">Rent Amount</label>
              <input
                type="number"
                name="rent"
                placeholder="Rent Amount"
                value={formData.rent}
                onChange={onInputChange}
                className={formInputStyle}
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition">
            {formData.id ? 'Update Child Property' : 'Create Child Property'}
          </button>
        </form>
      </div>
    </div>
  );
}
