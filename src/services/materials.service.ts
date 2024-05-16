import { MATERIALS } from "@/constants";
import { MaterialType } from "@/types";



export class MaterialsService {
    static getMaterials =  async (): Promise<MaterialType[]> => {
        return MATERIALS.map((val, index)=>({id:index, name: val }));
    }
}
