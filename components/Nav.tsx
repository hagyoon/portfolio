"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle, MotionToggle } from "@/components/Preferences";

const links=[{href:"/#projects",label:"Work"},{href:"/#about",label:"About"},{href:"/#explorations",label:"Interests"},{href:"/writing",label:"Writing"},{href:"/library",label:"Library"}];

export default function Nav(){
  const [open,setOpen]=useState(false);
  const pathname=usePathname();
  const menu=useRef<HTMLDivElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  useEffect(()=>setOpen(false),[pathname]);
  useEffect(()=>{
    if(!open)return;
    const before=document.body.style.overflow;
    document.body.style.overflow="hidden";
    menu.current?.querySelector<HTMLElement>("a")?.focus();
    function key(e:KeyboardEvent){
      if(e.key==="Escape"){setOpen(false);trigger.current?.focus();}
      if(e.key==="Tab"){
        const nodes=Array.from(menu.current?.querySelectorAll<HTMLElement>("a,button")||[]);
        const first=nodes[0],last=nodes[nodes.length-1];
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
      }
    }
    window.addEventListener("keydown",key);
    return()=>{document.body.style.overflow=before;window.removeEventListener("keydown",key);};
  },[open]);
  return <><header className="site-nav"><div className="container-edge nav-inner">
    <Link href="/" className="brand" aria-label="hkryu home"><span className="brand-mark" aria-hidden="true">h<span>r</span></span><span>hkryu<span className="brand-period">.</span></span></Link>
    <nav className="desktop-nav" aria-label="Primary">{links.map(l=><Link key={l.href} href={l.href} aria-current={pathname!=="/"&&pathname.startsWith(l.href)?"page":undefined}>{l.label}</Link>)}</nav>
    <div className="nav-actions"><div className="desktop-preferences"><ThemeToggle/></div><a className="nav-contact" href="/#contact">Let’s talk <span aria-hidden="true">↗</span></a><button className="menu-trigger" ref={trigger} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(true)}><span/><span/></button></div>
  </div></header>{open&&<div className="mobile-menu" ref={menu} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation"><div className="mobile-menu-top"><span className="brand">hkryu.</span><button onClick={()=>{setOpen(false);trigger.current?.focus();}} aria-label="Close menu">×</button></div><nav aria-label="Mobile primary">{links.map((l,i)=><Link key={l.href} href={l.href} onClick={()=>setOpen(false)}><span>0{i+1}</span>{l.label}<span>↗</span></Link>)}</nav><div className="mobile-preferences"><ThemeToggle/><MotionToggle/></div><p className="eyebrow">Independent practice · Singapore</p></div>}</>;
}
