const schemaRecoder = {
  recoder: (taxAssessorId, limit) => `
    query MyQuery {
      recorder(where: {tax_assessor_id: {_eq: "${taxAssessorId}"}}, limit: ${limit}) {
        arms_length_code
        assessor_parcel_number_formatted
        assessor_parcel_number_original
        cherre_recorded_instrument_date
        data_publish_date
        document_amount
        document_amount_type_code
        document_book
        document_instrument_date
        document_number_formatted
        document_number_legacy
        document_page
        document_recorded_date
        document_recording_county
        document_recording_fips
        document_recording_jurisdiction
        document_recording_state
        document_type_code
        is_foreclosure_auction_sale
        is_property_address_info_private
        is_quit_claim
        legal_block
        legal_district
        legal_lot
        legal_plat_map_book
        legal_plat_map_page
        legal_range
        legal_section
        legal_subdivision
        legal_township
        legal_tract
        legal_unit_number
        map_reference
        owner_relationship_code
        partial_interest_code
        property_address
        property_address_format_code
        property_city
        property_crrt
        property_group_type
        property_house_number
        property_state
        property_street_direction
        property_street_name
        property_street_post_direction
        property_street_suffix
        property_unit_number
        property_unit_prefix
        property_use_standardized_code
        property_zip
        property_zip_4
        recorder_id
        recorder_last_update_date
        reference_instrument_number
        tax_assessor_id
        title_company_code
        title_company_name
        title_company_standardized_name
        transaction_type_code
        transfer_distress_circumstance_code
        transfer_multiple_parcel_code
        transfer_purchase_down_payment
        transfer_purchase_loan_to_value
        transfer_purchase_type_code
        transfer_tax_amount
        transfer_tax_city
        transfer_tax_county
      }
    }
  `
}

export default schemaRecoder;