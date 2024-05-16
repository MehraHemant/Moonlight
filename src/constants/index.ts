import { ProductFilters } from "@/types";

export const FINISHES = [
{ id: 1, name: "Anodized - Gold" },
{ id: 2, name: "Anodized - Satin" },
{ id: 3, name: "Anodized - Silver" },
{ id: 4, name: "Antique -Copper" },
{ id: 5, name: "Antique-Black" },
{ id: 6, name: "Bee's Wax" },
{ id: 7, name: "Bright Black Zinc" },
{ id: 8, name: "Chrome - Polished" },
{ id: 9, name: "Chrome - Satin" },
{ id: 10, name: "Electro Galvanized - White" },
{ id: 11, name: "Electro Galvanized - Yellow" },
{id: 12, name: "Electrobrass"},
{ id: 13, name: "Epoxy-Black" },
{ id: 14, name: "Epoxy-Green" },
{ id: 15, name: "Epoxy-Grey" },
{ id: 16, name: "Epoxy-Red" },
{ id: 17, name: "Epoxy-White" },
{ id: 18, name: "Hot Dip Galvanized" },
{ id: 19, name: "Lacquer" },
{ id: 20, name: "Natural" },
{ id: 21, name: "Nickel" },
{ id: 22, name: "Rust Finish" }, 
{ id: 23, name: "Shot Blast" }
];
export const CATEGORIES: [Record<string, string[]>] = [
  {
    "Door Hardware": [
      "Bayonet Lock",
      "Tower Bolt",
      "Door Box Lock",
      "Standard Gun Lock",
      "Locking Bolt",
      "Door Bolt",
      "Pull Handle",
      "Door Latch",
      "Tower Bolt",
      "Numerals",
      "Ring Door Knocker"
    ],
    "Gate Hardware": [
      "Eye Bolt",
      "Gate Shoe"
    ],
    "Fence Hardware Fittings": [
      "Eye Screw"
    ],
    "Window Hardware | Shutter Fittings": [
      "Shutter Stop",
      "Shutter Stop with Buffer",
      "Shutter Stop Seal",
      "Shutter Stop Bent",
      "Shutter Stop Straight",
      "Shutter Hook",
      "Auto Shutter Stop-1",
      "Auto Shutter Stop-2",
      "Casement Stay",
    ], 
    "Hand Forged Hardware": [
      "Pull Handle",
      "Cranked Bolt",
      "Tee Hinge",
      "Stud"
    ],
    "Black Malleable Hardware": [
      "Door Pull Handle",
      "Tee Hinge"
    ],
    "Shelf Brackets": [
      "Shelf Bracket"
    ],
    "Shelf Corner Brackets": [
      "Corner Support"
    ], 
    "Handrail Brackets | Railing Support": [
      "Ramp Support Bracket",
      "Ramp Support Bracket - Adjustable",
      "Straight Ramp Support Bracket - Adjustable",
      "Ramp Support Bracket (To Weld)",
    ],
    "Hardware Hooks": [
      "Hook",
      "Rope Hook",
      "Hat & Coat Hook",
      "Diamond Hook",
      "Wire Hat & Coat Hook",
      "Multi Hook",
      "Double Hook"
    ],
    "Hardware Knobs": [
      "Knob",
      "Pull Knob"
    ],
    "Hardware Accessories": [
      "Nail"
    ],
    "Cabinet Hardware": [
      "Support",
      "Hasp",
      "Chest Handle",
      "Demi Moulure",
      "Butterfly Hinge",
      "Drawer Hinge"
    ],
    "Pet Hardware Products": [
      "Saddelry Hardware",
      "Horse Hardware",
      "Metal Buckles",
      "Snap Hooks",
      "Chains & Collars"
    ]
  }
]

export const CHILD_CATEGORIES = Object.values(CATEGORIES[0]).reduce((prev, curr) => [...prev, ...curr], [])

export const MATERIALS = [
  "Aluminium",
  "Cast Iron",
  "Handforged Iron",
  "Ironmongery",
  "Malleable Iron",
  "Stainless Steel",
  "Wood",
  "Wrought Iron",
  "Zinc / Zamak"
];

export const PRODUCTION_TYPES = [
  { id: 1, name: "Sand Casting" },
  { id: 2, name: "Gravity Casting" },
  { id: 3, name: "Pressure Die Cast" },
  { id: 4, name: "Press Die Cutting" },
  { id: 5, name: "Handforged" },
  { id: 6, name: "Forging" }
];

export const SINGLE_FILE_MAX_SIZE_IN_MB = 5;

export const ACCEPTED_IMAGE_FILE_TYPES = ["JPEG", "JPG", "PNG", "GIF"];

export const ACCEPTED_EXCEL_FILE_TYPES = ["XLSX"];


export class UserPresentableError extends Error {
  constructor(errMessage: string) {
    super(`CUSTOM:: ${errMessage}`)
  }
}

export const isStringSafeToStoreInDb = (input: string) => {
  return (/^[a-zA-Z0-9_.\/ -]+$/.test(input));
};


export const capitalizeFirstLetter = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export const createProductFiltersFromSearchParams = (searchParams: any) => {
  const filterObj: ProductFilters = {};
  if (searchParams?.parentCategory !== undefined) {
    filterObj["parentCategory"] = searchParams.parentCategory
  }
  if (searchParams?.childCategory !== undefined) {
    filterObj["childCategory"] = searchParams.childCategory
  }
  if (searchParams?.materials !== undefined) {
    filterObj["materials"] = searchParams.materials
  }
  if (searchParams?.finishes !== undefined) {
    filterObj["finishes"] = searchParams.finishes
  }
  if (searchParams?.productionType !== undefined) {
    filterObj["productionType"] = searchParams.productionType
  }
  return filterObj;
}


export const agencyNames = [
  'CRISIL',
  'D&B',
  'MSME',
  'NSIC',
  'SMERA'
];
