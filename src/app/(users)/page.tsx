import { agencyNames } from '@/constants';
import styles from './page.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@mui/material';

interface HomePageSliderDescriptor {
  title: string,
  subtitle: string,
  description: string,
  imagePath: string,
  redirectionUrl: string,
}
interface HomePageSliderDef extends HomePageSliderDescriptor{
  position: number;
}

const homePageSliders:HomePageSliderDef[] = [{
  position: 1,
  title: 'DOOR HARDWARE',
  subtitle: 'Door Lever Handle | Door Pull Handle',
  description: 'from traditional to inspiring designers door hardware collection.',
  imagePath: 'Door-Hardware.png',
  redirectionUrl: `Door-Hardware/builders-hardware-manufacturers`
},
{
  position: 2,
  title: 'CABINET HARDWARE',
  subtitle: 'Cabinet Pulls | Cabinet Knobs',
  description: 'customize your kitchen with cabinet knobs, drawer pulls, handles and other cabinet hardware collection.',
  imagePath: 'Cabinet-Hardware.png',
  redirectionUrl: `Cabinet-Hardware/builders-hardware-manufacturers`
},
// {
//   position: 3,
//   title: 'WINDOW HARDWARE | SHUTTER FITTINGS',
//   subtitle: 'Cabin Hook | Casement Fastener',
//   description: 'choose from antique to polished brass window hardware collection for vintage or new home.',
//   imagePath: 'Window-Hardware.png',
//   redirectionUrl: `Window-Hardware-|-Shutter-Fittings/builders-hardware-manufacturers`
// },
{
  position: 3,
  title: 'GATE HARDWARE',
  subtitle: 'Eye Bolt | Gate Shoe',
  description: 'A unique collection of curtain rods, drapery rods and more from our curtain hardware range.',
  imagePath: 'Curtain-Hardware.png',
  redirectionUrl: `Gate-Hardware/builders-hardware-manufacturers`
},
{
  position: 4,
  title: 'HAND FORGED HARDWARE',
  subtitle: 'Pull Handle | Cranked Bolt',
  description: 'Manufacturing the complete quality marine hardware range for sailing and marine industry.',
  imagePath: 'Marine-Hardware.png',
  redirectionUrl: `Hand-Forged-Hardware/builders-hardware-manufacturers`
}];

export default function Home() {
  return (
    <main className={styles.main}>
      {
        homePageSliders.sort((a, b) => { if (a.position < b.position) return -1; if (a.position > b.position) return 1; return 0; }).map((sliderDetails, index) => {
          return <HomePageSlider key={sliderDetails.position} sliderDetails={sliderDetails} imageOrientation={sliderDetails.position % 2 !== 0 ? 'right' : 'left'} />
        })
      }
      <Accreditions />
      <AdditionalPageTextContent/>
    </main>
  )
}


function HomePageSlider({ sliderDetails, imageOrientation }: { sliderDetails: HomePageSliderDescriptor, imageOrientation: 'left' | 'right' }) {
  return <div className={`${styles.slider} ${imageOrientation ==='right' ? styles.right : ''}`}>
       <SliderImageComponent imagePath={sliderDetails.imagePath} />
      <div className={styles.sliderDetailContainer}>
          <h2
              className={styles.sliderHeading}
          >{sliderDetails.title}</h2>
          <h3 
          className={styles.sliderSubHeading}
            >{sliderDetails.subtitle}</h3>
          <span className={styles.sliderDescription}>{sliderDetails.description}</span>
          <span className={styles.sliderLink}>
            <Link href={sliderDetails.redirectionUrl} className={`${styles.navLinks}`}>
            View More
            </Link>
            </span>
      </div>
  </div>
}

const SliderImageComponent = ({ imagePath }: { imagePath: string }) => {
  return <div className={styles.sliderImageContainer}
   ><Image
      src={`/home-page-sliders/${imagePath}`}
      alt={imagePath.split(".")[0]}
      className={styles.sliderImage}
      fill={true}
      priority
  /></div>
};

const AdditionalPageTextContent = ()=>{
  return  <><Typography variant='h5' component={'h1'} sx={{fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase'}}>Builders Hardware Manufacturers & Exporters India</Typography>
  <AdditionalContent 
  content="
  Explore the pivotal role of door hardware in functionality and aesthetics, encompassing handles, locks, hinges, and closers. Discuss selection criteria for residential, commercial, and industrial applications, prioritizing security, and convenience. Empower import buyers, wholesalers, and retailers with informed choices to meet diverse consumer needs and industry standards.
  "
  />
  <AdditionalContent 
  content="
  Delve into the transformative impact of cabinet hardware on furniture aesthetics and functionality, covering knobs, pulls, hinges, and drawer slides. Guide interior designers and furniture manufacturers in selecting hardware that harmonizes with design themes, materials, and dimensions, ensuring enhanced appeal and usability for discerning clientele.
  "
  />
<AdditionalContent 
  content="
Illuminate the pivotal role of window hardware in seamless operation, ventilation control, and security for residential and commercial spaces. Explore diverse components like handles, locks, hinges, and stays, empowering architects, builders, and homeowners to make informed choices aligned with energy efficiency, architectural aesthetics, and regulatory requirements.
  "
  />
<AdditionalContent 
  content="
Unveil the indispensable significance of curtain hardware in elevating interior décor while ensuring functionality. Navigate through curtain rods, tracks, rings, and brackets, aiding interior decorators and homeowners in selecting hardware that harmonizes with fabric choices, window dimensions, and design schemes for a seamless and aesthetically pleasing outcome.
  "
  />
<AdditionalContent 
  content="
Explore the critical role of marine hardware in ensuring durability and safety in marine environments. Examine essential components such as cleats, hinges, latches, and deck hardware, emphasizing corrosion resistance and reliability. Catering to boat builders, marinas, and marine equipment suppliers, empower industry professionals with informed choices meeting stringent industry standards and regulations.
  "
  /></>
}

const AdditionalContent = ({content}:{content:string})=>{
  return <p style={{fontSize: '14px', marginTop: '12px', textAlign: 'justify'}}>{content}</p>
}

const Accreditions = () => {
  return <div className={styles.accreditions}>
    <div
    style={{width: '100%',
    backgroundColor: '#cad060',
    textAlign: 'center',
    textTransform: 'uppercase',
    borderRadius: '16px 16px 0px 0px'
  }}>
  <Typography variant='h5' component={'div'} sx={{fontWeight: 'bold'}}>Accreditations</Typography></div>
  <div className={styles.accreditionsLogoContainer}>
  {agencyNames.map((agencyName) => {
  const imageExt = agencyName === "CRISIL" ||  agencyName === "SMERA"? '.png' : '.jpg';  
  return <div key={agencyName} 
  className={styles.accreditionsLogo}
  >
    <Image
    className={`${styles.invertedImg} ${agencyName ==='SMERA' ? styles.white : ''}`}
      src={`/accreditions/${agencyName}${imageExt}`}
      alt={`${agencyName} Logo`}
      style={{objectFit:"contain"}}
      fill={true}
      priority
    />
  </div>
})}
  </div>
  </div>
}