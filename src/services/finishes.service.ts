import { FINISHES } from "@/constants";
import { FinishType } from "@/types";


export class FinishesService {
    static getFinishes =  async (): Promise<FinishType[]> => {
        return FINISHES.map((val)=>({...val, 
            imageName: `${val.name.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-")}.jpg`
        }));
    }
}

