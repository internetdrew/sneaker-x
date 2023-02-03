import React from 'react';

import { client } from '../library/client.js';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData, bannerProductData }) => {
  return (
    <>
      <HeroBanner
        heroBanner={bannerData.length && bannerData[0]}
        bannerProductData={bannerProductData && bannerProductData}
      />
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

export const getStaticProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const bannerProductQuery = '*[_type == "banner"][0]{product->}';
  const bannerProductData = await client.fetch(bannerProductQuery);

  return {
    props: { products, bannerData, bannerProductData },
  };
};

export default Home;
