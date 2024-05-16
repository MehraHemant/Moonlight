import Image from "next/image"
import Link from "next/link"

export const CompanyLogo = ()=> {
    return <Link href={'/'}>
    <Image
      src="/logo.png"
      alt="Moonlite International Logo"
      className="logo"
      style={{objectFit:"contain"}}
      fill={true}
      priority
    /></Link>
}

export const CompanyLogoWrapped = ()=> {
  return <div style={{ position: 'relative' }}>
    <CompanyLogo />
  </div>
}