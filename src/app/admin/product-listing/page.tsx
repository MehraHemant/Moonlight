import { AdminProductsTable } from '@/components/admin/products/AdminProductsTable';
import { AdminProductExcelInput } from '@/components/admin/products/AdminProductsInput';
import {ProductService} from '@/services/product.service'

export const dynamic = 'force-dynamic'

export default async function AdminProducts() {
  const [storedProducts, totalProducts] = await ProductService.getProducts();
  return (
    <main>
      {storedProducts && <><AdminProductExcelInput
      />
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '4px', width: '95%'}}>
          <AdminProductsTable products={storedProducts}
          />
        </div></>}
    </main>
  )
}