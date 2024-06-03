                          // PRODUCT-LIST SCREEN -- Admin Only //  

import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation} from "../../slices/productsApiSlice.js";
import { toast } from "react-toastify";




 
const ProductListScreen = () => {  
        
                       // Using Redux Toolkit //  
           const {data:products, isLoading, error, refetch} = useGetProductsQuery();
           console.log(products);
    
                      // Using Redux Toolkit //   
           const [addProduct, {isLoading:loadingCreate}] = useAddProductMutation()

                         // Using Redux Toolkit //   
           const [ deleteProduct, {isLoading:loadingDelete}] = useDeleteProductMutation();

             // deleteHandler Function //
             const deleteHandler = async (id) => {
                if(window.confirm("Are you sure?")){
                    try {
                       await deleteProduct(id);
                       toast.success("Product deleted");
                       refetch();
                    } catch (err) {
                  toast.error(err?.data?.message || err.error);
                    }
                }


             }

               // addProductHandler Function //  
             const addProductHandler = async () => {
                 if (window.confirm("Are you sure you want add new product?")) {
                        try {
                          await addProduct();
                          toast.success("Product created");
                            refetch();
                        } catch (error) {
                          toast.error(error.data?.message || error.error);
                        }
                    }
             }
             




  return (
     <> 
       <Row> 
           <Col className="align-items-center">   {/* 1st Column start */}
             <h1> Products </h1>
           </Col>         {/* 1st Column end */} 

            <Col className="text-end">   {/* 2nd Column start */}
                <Button className="btn-sm m-3" onClick={addProductHandler}>   
                  <FaEdit /> Create Product
                </Button>
            </Col>  {/* 2nd Column end */}

       </Row>     
                         {/* check for loadingCreate */}
                        {loadingCreate && <Loader />}    
                        
                           {/* check for loadingDelete */}
                          {loadingDelete && <Loader />} 

                   {/* check for isLoading */}
        {isLoading ? <Loader /> : error ? <Message> </Message> : ( 
            <> 
             <Table striped hover responsive className="table-sm"> 
               <thead> 
                <tr>
                    <th> PRODUCT ID </th>  
                    <th> NAME </th> 
                    <th> PRICE </th> 
                    <th> CATEGORY </th> 
                    <th> BRAND </th> 
                    <th>  </th> {/* Edit Button PlaceHolder */} 
                    <th> </th>  {/* Delete Button PlaceHolder */} 
                </tr>
               </thead>   

                <tbody>  
                        {/* Map through products */}  
                     {products.map((product) => ( 
                        <tr key={product._id}>  
                            <td> {product._id} </td> 
                            <td> {product.name} </td> 
                            <td> {product.price} </td> 
                            <td> {product.category} </td> 
                            <td> {product.brand} </td> 
                            <td> 
                          <LinkContainer to={`/admin/product/${product._id}/edit`}>
                             <Button variant="light" className="btn-sm mx-2">  
                             <FaEdit /> Edit
                             </Button>
                         </LinkContainer> 
                             </td>  

                             <td> 
                <Button variant="light" className="btn-sm mx-2" onClick={() => deleteHandler(product._id)}> 
                     <FaTrash /> Delete
                </Button> 
                             </td>
                        </tr>
                     ))}  
                </tbody>

              </Table> 
            </>
             
        )}
     
     
     
     </>
  )
}

export default ProductListScreen

    /* 
                ## Without Using Sample Data  ##
                 // createProductHandler Function // 
              const createProductHandler = () => {
                  createProduct({
                    name: "Sample Name",
                    price: 0,
                    description: "Sample description",
                    brand: "Sample Brand",
                    category: "Sample Category",
                    countInStock: "0",
                    image:"/images/sample.jpg"
                  })
              }

   */