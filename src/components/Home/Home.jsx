import React from 'react';

import LatestProducts from '../Latest-products/LatestProducts';


const Home = () => {
    const latestProductsPromise = fetch('http://localhost:3000/latest-products')
    .then(res => res.json());
    return (
        <div>
            <h3 className='bg-primary'>this is home</h3>
              <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
        </div>
    );
};

export default Home;