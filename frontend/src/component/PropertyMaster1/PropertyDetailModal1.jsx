// import { useState } from 'react';
// import axios from 'axios';
// import PropertyDetailsView from './PropertyDetailView';
// import ChildPropertiesView from './ChildPropertiesView';

// export default function PropertyDetailModal({ property, onClose, refreshProperties, apiUrl }) {
//   const [activeView, setActiveView] = useState('property');
//   const [isPropertyEditing, setIsPropertyEditing] = useState(property.isEditing || false);
//   const [isChildEditing, setIsChildEditing] = useState(property.isChildEditing || false);
//   const [localProperty, setLocalProperty] = useState(property);
//   const [documents, setDocuments] = useState(null);

//   // Handle changes for property details
//   const handlePropertyChange = (field, value) => {
//     setLocalProperty((prev) => ({ ...prev, [field]: value }));
//   };

//   // Handle document file change
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setDocuments(e.target.files[0]);
//     }
//   };

//   // Handle changes for child properties
//   const handleChildChange = (index, field, value) => {
//     const updatedChildren = localProperty.childProperties.map((child, idx) => (idx === index ? { ...child, [field]: value } : child));
//     setLocalProperty((prev) => ({ ...prev, childProperties: updatedChildren }));
//   };

//   // Handle child property document change
//   const handleChildFileChange = (index, e) => {
//     if (e.target.files && e.target.files[0]) {
//       const updatedChildren = [...localProperty.childProperties];
//       updatedChildren[index] = {
//         ...updatedChildren[index],
//         newDocument: e.target.files[0]
//       };
//       setLocalProperty((prev) => ({ ...prev, childProperties: updatedChildren }));
//     }
//   };

//   // Save the property details
//   const saveProperty = async () => {
//     try {
//       const form = new FormData();
//       const dataToSend = {
//         propertyName: localProperty.propertyName,
//         ownerName: localProperty.ownerName,
//         address: localProperty.address,
//         status: localProperty.status || 'Active',
//         childProperties: localProperty.childProperties
//       };

//       form.append('formData', JSON.stringify(dataToSend));

//       // Add document if a new one was selected
//       if (documents) {
//         form.append('documents', documents);
//       }

//       await axios.put(`${apiUrl}property/${localProperty.id}`, form, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       alert('Property updated successfully!');
//       refreshProperties();
//       setIsPropertyEditing(false);
//     } catch (error) {
//       console.error('Error updating property:', error);
//       alert('Failed to update property!');
//     }
//   };

//   // Save child properties
//   const saveChildProperties = async () => {
//     try {
//       // Create a FormData object to handle file uploads
//       const form = new FormData();

//       // Handle potential file uploads for each child property
//       const updatedChildProps = localProperty.childProperties.map((child) => {
//         // Remove the newDocument property as we'll handle it separately
//         const { newDocument, ...childData } = child;
//         return childData;
//       });

//       // Add child properties data
//       form.append('childProperties', JSON.stringify(updatedChildProps));

//       // Add any new document files
//       localProperty.childProperties.forEach((child, index) => {
//         if (child.newDocument) {
//           form.append(`childDocument_${index}`, child.newDocument);
//         }
//       });

//       await axios.put(`${apiUrl}property/${localProperty.id}/child_properties`, form, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       alert('Child properties updated successfully!');
//       refreshProperties();
//       setIsChildEditing(false);
//     } catch (error) {
//       console.error('Error updating child properties:', error);
//       alert('Failed to update child properties!');
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50">
//       <div className="bg-white w-[800px] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
//         <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
//           ✕
//         </button>
//         <h2 className="text-2xl font-bold mb-4">Property Details</h2>

