// import { BLOGPOSTS_URL, UPLOADS_URL } from '../constants';
// import { apiSlice } from './apiSlice';

// export const blogpostsApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getBlogposts: builder.query({
//       //   query: ({ keyword, pageNumber }) => ({
//       query: () => ({
//         url: BLOGPOSTS_URL,
//         // params: {
//         //   keyword,
//         //   pageNumber,
//         // },
//       }),
//       //   providesTags: ['LearningPaths'],
//       keepUnusedDataFor: 5,
//     }),
//     getLearningPathDetails: builder.query({
//       query: (learningPathId) => ({
//         url: `${BLOGPOSTS_URL}/${learningPathId}`,
//       }),
//       keepUnusedDataFor: 5,
//     }),
//     getCoursesForLearningPath: builder.query({
//       query: (learningPathId) => ({
//         url: `${BLOGPOSTS_URL}/${learningPathId}/courses`,
//       }),
//       providesTags: ['Courses'],
//       keepUnusedDataFor: 5,
//     }),
//     getCourseDetails: builder.query({
//       query: ({ learningPathId, courseId }) => ({
//         url: `${BLOGPOSTS_URL}/${learningPathId}/courses/${courseId}`,
//       }),
//       keepUnusedDataFor: 5,
//     }),
//     getQuizzesForCourse: builder.query({
//       query: ({ learningPathId, courseId }) => ({
//         url: `${BLOGPOSTS_URL}/${learningPathId}/courses/${courseId}/quizzes`,
//       }),
//       keepUnusedDataFor: 5,
//     }),
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
//     uploadCourseVideo: builder.mutation({
//       query: (data) => ({
//         url: BLOGPOSTS_URL,
//         method: 'POST',
//         body: data,
//       }),
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
//   }),
// });

// export const {
//   useGetBlogpostsQuery,
//   useGetLearningPathDetailsQuery,
//   useGetCoursesForLearningPathQuery,
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
// } = blogpostsApiSlice;
