const cardStyle = 'p-2 border rounded-lg bg-gray-100';
const formInputStyle = 'w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200';

export default function PropertyDetailsView({
  property,
  isEditing,
  onPropertyChange,
  onFileChange,
  onSave,
  onEdit,
  onViewChildProperties,
  apiUrl
}) {
  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="font-semibold">Property ID:</label>
          <p className={cardStyle}>{property.id}</p>
        </div>
        <div>
          <label className="font-semibold">Owner Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={property.ownerName || ''}
              onChange={(e) => onPropertyChange('ownerName', e.target.value)}
              className={formInputStyle}
            />
          ) : (
            <p className={cardStyle}>{property.ownerName}</p>
          )}
        </div>
        <div>
          <label className="font-semibold">Property Title:</label>
          {isEditing ? (
            <input
              type="text"
              value={property.propertyName || ''}
              onChange={(e) => onPropertyChange('propertyName', e.target.value)}
              className={formInputStyle}
            />
          ) : (
            <p className={cardStyle}>{property.propertyName}</p>
          )}
        </div>
        <div>
          <label className="font-semibold">Address:</label>
          {isEditing ? (
            <textarea
              value={property.address || ''}
              onChange={(e) => onPropertyChange('address', e.target.value)}
              className={`${formInputStyle} h-24`}
            />
          ) : (
            <p className={cardStyle}>{property.address}</p>
          )}
        </div>
        <div>
          <label className="font-semibold">Status:</label>
          {isEditing ? (
            <select
              value={property.status || 'Active'}
              onChange={(e) => onPropertyChange('status', e.target.value)}
              className={formInputStyle}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Sold">Sold</option>
            </select>
          ) : (
            <p className={cardStyle}>{property.status || 'Active'}</p>
          )}
        </div>
        <div>
          <label className="font-semibold">Documents:</label>
          {isEditing ? (
            <div className="space-y-2">
              {property.documents && (
                <a
                  href={`${apiUrl}uploads/${property.documents}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 underline mb-2"
                >
                  Current Document
                </a>
              )}
              <input type="file" onChange={onFileChange} className={formInputStyle} />
            </div>
          ) : (
            <p className={cardStyle}>
              {property.documents ? (
                <a
                  href={`${apiUrl}uploads/${property.documents}`}
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
      <div className="mt-4 flex justify-end space-x-3">
        {isEditing ? (
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={onSave}>
            Save
          </button>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onEdit}>
            Edit
          </button>
        )}
        <button className="bg-indigo-500 text-white px-4 py-2 rounded" onClick={onViewChildProperties}>
          Child Properties
        </button>
      </div>
    </div>
  );
}
