const schemaParcel = {
  parcel: (limit) => `
    query ParcelBoundaryLoad {
      parcel_boundary(order_by:{tax_assessor_id:asc}limit:${limit}) {
        tax_assessor__tax_assessor_id {
          one_line_address
        }
        tax_assessor_id
        assessor_parcel_number
      }
    }
    
  `
}

export default schemaParcel;