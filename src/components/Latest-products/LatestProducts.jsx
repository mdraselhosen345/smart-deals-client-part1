import React, { useEffect, useState } from 'react'
import Products from '../Product/Product';
import Product from '../Product/Product';

const LatestProducts = ({ latestProductsPromise }) => {
     const [products, setProducts] = useState([]);
       useEffect(() => {
        latestProductsPromise
            .then(data => {
                setProducts(data);
                console.log(data);
            })
            .catch(err => console.log(err));
    }, [latestProductsPromise]);
  return (
    <div> 
        <h2 className="text-5xl text-center">Recent <span className='text-primary'>Products</span></h2> 
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
                products.map(product => <Product
                    key={product._id}
                    product = {product}
                  ></Product>)
            }
        </div>     
    </div>
  )
}

export default LatestProducts
