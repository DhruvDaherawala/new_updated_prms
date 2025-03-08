import { useState } from 'react';
import { ApiService } from './ApiService';
import { Utils, Styles } from './Utils';

export default function AllocationDetailModal({ allocation, onClose, refreshAllocations, apiUrl, renters, properties, childProperties }) {
  const [isEditing, setIsEditing] = useState(allocation.isEditing || false);
  const [localAllocation, setLocalAllocation] = useState(allocation);
  const [documents, setDocuments] = useState({
    rent_agreement: null,
    other_document: null
  });

  // Handle changes for allocation details
  const handleAllocationChange = (field, value) => {
    setLocalAllocation((prev) => ({ ...prev, [field]: value }));
  };

  // Handle document file change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDocuments((prev) => ({ ...prev, [name]: files[0] }));
  };

  // Save the allocation details
  const saveAllocation = async () => {
    try {
      const form = new FormData();

      const dataToSend = {
        renter_id: localAllocation.renter_id || localAllocation.renterId,
        property_id: localAllocation.property_id || localAllocation.propertyId,
        childproperty_id: localAllocation.childproperty_id,
        allocation_date: localAllocation.allocation_date || localAllocation.startDate,
        remarks: localAllocation.remarks,
        status: localAllocation.status || 'Active'
      };

      form.append('formData', JSON.stringify(dataToSend));

      // Add documents if new ones were selected
      if (documents.rent_agreement) {
        form.append('rent_agreement', documents.rent_agreement);
      }
      if (documents.other_document) {
        form.append('other_document', documents.other_document);
      }

      await ApiService.updateAllocation(localAllocation.id || localAllocation.allocation_id, form);

      alert('Allocation updated successfully!');
      refreshAllocations();
      setIsEditing(false);
    } catch (error) {
      alert('Failed to update allocation!');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white w-[800px] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">Allocation Details</h2>
        <div className="grid gap-1">
          <div className="space-y-4">
            <div>
              <label className="font-semibold">Allocation ID:</label>
              <p className={Styles.cardStyle}>{localAllocation.id || localAllocation.allocation_id}</p>
            </div>
            <div>
              <label className="font-semibold">Renter:</label>
              {isEditing ? (
                <select
                  value={localAllocation.renter_id || localAllocation.renterId}
                  onChange={(e) => handleAllocationChange(localAllocation.renter_id ? 'renter_id' : 'renterId', e.target.value)}
                  className={Styles.formInputStyle}
                >
                  {renters.map((renter) => (
                    <option key={renter.id || renter.renter_id} value={renter.id || renter.renter_id}>
                      {renter.renterName || renter.renter_name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className={Styles.cardStyle}>{Utils.getRenterName(localAllocation.renter_id || localAllocation.renterId, renters)}</p>
              )}
            </div>
            <div>
              <label className="font-semibold">Property:</label>
              {isEditing ? (
                <select
                  value={localAllocation.property_id || localAllocation.propertyId}
                  onChange={(e) => handleAllocationChange(localAllocation.property_id ? 'property_id' : 'propertyId', e.target.value)}
                  className={Styles.formInputStyle}
                >
                  {properties.map((property) => (
                    <option key={property.id || property.property_id} value={property.id || property.property_id}>
                      {property.propertyName || property.property_name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className={Styles.cardStyle}>
                  {Utils.getPropertyName(localAllocation.property_id || localAllocation.propertyId, properties)}
                </p>
              )}
            </div>
            <div>
              <label className="font-semibold">Unit/Floor:</label>
              {isEditing ? (
                <select
                  value={localAllocation.childproperty_id || ''}
                  onChange={(e) => handleAllocationChange('childproperty_id', e.target.value)}
                  className={Styles.formInputStyle}
                >
                  <option value="">-- None --</option>
                  {childProperties.map((childProperty) => (
                    <option
                      key={childProperty.id || childProperty.childproperty_id}
                      value={childProperty.id || childProperty.childproperty_id}
                    >
                      {childProperty.title || childProperty.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className={Styles.cardStyle}>{Utils.getChildPropertyName(localAllocation.childproperty_id, childProperties)}</p>
              )}
            </div>
            <div>
              <label className="font-semibold">Allocation Date:</label>
              {isEditing ? (
                <input
                  type="date"
                  value={localAllocation.allocation_date || localAllocation.startDate || ''}
                  onChange={(e) =>
                    handleAllocationChange(localAllocation.allocation_date ? 'allocation_date' : 'startDate', e.target.value)
                  }
                  className={Styles.formInputStyle}
                />
              ) : (
                <p className={Styles.cardStyle}>{localAllocation.allocation_date || localAllocation.startDate || 'Not set'}</p>
              )}
            </div>
            <div>
              <label className="font-semibold">Status:</label>
              {isEditing ? (
                <select
                  value={localAllocation.status || 'Active'}
                  onChange={(e) => handleAllocationChange('status', e.target.value)}
                  className={Styles.formInputStyle}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Terminated">Terminated</option>
                  <option value="Pending">Pending</option>
                </select>
              ) : (
                <p className={Styles.cardStyle}>{localAllocation.status || 'Active'}</p>
              )}
            </div>
            <div>
              <label className="font-semibold">Remarks:</label>
              {isEditing ? (
                <textarea
                  value={localAllocation.remarks || ''}
                  onChange={(e) => handleAllocationChange('remarks', e.target.value)}
                  className={`${Styles.formInputStyle} h-24`}
                />
              ) : (
                <p className={Styles.cardStyle}>{localAllocation.remarks || 'No remarks'}</p>
              )}
            </div>
            <div>
              <label className="font-semibold">Documents:</label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm font-medium">Rent Agreement:</p>
                  {isEditing ? (
                    <div className="space-y-2">
                      {localAllocation.rent_agreement && (
                        <a
                          href={`${apiUrl}uploads/${localAllocation.rent_agreement}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 underline mb-2"
                        >
                          Current Document
                        </a>
                      )}
                      <input type="file" name="rent_agreement" onChange={handleFileChange} className={Styles.formInputStyle} />
                    </div>
                  ) : (
                    <p className={Styles.cardStyle}>
                      {localAllocation.rent_agreement ? (
                        <a
                          href={`${apiUrl}uploads/${localAllocation.rent_agreement}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Document
                        </a>
                      ) : (
                        'No document'
                      )}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">Other Document:</p>
                  {isEditing ? (
                    <div className="space-y-2">
                      {localAllocation.other_document && (
                        <a
                          href={`${apiUrl}uploads/${localAllocation.other_document}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 underline mb-2"
                        >
                          Current Document
                        </a>
                      )}
                      <input type="file" name="other_document" onChange={handleFileChange} className={Styles.formInputStyle} />
                    </div>
                  ) : (
                    <p className={Styles.cardStyle}>
                      {localAllocation.other_document ? (
                        <a
                          href={`${apiUrl}uploads/${localAllocation.other_document}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Document
                        </a>
                      ) : (
                        'No document'
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-3">
            {isEditing ? (
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={saveAllocation}>
                Save
              </button>
            ) : (
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
