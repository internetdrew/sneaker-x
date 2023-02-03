import React from 'react';

import { urlFor, client } from '@/library/client';

const ProductDetails = ({ product, products }) => {
  console.log(product);
  return (
    <>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img src={urlFor(product.image)} alt='' />
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
    slug {
      current
    }
  }`;
  const products = await client.fetch(query);
  const paths = products.map(product => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
