import styles from './faq.page.module.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default async function FAQ() {
  return (
    <main className={"sharedMain"}>
      <div className={'list-page-opening-banner'}>
        <div>
          <Typography variant={'h6'} component="span"
            sx={{ color: "#fff" }}>FAQ</Typography>
        </div>
        <hr style={{
          width: '60%',
          border: "0.1px solid gray"
        }} />
      </div>
      <div className={styles.faqContainer}>
          <DoorHardwareFAQs />
          <CabinetHardwareFAQs />
          <WindowHardwareFAQs />
          <CurtainHardwareFAQs />
      </div>

    </main>
  )
}

function DoorHardwareFAQs(){
    return <div>
  <Typography sx={{ mt: 4, mb: 2, fontStyle: "italic", fontWeight: 200 }} variant="subtitle1" component="div">{"Door Hardware"}</Typography>      
    <AnFAQ defaultExpanded={true} question={"What types of door hardware are available?"} resolution={`
                    Door hardware encompasses a wide range of products, including doorknobs, handlesets, hinges, locks, deadbolts, door closers, hinges, door stops, and more.`} />
    <AnFAQ defaultExpanded={false} question={"What is the difference between a doorknob and a lever handle?"} resolution={`
                    Doorknobs are circular and are turned to open or close a door, while lever handles are elongated and can be pushed down or lifted up, making them easier to operate, especially for people with mobility issues.`} />
    <AnFAQ defaultExpanded={false} question={"What types of locks are commonly used for doors?"} resolution={`
                    Common locks include cylindrical locks (found in most residential doors), mortise locks (typically used in commercial settings), deadbolts (for added security), and electronic locks (keyless entry systems).`} />
    <AnFAQ defaultExpanded={false} question={"How do I choose the right door hardware for my door?"} resolution={`
                    Consider factors such as the door type (interior or exterior), door material (wood, metal, glass, etc.), desired style (traditional, modern, rustic, etc.), security needs, and budget.`} />
    <AnFAQ defaultExpanded={false} question={" Can I install door hardware myself?"} resolution={`
                    Yes, many types of door hardware can be installed by homeowners, especially those with basic DIY skills. However, complex installations or those requiring electrical wiring should be done by a professional.`} />
    
    {/* <AnFAQ defaultExpanded={false} question={"How do I maintain door hardware?"} resolution={`
    Regular cleaning with mild soap and water can keep door hardware looking new. Lubricate hinges and locks annually with a silicone-based lubricant. Check and tighten screws periodically to prevent loosening.`} />

    <AnFAQ defaultExpanded={false} question={"What is the standard height for installing door hardware?"} resolution={`
                    For doorknobs, the standard height is typically around 36 inches from the floor to the center of the knob. For lever handles, it's around 42 inches. However, actual heights may vary depending on personal preference and accessibility needs.`} />
    <AnFAQ defaultExpanded={false} question={"Can I rekey my own door locks?"} resolution={`
    Some types of locks, like cylinder locks, can be rekeyed by homeowners using a rekeying kit. However, for more complex locks or if you're unsure, it's best to hire a locksmith.
      `} />
    <AnFAQ defaultExpanded={false} question={"Are there door hardware options suitable for people with disabilities?"} resolution={`Yes, there are ADA-compliant door hardware options available, including lever handles that require minimal force to operate, large grip door knobs, and electronic keyless entry systems.`} />
    <AnFAQ defaultExpanded={false} question={"How can I increase the security of my doors with hardware?"} resolution={`You can enhance security by installing high-quality deadbolts, using longer screws in strike plates and hinges, adding a door viewer (peephole), and considering smart locks with features like remote monitoring and access control.`} /> */}
  </div>
}

