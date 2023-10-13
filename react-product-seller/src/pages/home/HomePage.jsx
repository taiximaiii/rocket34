import React, { useState,useEffect } from 'react'
import ProductService from '../../services/ProductService';
import PurchaseService from '../../services/PurchaseService';
import {useSelector} from 'react-redux'
import Purchase from '../../models/Purchase';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import './HomePage.css'
const HomePage = () => {
  const [productList,setProductList] = useState([]);
  const [err,setErrMessage] = useState('');
  const [infoMessage,setInfoMessage] = useState('')
  const currentUser = useSelector(state=>state.user);

  useEffect(()=>{
    ProductService.getAllProducts().then(res=>{
      setProductList(res.data);
    })
  },[])
  const purchaseProduct = (product)=>{
    if(!currentUser?.id){
      setErrMessage('You should login to buy a product');
      return;
    }
    const purchase = new Purchase(product.price);
    PurchaseService.savePurchase(purchase,product.id).then(()=>{
      setInfoMessage("Purchase completed")
    }).catch(err=>setErrMessage('Unexpected error occoured'));
    
  }
  return (
    <div className='container p-3'>
      {err && <div className='aler alert-danger'>{err}</div>}

      {infoMessage &&
      <div className='alert alert-success'>
        {infoMessage}
      </div>}
      <div className="d-flex flex-wrap">
        {productList.map((product)=>(
          <div key={product.id} className='card m-3 home-card'>
              <div className="card-body">
                <div className="card-title text-uppercase">{product.name}</div>
                <div className="card-subtitle text-muted">{product.description}</div>
              </div>
              <FontAwesomeIcon icon={faCartShopping}  className='ms-auto me-auto product-icon'/>
              <div className="row mt-2 p-3">
                <div className="col-6 mt-2 ps-4">
                  {'$'+ product.price}
                </div>
                <div className="col-6">
                  <button className="btn btn-outline-success w-100" onClick={()=>{purchaseProduct(product)}}>
                    Buy
                  </button>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage