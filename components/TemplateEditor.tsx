import React, { useState, useRef, useEffect } from 'react';
import { X, Save, Type, Image as ImageIcon, RotateCcw, Plus, Trash2, Download, Printer, Phone, Mail, Globe, MapPin, Linkedin, Layout, FileText, Loader2 } from 'lucide-react';
import { TemplateItem, Category } from '../types';

// --- Types for Structured Data ---

interface ResumeData {
  fullName: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  summary: string;
  skills: string[];
  experience: {
    id: string;
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    id: string;
    degree: string;
    school: string;
    year: string;
  }[];
}

interface BusinessCardData {
  fullName: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  location: string;
}

interface TextOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  fontSize: number;
  fontFamily: string;
}

interface TemplateEditorProps {
  item: TemplateItem;
  onClose: () => void;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({ item, onClose }) => {
  // Mode selection
  const isResume = item.category === Category.RESUME;
  const isBusinessCard = item.category === Category.BUSINESS_CARD;
  const isDocument = isResume || isBusinessCard;

  // --- STATE: Document Data ---
  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: 'ALEXANDER SMITH',
    location: 'New York, USA',
    email: 'alex.smith@example.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/alexsmith',
    website: 'www.alexsmith.design',
    summary: 'Creative and detail-oriented professional with over 5 years of experience in digital design and project management. Proven track record of delivering high-quality solutions that drive business growth.',
    skills: ['Project Management', 'UI/UX Design', 'React & TypeScript', 'Digital Marketing', 'Agile Methodology'],
    experience: [
      {
        id: '1',
        role: 'Senior Product Designer',
        company: 'TechFlow Solutions',
        duration: 'Jan 2021 – Present',
        description: '• Led the redesign of the core product interface, improving user retention by 25%.\n• Managed a team of 4 designers and collaborated closely with engineering teams.\n• Conducted user research and usability testing to inform design decisions.'
      },
      {
        id: '2',
        role: 'UX Designer',
        company: 'Creative Pulse Agency',
        duration: 'Jun 2018 – Dec 2020',
        description: '• Designed responsive websites for diverse clients in fintech and healthcare.\n• Created wireframes, prototypes, and high-fidelity mockups.\n• Increased client satisfaction scores by 15% through improved design processes.'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Fine Arts in Interaction Design',
        school: 'California College of the Arts',
        year: '2014 – 2018'
      }
    ]
  });

  const [cardData, setCardData] = useState<BusinessCardData>({
    fullName: 'JANE DOE',
    role: 'Chief Executive Officer',
    company: 'NEXUS INNOVATIONS',
    email: 'jane@nexus.com',
    phone: '+1 (555) 987-6543',
    website: 'nexus.com',
    location: 'San Francisco, CA'
  });

  // --- STATE: Image Editor ---
  const [texts, setTexts] = useState<TextOverlay[]>([]);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    sepia: 0
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const draggingRef = useRef<{ id: string; startX: number; startY: number; initX: number; initY: number } | null>(null);

  // --- Handlers for Document Editor ---

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    const element = document.getElementById('printable-area');
    if (!element) return;
    
    setIsDownloadingPdf(true);
    
    // Resume is usually A4
    // Business card is 3.5in x 2in
    const filename = isResume 
        ? `${resumeData.fullName.replace(/\s+/g, '_')}_Resume.pdf` 
        : `${cardData.company.replace(/\s+/g, '_')}_Card.pdf`;

    const opt = {
      margin:       0,
      filename:     filename,
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { 
        unit: 'in', 
        format: isResume ? 'a4' : [3.5, 2], 
        orientation: isResume ? 'portrait' : 'landscape' 
      }
    };

    // Access html2pdf from window
    // @ts-ignore
    if (window.html2pdf) {
      // @ts-ignore
      window.html2pdf().set(opt).from(element).save().finally(() => {
        setIsDownloadingPdf(false);
      });
    } else {
        alert("PDF Generator is loading. Please try again in a moment.");
        setIsDownloadingPdf(false);
    }
  };

  const handleResumeChange = (field: keyof ResumeData, value: any) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      role: 'Role Title',
      company: 'Company Name',
      duration: 'Year – Year',
      description: '• Key achievement or responsibility'
    };
    setResumeData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
  };

  // --- Handlers for Image Editor ---
  
  const addText = () => {
    const newText: TextOverlay = {
      id: Date.now().toString(),
      text: 'Double click to edit',
      x: 50,
      y: 50,
      color: '#000000',
      fontSize: 24,
      fontFamily: 'Inter'
    };
    setTexts([...texts, newText]);
    setSelectedTextId(newText.id);
  };

  const removeText = (id: string) => {
    setTexts(texts.filter(t => t.id !== id));
    if (selectedTextId === id) setSelectedTextId(null);
  };

  const updateText = (id: string, updates: Partial<TextOverlay>) => {
    setTexts(texts.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const text = texts.find(t => t.id === id);
    if (!text || !containerRef.current) return;

    setSelectedTextId(id);
    draggingRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initX: text.x,
      initY: text.y
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current || !containerRef.current) return;

    const { startX, startY, initX, initY } = draggingRef.current;
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const deltaX = ((e.clientX - startX) / containerRect.width) * 100;
    const deltaY = ((e.clientY - startY) / containerRect.height) * 100;

    const newX = Math.min(Math.max(initX + deltaX, 0), 100);
    const newY = Math.min(Math.max(initY + deltaY, 0), 100);

    setTexts(prev => prev.map(t => 
      t.id === draggingRef.current?.id ? { ...t, x: newX, y: newY } : t
    ));
  };

  const handleMouseUp = () => {
    draggingRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleImageDownload = async () => {
    if (!imageRef.current) return;
    setIsSaving(true);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = item.imageUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // Apply filters
      ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) grayscale(${filters.grayscale}%) sepia(${filters.sepia}%)`;
      ctx.drawImage(img, 0, 0);
      ctx.filter = 'none';

      // Draw texts
      texts.forEach(text => {
        const x = (text.x / 100) * canvas.width;
        const y = (text.y / 100) * canvas.height;
        const scaleFactor = canvas.width / (containerRef.current?.offsetWidth || 600);
        const fontSize = text.fontSize * scaleFactor;

        ctx.font = `${fontSize}px ${text.fontFamily}`;
        ctx.fillStyle = text.color;
        ctx.textBaseline = 'middle';
        ctx.fillText(text.text, x, y);
      });

      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.download = `edited-${item.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to save image", err);
      alert("Could not save image due to browser security restrictions on this image source.");
    } finally {
      setIsSaving(false);
    }
  };

  const selectedText = texts.find(t => t.id === selectedTextId);

  // --- RENDERERS ---

  const renderSidebar = () => {
    if (isResume) {
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Personal Info</h4>
            <input 
              className="w-full p-2 border border-slate-200 rounded text-sm" 
              placeholder="Full Name" 
              value={resumeData.fullName} onChange={(e) => handleResumeChange('fullName', e.target.value)} 
            />
            <input 
              className="w-full p-2 border border-slate-200 rounded text-sm" 
              placeholder="Location" 
              value={resumeData.location} onChange={(e) => handleResumeChange('location', e.target.value)} 
            />
            <input 
              className="w-full p-2 border border-slate-200 rounded text-sm" 
              placeholder="Email" 
              value={resumeData.email} onChange={(e) => handleResumeChange('email', e.target.value)} 
            />
            <input 
              className="w-full p-2 border border-slate-200 rounded text-sm" 
              placeholder="Phone" 
              value={resumeData.phone} onChange={(e) => handleResumeChange('phone', e.target.value)} 
            />
             <input 
              className="w-full p-2 border border-slate-200 rounded text-sm" 
              placeholder="LinkedIn" 
              value={resumeData.linkedin} onChange={(e) => handleResumeChange('linkedin', e.target.value)} 
            />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Summary</h4>
             <textarea 
              className="w-full p-2 border border-slate-200 rounded text-sm h-24" 
              placeholder="Professional Summary" 
              value={resumeData.summary} onChange={(e) => handleResumeChange('summary', e.target.value)} 
            />
          </div>

          <div className="space-y-4">
             <div className="flex justify-between items-center">
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Experience</h4>
                 <button onClick={addExperience} className="text-violet-600 hover:bg-violet-50 p-1 rounded"><Plus size={16} /></button>
             </div>
             {resumeData.experience.map((exp, idx) => (
               <div key={exp.id} className="p-3 bg-slate-50 rounded border border-slate-200 space-y-2 relative group">
                  <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                  <input 
                    className="w-full p-1.5 border border-slate-200 rounded text-xs" 
                    placeholder="Role" 
                    value={exp.role} onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)} 
                  />
                  <input 
                    className="w-full p-1.5 border border-slate-200 rounded text-xs" 
                    placeholder="Company" 
                    value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} 
                  />
                   <input 
                    className="w-full p-1.5 border border-slate-200 rounded text-xs" 
                    placeholder="Duration" 
                    value={exp.duration} onChange={(e) => handleExperienceChange(exp.id, 'duration', e.target.value)} 
                  />
                  <textarea 
                    className="w-full p-1.5 border border-slate-200 rounded text-xs h-16" 
                    placeholder="Description (bullets)" 
                    value={exp.description} onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)} 
                  />
               </div>
             ))}
          </div>
        </div>
      );
    } else if (isBusinessCard) {
      return (
        <div className="space-y-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Card Details</h4>
           <input 
              className="w-full p-2 border border-slate-200 rounded text-sm" 
              placeholder="Full Name" 
              value={cardData.fullName} onChange={(e) => setCardData({...cardData, fullName: e.target.value})} 
            />
            <input 
              className="w-full p-2 border border-slate-200 rounded text-sm" 
              placeholder="Role Title" 
              value={cardData.role} onChange={(e) => setCardData({...cardData, role: e.target.value})} 
            />
            <input 
              className="w-full p-2 border border-slate-200 rounded text-sm" 
              placeholder="Company Name" 
              value={cardData.company} onChange={(e) => setCardData({...cardData, company: e.target.value})} 
            />
            <hr className="border-slate-100" />
            <input 
              className="w-full p-2 border border-slate-200 rounded text-sm" 
              placeholder="Email" 
              value={cardData.email} onChange={(e) => setCardData({...cardData, email: e.target.value})} 
            />
             <input 
              className="w-full p-2 border border-slate-200 rounded text-sm" 
              placeholder="Phone" 
              value={cardData.phone} onChange={(e) => setCardData({...cardData, phone: e.target.value})} 
            />
             <input 
              className="w-full p-2 border border-slate-200 rounded text-sm" 
              placeholder="Website" 
              value={cardData.website} onChange={(e) => setCardData({...cardData, website: e.target.value})} 
            />
             <input 
              className="w-full p-2 border border-slate-200 rounded text-sm" 
              placeholder="Location" 
              value={cardData.location} onChange={(e) => setCardData({...cardData, location: e.target.value})} 
            />
        </div>
      );
    } else {
      // Image Editor Sidebar
      return (
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Type className="w-3 h-3" /> Text
            </h4>
            <button 
              onClick={addText}
              className="w-full py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Text Layer
            </button>

            {selectedText && (
              <div className="mt-4 space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-100 animate-in slide-in-from-left-2">
                <input 
                  type="text" 
                  value={selectedText.text}
                  onChange={(e) => updateText(selectedText.id, { text: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-md text-sm focus:border-violet-500 focus:outline-none"
                />
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={selectedText.color}
                    onChange={(e) => updateText(selectedText.id, { color: e.target.value })}
                    className="flex-1 h-9 p-1 border border-slate-200 rounded-md cursor-pointer bg-white"
                  />
                  <input 
                    type="number" 
                    value={selectedText.fontSize}
                    onChange={(e) => updateText(selectedText.id, { fontSize: Number(e.target.value) })}
                    className="w-20 p-2 border border-slate-200 rounded-md text-sm"
                  />
                </div>
                <button 
                  onClick={() => removeText(selectedText.id)}
                  className="w-full py-1.5 text-red-500 text-xs font-semibold hover:bg-red-50 rounded-md transition-colors flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Remove Text
                </button>
              </div>
            )}
          </div>
          <hr className="border-slate-100" />
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ImageIcon className="w-3 h-3" /> Filters
            </h4>
            <div className="space-y-4">
               {/* Simplified Filter UI for brevity */}
               <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Brightness</span>
                  <span className="text-slate-400">{filters.brightness}%</span>
                </div>
                <input 
                  type="range" min="0" max="200" 
                  value={filters.brightness}
                  onChange={(e) => setFilters({...filters, brightness: Number(e.target.value)})}
                  className="w-full accent-violet-500 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            <button 
              onClick={() => setFilters({ brightness: 100, contrast: 100, grayscale: 0, sepia: 0 })}
              className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline decoration-dotted"
            >
              Reset Filters
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-slate-50 w-full rounded-2xl overflow-hidden">
      
      {/* Sidebar Controls (Hidden when printing) */}
      <div className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col h-full z-10 shadow-xl overflow-y-auto print:hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
             {isDocument ? <Layout className="w-4 h-4 text-violet-500" /> : <RotateCcw className="w-4 h-4 text-violet-500" />} 
             {isDocument ? 'Editor' : 'Image Editor'}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex-grow overflow-y-auto">
          {renderSidebar()}
        </div>

        <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
          {isDocument ? (
            <>
              <button 
                onClick={handlePrint}
                className="w-full py-3 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl shadow-sm hover:shadow hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print
              </button>
              <button 
                onClick={handleDownloadPdf}
                disabled={isDownloadingPdf}
                className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isDownloadingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving PDF...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" /> Download PDF
                  </>
                )}
              </button>
            </>
          ) : (
             <button 
                onClick={handleImageDownload}
                disabled={isSaving}
                className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSaving ? 'Saving...' : (
                  <>
                    <Download className="w-4 h-4" /> Download Design
                  </>
                )}
              </button>
          )}
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-grow flex items-center justify-center bg-slate-100/50 p-4 md:p-8 relative overflow-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] print:p-0 print:bg-white print:overflow-visible">
        
        {/* RESUME RENDERER */}
        {isResume && (
           <div id="printable-area" className="bg-white shadow-2xl w-[210mm] min-h-[297mm] p-[15mm] md:p-[20mm] text-slate-800 print:shadow-none print:w-full print:h-full box-border">
             {/* Header */}
             <header className="border-b-2 border-slate-800 pb-6 mb-6">
                <h1 className="text-4xl font-serif font-bold tracking-tight text-slate-900 uppercase mb-4">{resumeData.fullName}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-medium">
                   {resumeData.location && <span className="flex items-center gap-1.5"><MapPin size={14} /> {resumeData.location}</span>}
                   {resumeData.email && <span className="flex items-center gap-1.5"><Mail size={14} /> {resumeData.email}</span>}
                   {resumeData.phone && <span className="flex items-center gap-1.5"><Phone size={14} /> {resumeData.phone}</span>}
                   {resumeData.linkedin && <span className="flex items-center gap-1.5"><Linkedin size={14} /> {resumeData.linkedin}</span>}
                   {resumeData.website && <span className="flex items-center gap-1.5"><Globe size={14} /> {resumeData.website}</span>}
                </div>
             </header>

             {/* Summary */}
             <section className="mb-6">
               <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Summary</h3>
               <p className="text-sm leading-relaxed text-slate-700">{resumeData.summary}</p>
             </section>

             {/* Skills */}
             <section className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, i) => (
                    <span key={i} className="text-sm font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                      • {skill}
                    </span>
                  ))}
                </div>
             </section>

             {/* Experience */}
             <section className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Experience</h3>
                <div className="space-y-5">
                   {resumeData.experience.map(exp => (
                     <div key={exp.id}>
                        <div className="flex justify-between items-baseline mb-1">
                           <h4 className="font-bold text-slate-900 text-lg">{exp.role}</h4>
                           <span className="text-sm font-medium text-slate-500">{exp.duration}</span>
                        </div>
                        <div className="text-sm font-semibold text-slate-600 mb-2">{exp.company}</div>
                        <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">{exp.description}</p>
                     </div>
                   ))}
                </div>
             </section>

             {/* Education */}
             <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Education</h3>
                <div className="space-y-4">
                   {resumeData.education.map(edu => (
                     <div key={edu.id}>
                        <div className="flex justify-between items-baseline mb-1">
                           <h4 className="font-bold text-slate-900">{edu.degree}</h4>
                           <span className="text-sm font-medium text-slate-500">{edu.year}</span>
                        </div>
                        <div className="text-sm text-slate-600">{edu.school}</div>
                     </div>
                   ))}
                </div>
             </section>
           </div>
        )}

        {/* BUSINESS CARD RENDERER */}
        {isBusinessCard && (
           <div className="flex flex-col gap-8 items-center justify-center min-h-[50vh]">
              {/* Card Preview Container - Centered */}
              <div id="printable-area" className="w-[3.5in] h-[2in] bg-white shadow-2xl relative overflow-hidden print:shadow-none flex flex-col justify-between p-6 border border-slate-100 print:border-none">
                 {/* Decorative element */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900 transform translate-x-10 -translate-y-10 rotate-45"></div>
                 
                 <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight uppercase">{cardData.fullName}</h2>
                    <p className="text-sm font-medium text-violet-600 uppercase tracking-wider mt-1">{cardData.role}</p>
                 </div>

                 <div className="text-[10px] text-slate-600 space-y-1.5 font-medium relative z-10">
                    <div className="flex items-center gap-2"><Mail size={10} className="text-slate-400" /> {cardData.email}</div>
                    <div className="flex items-center gap-2"><Phone size={10} className="text-slate-400" /> {cardData.phone}</div>
                    <div className="flex items-center gap-2"><Globe size={10} className="text-slate-400" /> {cardData.website}</div>
                    <div className="flex items-center gap-2"><MapPin size={10} className="text-slate-400" /> {cardData.location}</div>
                 </div>

                 <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-200 uppercase tracking-widest">
                    {cardData.company}
                 </div>
              </div>
              <p className="text-xs text-slate-400 print:hidden">Preview (3.5" x 2")</p>
           </div>
        )}

        {/* IMAGE RENDERER (Fallback) */}
        {!isDocument && (
          <div 
            ref={containerRef}
            className="relative shadow-2xl shadow-slate-300 ring-1 ring-slate-200 max-w-full max-h-full"
            style={{ width: 'fit-content' }}
            onClick={() => setSelectedTextId(null)}
          >
            <img 
              ref={imageRef}
              src={item.imageUrl} 
              alt="Template Preview"
              crossOrigin="anonymous"
              className="max-w-full max-h-[80vh] object-contain block select-none"
              style={{
                filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) grayscale(${filters.grayscale}%) sepia(${filters.sepia}%)`
              }}
              draggable={false}
            />

            {texts.map(text => (
              <div
                key={text.id}
                className={`absolute cursor-move select-none whitespace-nowrap p-1 border-2 transition-all group ${
                  selectedTextId === text.id ? 'border-violet-500 bg-violet-500/10' : 'border-transparent hover:border-violet-200'
                }`}
                style={{
                  left: `${text.x}%`,
                  top: `${text.y}%`,
                  color: text.color,
                  fontSize: `${text.fontSize}px`,
                  fontFamily: text.fontFamily,
                  transform: 'translate(0, -50%)',
                }}
                onMouseDown={(e) => handleMouseDown(e, text.id)}
              >
                {text.text}
                {selectedTextId === text.id && (
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-white rounded-full shadow border border-slate-200 flex items-center justify-center cursor-pointer hover:text-red-500"
                       onClick={(e) => { e.stopPropagation(); removeText(text.id); }}>
                    <X className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};