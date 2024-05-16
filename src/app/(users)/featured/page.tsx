import { Metadata } from 'next';
import { CATEGORIES } from '@/constants';
import SliderWithController from '@/components/SliderWithController';
import { ProductTile } from '@/components/ProductList';
import { ProductHawkEye } from '@/types';
import { ProductService } from '@/services/product.service';
 
export const metadata: Metadata = {
  title: 'Featured',
};

export default async function Featured() {
  let productsByCategory: Record<string, ProductHawkEye[]> = {}; 
  for(let parentCategory of Object.keys(CATEGORIES[0])){
    let [products,_] = await ProductService.getProductsHawkEye({filters: {parentCategory, isTopSelling: true}, limit: 5, page: 1});
    if(products.length>0){
      productsByCategory[parentCategory] = products;
    }
  }
     return <main className='sharedMain'>
        {Object.keys(productsByCategory).map((parentCategory)=><span key={parentCategory} style={{width: '100%'}}>
          <SliderWithController title={parentCategory.toUpperCase()} key={parentCategory} items={productsByCategory[parentCategory].map((p)=><ProductTile key={p.id} product={p}/>)} />
        </span>
        )}
     </main>
}