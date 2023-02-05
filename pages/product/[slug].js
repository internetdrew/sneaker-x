import React, { useState } from 'react';
import {
  AiOutlineMinus,
  AiOutlineStar,
  AiOutlinePlus,
  AiFillStar,
} from 'react-icons/ai';
import { Product } from '@/components';
import { urlFor, client } from '@/library/client';
import { useStateContext } from '@/context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { images, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const productNameSplitArr = product.name.toLowerCase().split(' ');
  const { increaseQty, decreaseQty, qty, addToCart } = useStateContext();

  return (
    <>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img
              src={urlFor(images && images[index])
                ?.width(600)
                .url()}
              alt={name}
              className='product-detail-image'
              draggable={false}
            />
          </div>
          <div className='small-images-container'>
            {images?.map((item, i) => (
              <img
                key={item._key}
                src={urlFor(item)?.url()}
                alt=''
                draggable={false}
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <p>(20)</p>
          </div>
          <h2>Details:</h2>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <div className='quantity-desc'>
              <span className='minus' onClick={decreaseQty}>
                <AiOutlineMinus />
              </span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={increaseQty}>
                <AiOutlinePlus />
              </span>
            </div>
          </div>
          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              onClick={() => addToCart(product, qty)}
            >
              Add to Cart
            </button>
            <button type='button' className='buy-now'>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>You may also like:</h2>
        <div className='marquee'>
          <div className='maylike-products-container'>
            {products
              .filter(item => item._id !== product._id)
              .map(filtItem => {
                const nameSplit = filtItem.name.toLowerCase().split(' ');
                for (const word of nameSplit) {
                  if (productNameSplitArr.includes(word)) {
                    return <Product key={filtItem._id} product={filtItem} />;
                  }
                }
              })}
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
