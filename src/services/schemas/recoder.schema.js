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
  `,

  recoderGrantee: (recoderId, limit) => `
    query MyQuery {
      recorder_grantee(where: {recorder_id: {_eq: "${recoderId}"}}, limit: ${limit}) {
        cherre_recorder_grantee_pk
        grantee_address
        grantee_address_format_code
        grantee_care_of_name
        grantee_city
        grantee_crrt
        grantee_entity_code
        grantee_entity_count
        grantee_first_name
        grantee_house_number
        grantee_last_name
        grantee_middle_name
        grantee_name
        grantee_name_suffix
        grantee_owner_type
        grantee_state
        grantee_street_direction
        grantee_street_name
        grantee_street_post_direction
        grantee_street_suffix
        grantee_unit_number
        grantee_unit_prefix
        grantee_vesting_deed_code
        grantee_vesting_recorded_code
        grantee_zip
        grantee_zip_4
        is_grantee_address_info_private
        is_grantee_investor
        recorder_id
      }
    }
  
  `,

  recoderGrantor: (recoderId, limit) => `
    query MyQuery {
      recorder_grantor(where: {recorder_id: {_eq: "${recoderId}"}}, limit: ${limit}) {
        cherre_recorder_grantor_pk
        grantor_address
        grantor_address_format_code
        grantor_city
        grantor_crrt
        grantor_entity_code
        grantor_first_name
        grantor_house_number
        grantor_last_name
        grantor_middle_name
        grantor_name
        grantor_name_suffix
        grantor_owner_type_code
        grantor_state
        grantor_street_direction
        grantor_street_name
        grantor_street_post_direction
        grantor_street_suffix
        grantor_unit_number
        grantor_unit_prefix
        grantor_zip
        grantor_zip_4
        is_grantor_address_info_private
        recorder_id
      }
    }
  
  `,

  recorderLegalDescription: (recoderId, limit) => `
    query MyQuery {
      recorder_legal_description(where: {recorder_id: {_eq: "${recoderId}"}}, limit: ${limit}) {
        cherre_recorder_legal_description_pk
        legal_description
        recorder_id
      }
    }
  `,

  recorderMortgage: (recoderId, limit) => `
    query MyQuery {
      recorder_mortgage(where: {recorder_id: {_eq: "${recoderId}"}}, limit: ${limit})  {
        adjustable_rate_index_code
        amount
        book
        cherre_recorder_mortgage_pk
        cherre_term_due_date
        document_number
        document_number_legacy
        document_recorded_date
        fixed_step_conversion_rate_code
        has_interest_only_period
        has_pre_payment_penalty
        instrument_number
        interest_only_period
        interest_rate
        interest_rate_change_frequency_code
        interest_rate_index_code
        interest_rate_margin
        interest_rate_maximum
        interest_rate_maximum_first_change
        interest_rate_minimum_first_change
        interest_rate_type_change_day
        interest_rate_type_change_month
        interest_rate_type_change_year
        interest_rate_type_code
        interest_type_code
        is_adjustable_rate_rider
        is_lender_seller_carry_back
        lender
        lender_address
        lender_city
        lender_entity_classification_code
        lender_first_name
        lender_last_name
        lender_name
        lender_state
        lender_zip
        lender_zip_4
        mortgage_due_date
        page
        pre_payment_term
        recorder_id
        term
        term_type_code
        type_code
      }
    }
  `
    
}

export default schemaRecoder;