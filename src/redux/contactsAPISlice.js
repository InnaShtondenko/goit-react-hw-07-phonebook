import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './operations';

export const phonebookAPI = createApi({
  reducerPath: 'phonebookAPI',

  baseQuery: axiosBaseQuery({
    baseUrl: 'https://63bab87756043ab3c7a2993d.mockapi.io/api/contacts',
  }),

  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => ` `,
      providesTags: result => [
        ...result.map(({ id }) => ({ type: 'Contacts', id })),
        { type: 'Contacts', id: 'LIST' },
      ],
    }),

    addContact: builder.mutation({
      query: contactObj => ({
        method: 'post',
        data: contactObj,
      }),
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),

    deleteContact: builder.mutation({
      query: contactID => ({
        url: `/${contactID}`,
        method: 'delete',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Contacts', id }],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = phonebookAPI;