'use client';

import { useState } from 'react';
import { ApiService } from './ApiService';
import { Styles } from './Utils';

export default function AllocationForm({ renters, properties, childProperties, onAllocationAdded, onClose }) {
  const [formData, setFormData] = useState({
    renter_id: '',
    property_id: '',
    childproperty_id: '',
    allocation_date: '',
    remarks: '',
    rent_agreement: null,
    other_document: null,
    status: 'Active'
  });

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();

      const textData = {
        renter_id: formData.renter_id,
        property_id: formData.property_id,
        childproperty_id: formData.childproperty_id,
        allocation_date: formData.allocation_date,
        remarks: formData.remarks,
        status: formData.status
      };

      form.append('formData', JSON.stringify(textData));

      // Append files if they exist
      if (formData.rent_agreement) {
        form.append('rent_agreement', formData.rent_agreement);
      }
      if (formData.other_document) {
        form.append('other_document', formData.other_document);
      }

      await ApiService.createAllocation(form);

      alert('Allocation data saved successfully!');
      onAllocationAdded();
      setFormData({
        renter_id: '',
        property_id: '',
        childproperty_id: '',
        allocation_date: '',
        remarks: '',
        rent_agreement: null,
        other_document: null,
        status: 'Active'
      });
      onClose();
    } catch (error) {
      alert('Failed to save allocation data!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Add New Allocation</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Renter</label>
            <select name="renter_id" value={formData.renter_id} onChange={handleInputChange} className={Styles.formInputStyle} required>
              <option value="">-- Select Renter --</option>
              {renters.map((renter) => (
                <option key={renter.id || renter.renter_id} value={renter.id || renter.renter_id}>
                  {renter.renterName || renter.renter_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Property</label>
            <select name="property_id" value={formData.property_id} onChange={handleInputChange} className={Styles.formInputStyle} required>
              <option value="">-- Select Property --</option>
              {properties.map((property) => (
                <option key={property.id || property.property_id} value={property.id || property.property_id}>
                  {property.propertyName || property.property_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Unit/Floor</label>
            <select
              name="childproperty_id"
              value={formData.childproperty_id}
              onChange={handleInputChange}
              className={Styles.formInputStyle}
            >
              <option value="">-- Select Unit/Floor (Optional) --</option>
              {childProperties.map((childProperty) => (
                <option key={childProperty.id || childProperty.childproperty_id} value={childProperty.id || childProperty.childproperty_id}>
                  {childProperty.title || childProperty.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Allocation Date</label>
            <input
              type="date"
              name="allocation_date"
              value={formData.allocation_date}
              onChange={handleInputChange}
              className={Styles.formInputStyle}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Status</label>
            <select name="status" value={formData.status} onChange={handleInputChange} className={Styles.formInputStyle} required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Terminated">Terminated</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Remarks</label>
            <textarea
              name="remarks"
              placeholder="Additional notes or remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              className={`${Styles.formInputStyle} h-24`}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Rent Agreement</label>
            <input type="file" name="rent_agreement" onChange={handleFileChange} className={Styles.formInputStyle} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Other Document</label>
            <input type="file" name="other_document" onChange={handleFileChange} className={Styles.formInputStyle} />
          </div>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
}
