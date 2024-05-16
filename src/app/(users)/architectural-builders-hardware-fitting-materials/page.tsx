import { MATERIALS } from '@/constants'
import styles from './materials.page.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@mui/material';

const getMaterialUrl = (name: string) => `/Architectural-Builders-Hardware-Exporters-India/${name.replace(' / ', ' ').split(" ").join("-").toLowerCase()}-hardware`

const getImageName = (materialName: string) => {
    if (materialName === "Zinc / Zamak") {
        return `Zamak-Builder-Hardwares.png`
    } else if (materialName === 'Malleable Iron') {
        return 'Black-Malleable-Builder-Hardwares.png'
    } else if (materialName === "Handforged Iron") {
        return 'Hand-Forged-Builder-Hardwares.png'
    }
    return `${materialName.split(" ").join("-")}-Builder-Hardwares.png`

}
export default function Material() {
    const storedMaterials = MATERIALS.map((val) => ({
        name: val,
        imageName: getImageName(val),
    }));
    return (
        <main className={"sharedMain"}>
            <div className={'list-page-opening-banner'}>
                <div>
                    <Typography variant={'h6'} component="span"
                        sx={{ color: "#fff" }}>MATERIALS</Typography>
                </div>
                <hr style={{
                    width: '60%',
                    border: "0.1px solid gray"
                }} />
            </div>
            <div className={styles.materialsContainer}>
                {storedMaterials.filter((m) => {
                    if (!['Bone', 'Iron', 'Raisins', 'Plastic'].includes(m.name)) {
                        return m;
                    }
                }).map(({ name, imageName }) => {
                    const matString = `${name.toUpperCase()} ${"BUILDERS HARDWARE"}`
                    return <Link key={name} href={getMaterialUrl(name)}>
                        <div className={styles.materialImageHolder}>
                            <Image
                                src={`/materials-new/${imageName}`}
                                alt={imageName}
                                style={{ objectFit: "contain" }}
                                fill={true}
                                priority
                            />
                            <h1 className={styles.materialImageOverlayHeader}>{matString}</h1>
                            <div className={styles.materialImageOverlayExploreBtn}>{"EXPLORE OUR RANGE -->"}</div>
                        </div>
                    </Link>
                })}
            </div>
        </main>
    )
}
