import React from 'react';

import { client } from '../library/client.js';
import { Product, FooterBanner, HeroBanner } from '../components';
import banner from '@/sneakers-ecomm-backend/schemas/banner.js';

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Kicks</h2>
        <p>See what's flying off of the shelves</p>
      </div>
      <div className='products-container'>
        {products?.map(product => (
          <Product key={product?._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
