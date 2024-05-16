import AdminBasicTable from '@/components/admin/AdminBasicTable';
import { MaterialsService } from '@/services/materials.service';


export default async function AdminMaterials() {
  const storedMaterials = await MaterialsService.getMaterials();
  return (
    <main>
      <div>
        <AdminBasicTable data={storedMaterials} />
      </div>
    </main>
  )
}