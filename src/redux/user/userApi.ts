import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page = 1) => ({
        url: `users?page=${page}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
