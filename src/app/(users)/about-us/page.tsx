import Image from 'next/image'
import styles from './about-us.page.module.css'
import { Metadata } from 'next';
import { Typography } from '@mui/material';

export const metadata: Metadata = {
    title: 'About Us',
};

export default function AboutUs() {
    return (
        <main>
            <div className={styles.openingBanner}>
                <div
                    style={{
                        justifySelf: 'flex-start !important',
                    }}
                >
                    <Typography variant={'h4'} component="span"
                        sx={{ color: "#d5ab25", marginTop: '20px' }}
                        gutterBottom>
                        MOONLITE INTERNATIONAL
                    </Typography>
                </div>
                <hr style={{
                    width: '60%',
                    border: "0.1px solid gray"
                }} />
                <Typography variant={'overline'} component="h1"
                    sx={{ color: "#fff", marginTop: '20px', fontWeight: 100, textAlign: 'center' }}>
                    Pioneers of Quality Builders Hardware Solutions
                </Typography>
            </div>
            <div className={styles.main}>
                <div className={styles.coreContent}>
                    <div className={styles.columnflexContainer}>
                        <HeaderLeadSection header='Introduction' content='Welcome to MOONLITE INTERNATIONAL, a trusted name in the hardware industry, headquartered in Aligarh, India. Established in 1992, MOONLITE INTERNATIONAL has evolved from humble beginnings to become a leading manufacturer and exporter of quality builders hardware, architectural fittings, and hardware fittings. With a strong foundation built on over three decades of experience and expertise, MOONLITE INTERNATIONAL continues to set new benchmarks for excellence in the industry. Join us as we delve into our journey, our commitment to innovation and collaboration, and our unwavering dedication to excellence.'
                        />

                        <HeaderLeadSection header='Crafting Quality since 1990' content="MOONLITE INTERNATIONAL traces its roots back to 1990 when our founders embarked on a journey to deliver the highest quality hardware products to customers worldwide. With a combined experience of over the years in the builders' hardware industry, our management team brought invaluable insights and expertise to the table. Since then, our relentless pursuit of excellence and commitment to best manufacturing practices have been the driving force behind our success. Today, MOONLITE INTERNATIONAL is renowned for manufacturing and exporting a wide range of hardware products, including Door Hardware, Cabinet Hardware, Window Hardware, Curtain Hardware, Marine Hardware, Builder Hardware, and Architectural Ironmongery, catering to diverse needs and preferences."
                        />
                        <HeaderLeadSection header='Innovating the Hardware Industry' content="
                    Innovation is at the core of MOONLITE INTERNATIONAL' ethos. We believe in staying ahead of the curve by embracing cutting-edge technologies, design trends, and manufacturing practices. Our traditional Georgian and Victorian ranges seamlessly blend with high-tech Portuguese and Italian-designed Brassware, offering customers a diverse and innovative product portfolio. Through lean manufacturing practices, we have significantly reduced lead times and production costs, providing our clients with a competitive edge in pricing. At MOONLITE INTERNATIONAL, we sell innovation, innovation, and innovation, ensuring that our products meet the evolving needs of customers worldwide."
                        />
                        <HeaderLeadSection header='Partnering for Success' content="
                    MOONLITE INTERNATIONAL understands the importance of collaboration in achieving success. Our partnerships with clients are built on trust, integrity, and mutual growth. With excellent OEM capabilities and a robust machinery setup, we can reverse engineer any design or product, offering tailor-made solutions to meet specific requirements. Our customer-centric approach, combined with responsive support, ensures that our partners have the tools and resources they need to thrive in their respective markets. As a result, MOONLITE INTERNATIONAL has established a global presence, with main markets spanning Eastern Europe, Southeast Asia, Africa, Eastern Asia, Western Europe, Northern Europe, and the Middle East."
                        />
                        <HeaderLeadSection header='Building Trust' content="
                    Trust is the cornerstone of our relationships with clients. MOONLITE INTERNATIONAL has earned a reputation for reliability, quality, and trustworthiness, delivering on our promises and exceeding expectations, one project at a time. Our products meet all international standards and certifications, ensuring compliance and peace of mind for our customers. With a focus on lean manufacturing practices and continuous improvement, we remain committed to delivering the best quality products while adapting to the changing needs of customers worldwide.
                    "
                        />
                        <HeaderLeadSection header='' content="
                   MOONLITE INTERNATIONAL is more than just a hardware manufacturer; we are pioneers of quality hardware solutions. Our journey from humble beginnings to global recognition is a testament to our unwavering commitment to excellence, innovation, and collaboration. Choose MOONLITE INTERNATIONAL for your hardware needs, and let us be your trusted partner in building a brighter future together.
                    "
                        />
                    </div>
                </div>
                <ExploreMoreGrid header='A Tri-Dimensional Approach to Innovation' items={[
                    <div key={1}
                        className={styles.exploreMoreGridItem}>
                        <div style={{ width: '100%', height: '199px', position: 'relative' }}>
                            <Image
                                src="/about-us/vertex-exports-about-us-1.png"
                                alt="About us"
                                objectFit="cover"
                                fill={true}
                                priority
                            />
                        </div>
                        <div className={styles.learnMoreItemSubHeaders}>Our Vision</div>
                        <div className={styles.assistiveText}>{"MOONLITE INTERNATIONAL vision is to redefine excellence in builders’ hardware manufacturing. We aim to be the forefront innovators, crafting products that not only meet but exceed industry standards."}</div>
                    </div>,
                    <div key={2}
                        className={styles.exploreMoreGridItem}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        <div style={{
                            width: '100%',
                            height: '199px',
                            position: 'relative'
                        }}>
                            <Image
                                src="/about-us/vertex-exports-about-us-2.png"
                                alt="About us"
                                objectFit="cover"
                                fill={true}
                                priority
                            />
                        </div>
                        <div className={styles.learnMoreItemSubHeaders}>Our Mission</div>
                        <div className={styles.assistiveText}>{"To become the best consumer-centric company, providing high-value hardware products while maintaining a continuous improvement in the quality systems."}</div>
                    </div>,
                    <div key={3}
                        className={styles.exploreMoreGridItem}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        <div style={{ width: '100%', height: '199px', position: 'relative' }}>
                            <Image
                                src="/about-us/vertex-exports-about-us-3.png"
                                alt="About us"
                                objectFit="cover"
                                fill={true}
                                priority
                            />
                        </div>
                        <div className={styles.learnMoreItemSubHeaders}>{"Quality Assurance"}</div>
                        <div className={styles.assistiveText}>We are committed to creating satisfied customers by providing them with fault-free products and services.</div>
                    </div>
                ]} />
            </div>
        </main>
    )
}

const HeaderLeadSection = ({ header, content }: { header: string, content: string }) => {
    return <div>
        <div className={styles.sectionHeader}>{header}</div>
        <p style={{ textAlign: 'justify' }}>{content}</p>
    </div>
}


const ExploreMoreGrid = ({ header, items, withCarousel }: { header: string, items: React.ReactNode[], withCarousel?: boolean }) => {
    return <div className={styles.exploreMoreContainer}>
        <h5 className={styles.sectionHeader}>{header}</h5>
        <div className={styles.exploreMoreItemContainer}>
            {items}
        </div>
    </div>
}