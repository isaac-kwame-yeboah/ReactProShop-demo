import { apiSlice } from "./apiSlice.js";



    // usersApiSlice //  
  export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({ 
            // Login A User //  
           login: builder.mutation({
            query: (data) => ({
               url: "/api/users/login", 
               method: "POST",
               body: data,
            }),
          }),
   

              // Register A User //  
             register: builder.mutation({
              query: (data) => ({
              url: "/api/users",
              method: "POST", 
              body: data,
              })
             }),


            // Logout A User //  
            logout: builder.mutation({
              query: () => ({
                url: "/api/users/logout",
                method: "POST",
              })
            }), 

            
             // Update User Profile //   
            profile: builder.mutation({
               query: (data) => ({
                 url: "/api/users/profile",
                 method: "PUT",
                 body: data,
               })
            }),


                // Get All Users (Admin Only) //
             getUsers: builder.query({
               query: () => ({
                url: "/api/users",
                method: "GET",
               }),
               providesTags: ["Users"],  // Prevent reloading the page //
               keepUnusedDataFor: 5,
             }),

                // Delete User (Admin Only) // 
                deleteUser: builder.mutation({
                   query: (userId) => ({
                    url: `/api/users/${userId}`,
                    method: "DELETE",
                   })
                }),
  

                  // Get User Details (Admin Only) // 
                  getUserDetails: builder.query({
                     query: (userId) => ({
                       url: `/api/users/${userId}`,
                       method: "GET"
                     }),
                     keepUnusedDataFor: 5,
                  }),


                   // Update User (Admin Only) //
                 updateUser: builder.mutation({
                   query: (data) => ({
                    url: `/api/users/${data.userId}`,
                    method: "PUT",
                    body: data,
                   }),
                     invalidatesTags: ["Users"],
                 }),


            
    }),
  }); 


  export const { useLoginMutation,
                 useLogoutMutation,
                 useRegisterMutation,
                 useProfileMutation,
                 useGetUsersQuery,
                 useDeleteUserMutation,
                 useGetUserDetailsQuery,
                 useUpdateUserMutation,
               } = usersApiSlice;


