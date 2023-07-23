const schemaGeography = {
  censusTractBoundaryUsa: (value, limit) => `
    query MyQuery {
      usa_census_tract_boundary(
        where: {tax_assessor__cherre_census_tract_geo_id: {tax_assessor_id: {_eq: "${value}"}}},
        limit: ${limit}
      ) {
        area_land_meters
        area_water_meters
        county_fips_code
        functional_status
        geo_id_pk
        internal_point_geo
        internal_point_lat
        internal_point_lon
        lsad_name
        state
        state_fips_code
        state_name
        tract_ce
        tract_geom
        tract_name
      }
    }
  `,
  countyBoundaryUsa: (value, limit) => `
    query MyQuery {
      usa_county_boundary(
        where: {tax_assessor__fips_code: {tax_assessor_id: {_eq: "${value}"}}},
        limit: ${limit}
      ) {
        area_land_meters
        area_water_meters
        cbsa_fips_code
        county_concat_name
        county_fips_code_pk
        county_geom
        county_gnis_code
        county_name
        csa_fips_code
        fips_class_code
        functional_status
        geo_id
        int_point_geom
        int_point_lat
        int_point_lon
        lsad_code
        lsad_name
        met_div_fips_code
        mtfcc_feature_class_code
        state
        state_fips_code
      }
    }
  `,
  stateBoundaryUsa: (value, limit) => `
    query MyQuery {
      usa_state_boundary(where: {tax_assessor__state: {tax_assessor_id: {_eq: "${value}"}}},
      limit: ${limit}) {
        area_land_meters
        area_water_meters
        division_code
        functional_status
        geo_id
        int_point_geom
        int_point_lat
        int_point_lon
        lsad_code
        mtfcc_feature_class_code
        region_code
        state
        state_fips_code
        state_fips_code_pk
        state_geom
        state_gnis_code
        state_name
        updated_at
      }
    }
  
  `,
  msaBoundaryUsa: (value, limit) => `
    query MyQuery {
      usa_msa_boundary (where: {tax_assessor__cbsa_code: {tax_assessor_id: {_eq: "${value}"}}}, limit: ${limit}) {
        cbsa_code
        census_area
        geo_id
        geometry
        lsad
        msa_name
      }
    }
  `,
  zipBoundaryUsa: (value, limit) => `
    query MyQuery {
      usa_zip_code_boundary(
        where: {tax_assessor__zip: {tax_assessor_id: {_eq: "${value}"}}},
        limit: ${limit}
      ) {
        geography_code
        geography_id
        latitude
        longitude
        reference_1
        reference_10
        reference_2
        reference_3
        reference_4
        reference_5
        reference_6
        reference_7
        reference_8
        reference_9
        zip_code
        zip_code_geom
      }
    }
  `,
  schoolBoundaryUsa: (value, limit) => `
    query MyQuery {
      usa_school_boundary(
        where: {usa_school__institution_id: {tax_assessor_usa_school__bridge: {tax_assessor_id: {_eq: "${value}"}}}},
        limit: ${limit}
      ) {
        area
        area_unit_measurement
        boundary_id
        center_latitude
        center_longitude
        center_point
        change_flag
        date_added
        date_modified
        geography_code
        geography_id
        geography_name
        institution_id
        name_type
        record_id
        reference_1
        reference_2
        reference_3
        reference_5
        school_attendance_geom
        state_2
        type_1
        type_2
        type_3
        type_4
        type_5
        vintage
      }
    }
  
  `,
  neighborhoodBoundaryUsa: (value, limit) => `
    query MyQuery {
      usa_neighborhood_boundary(
        where: {tax_assessor_usa_neighborhood_boundary__bridge: {tax_assessor_id: {_eq: "${value}"}}},
        limit: ${limit}
      ) {
        area
        area_unit_measurement
        boundary_id
        center_latitude
        center_longitude
        center_point
        change_flag
        country_2
        county_5
        date_added
        geography_code
        geography_id
        geography_name
        granularity_level
        name_type
        neighborhood_geom
        record_id
        state_2
        vintage
      }
    }
  
  `,
  parcelBoundary: (value, limit) => `
    query MyQuery {
      parcel_boundary(where: {tax_assessor_id: {_eq: "${value}"}}, limit: ${limit}) {
        assessor_parcel_number
        cherre_parcel_boundary_pk
        fips_code
        geojson
        geom
        latitude
        longitude
        parcel_centroid
        parcel_centroid_geometry
        tax_assessor_id
      }
    }
  
  `
}


export default schemaGeography;