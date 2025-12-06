// components/Faq.jsx
"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FAQ_ITEMS } from "../lib/faqData";

const FAQ_WHATSAPP_MESSAGE = encodeURIComponent(
  "Merhaba, SSS bölümünden ulaşıyorum. Etkinlik ve ekipman kiralama için bilgi almak istiyorum."
);

const DEFAULT_DICTIONARY = {
  // BAŞLIK
  sectionPill: "Merak Edilenler",
  sectionTitlePrefix: "Sıkça Sorulan",
  sectionTitleHighlight: "Sorular",
  sectionDesc: "Aklınızdaki soruları yanıtlıyoruz. Aradığınız cevabı bulamazsanız teknik ekibimizle doğrudan iletişime geçebilirsiniz.",
  
  // SUPPORT CARD
  supportTitle: "Cevabı bulamadınız mı?",
  supportDesc: "Projeniz özel bir çözüm gerektiriyor olabilir. Uzman teknik ekibimizle görüşün.",
  supportPhoneLabel: "Bizi Arayın",
  supportWhatsappLabel: "WhatsApp Destek",
  supportMailLabel: "E-posta Gönder",
  
  // DATA
  contactPhone: "+90 545 304 86 71",
  contactPhoneHref: "tel:+905453048671",
  contactWhatsappHref: `https://wa.me/905453048671?text=${FAQ_WHATSAPP_MESSAGE}`,
  contactMail: "info@sahneva.com",
  contactMailHref: "mailto:info@sahneva.com",
  
  regionTitleSr: "Sıkça sorulan sorular bölümü içeriği",
};

function mergeDictionary(base, override = {}) {
  const result = { ...base };
  for (const [key, value] of Object.entries(override || {})) {
    if (value && typeof value === "object" && !Array.isArray(value) && typeof base[key] === "object") {
      result[key] = mergeDictionary(base[key], value);
    } else if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}

// —————————————————————————————————————————
// TEKİL SORU BİLEŞENİ (ACCORDION)
// —————————————————————————————————————————
const FaqRow = React.memo(function FaqRow({ question, answer, slug, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (isOpen && contentRef.current) {
       setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
       setHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className={`group border rounded-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'bg-white/10 border-blue-500/50 shadow-lg shadow-blue-900/20' : 'bg-white/5 border-white/5 hover:border-white/10'}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${slug}-content`}
        id={`${slug}-header`}
        className="flex items-center justify-between w-full p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 inset-ring"
      >
        <span className={`text-sm md:text-base font-bold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
           {question}
        </span>
        
        <span className={`flex-shrink-0 ml-4 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${isOpen ? 'bg-blue-600 border-blue-500 text-white rotate-180' : 'bg-white/5 border-white/10 text-slate-400 group-hover:bg-white/10'}`}>
           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
           </svg>
        </span>
      </button>

      <div
        id={`${slug}-content`}
        role="region"
        aria-labelledby={`${slug}-header`}
        ref={contentRef}
        style={{ height }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        <div className="px-5 pb-5">
           <div className="pt-4 border-t border-white/10 text-slate-400 text-sm md:text-base leading-relaxed">
              {answer}
           </div>
        </div>
      </div>
    </div>
  );
});

// —————————————————————————————————————————
// DESTEK KARTI (SAĞ TARAF)
// —————————————————————————————————————————
function SupportCard({ dictionary }) {
   return (
      <div className="sticky top-24 bg-[#0F1623] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
         {/* Arka Plan Efekti */}
         <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-600/20 rounded-full blur-[50px] pointer-events-none" />
         
         <div className="relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl mb-5 shadow-lg">
               💬
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">
               {dictionary.supportTitle}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
               {dictionary.supportDesc}
            </p>

            <div className="space-y-3">
               {/* Telefon */}
               <a 
                  href={dictionary.contactPhoneHref}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all group"
               >
                  <span className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                     📞
                  </span>
                  <div>
                     <span className="block text-xs text-slate-400 font-medium">{dictionary.supportPhoneLabel}</span>
                     <span className="block text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{dictionary.contactPhone}</span>
                  </div>
               </a>

               {/* WhatsApp */}
               <a 
                  href={dictionary.contactWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-green-500/30 transition-all group"
               >
                  <span className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                     📱
                  </span>
                  <div>
                     <span className="block text-xs text-slate-400 font-medium">{dictionary.supportWhatsappLabel}</span>
                     <span className="block text-sm font-bold text-white group-hover:text-green-400 transition-colors">Hızlı Mesaj Gönder</span>
                  </div>
               </a>

               {/* Mail */}
               <a 
                  href={dictionary.contactMailHref}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all group"
               >
                  <span className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                     ✉️
                  </span>
                  <div>
                     <span className="block text-xs text-slate-400 font-medium">{dictionary.supportMailLabel}</span>
                     <span className="block text-sm font-bold text-white group-hover:text-purple-400 transition-colors">{dictionary.contactMail}</span>
                  </div>
               </a>
            </div>
         </div>
      </div>
   )
}

// —————————————————————————————————————————
// ANA BİLEŞEN
// —————————————————————————————————————————

export default function Faq({
  items = FAQ_ITEMS,
  dictionary: dictionaryOverride,
  ariaLabelledBy,
  regionLabelId = "faq-section-title"
} = {}) {
  const dictionary = useMemo(
    () => mergeDictionary(DEFAULT_DICTIONARY, dictionaryOverride),
    [dictionaryOverride]
  );
  
  // Sadece bir akordeonun açık kalmasını istiyorsan state kullanabilirsin.
  // Şimdilik her biri bağımsız çalışsın diye index tutmuyorum, FaqRow içinde kendi state'i var.
  // Ancak "biri açılınca diğeri kapansın" istersen buraya state ekleyebiliriz.
  const [openIndex, setOpenIndex] = useState(0); 

  const handleToggle = useCallback((index) => {
     setOpenIndex(prev => prev === index ? -1 : index);
  }, []);

  return (
    <section
      className="relative py-16 md:py-24 bg-[#0B1120] overflow-hidden"
      aria-labelledby={regionLabelId}
    >
      {/* Arka Plan Efektleri */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
         <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        
        {/* ——— BAŞLIK ALANI ——— */}
        {!ariaLabelledBy && (
            <ScrollReveal direction="up" delay="0.05">
                <div className="text-center max-w-3xl mx-auto mb-16">
                     {/* Hap Etiket */}
                     <div className="flex justify-center mb-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider shadow-sm">
                           <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
                           {dictionary.sectionPill}
                        </span>
                    </div>

                    <h2 id={regionLabelId} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                        {dictionary.sectionTitlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{dictionary.sectionTitleHighlight}</span>
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        {dictionary.sectionDesc}
                    </p>
                </div>
            </ScrollReveal>
        )}

        {/* ——— İÇERİK: SPLIT LAYOUT ——— */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* SOL TARAF: SORULAR */}
            <div className="lg:col-span-8 space-y-4">
               {items.map((item, index) => (
                  <ScrollReveal key={item.slug} direction="up" delay={index * 0.05}>
                     <FaqRow 
                        {...item} 
                        isOpen={openIndex === index}
                        onToggle={() => handleToggle(index)}
                     />
                  </ScrollReveal>
               ))}
            </div>

            {/* SAĞ TARAF: STICKY DESTEK KARTI */}
            <div className="lg:col-span-4">
               <ScrollReveal direction="left" delay="0.2">
                  <SupportCard dictionary={dictionary} />
               </ScrollReveal>
            </div>

        </div>

      </div>
    </section>
  );
}
