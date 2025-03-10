import { useState, useEffect } from 'react';
import { ApiService } from './ApiService';

const formInputStyle = 'w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200';

export default function AllocationForm({ renters, properties, childProperties, onAllocationAdded, onClose, mode = 'add', allocation }) {
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

  // Prefill form data if editing an existing allocation
  useEffect(() => {
    if (mode === 'edit' && allocation) {
      setFormData({
        renter_id: allocation.renter_id || allocation.renterId || '',
        property_id: allocation.property_id || allocation.propertyId || '',
        childproperty_id: allocation.childproperty_id || '',
        allocation_date: allocation.allocation_date || allocation.startDate || '',
        remarks: allocation.remarks || '',
        rent_agreement: null, // Files are not prefilled; user must upload new ones if needed
        other_document: null, // Files are not prefilled; user must upload new ones if needed
        status: allocation.status || 'Active'
      });
    }
  }, [mode, allocation]);

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
      form.append('renter_id', formData.renter_id);
      form.append('property_id', formData.property_id);
      form.append('childproperty_id', formData.childproperty_id);
      form.append('allocation_date', formData.allocation_date);
      form.append('remarks', formData.remarks);
      form.append('status', formData.status);

      if (formData.rent_agreement) {
        form.append('agreementDocument', formData.rent_agreement);
      }
      if (formData.other_document) {
        form.append('idProof', formData.other_document);
      }

      // Debugging - Log FormData before sending
      for (let pair of form.entries()) {
        console.log(pair[0], pair[1]); // Should show all fields correctly
      }

      if (mode === 'add') {
        await ApiService.createAllocation(form);
        alert('Allocation data saved successfully!');
      } else if (mode === 'edit') {
        await ApiService.updateAllocation(allocation.id || allocation.allocation_id, form);
        alert('Allocation updated successfully!');
      }

      onAllocationAdded(); // Refresh data
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
      onClose(); // Close modal
    } catch (error) {
      alert(`Failed to ${mode === 'add' ? 'save' : 'update'} allocation data!`);
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 p-6 mt-8">
      <div className="bg-white w-[800px] max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
        <button
          type="button" // Prevent form submission
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10"
          onClick={onClose} // Directly call onClose
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">{mode === 'add' ? 'Add New Allocation' : 'Edit Allocation'}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium">Renter</label>
              <select name="renter_id" value={formData.renter_id} onChange={handleInputChange} className={formInputStyle} required>
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
              <select name="property_id" value={formData.property_id} onChange={handleInputChange} className={formInputStyle} required>
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
              <select name="childproperty_id" value={formData.childproperty_id} onChange={handleInputChange} className={formInputStyle}>
                <option value="">-- Select Unit/Floor (Optional) --</option>
                {childProperties.map((childProperty) => (
                  <option
                    key={childProperty.id || childProperty.childproperty_id}
                    value={childProperty.id || childProperty.childproperty_id}
                  >
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
                className={formInputStyle}
                required
              />
            </div>
          </div>
          <label htmlFor="">Additon Notes or Remarks</label>
          <textarea
            name="remarks"
            placeholder="Additional notes or remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            className={`${formInputStyle} h-24`}
          />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium">Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange} className={formInputStyle} required>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Terminated">Terminated</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Rent Agreement</label>
              {mode === 'edit' && allocation.rent_agreement && (
                <a
                  href={`${ApiService.API_URL}uploads/${allocation.rent_agreement}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 underline mb-2"
                >
                  Current Document
                </a>
              )}
              <input type="file" name="rent_agreement" onChange={handleFileChange} className={formInputStyle} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium">Other Document</label>
              {mode === 'edit' && allocation.other_document && (
                <a
                  href={`${ApiService.API_URL}uploads/${allocation.other_document}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 underline mb-2"
                >
                  Current Document
                </a>
              )}
              <input type="file" name="other_document" onChange={handleFileChange} className={formInputStyle} />
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition">
            {mode === 'add' ? 'Submit' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
}
