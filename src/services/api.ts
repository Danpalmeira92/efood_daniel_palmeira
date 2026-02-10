import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Prato from '../models/Pratos'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-api-tau.vercel.app/api/efood/'
  }),
  endpoints: (builder) => ({
    getPratos: builder.query<Prato[], void>({
      query: () => 'pratos'
    })
  })
})

export const { useGetPratosQuery } = api
export default api
