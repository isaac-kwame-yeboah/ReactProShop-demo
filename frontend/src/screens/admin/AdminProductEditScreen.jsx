                         // AdminProductEditScreen ---- Admin Only //

import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import FormContainer from "../../components/FormContainer.jsx";
import { toast } from "react-toastify";
import {useProductUpdatesMutation, useGetProductDetailsQuery, useUploadProductImageMutation} from "../../slices/productsApiSlice.js";



const AdminProductEditScreen = () => {
                  // Get Id From Url //
              const {id:productId} = useParams();

                     // useState for Edit Form //
                 const [name, setName] = useState("");
                 const [price, setPrice] = useState("");
                 const [image, setImage] = useState("");
                 const [brand, setBrand] = useState("");
                 const [category, setCategory] = useState("");
                 const [countInStock, setCountInStock] = useState("");
                 const [description, setDescription] = useState("");


                   // Using Redux Toolkit To Get Product Id For Editing //
          const {data:product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
          console.log(product);

                  // Using Redux Toolkit //
        const [productUpdates, { isLoading:loadingUpdate}] = useProductUpdatesMutation();

                // Using Redux Toolkit To Handle File Upload //
        const [uploadProductImage, {isloading:loadingUpload}] = useUploadProductImageMutation();


                     // Initialize useNavigate //
                     const navigate = useNavigate();

                // useEffect for form fields //
                   useEffect(() => {
                     /* Check for product */
                        if (product) {
                     setName(product.name);
                     setPrice(product.price);
                     setImage(product.image);
                     setBrand(product.brand);
                     setCategory(product.category);
                     setCountInStock(product.countInStock);
                     setDescription(product.description);
                    }
                   },[product]);


                     // submitHandlerFunction //
                const submitHandler = async (e) => {
                      e.preventDefault();
                      const updatedProduct = {
             // Current State of form fields in useState for Edit Form //
                        productId,
                        name,
                        price,
                        image,
                        brand,
                        category,
                        countInStock,
                        description,
                     };
       const result = await productUpdates(updatedProduct);
                if (result.error) {
                  toast.error(result.error);
                } else {
                  toast.success("Product Updated");
                   refetch();
                    navigate("/admin/productlist");
                }
                }


                   // uploadFileHandler Function //
          const uploadFileHandler = async (e) => {
                  // console.log(e.target.files[0]);

                   // Create New FormData Object //
              const formData = new FormData();
                 formData.append("image", e.target.files[0]);
                   try {
                     const res = await uploadProductImage(formData).unwrap();
                      toast.success(res.message);
                       setImage(res.image);
                   } catch (error) {
                     toast.error(error?.data?.message || error.error);
                   }
               }




  return (
       <>
         <Link to="/admin/productlist" className="btn btn-light my-3">
            Go Back
         </Link>

             <FormContainer>
                <h1> Edit Product </h1>
                    {/* Check for loadingUpdate */}
                    {loadingUpdate && <loader />}


                      {/* Check for isLoading */}
                { isLoading ? <Loader /> : error ? <Message>  </Message> : (

                <Form onSubmit={submitHandler}>
                                   {/* Name Field */}
                        <Form.Group controlId="name" className="my-2">
                       <Form.Label> Name  </Form.Label>
 <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}>
  </Form.Control>
                        </Form.Group>

                                {/* Price Field */}
                        <Form.Group controlId="price" className="my-2">
                       <Form.Label> Price </Form.Label>
 <Form.Control type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)}>
  </Form.Control>
                        </Form.Group>

                          {/* IMAGE URL PlaceHolder */}
             <Form.Group controlId="image" className="my-2">
                <Form.Label> Image </Form.Label>
  <Form.Control type="text" placeholder="Enter Image Url" value={image} onChange={(e) => setImage(e.target.value) }>
   </Form.Control>
                                   {/* Choose File */}
   <Form.Control type="file" label="Choose file" onChange={uploadFileHandler}>
  </Form.Control>
             </Form.Group>

                               {/* Brand Field */}
                        <Form.Group controlId="brand" className="my-2">
                       <Form.Label> Brand </Form.Label>
 <Form.Control type="text" placeholder="Enter Brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
  </Form.Control>
                        </Form.Group>

                          {/* Count InStock Field */}
                        <Form.Group controlId="countInStock" className="my-2">
                       <Form.Label> Count In Stock </Form.Label>
 <Form.Control type="number" placeholder="Enter Count In Stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
  </Form.Control>
                        </Form.Group>

                              {/* Category Field */}
                        <Form.Group controlId="category" className="my-2">
                       <Form.Label> Category </Form.Label>
 <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)}>
  </Form.Control>
                        </Form.Group>

                                         {/* Description Field */}
                        <Form.Group controlId="description" className="my-2">
                       <Form.Label> Description </Form.Label>
 <Form.Control type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)}>
  </Form.Control>
                        </Form.Group>

                           {/* Button */}
    <Button type="submit" variant="primary" className="my-2">
          Update Product
     </Button>

                   </Form>

                )}


             </FormContainer>

       </>
  )
}

export default AdminProductEditScreen
