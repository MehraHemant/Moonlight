export interface ProductDetail extends ProductHawkEye {
    material: string;
    finishes: string;
    productionType: string;
    isTopSelling: boolean;
    technicalDescription: string;
    accessoriesAndFeatures: string;
    miscellaneous: string;
}

export interface ProductHawkEye {
    id: string;
    imageId: string;
    modelName: string;
    modelNumber: string;
    category: string;
}

export interface ProductFilters {
    parentCategory?: string | null;
    childCategory?: string | null;
    materials?: string[] | null;
    finishes?: string[] | null;
    productionType?: string[] | null;
    isTopSelling?: boolean | null;
}


export interface ProductionType {
    id: number;
    name: string;
}

export interface ImageType {
    id: number;
    name: string;
}

export interface MaterialType {
    id: number;
    name: string;
}

export interface FinishType {
    id: number;
    name: string;
    imageName: string;
}