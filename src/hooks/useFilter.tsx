"use client";
import { CATEGORIES, FINISHES, MATERIALS, PRODUCTION_TYPES } from "@/constants";
import { ProductFilters } from "@/types";
import { Checkbox, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import HardwareIcon from '@mui/icons-material/Hardware';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import FactoryIcon from '@mui/icons-material/Factory';
import GradientIcon from '@mui/icons-material/Gradient';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const NO_FILTERS_OBJECT: ProductFilters = {
  childCategory: null,
  materials: null,
  finishes: null,
  parentCategory: null,
  productionType: null,
};

export const useFilter = ({initialFilters, pageFilterCategory} : {initialFilters?: ProductFilters, pageFilterCategory: keyof ProductFilters}): [ProductFilters | null, JSX.Element]=> {
    console.info("Inside the useFilter guy", initialFilters);
    const [filters, setFilters] = useState<ProductFilters | null>(()=>initialFilters ?? NO_FILTERS_OBJECT);
  
    const [hardwareMenuExpanded, setHardwareMenuExpanded] = useState<boolean>(true);

    const [expandedMenu, setExpandedMenu] = useState<Record<keyof ProductFilters, boolean>>({
      childCategory: false,
      finishes: false,
      isTopSelling: false,
      materials: false,
      parentCategory: false,
      productionType: false,
    });

    const handleHardwareMenuClick = () => {
      setHardwareMenuExpanded(!hardwareMenuExpanded);
    };

    const handleMenuExpansionToggleClick = (menu: keyof ProductFilters)=>{
      setExpandedMenu((prev)=>({...prev, [menu]: !prev[menu]}))
    }

    useEffect(()=>{
      if(JSON.stringify(filters) === JSON.stringify(initialFilters)){
          return;
      }
      const params = new URLSearchParams()

      if(filters?.parentCategory && pageFilterCategory !=='parentCategory'){
        params.set('parentCategory', filters.parentCategory)
      }
      if(filters?.childCategory && pageFilterCategory !=='childCategory'){
        params.set('childCategory', filters.childCategory)
      } 
      if(filters?.materials && pageFilterCategory !=='materials'){
        for(let material of filters.materials){
          params.append('materials', material);
        }
      }
      if(filters?.finishes && pageFilterCategory !=='finishes'){
        for(let finish of filters.finishes){
          params.append('finishes', finish);
        }
      }
      if(filters?.productionType && pageFilterCategory !=='productionType'){
        for(let pt of filters.productionType){
          params.append('productionType', pt);
        }
      }
        window.history.replaceState(null, '', `?${params.toString()}`)
    }, [filters, pageFilterCategory, initialFilters])
  
    const handleMultipleSelectFilterChange = (checked: boolean, value: string, kind: "finishes" | "materials" | "productionType") => {
      if (checked) {
        setFilters((prev) => {
          if(!prev){
            return {...NO_FILTERS_OBJECT,[kind]: [value]}
          } else {
            return {...prev, [kind]: [...(prev[kind] ?? []), value]}
          }
        })
      } else {
        setFilters((prev) => {
          if(!prev){
            return {...NO_FILTERS_OBJECT, [kind]: [value]}
          } else {
            return {...prev, [kind]: (prev[kind] ?? []).filter(option => option !== value)}
          }
        })
      }
    }

    const filterComponent = useMemo(()=> {
      return <div className="filter-container">
      <h2>Filters</h2>
      {/* {(pageFilterCategory!=='childCategory' && pageFilterCategory!=='parentCategory') && <>
      <ListItemButton onClick={handleHardwareMenuClick}>
        <ListItemIcon>
          <HardwareIcon />
        </ListItemIcon>
        <ListItemText primary="Hardware" />
        {hardwareMenuExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {Object.keys(CATEGORIES[0]).map((cname) => <>
      <ParentCategoryFilters key={cname} cname={cname} expanded={hardwareMenuExpanded} />
      </>)}</>} */}
      {(pageFilterCategory==='parentCategory' && filters?.parentCategory) && <>
      <TopLevelMenuToggler handleToggle={()=>handleMenuExpansionToggleClick('parentCategory')}
       icon={<HardwareIcon className={'filter-category icon'}/>}
      isExpanded={expandedMenu['parentCategory']}
      text={filters.parentCategory}
      />
      <RelatedChildCategoryFilters key={filters.parentCategory} cname={filters.parentCategory} expanded={expandedMenu['parentCategory']} />
      {/* <ParentCategoryFilters key={filters.parentCategory} cname={filters.parentCategory} expanded={hardwareMenuExpanded} /> */}
      <hr/>
      </>}
      {(pageFilterCategory!=='materials') && <>
      <TopLevelMenuToggler handleToggle={()=>handleMenuExpansionToggleClick('materials')}
       icon={<ArchitectureIcon className={'filter-category icon'}/>}
      isExpanded={expandedMenu['materials']}
      text={"Material"}
      />
      <CheckboxBasedFilterChildren currentFilters={filters} options={MATERIALS} 
      filterCategory="materials"
      onToggle={(checked, material)=> handleMultipleSelectFilterChange(checked, material, "materials")}
       expanded={expandedMenu['materials']} />
      <hr/>
      </>}
      {(pageFilterCategory!=='finishes') && <>
      <TopLevelMenuToggler handleToggle={()=>handleMenuExpansionToggleClick('finishes')}
       icon={<GradientIcon className={'filter-category icon'}/>}
      isExpanded={expandedMenu['finishes']}
      text={"Finish"}
      />
      <CheckboxBasedFilterChildren currentFilters={filters} options={FINISHES.map(({name})=>name)} 
      filterCategory="finishes"
      onToggle={(checked, finish)=> handleMultipleSelectFilterChange(checked, finish, "finishes")}
       expanded={expandedMenu['finishes']} />
      <hr/>
      </>}
      {(pageFilterCategory!=='productionType') && <>
      <TopLevelMenuToggler handleToggle={()=>handleMenuExpansionToggleClick('productionType')}
       icon={<FactoryIcon className={'filter-category icon'}/>}
      isExpanded={expandedMenu['productionType']}
      text={"Production Type"}
      />
      <CheckboxBasedFilterChildren currentFilters={filters} options={PRODUCTION_TYPES.map(({name})=>name)} 
      filterCategory="productionType"
      onToggle={(checked, pt)=> handleMultipleSelectFilterChange(checked, pt, "productionType")}
       expanded={expandedMenu['productionType']} />
      <hr/>
      </>}
    </div>
    }, [filters,expandedMenu, pageFilterCategory])

    return [
      filters,
      filterComponent
    ]
}

function RelatedChildCategoryFilters({cname, expanded}: {cname: string, expanded: boolean}){
  return <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List component="div" dense={true}>
          <Fragment key={cname}>
            {CATEGORIES[0][cname].map((childCategoryName) => (
              <ListItemButton className={"nav-links"} component="a" href={`/${cname.replaceAll(' ', '-')}/${childCategoryName.replaceAll(' ', '-')}/builders-hardware-manufacturers`} key={childCategoryName} sx={{ pl: 4 }}>
                <ListItemText inset primary={childCategoryName} className="filter-category child" primaryTypographyProps={{ className:'filter-category'}} />
              </ListItemButton>
            ))}
      </Fragment>
          </List>
        </Collapse>
}

function CheckboxBasedFilterChildren({currentFilters, filterCategory,expanded, options, onToggle}: {currentFilters: ProductFilters | null, filterCategory: keyof ProductFilters,expanded: boolean, options: string[], onToggle: (checked: boolean, value: string)=>void}){
  
  return  <Collapse in={expanded} timeout="auto" unmountOnExit>
  <List component="div" dense={true} className={'filter-category checkbox'}>
  <Fragment key={filterCategory}>
    {options.map((itemName) => {
           const labelId = `checkbox-list-label-${itemName}`;
      return <ListItem
  key={itemName}
>
  <ListItemButton role={undefined}
    sx={{ pl: 4 }}
    className={'filter-category checkbox'}
  onClick={(e)=>{
    if((e.target as any)?.checked !==undefined){
      onToggle((e.target as any)?.checked,itemName)
    }
  }} 
  dense>
    <ListItemIcon className={'filter-category icon'}>
      <Checkbox
      style={{color: "red"}}
        className={'filter-category'}
        edge="start"
        checked={(currentFilters?.[filterCategory] as string[])?.includes(itemName) ?? false}
        tabIndex={-1}
        disableRipple
        inputProps={{ 'aria-labelledby': labelId}}
      />
    </ListItemIcon>
    <ListItemText id={labelId}  primary={itemName} primaryTypographyProps={{ className:'filter-category checkbox child'}} />
  </ListItemButton>
</ListItem>
    })}
    
</Fragment>
  </List>
</Collapse>
}

function TopLevelMenuToggler({text, isExpanded, handleToggle, icon}:{text: string,isExpanded: boolean, handleToggle: ()=>void, icon: ReactNode}){
  return <ListItemButton onClick={handleToggle}>
  <ListItemIcon className={'filter-category icon'}>
    {icon}
  </ListItemIcon>
  <ListItemText  primaryTypographyProps={{ className:'filter-category'}} primary={text} />
  {isExpanded ? <ExpandLess className={'filter-category'} /> : <ExpandMore className={'filter-category'}/>}
</ListItemButton>
}