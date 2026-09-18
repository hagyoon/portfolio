"use client";

import { useEffect, useRef } from "react";
import ContactForm from "@/components/ContactForm";

export default function ContactModal({open,onClose,telegram,instagram}:{open:boolean;onClose:()=>void;telegram?:string;instagram?:string}){
  const dialog=useRef<HTMLDialogElement>(null);
  const close=useRef(onClose);
  close.current=onClose;
  useEffect(()=>{
    const el=dialog.current;
    if(!open||!el)return;
    const prior=document.activeElement as HTMLElement;
    const overflow=document.body.style.overflow;
    el.showModal();
    document.body.style.overflow="hidden";
    return()=>{el.close();document.body.style.overflow=overflow;prior?.focus();};
  },[open]);
  if(!open)return null;
  return <dialog ref={dialog} className="contact-dialog" aria-labelledby="contact-title" onCancel={e=>{e.preventDefault();close.current();}} onClick={e=>{if(e.target===e.currentTarget)close.current();}}><div className="contact-dialog-inner"><button className="dialog-close" onClick={onClose} aria-label="Close contact form">×</button><p className="eyebrow">A new connection</p><h2 id="contact-title">Let’s talk.</h2><p className="contact-explainer">A project, a question, or an idea worth sharing. This form prepares your message for Telegram; you choose when to send it.</p><ContactForm telegram={telegram} instagram={instagram}/></div></dialog>;
}
