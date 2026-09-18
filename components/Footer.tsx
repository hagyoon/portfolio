"use client";

import { useState } from "react";
import ContactModal from "@/components/ContactModal";
import { ThemeToggle, MotionToggle } from "@/components/Preferences";
import type { Site } from "@/lib/content";

export default function Footer({site}:{site:Site}){
  const [open,setOpen]=useState(false);
  return <><ContactModal open={open} onClose={()=>setOpen(false)} telegram={site.contact.telegram} instagram={site.contact.instagram}/><footer id="contact" className="new-footer"><div className="container-edge">
    <div className="footer-main"><div><p className="eyebrow">Good things start with a conversation</p><h2>Something on<br/>your <em>mind?</em></h2><p>Ambitious systems, unconventional ideas,<br/>or simply a shared curiosity.</p><button className="btn-solid" onClick={()=>setOpen(true)}>Begin a conversation <span aria-hidden="true">↗</span></button></div><div className="footer-orbit" aria-hidden="true"><span/><span/><span/><i>↗</i></div></div>
    <div className="footer-links"><a href="/" className="brand">hkryu.</a><div><a href="/projects">Work</a><a href="/writing">Writing</a><a href="/library">Library</a>{site.contact.email&&<a href={"mailto:"+site.contact.email}>Email ↗</a>}{site.contact.linkedin&&<a href={site.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}{site.contact.github&&<a href={site.contact.github} target="_blank" rel="noreferrer">GitHub ↗</a>}</div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} hkryu · {site.location}</span><div><ThemeToggle/><MotionToggle/><a href="/admin">Studio ↗</a></div><span>Built with intent.</span></div>
  </div></footer></>;
}