function CabinetHardwareFAQs(){
  return <div> 
  {/* Cabinet Hardware */}
  <Typography sx={{ mt: 4, mb: 2, fontStyle: "italic", fontWeight: 200 }} variant="subtitle1" component="div">{"Cabinet Hardware"}</Typography>      
  <AnFAQ defaultExpanded={true} question={"What types of cabinet hardware are available?"} resolution={`
  Cabinet hardware includes knobs, pulls, handles, hinges, drawer slides, and catches. These come in various styles, sizes, and materials to suit different cabinets and design preferences.`} />
  <AnFAQ defaultExpanded={false} question={"What's the difference between knobs and pulls?"} resolution={`Knobs are single, rounded pieces that you grab to open a cabinet door or drawer. Pulls are longer and usually attached with two screws, offering more surface area to grip.`} />
  <AnFAQ defaultExpanded={false} question={"How do I choose the right cabinet hardware for my cabinets?"} resolution={`
  Consider factors like the cabinet style (modern, traditional, etc.), material (wood, metal, etc.), size, and finish. You can match the hardware to other elements in the room or use them as accents to add contrast.`} />
  <AnFAQ defaultExpanded={false} question={"Can I mix different types of hardware on my cabinets?"} resolution={`
  Yes, mixing knobs and pulls or using different styles on upper and lower cabinets can add visual interest to your kitchen or bathroom. Just ensure they complement each other in style and finish.`} />
  <AnFAQ defaultExpanded={false} question={"How do I install cabinet hardware?"} resolution={`
  Most cabinet hardware is easy to install with basic tools like a screwdriver or drill. Knobs and pulls typically require screws to attach them to the cabinet doors or drawers. For hinges or drawer slides, follow the manufacturer's instructions carefully.`} />

  {/* <AnFAQ defaultExpanded={false} question={"Should I match the finish of my cabinet hardware to other fixtures in the room?"} resolution={`
  It's a common design choice to match the hardware finish with other fixtures like faucets, light fixtures, and appliances. However, mixing finishes can also create an eclectic look if done intentionally.`} />
  <AnFAQ defaultExpanded={false} question={"What's the standard size for cabinet hardware?"} resolution={`
    There's no strict standard, but common sizes for knobs range from 1 inch to 2 inches in diameter. Pulls can vary in length from a few inches to a foot or more. Consider the size of your cabinets and drawers when choosing hardware.`} />
  <AnFAQ defaultExpanded={false} question={"How do I clean and maintain cabinet hardware?"} resolution={`
  Regular cleaning with a mild soap and water solution is usually sufficient. Avoid harsh chemicals or abrasive cleaners, especially on metal finishes, as they can damage the surface. Dry the hardware thoroughly after cleaning.
    `} />
  <AnFAQ defaultExpanded={false} question={"Can I reuse my existing cabinet hardware if I'm refacing my cabinets?"} resolution={`Yes, as long as the hardware is in good condition and fits the new cabinet doors or drawer fronts. If you're changing the layout or style significantly, you may need new hardware.`} />
  <AnFAQ defaultExpanded={false} question={"Are there child-proof options for cabinet hardware?"} resolution={`
  Yes, there are child-proof locks and latches available that can be installed on cabinet doors and drawers to prevent children from accessing potentially dangerous items. These include magnetic locks, sliding locks, and knob covers.`} /> */}
</div>
}

function WindowHardwareFAQs(){
  return <div> 
    <Typography sx={{ mt: 4, mb: 2, fontStyle: "italic", fontWeight: 200 }} variant="subtitle1" component="div">{"Window Hardware"}</Typography>      
  <AnFAQ defaultExpanded={true} question={"What types of window hardware are available?"} resolution={`
  Window hardware includes locks, handles, hinges, stays, latches, and crank operators, among others. These are designed to secure, operate, and enhance the functionality of windows.`} />
  <AnFAQ defaultExpanded={false} question={"How do I choose the right window hardware for my windows?"} resolution={`
  Consider the type of window (casement, double-hung, sliding, etc.), window material (wood, vinyl, aluminium, etc.), style preferences, security needs, and compatibility with existing hardware.`} />
  <AnFAQ defaultExpanded={false} question={"What's the difference between single-hung and double-hung window hardware?"} resolution={`
  Single-hung windows have one movable sash, while double-hung windows have two. The hardware for double-hung windows allows both the upper and lower sashes to move independently.`} />
  <AnFAQ defaultExpanded={false} question={"Can I replace the window hardware myself?"} resolution={`
  Yes, many window hardware components can be replaced by homeowners with basic tools and skills. However, for complex repairs or if you're unsure, it's best to consult a professional.`} />
  <AnFAQ defaultExpanded={false} question={"How do I maintain window hardware?"} resolution={`
  Regular cleaning with a mild detergent and water, along with lubrication of moving parts, can help keep window hardware in good condition. Check for loose screws and tighten them as needed.`} />

  {/* <AnFAQ defaultExpanded={false} question={"What is the purpose of window locks?"} resolution={`
  Window locks provide security by preventing windows from being opened from the outside. They also help seal the window tightly, improving energy efficiency and reducing drafts.`} />
    <AnFAQ defaultExpanded={false} question={"Can I add security features to my existing windows with hardware?"} resolution={`
    Yes, you can enhance security with features like keyed locks, window bars, or sash locks. These provide additional protection against intruders and can be added to most types of windows.`} />
    <AnFAQ defaultExpanded={false} question={"Are there window hardware options suitable for historic or period-style windows?"} resolution={`
    Yes, there are window hardware options designed to replicate the look of historic or period-style windows, including decorative sash locks, brass or iron hardware, and traditional-style handles and stays.`} />
    <AnFAQ defaultExpanded={false} question={"How do I adjust window hardware if my windows are difficult to open or close?"} resolution={`
    Many window hardware components, such as hinges and crank operators, can be adjusted to improve the operation of the window. Refer to the manufacturer's instructions or consult a professional for guidance.`} />
    <AnFAQ defaultExpanded={false} question={"Can window hardware be painted to match the window frame?"} resolution={`
    Yes, window hardware can be painted to match the window frame or other elements of the room. Use a primer suitable for the material of the hardware, followed by a paint specifically formulated for metal or plastic.
    `} /> */}

</div>
}

