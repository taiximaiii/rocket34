import React from 'react'
import {useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductService from '../services/ProductService';

const ProductEdit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
      });
    useEffect(()=>{
        ProductService.getProduct(id).then((res)=>{
            setProduct(()=>{
                return {
                    name:res.data.name,
                    description:res.data.description,
                    price:res.data.price
                }
            })
        })
    },[id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
      };

    const editProduct = (e)=>{
        e.preventDefault();
        setSubmitted(true);
        if (!product.name || !product.description || !product.price) {
            return;
        }
        ProductService.editProduct(id,product).then((res)=>{
            navigate("/admin")
        }).catch(err=>{
            setErrorMessage("Unexpected error occurred");
        })
    }

    
    
  return (
    <form onSubmit={(e)=>editProduct(e)} 
          noValidate
          className={submitted?'was-validated':''}            >

        <div className="modal-header">
          <h5 className="modal-title">ProductDetail</h5>
        </div>

        <div className="modal-body">
          {errorMessage &&
            <div className="alert alert-danger">
              {errorMessage}
            </div>
          }
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" 
                  id="name"
                  className="form-control" 
                  placeholder="Enter name"
                  required
                  value={product.name} 
                  onChange={(e)=>handleChange(e)} />
            <div className="invalid-feedback">Name is required</div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea type="text" name="description"
                  id="description" 
                  className="form-control" 
                  placeholder="Enter description"
                  required
                  value={product.description} 
                  onChange={(e)=>handleChange(e)} />
            <div className="invalid-feedback">Description is required</div>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input type="number" name="price"
                  id="price" 
                  min="1"
                  step="any"
                  className="form-control" 
                  placeholder="Enter Price"
                  required
                  value={product.price} 
                  onChange={(e)=>handleChange(e)} />
            <div className="invalid-feedback">Price is required</div>
          </div>
          
        </div>

        <div className="modal-footer">
      
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>

      </form>
  )
}

export default ProductEdit