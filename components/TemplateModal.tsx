import React, { useState } from 'react';
import { X, Wand2, Download, Copy, Check, Image as ImageIcon } from 'lucide-react';
import { TemplateItem, Category } from '../types';
import { generateTemplateContent } from '../services/geminiService';

interface TemplateModalProps {
  item: TemplateItem;
  onClose: () => void;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({ item, onClose }) => {
  const [aiContext, setAiContext] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const isPhoto = item.category === Category.PROFESSIONAL_PHOTO;

  const handleGenerate = async () => {
    if (!aiContext.trim()) return;
    setIsLoading(true);
    const result = await generateTemplateContent(item.category, aiContext);
    setAiResult(result);
    setIsLoading(false);
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

          <div className="flex flex-wrap gap-2 mb-8">
            {item.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-violet-50 text-violet-700 border border-violet-100 text-xs font-semibold rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <button className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl mb-6 font-bold hover:scale-[1.02] active:scale-95">
            <Download className="w-4 h-4" />
            Download {isPhoto ? 'High Res Photo' : 'Template'}
          </button>

          {/* AI Section */}
          <div className="border-t border-slate-100 pt-6 mt-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg text-white">
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
                className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:shadow-lg hover:opacity-90 transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2"
              >
                {isLoading ? 'Generating Magic...' : 'Generate Suggestion'}
              </button>
            </div>

            {aiResult && (
              <div className="mt-4 bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 border border-slate-200 relative group shadow-inner">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 font-medium font-sans">{aiResult}</pre>
                <button 
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-1.5 bg-white border border-slate-200 rounded-lg shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-50"
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