//         {activeView === 'property' ? (
//           <PropertyDetailsView
//             property={localProperty}
//             isEditing={isPropertyEditing}
//             onPropertyChange={handlePropertyChange}
//             onFileChange={handleFileChange}
//             onSave={saveProperty}
//             onEdit={() => setIsPropertyEditing(true)}
//             onViewChildProperties={() => {
//               setActiveView('child');
//               setIsChildEditing(isChildEditing);
//             }}
//             apiUrl={apiUrl}
//           />
//         ) : (
//           <ChildPropertiesView
//             childProperties={localProperty.childProperties}
//             isEditing={isChildEditing}
//             onChildChange={handleChildChange}
//             onChildFileChange={handleChildFileChange}
//             onSave={saveChildProperties}
//             onEdit={() => setIsChildEditing(true)}
//             onBack={() => setActiveView('property')}
//             apiUrl={apiUrl}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// 06-03
import { useState } from 'react';
import axios from 'axios';

const formInputStyle = 'w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200';

export default function PropertyDetailModal({ property, onClose, refreshProperties, apiUrl }) {
  const [isEditing, setIsEditing] = useState(property.isEditing || false);
  const [localProperty, setLocalProperty] = useState(property);
  const [documents, setDocuments] = useState(null);

  // Handle changes for property details
  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    setLocalProperty((prev) => ({ ...prev, [name]: value }));
  };

  // Handle document file change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(e.target.files[0]);
    }
  };

  // Save the property details
  const saveProperty = async () => {
    try {
      const form = new FormData();
      const dataToSend = {
        propertyName: localProperty.propertyName,
        ownerName: localProperty.ownerName,
        address: localProperty.address,
        floors: localProperty.floors || '',
        status: 'Active' // Keeping default status as Active but not showing in UI
      };

      form.append('formData', JSON.stringify(dataToSend));

      // Add document if a new one was selected
      if (documents) {
        form.append('documents', documents);
      }

      await axios.put(`${apiUrl}property/${localProperty.id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Property updated successfully!');
      refreshProperties();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property!');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50">
      <div className="bg-white w-[800px] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Edit Property</h2>

        <div className="space-y-6">
          {isEditing ? (
            // Editable Form
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveProperty();
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <input
                  type="text"
                  name="propertyName"
                  placeholder="Property Title"
                  value={localProperty.propertyName || ''}
                  onChange={handlePropertyChange}
                  className={formInputStyle}
                  required
                />
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Property Owner"
                  value={localProperty.ownerName || ''}
                  onChange={handlePropertyChange}
                  className={formInputStyle}
                  required
                />
              </div>

              <textarea
                name="address"
                placeholder="Property Description"
                value={localProperty.address || ''}
                onChange={handlePropertyChange}
                className={`${formInputStyle} h-32`}
                required
              />

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Documents</label>
                  <input type="file" onChange={handleFileChange} className={formInputStyle} />
                  {!documents && localProperty.documentURL && (
                    <p className="mt-1 text-sm text-gray-500">Current document: {localProperty.documentURL.split('/').pop()}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Floors</label>
                  <input
                    type="number"
                    min="0"
                    name="floors"
                    placeholder="Number of Floors"
                    value={localProperty.floors || ''}
                    onChange={handlePropertyChange}
                    className={formInputStyle}
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button type="submit" className="flex-1 bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-300 text-gray-800 p-4 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // View-only display
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Property Title</h3>
                  <p className="mt-1 text-lg">{localProperty.propertyName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Property Owner</h3>
                  <p className="mt-1 text-lg">{localProperty.ownerName}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Property Description</h3>
                <p className="mt-1 text-lg whitespace-pre-wrap">{localProperty.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Documents</h3>
                  {localProperty.documentURL ? (
                    <a
                      href={localProperty.documentURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-indigo-600 hover:text-indigo-800"
                    >
                      View Document
                    </a>
                  ) : (
                    <p className="mt-1 text-gray-500">No documents available</p>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Number of Floors</h3>
                  <p className="mt-1 text-lg">{localProperty.floors || 'Not specified'}</p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition"
              >
                Edit Property
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
