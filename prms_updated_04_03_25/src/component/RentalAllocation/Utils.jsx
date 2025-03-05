// Helper functions for data display and manipulation
export const Utils = {
  // Get renter name by ID
  getRenterName: (id, renters) => {
    const renter = renters.find((r) => (r.id || r.renter_id) == id)
    return renter ? renter.renterName || renter.renter_name : "Unknown"
  },

  // Get property name by ID
  getPropertyName: (id, properties) => {
    const property = properties.find((p) => (p.id || p.property_id) == id)
    return property ? property.propertyName || property.property_name : "Unknown"
  },

  // Get child property name by ID
  getChildPropertyName: (id, childProperties) => {
    if (!id) return "N/A"
    const childProperty = childProperties.find((cp) => (cp.id || cp.childproperty_id) == id)
    return childProperty ? childProperty.title || childProperty.name : "Unknown"
  },
}

// Common styles
export const Styles = {
  formInputStyle: "w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200",
  cardStyle: "p-2 border rounded-lg bg-gray-100",
}

