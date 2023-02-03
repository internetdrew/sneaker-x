import React from 'react';
import Link from 'next/link';

import { client, urlFor } from '../library/client.js';

const HeroBanner = ({ heroBanner, bannerProductData }) => {
  const { product } = bannerProductData;
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText.toUpperCase()}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img
          src={urlFor(heroBanner.image)}
          alt='testing'
          className='hero-banner-image'
        />
        <div>
          <Link href={`/product/${product?.slug?.current}`}>
            <button type='button'>{heroBanner.buttonText}</button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>{heroBanner.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
