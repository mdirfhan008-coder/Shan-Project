import React, { useState } from 'react';
import { X, Wand2, Download, Copy, Check, Image as ImageIcon, Loader2, Edit3, Phone, Mail, Globe, MapPin, Linkedin } from 'lucide-react';
import { TemplateItem, Category } from '../types';
import { generateTemplateContent } from '../services/geminiService';
import { TemplateEditor } from './TemplateEditor';

interface TemplateModalProps {
  item: TemplateItem;
  onClose: () => void;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({ item, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [aiContext, setAiContext] = useState('');
  const [aiResult, setAiResult] = useState('');
  // Fix: Correct typo in setter name from setIsisLoading to setIsLoading
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const isPhoto = item.category === Category.PROFESSIONAL_PHOTO;
  const isResume = item.category === Category.RESUME;

  // If in edit mode, render the editor instead
  if (isEditing) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-indigo-900/30 backdrop-blur-sm">
        <div className="bg-white w-full h-full md:rounded-2xl md:h-[90vh] md:w-[95vw] max-w-7xl overflow-hidden shadow-2xl relative">
          <TemplateEditor 
            item={item} 
            onClose={() => setIsEditing(false)} 
          />
        </div>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!aiContext.trim()) return;
    
    setIsLoading(true);
    setAiResult(''); // Clear previous result
    
    try {
      const result = await generateTemplateContent(item.category, aiContext);
      setAiResult(result);
    } catch (e) {
      setAiResult("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Fetch the image as a blob to force download
      const response = await fetch(item.imageUrl);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Create a sanitized filename
      const filename = `${item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback behavior: open in new tab
      window.open(item.imageUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-900/20 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-indigo-500/20 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row border border-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden group flex-shrink-0">
           {/* Decorative background circle */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-violet-100 to-fuchsia-100 rounded-full opacity-50 blur-2xl"></div>
           
           <img 
             src={item.imageUrl} 
             alt={item.title} 
             className="relative z-10 w-full h-full object-contain md:max-h-[60vh] shadow-lg rounded-lg transform md:group-hover:scale-105 transition-transform duration-500"
           />
           <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur border border-white/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-500 shadow-sm">
             {item.dimensions}
           </div>
           
           {/* Mobile Close Button - visible on top of image */}
           <button 
             onClick={onClose} 
             className="md:hidden absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-slate-500 shadow-md z-30"
           >
              <X className="w-5 h-5" />
           </button>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 flex flex-col p-6 md:p-8 overflow-y-auto bg-white/50">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-1">{item.title}</h2>
              <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">
                {item.category}
              </p>
            </div>
            {/* Desktop Close Button */}
            <button onClick={onClose} className="hidden md:block p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-slate-600 mb-6 leading-relaxed font-medium text-sm md:text-base">
            {item.description}
          </p>

          {/* Resume Structure Preview */}
          {isResume && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 shadow-sm ring-1 ring-slate-100">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                   Template Structure
                </h3>
                <div className="font-serif text-slate-800 bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                    <div className="border-b border-slate-100 pb-3 mb-3">
                        <div className="text-lg font-bold text-slate-900 tracking-tight">YOUR NAME</div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500 mt-1.5 items-center font-sans">
                            <span className="flex items-center gap-1"><MapPin size={10} /> City, Country</span>
                            <span className="flex items-center gap-1"><Mail size={10} /> email@example.com</span>
                            <span className="flex items-center gap-1"><Phone size={10} /> (555) 123-4567</span>
                            <span className="flex items-center gap-1"><Linkedin size={10} /> linkedin.com/in/you</span>
                        </div>
                    </div>
                    
                    <div className="grid gap-3 font-sans">
                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Summary</div>
                            <p className="text-[10px] text-slate-600 leading-relaxed">
                                Short 2–3 line professional summary highlighting your role and strengths.
                            </p>
                        </div>

                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Skills</div>
                            <p className="text-[10px] text-slate-600 font-medium">
                                • Skill 1 • Skill 2 • Skill 3 • Skill 4
                            </p>
                        </div>

                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Experience</div>
                            <div className="space-y-2">
                                <div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-[11px] font-bold text-slate-800">Job Title – Company</span>
                                        <span className="text-[9px] text-slate-400">Month Year – Month Year</span>
                                    </div>
                                    <ul className="text-[10px] text-slate-600 list-disc list-outside ml-3 mt-0.5 space-y-0.5">
                                        <li>Achievement/result-focused bullet</li>
                                        <li>Action + metric (e.g., Increased sales by 25%)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Education</div>
                            <div className="flex justify-between items-baseline">
                                <span className="text-[11px] font-bold text-slate-800">Degree – Institution</span>
                                <span className="text-[9px] text-slate-400">Year</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-8">
            {item.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-violet-50 text-violet-700 border border-violet-100 text-xs font-semibold rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Buttons Row */}
          <div className="flex gap-3 mb-6">
            <button 
                onClick={() => setIsEditing(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-3.5 rounded-xl hover:bg-slate-50 hover:border-violet-200 hover:text-violet-600 transition-all shadow-sm font-bold group"
            >
                <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Customize
            </button>
            
            <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-[2] flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl font-bold hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isDownloading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Downloading...
                </>
                ) : (
                <>
                    <Download className="w-4 h-4" />
                    Download
                </>
                )}
            </button>
          </div>

          {/* AI Section */}
          <div className="border-t border-slate-100 pt-6 mt-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className={`p-1.5 rounded-lg text-white ${isPhoto ? 'bg-gradient-to-br from-indigo-500 to-purple-500' : 'bg-gradient-to-br from-fuchsia-500 to-pink-500'}`}>
                  {isPhoto ? <ImageIcon className="w-4 h-4" /> : <Wand2 className="w-4 h-4" />}
              </div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base">
                {isPhoto ? 'AI Image Prompt Generator' : 'AI Content Assistant'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-3 font-medium">
              {isPhoto 
                ? "Describe the photo you want, and I'll generate a professional prompt for DALL-E or Midjourney."
                : `Need help writing content for this ${item.category.toLowerCase()}? Describe your role or need below.`
              }
            </p>
            
            <div className="space-y-3">
              <textarea 
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:outline-none resize-none placeholder-slate-400 shadow-sm transition-all"
                rows={3}
                placeholder={isPhoto 
                  ? 'E.g., "A futuristic office with neon lights..."' 
                  : 'E.g., "Software engineer with 5 years experience..."'
                }
                value={aiContext}
                onChange={(e) => setAiContext(e.target.value)}
              />
              <button 
                onClick={handleGenerate}
                disabled={isLoading || !aiContext}
                className={`w-full py-2.5 text-white font-bold rounded-xl hover:shadow-lg hover:opacity-90 transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2 ${
                  isPhoto 
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600' 
                    : 'bg-gradient-to-r from-violet-600 to-fuchsia-600'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate Suggestion
                  </>
                )}
              </button>
            </div>

            {aiResult && (
              <div className="mt-4 bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 border border-slate-200 relative group shadow-inner animate-in fade-in slide-in-from-bottom-2">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 font-medium font-sans">{aiResult}</pre>
                <button 
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-1.5 bg-white border border-slate-200 rounded-lg shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-50"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-slate-400" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};