function CurtainHardwareFAQs(){
  return <div> 
    <Typography sx={{ mt: 4, mb: 2, fontStyle: "italic", fontWeight: 200 }} variant="subtitle1" component="div">{"Curtain Hardware"}</Typography>      
  {/* Curtain Hardware */}
  <AnFAQ defaultExpanded={true} question={"What types of curtain hardware are available?"} resolution={`
  Curtain hardware includes curtain rods, brackets, finials, rings, and tiebacks. These components are essential for hanging and supporting curtains or drapes.`} />
  <AnFAQ defaultExpanded={false} question={"How do I choose the right curtain hardware for my curtains?"} resolution={`
  Consider factors such as the curtain style, weight, and length, as well as the design and aesthetic of the room. Ensure the hardware is strong enough to support the weight of the curtains.`} />
  <AnFAQ defaultExpanded={false} question={"What are the different types of curtain rods?"} resolution={`
  Curtain rods come in various styles, including standard rods, tension rods, traverse rods (for curtains that open and close), and decorative rods with ornate designs.
  `} />
  <AnFAQ defaultExpanded={false} question={"Can I install curtain hardware myself?"} resolution={`
  Yes, most curtain hardware is designed for easy installation with basic tools like a screwdriver and a level. However, for complex installations or heavy curtains, you may need assistance.`} />
  <AnFAQ defaultExpanded={false} question={"How do I determine the right curtain rod length?"} resolution={`
  Measure the width of your window and add extra length on each side to allow the curtains to hang past the window frame when open. This ensures the curtains don't block the view and allows more light to enter the room.`} />

  {/* <AnFAQ defaultExpanded={false} question={"What are curtain brackets used for?"} resolution={`
  Curtain brackets are used to attach the curtain rod to the wall or window frame. They come in various styles, including single, double, and ceiling-mounted brackets, to support different types of curtain setups.`} />
    <AnFAQ defaultExpanded={false} question={"Can I reuse curtain hardware if I change my curtains?"} resolution={`
    Yes, in most cases, you can reuse curtain rods, brackets, and rings if they are still in good condition and compatible with the new curtains. Ensure the hardware matches the style and weight of the new curtains.`} />
    <AnFAQ defaultExpanded={false} question={"What are curtain finials, and do I need them?"} resolution={`
    Curtain finials are decorative end pieces that attach to the ends of curtain rods. They add a decorative touch to the window treatment and help keep the curtains from sliding off the rod.`} />
    <AnFAQ defaultExpanded={false} question={"How do I clean and maintain curtain hardware?"} resolution={`
    Regular dusting with a soft cloth or vacuum attachment can keep curtain hardware clean. For metal hardware, use a mild detergent and water to remove any grime, and dry thoroughly to prevent rust.`} />
    <AnFAQ defaultExpanded={false} question={"Can I use curtain hardware for other purposes, like hanging tapestries or artwork?"} resolution={`
    Yes, curtain hardware can be repurposed for hanging tapestries, artwork, or even string lights. Just ensure the hardware is strong enough to support the weight and use appropriate hanging methods.`} /> */}
</div>
}


function AnFAQ({ question, resolution, defaultExpanded = false }: { question: string, resolution: string, defaultExpanded?: boolean }) {
  return <Accordion defaultExpanded={defaultExpanded}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      // aria-controls="panel1-content"
      // id="panel1-header"
    >
      <Typography
       fontWeight={'bold'}
       >{question}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        {resolution}
      </Typography>
    </AccordionDetails>
  </Accordion>
}