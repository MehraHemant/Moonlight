import { ProductService } from "@/services/product.service";
import { ProductFilters } from "@/types";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    console.info('thr rb', request.url);
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('filters');
    console.info("Did we", query);
    let res;
    if(query){
        try {
            let filterInQuery = JSON.parse(query);
            // THIS IS A PATCH TO MAKE SURE, even if there is a single filter for the following categories, they are sent as arrays, because that's the expectation
            // @TODO: Move this to the backend
            if((filterInQuery as ProductFilters)['materials'] && !Array.isArray(filterInQuery['materials'])){
                filterInQuery['materials'] = [filterInQuery['materials']]
            }
            if((filterInQuery as ProductFilters)['finishes'] && !Array.isArray(filterInQuery['finishes'])){
                filterInQuery['finishes'] = [filterInQuery['finishes']]
            }
            if((filterInQuery as ProductFilters)['productionType'] && !Array.isArray(filterInQuery['productionType'])){
                filterInQuery['productionType'] = [filterInQuery['productionType']]
            }

            res = await ProductService.getProductsHawkEye({filters: filterInQuery as ProductFilters,
            limit: processNumericSearchParam(searchParams, "limit"),
            page: processNumericSearchParam(searchParams, "page")
            });
            return Response.json(res)
        } catch(err){
            console.error("Could not process the filter in query", err);
        }
    }
    res = await ProductService.getProductsHawkEye({});

    return Response.json(res)
}

const processNumericSearchParam = (searchParams: URLSearchParams, name: string): number | undefined=>{
    const param = searchParams.get(name);
    if(param){
        let integralValue = parseInt(param);
        if(isNaN(integralValue)){
            throw new Error(`Invalid ${name}`);
        }    
        return integralValue;
    }
    return undefined;
}