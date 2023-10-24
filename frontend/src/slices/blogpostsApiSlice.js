import { BLOGPOSTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const blogpostsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogposts: builder.query({
      query: () => ({
        url: BLOGPOSTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getBlogpostDetails: builder.query({
      query: (blogpostId) => ({
        url: `${BLOGPOSTS_URL}/${blogpostId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getCommentsForBlogpost: builder.query({
      query: (blogpostId) => ({
        url: `${BLOGPOSTS_URL}/${blogpostId}/comments`,
      }),
      providesTags: ['Comments'],
      keepUnusedDataFor: 5,
    }),
    createBlogpost: builder.mutation({
      query: (data) => ({
        url: BLOGPOSTS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Blogposts'],
    }),
    updateBlogpost: builder.mutation({
      query: (data) => ({
        url: `${BLOGPOSTS_URL}/${data.blogpostId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Blogposts'],
    }),
    deleteBlogpost: builder.mutation({
      query: (blogpostId) => ({
        url: `${BLOGPOSTS_URL}/${blogpostId}`,
        method: 'DELETE',
      }),
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: `${BLOGPOSTS_URL}/${data.blogpostId}/comments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Blogpost'],
    }),
  }),
});

export const {
  useGetBlogpostsQuery,
  useGetBlogpostDetailsQuery,
  useGetCommentsForBlogpostQuery,
  useCreateBlogpostMutation,
  useUpdateBlogpostMutation,
  useDeleteBlogpostMutation,
  useCreateCommentMutation,
} = blogpostsApiSlice;
