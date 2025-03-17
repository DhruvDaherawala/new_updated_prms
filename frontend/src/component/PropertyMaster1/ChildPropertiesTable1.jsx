export default function ChildPropertiesTable({ childCount, onChange, formInputStyle }) {
  return (
    <div className="overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style>
        {`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        `}
      </style>
      <table className="w-full bg-gray-200 rounded-lg text-sm mt-4 table-auto">
        <thead>
          <tr className="bg-indigo-500 text-white">
            <th className="p-3 rounded-tl-lg">Floor</th>
            <th className="p-3">Title</th>
            <th className="p-3">Description</th>
            <th className="p-3">Rooms</th>
            <th className="p-3">Washroom</th>
            <th className="p-3">Gas</th>
            <th className="p-3">Electricity</th>
            <th className="p-3">Deposit</th>
            <th className="p-3">Rent</th>
            <th className="p-3 rounded-tr-lg">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: childCount }, (_, index) => (
            <tr key={index}>
              {['floor', 'title', 'description', 'rooms', 'washroom', 'gas', 'electricity', 'deposit', 'rent'].map((field) => (
                <td key={field} className="p-3">
                  <input
                    type="text"
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    onChange={(e) => onChange(index, e)}
                    className={formInputStyle}
                  />
                </td>
              ))}
              <td className="p-3">
                <select name="status" onChange={(e) => onChange(index, e)} className={formInputStyle} defaultValue="Active">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                  <option value="Occupied">Occupied</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
