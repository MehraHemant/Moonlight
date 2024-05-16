import { PRODUCTION_TYPES } from "@/constants";
import { ProductionType } from "@/types";


export class ProductionTypeService {
    static get = async (): Promise<ProductionType[]> => {
        return PRODUCTION_TYPES;
    }
}