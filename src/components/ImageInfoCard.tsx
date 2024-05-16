export function ImageInfoCard({img, name}: {img: JSX.Element, name: string}){
    return <div className={"product-hawk-eye-container"}>
        <div className={"product-image-holder"}>
            {img}
        </div>
        <div className={"product-model-name-holder"}>
            {name}
        </div>
    </div>
}
