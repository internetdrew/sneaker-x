import React from 'react';

import { client } from '../library/client.js';
import { Product, FooterBanner, HeroBanner } from '../components';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { BsCheckLg } from 'react-icons/bs';

const Home = ({ bannerData, bannerProductData }) => {
  const { data: products, isLoading } = useQuery(['products'], async () => {
    const query = '*[_type == "product"]';
    return await client.fetch(query);
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  // console.log(products);

  // if (isError) {
  //   return <h2>Error: {error}</h2>;
  // }

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
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['products'], async () => {
    const query = '*[_type == "product"]';
    return await client.fetch(query);
  });
  // const {
  //   isLoading,
  //   data: products,
  //   isError,
  //   error,
  // } = useQuery(['products'], async () => {
  //   const query = '*[_type == "product"]';
  //   return await client.fetch(query);
  // });

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const bannerProductQuery = '*[_type == "banner"][0]{product->}';
  const bannerProductData = await client.fetch(bannerProductQuery);

  return {
    props: { products: dehydrate(queryClient), bannerData, bannerProductData },
  };
};

export default Home;
