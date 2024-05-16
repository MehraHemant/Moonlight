import Image from 'next/image';
import styles from './finishes.page.module.css'
import { FINISHES } from '@/constants';
import { ImageInfoCard } from '@/components/ImageInfoCard';
import { Box, Container, Typography } from '@mui/material';

export default async function Finishes() {
    const storedFinishes = FINISHES.map((val)=>({...val, 
        imageName: `${val.name.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-")}.jpg`
    }));
    return (
        <main className={"sharedMain"}>
            <div className={'list-page-opening-banner'}>
                <div>
                    <Typography variant={'h6'} component="span"
                        sx={{ color: "#fff" }}>AVAILABLE FINISHES</Typography>
                </div>
                <hr style={{
                    width: '60%',
                    border: "0.1px solid gray"
                }} />
            </div>
            <div className={styles.finishesContainer}>
            {storedFinishes.map(({name, imageName, id}) => (<div key={name}>
                <ImageInfoCard
                img={
                    <Image
                        src = {`/finishes/${imageName}`}
                        alt={`${name} image`}
                        style={{objectFit:"contain"}}
                        fill={true}
                        priority
                    />
                } name={name}
                />
            </div>))}
            </div>

        </main>
    )
}
