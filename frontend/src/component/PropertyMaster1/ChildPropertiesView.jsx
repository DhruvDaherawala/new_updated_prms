const cardStyle = 'p-2 border rounded-lg bg-gray-100';
const formInputStyle = 'w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200';

export default function ChildPropertiesView({
  childProperties,
  isEditing,
  onChildChange,
  onChildFileChange,
  onSave,
  onEdit,
  onBack,
  apiUrl
}) {
  // Sort child properties in descending order by id
  const sortedChildProperties = [...childProperties].sort((a, b) => b.id - a.id);

  return (
    <div>
      <div className="space-y-6">
        {sortedChildProperties && sortedChildProperties.length > 0 ? (
          sortedChildProperties.map((child, index) => (
            <div key={index} className="border p-4 rounded-lg bg-gray-50 relative">
              {/* New/Updated indicator */}
              {index < 3 && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  {index === 0 ? 'New' : 'Updated'}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold">Floor:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={child.floor || ''}
                      onChange={(e) => onChildChange(index, 'floor', e.target.value)}
                      className={formInputStyle}
                    />
                  ) : (
                    <p className={cardStyle}>{child.floor}</p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Title:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={child.title || ''}
                      onChange={(e) => onChildChange(index, 'title', e.target.value)}
                      className={formInputStyle}
                    />
                  ) : (
                    <p className={cardStyle}>{child.title}</p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Description:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={child.description || ''}
                      onChange={(e) => onChildChange(index, 'description', e.target.value)}
                      className={formInputStyle}
                    />
                  ) : (
                    <p className={cardStyle}>{child.description}</p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Rooms:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={child.rooms || ''}
                      onChange={(e) => onChildChange(index, 'rooms', e.target.value)}
                      className={formInputStyle}
                    />
                  ) : (
                    <p className={cardStyle}>{child.rooms}</p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Washroom:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={child.washroom || ''}
                      onChange={(e) => onChildChange(index, 'washroom', e.target.value)}
                      className={formInputStyle}
                    />
                  ) : (
                    <p className={cardStyle}>{child.washroom}</p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Gas:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={child.gas || ''}
                      onChange={(e) => onChildChange(index, 'gas', e.target.value)}
                      className={formInputStyle}
                    />
                  ) : (
                    <p className={cardStyle}>{child.gas}</p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Electricity:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={child.electricity || ''}
                      onChange={(e) => onChildChange(index, 'electricity', e.target.value)}
                      className={formInputStyle}
                    />
                  ) : (
                    <p className={cardStyle}>{child.electricity}</p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Deposit:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={child.deposit || ''}
                      onChange={(e) => onChildChange(index, 'deposit', e.target.value)}
                      className={formInputStyle}
                    />
                  ) : (
                    <p className={cardStyle}>{child.deposit}</p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Rent:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={child.rent || ''}
                      onChange={(e) => onChildChange(index, 'rent', e.target.value)}
                      className={formInputStyle}
                    />
                  ) : (
                    <p className={cardStyle}>{child.rent}</p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Status:</label>
                  {isEditing ? (
                    <select
                      value={child.status || 'Active'}
                      onChange={(e) => onChildChange(index, 'status', e.target.value)}
                      className={formInputStyle}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Under Maintenance">Under Maintenance</option>
                      <option value="Occupied">Occupied</option>
                    </select>
                  ) : (
                    <p className={cardStyle}>{child.status || 'Active'}</p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Document:</label>
                  {isEditing ? (
                    <div className="space-y-2">
                      {child.document && (
                        <a
                          href={`${apiUrl}uploads/${child.document}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 underline mb-2"
                        >
                          Current Document
                        </a>
                      )}
                      <input type="file" onChange={(e) => onChildFileChange(index, e)} className={formInputStyle} />
                    </div>
                  ) : (
                    <p className={cardStyle}>
                      {child.document ? (
                        <a
                          href={`${apiUrl}uploads/${child.document}`}
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
          ))
        ) : (
          <p className="text-center text-gray-500">No child properties available</p>
        )}
      </div>
      <div className="mt-4 flex justify-end space-x-3">
        <button className="bg-indigo-500 text-white px-4 py-2 rounded" onClick={onBack}>
          Back
        </button>
        {isEditing ? (
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={onSave}>
            Save Child Properties
          </button>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onEdit}>
            Edit Child Properties
          </button>
        )}
      </div>
    </div>
  );
}
