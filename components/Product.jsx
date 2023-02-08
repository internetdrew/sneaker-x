import React from 'react';
import Link from 'next/link';

import { urlFor } from '@/library/client';

const Product = ({ product: { images, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img
            src={urlFor(images && images[0]).url()}
            alt=''
            width={250}
            height={250}
            className='product-image'
            draggable={false}
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
