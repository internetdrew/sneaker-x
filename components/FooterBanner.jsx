import React from 'react';
import Link from 'next/link';

import { urlFor } from '@/library/client';

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largetext2,
    saleTime,
    smallText,
    midText,
    product,
    buttonText,
    image,
    description,
  },
}) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largetext2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{description}</p>
          <Link href={`product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </div>

        <img
          src={urlFor(image).url()}
          alt={product}
          className='footer-banner-image'
          draggable={false}
        />
      </div>
    </div>
  );
};

export default FooterBanner;
