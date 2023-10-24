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
    //     createLearningPath: builder.mutation({
    //       query: () => ({
    //         url: BLOGPOSTS_URL,
    //         method: 'POST',
    //       }),
    //       invalidatesTags: ['LearningPaths'],
    //     }),
    //     updateLearningPath: builder.mutation({
    //       query: (data) => ({
    //         url: `${BLOGPOSTS_URL}/${data.learningPathId}`,
    //         method: 'PUT',
    //         body: data,
    //       }),
    //       invalidatesTags: ['LearningPaths'],
    //     }),
    //     deleteLearningPath: builder.mutation({
    //       query: (learningPathId) => ({
    //         url: `${BLOGPOSTS_URL}/${learningPathId}`,
    //         method: 'DELETE',
    //       }),
    //     }),
    //     createCourse: builder.mutation({
    //       query: (learningPathId) => ({
    //         url: `${BLOGPOSTS_URL}/${learningPathId}/courses`,
    //         method: 'POST',
    //       }),
    //       invalidatesTags: ['Courses'],
    //     }),
    //     updateCourse: builder.mutation({
    //       query: (data) => ({
    //         url: `${BLOGPOSTS_URL}/${data.learningPathId}/courses/${data.courseId}`,
    //         method: 'PUT',
    //         body: data,
    //       }),
    //       invalidatesTags: ['Courses'],
    //     }),
    //     deleteCourse: builder.mutation({
    //       query: ({ learningPathId, courseId }) => ({
    //         url: `${BLOGPOSTS_URL}/${learningPathId}/courses/${courseId}`,
    //         method: 'DELETE',
    //       }),
    //     }),
    //     createReview: builder.mutation({
    //       query: (data) => ({
    //         url: `${BLOGPOSTS_URL}/${data.learningPathId}/reviews`,
    //         method: 'POST',
    //         body: data,
    //       }),
    //       invalidatesTags: ['LearningPath'],
    //     }),
  }),
});

export const {
  useGetBlogpostsQuery,
  useGetBlogpostDetailsQuery,
  useGetCommentsForBlogpostQuery,
  //   useGetCourseDetailsQuery,
  //   useGetQuizzesForCourseQuery,
  //   useCreateLearningPathMutation,
  //   useUpdateLearningPathMutation,
  //   useDeleteLearningPathMutation,
  //   useCreateCourseMutation,
  //   useUpdateCourseMutation,
  //   useUploadCourseVideoMutation,
  //   useDeleteCourseMutation,
  //   useCreateReviewMutation,
} = blogpostsApiSlice;
