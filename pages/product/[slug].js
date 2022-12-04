import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

import Layout from '../../components/Layout';
import data from '../../utils/data';

const ProductScreen = () => {
    const {query} = useRouter();
    const {slug} = query;
    const product = data.products.find((x) => x.slug == slug);
    if (!product){
        return <div>Product Not Found</div>
    }
  return (
    <Layout title={product.name}>
        <div className='py-2'>
           <Link href='/'>back to products</Link> 
        </div>
    </Layout>
  )
}

export default ProductScreen