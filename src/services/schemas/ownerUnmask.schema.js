const schemaOwnerUnmask = {
  usaMsaBoundary: (val, limit) => `
    query MyQuery {
        usa_msa_boundary(
        where: {tax_assessor__cbsa_code: {tax_assessor_id: {_eq: "${val}"}}},
        limit: ${limit}
      ) {
          cbsa_code
          census_area
          geo_id
          lsad
          msa_name
        }
    }
  `,

  ownerUnmaskInfo: (value, limit) => `
    query MyQuery {
      usa_owner_unmask_contact_info(
        where: {usa_owner_unmask_contact_info__corp_id: {usa_owner_unmask__owner_id: {tax_assessor_id: {_eq: "${value}"}}}},
        limit: ${limit}
      ) {
        contact_one_line_address
        email_1
        email_2
        owner_id
        phone_number_1
        phone_number_2
        phone_number_3
      }
    }
  
  `,

  usaOwnerUnmaskEmployee: (value, limit) => `
    query MyQuery {
      usa_owner_unmask_employee(
        where: {
          usa_owner_unmask_contact_info__owner_id: {
            usa_owner_unmask_contact_info__corp_id: {
              usa_owner_unmask__owner_id: {
                tax_assessor_id: {
                  _eq: "${value}"
                }
              }
            }
          }
        },
        limit: ${limit}
      ) {
        employee_id
        name
        title
      }
    }
  `,

  ownerUnmaskCorporation: (value, limit) => `
    query MyQuery {
      usa_owner_unmask_corporation(
        where: {usa_owner_unmask__owner_id: {tax_assessor_id: {_eq: "${value}"}}},
        limit: ${limit}
      ) {
        corp_id
        industry
        website
      }
    }
  `,
  ownerUnmaskCorporateEmployee: (value, limit) => `
    query MyQuery {
      usa_owner_unmask_corp_employee(
        where: {usa_owner_unmask_employee__employee_id: {usa_owner_unmask_contact_info__owner_id: {usa_owner_unmask_contact_info__corp_id: {usa_owner_unmask__owner_id: {tax_assessor_id: {_eq: "${value}"}}}}}},
        limit: ${limit}
      ) {
        corp_id
        employee_id
        last_seen_date
      }
    }
  `
}
  
export default schemaOwnerUnmask;