import { apiSlice } from "./apiSlice.js";



 // productApiSlice //  
  export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({ 
            // Get All Products //  
          getProducts: builder.query({
            query: () => ({
               url: "/api/products", 
               method: "GET"
            }),
            providesTags: ["Products"], // Prevent reloading the page //
            keepUnusedDataFor: 5,
           
          }),

          // Get A Single Product || Product Details // 
        getProductDetails: builder.query({
            query: (productId) => ({
            url: `/api/products/${productId}`, 
            method: "GET"
            }), 
            keepUnusedDataFor: 5,
        }),

                // Create Product //
          addProduct: builder.mutation({
              query: () => ({
                url: "/api/products",
                method: "POST",
              }),
              invalidatesTags:["Product"],    // Get rid of cache product to get fresh data //
          }),

                 // Update Product //
                 productUpdates: builder.mutation({
                   query: (data) => ({
                   url: `/api/products/${data.productId}`,
                   method: "PUT",
                   body: data,
                   }),
                   invalidatesTags: ["Products"],   // Get rid of cache product to get fresh data //
                 }),  
 
                  // Upload Product Image // 
            uploadProductImage: builder.mutation({
                query: (data) => ({
                 url: "/api/upload",
                 method: "POST",
                 body: data,
                }),
            }),

                  // Delete Product // 
            deleteProduct: builder.mutation({
               query: (productId) => ({
                url: `/api/products/${productId}`, 
                method: "DELETE",
               }),
                }),

                  // Create New Review //
              createReview: builder.mutation({
                query: (data) => ({
                  url: `/api/products/${data.productId}/reviews`,
                  method: "POST",
                  body: data,
                }),
                invalidatesTags: ["Product"],   // Get rid of cache product to get fresh data //
              }),


    }),
  }); 


  export const {useGetProductsQuery, 
                useGetProductDetailsQuery,
                useAddProductMutation, 
                useProductUpdatesMutation, 
                useUploadProductImageMutation, 
                useDeleteProductMutation,
                useCreateReviewMutation,
               } = productsApiSlice;
              
               
             
             


