import AdminBasicTable from '@/components/admin/AdminBasicTable';
import { ProductionTypeService } from '@/services/productionType.service';


export default async function AdminProductionTypes() {
  const data = await ProductionTypeService.get();
  return (
    <main>
      <div>
        <AdminBasicTable data={data} />
      </div>
    </main>
  )
}