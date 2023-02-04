import React from 'react';

import { urlFor, client } from '@/library/client';

const ProductDetails = ({ product, products }) => {
  const { images } = product;
  return (
    <>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img src={urlFor(images && images[0])} alt='' />
          </div>
          {/* <div className='small-images-container'>
            {image?.map((item, index) => (
              <img key={index} src={urlFor(item)} alt='' />
            ))}
          </div> */}
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
    fallback: 'blocking',
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
