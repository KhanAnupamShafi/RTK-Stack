import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

// Create API Slice for hitting the API endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://reqres.in/api' }),
  endpoints: () => ({}),
});
