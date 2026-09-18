import SafeImage from "@/components/ui/SafeImage";
import type { GalleryImage } from "@/lib/content";

export default function Gallery({images}:{images:GalleryImage[];index?:string}){
  if(!images.length)return null;
  return <section id="gallery" className="gallery-section container-edge"><div className="section-heading"><div><p className="eyebrow">Collected moments</p><h2>An eye for <em>detail.</em></h2></div><p>Objects, places, and things worth noticing.</p></div><div className="gallery-grid">{images.map((img,i)=><figure key={img.src+"-"+i}><div className="gallery-image"><SafeImage src={img.src} alt={img.caption||"Collected moment "+(i+1)} sizes="(min-width: 768px) 40vw, 90vw"/></div>{img.caption&&<figcaption>{img.caption}</figcaption>}</figure>)}</div></section>;
}
