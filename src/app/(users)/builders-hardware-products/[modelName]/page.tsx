import Image from 'next/image';
import styles from './product.page.module.css'
import { ProductDetail } from '@/types'
import { AddToQuoteBtn } from '@/components/AddToQuoteBtn';
import { getProduct } from '@/clients/products.client';
import Typography from '@mui/material/Typography';
import { notFound } from 'next/navigation'

export default async function Product({ params, searchParams }: { params: { modelName: string }, searchParams: { id: string } }) {
    const productId = searchParams.id;
    console.info("The productId we have here is nothing", productId);
    try {
        const product = await getProduct(productId);
        return (
            <main className={"sharedMain"}>
                <ProductComponent product={product}/>
            </main>
        )
    }
    catch(err){
        if((err as any)?.message === 'No such product exists'){
            notFound()
        } else {
            throw err;
        }
    }

}

const ProductComponent = ({ product }: { product: ProductDetail }) => {
    const currentOrigin = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
    const imageUrl = new URL(`/images/${product.imageId}/api`, currentOrigin).toString();

    return <><div className={styles.topLevelHolder}>
        <div className={styles.productImageHolder}>
            <Image
                src={imageUrl}
                alt={`${product.category}`}
                style={{ objectFit: "contain" }}
                fill={true}
                priority
            />
        </div>
        <div
         className={styles.productDetailHolder}
        >
            <div className={styles.highlightedInfoHolder}>
                <ProductInfoCard detail={product.modelNumber || "-"} detailKind='Model Number' />
                <ProductInfoCard detail={product.modelName || "-"} detailKind='Model Name' />
                <ProductInfoCard detail={product.category || "-"} detailKind='Category' />
            </div>
            <div className={styles.productSubDetail}>
                {/* <div className={styles.productSubDetailTextHolder}> */}
                <div>
                    <Typography variant="subtitle1" fontWeight={'bold'}>
                        Material:
                        <Typography variant="subtitle2" component="span"
                            fontWeight={200}
                        >
                            {`${product.material}`}
                        </Typography>
                    </Typography>
                </div>
                <div>
                    <Typography variant="subtitle1" fontWeight={'bold'}>
                        Production Type:
                        <Typography variant="subtitle2" component="span"
                            fontWeight={200}
                        >
                            {`${product.productionType}`}
                        </Typography>
                    </Typography>
                </div>
                <div>
                    <Typography variant="subtitle1" fontWeight={'bold'}>
                        Finish(es):
                        <Typography variant="subtitle2" component="span"
                            fontWeight={200}
                        >
                            {`${product.finishes}`}
                        </Typography>
                    </Typography>
                </div>
            </div>
            <div style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'center',
            }}>
            <AddToQuoteBtn product={product} />
            </div>
        </div>
    </div>
        <div style={{ width: '100%', marginTop: '20px' }}>
            <ProductAdditionalDetails header='TECHNICAL DESCRIPTION' content={product.technicalDescription || 'N/A'} />
            <ProductAdditionalDetails header='ACCESSORIES AND FEATURES' content={product.accessoriesAndFeatures || 'N/A'} />
            <ProductAdditionalDetails header='MISCELLANEOUS' content={product.miscellaneous || 'N/A'} />
        </div>
    </>

}

const ProductInfoCard = ({ detail, detailKind }: { detail: string, detailKind: string }) => {
    return <div>{detail}
        <small style={{ fontWeight: 200, color: '#A00000', textTransform: 'uppercase' }}>{detailKind}</small>
    </div>
}

const ProductAdditionalDetails = ({ header, content }: { header: string, content: string }) => {
    return <div className="product-additional-detail-container">
        <h2 className="product-additional-detail-subtitle">{header}</h2>
        <p className="product-additional-detail-paragraph" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
}