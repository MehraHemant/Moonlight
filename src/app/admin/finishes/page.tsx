import AdminBasicTable from '@/components/admin/AdminBasicTable';
import { FinishesService } from '@/services/finishes.service';


export default async function AdminFinishes() {
  const storedFinishes = await FinishesService.getFinishes();
  return (
    <main>
      <div>
        <AdminBasicTable data={storedFinishes} includeImageNamePreview={true} />
      </div>
    </main>
  )
}