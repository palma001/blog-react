import api from './graphql-axios';
import {
  schemaRecoder,
  schemaParcel,
  schemaTaxAssessor,
  schemaGeography,
  schemaOwnerUnmask,
  usa
} from './schemas';

const getData = async (query) => {    
  try {
    const { data } = await api.post('/', { query });
    return data;
  } catch (error) {
    console.log(error);
  }
}


export {
  getData,
  schemaRecoder,
  schemaParcel,
  schemaTaxAssessor,
  schemaOwnerUnmask,
  schemaGeography,
  usa
}