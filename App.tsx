import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, Zap, Sparkles, User, LogOut, Menu, X, Filter, ChevronRight } from 'lucide-react';
import { TEMPLATE_DATA, CATEGORIES, STYLES } from './constants';
import { Category, TemplateItem } from './types';
import { TemplateModal } from './components/TemplateModal';
import { LoginPage } from './components/LoginPage';

type View = 'home' | 'login';

// Reusable Card Component for Grid
const TemplateCard: React.FC<{ item: TemplateItem; onClick: (item: TemplateItem) => void }> = ({ item, onClick }) => (
  <div 
    className="group relative bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-white transition-all duration-500 cursor-pointer flex flex-col h-full hover:-translate-y-1"
    onClick={() => onClick(item)}
  >
    {/* Image Container */}
    <div className="relative aspect-[4/5] overflow-hidden m-2 rounded-xl bg-slate-100">
      <img 
        src={item.imageUrl} 
        alt={item.title} 
        loading="lazy"
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
      {/* Hover Overlay */}
      <div className="hidden sm:flex absolute inset-0 bg-gradient-to-t from-violet-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col justify-end p-4">
        <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-center py-2 rounded-lg text-sm font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          View Details
        </span>
      </div>
      {item.category !== Category.PROFESSIONAL_PHOTO && (
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-amber-500 p-1.5 rounded-full shadow-lg">
            <Zap size={14} fill="currentColor" />
        </div>
      )}
      {item.category === Category.PROFESSIONAL_PHOTO && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-violet-500 p-1.5 rounded-full shadow-lg">
            <Sparkles size={14} fill="currentColor" />
          </div>
      )}
    </div>
    
    <div className="p-4 pt-2 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] uppercase font-bold tracking-wider text-fuchsia-600 bg-fuchsia-50 px-2 py-1 rounded-md border border-fuchsia-100">
          {item.category}
        </span>
      </div>
      <h3 className="font-bold text-slate-800 mb-1 leading-snug group-hover:text-violet-600 transition-colors">
        {item.title}
      </h3>
      <p className="text-xs font-medium text-slate-500 line-clamp-2 mb-4 flex-grow">
        {item.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {item.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-[10px] font-semibold text-slate-500 bg-white/50 px-2 py-1 rounded-md border border-white/60">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [selectedStyle, setSelectedStyle] = useState<string>('All Styles');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<TemplateItem | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter Logic
  const filteredItems = useMemo(() => {
    return TEMPLATE_DATA.filter(item => {
      // 1. Category Match
      const matchesCategory = selectedCategory === Category.ALL || item.category === selectedCategory;
      
      // 2. Search Match
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // 3. Style Match
      const matchesStyle = selectedStyle === 'All Styles' || 
                           item.tags.includes(selectedStyle.toLowerCase());

      return matchesCategory && matchesSearch && matchesStyle;
    });
  }, [selectedCategory, searchQuery, selectedStyle]);

  // Determine if we should show the sectioned view
  const showSectionedView = selectedCategory === Category.ALL && !searchQuery && selectedStyle === 'All Styles';

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
  };

  if (currentView === 'login') {
    return (
      <>
        {/* Background Blobs for Login too */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
           <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
           <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
        <LoginPage onLogin={handleLogin} onBack={() => setCurrentView('home')} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      
      {/* Background Decorative Blobs */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-white/60 backdrop-blur-xl border-b border-white/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
              <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                <LayoutGrid size={20} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-fuchsia-600 tracking-tight">ProCraft</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-violet-600 transition-colors">Templates</a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-violet-600 transition-colors">Pricing</a>
              
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                      JD
                    </div>
                    <span className="text-sm font-bold text-slate-700">John Doe</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setCurrentView('login')}
                  className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-800 transition-all hover:scale-105 shadow-lg"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-violet-600 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-white/50 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5 z-40">
            <a href="#" className="text-base font-semibold text-slate-600 hover:text-violet-600 p-2 rounded-lg hover:bg-slate-50 transition-colors">Templates</a>
            <a href="#" className="text-base font-semibold text-slate-600 hover:text-violet-600 p-2 rounded-lg hover:bg-slate-50 transition-colors">Pricing</a>
            
            <div className="h-px bg-slate-200 my-1"></div>
            
            {isLoggedIn ? (
              <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3 p-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                      JD
                    </div>
                    <span className="text-sm font-bold text-slate-700">John Doe</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-slate-600 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCurrentView('login');
                }}
                className="w-full bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg text-center"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/60 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-xs sm:text-sm font-semibold text-slate-700">New AI Image Prompts Available</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 md:mb-8 tracking-tight leading-[1.15] md:leading-tight">
            Craft your future with <br className="hidden md:block"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 animate-gradient-x block md:inline mt-2 md:mt-0">
              vibrant designs.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8 md:mb-12 font-medium px-2">
            Premium templates for resumes, business cards, and social media. 
            Powered by colorful creativity and smart AI assistance.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group px-2">
            <div className="absolute inset-y-0 left-2 md:left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-indigo-400 group-focus-within:text-fuchsia-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-xl border-2 border-white/50 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-violet-200 focus:border-violet-300 transition-all shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-100/60 text-sm sm:text-base"
              placeholder="Search templates (e.g. 'Modern Resume', 'Instagram')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
        
        {/* Category Tabs */}
        <div className="flex flex-col items-center gap-6 mb-10">
            {/* Main Categories */}
            <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar justify-start md:justify-center px-1 w-full md:w-auto">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => { setSelectedCategory(category); setSelectedStyle('All Styles'); }}
                  className={`
                    whitespace-nowrap px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300
                    ${selectedCategory === category 
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/30 scale-105' 
                      : 'bg-white/60 text-slate-600 hover:bg-white hover:text-violet-600 shadow-sm border border-transparent hover:border-violet-100'}
                  `}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Style Filters (Secondary) */}
            <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto justify-start md:justify-center px-1 pb-2 no-scrollbar">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                   <Filter size={12} /> Styles:
                </span>
                {STYLES.map(style => (
                   <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`
                      whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border
                      ${selectedStyle === style 
                        ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
                        : 'bg-transparent text-slate-500 border-slate-200 hover:border-violet-300 hover:text-violet-600 hover:bg-white'}
                    `}
                   >
                     {style}
                   </button>
                ))}
            </div>
        </div>

        {/* SECTIONED VIEW (Default Home) */}
        {showSectionedView ? (
          <div className="space-y-16 animate-in slide-in-from-bottom-4 duration-700">
            
            {/* Resume Section */}
            <section>
              <div className="flex justify-between items-center mb-6 px-2 border-l-4 border-violet-500 pl-4">
                <h2 className="text-2xl font-bold text-slate-800">Resume Templates</h2>
                <button 
                  onClick={() => setSelectedCategory(Category.RESUME)}
                  className="text-sm font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1 group"
                >
                  View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {TEMPLATE_DATA.filter(t => t.category === Category.RESUME).slice(0, 4).map(item => (
                  <TemplateCard key={item.id} item={item} onClick={setSelectedItem} />
                ))}
              </div>
            </section>

            {/* Business Card Section */}
            <section>
              <div className="flex justify-between items-center mb-6 px-2 border-l-4 border-fuchsia-500 pl-4">
                 <h2 className="text-2xl font-bold text-slate-800">Business Card Templates</h2>
                 <button 
                  onClick={() => setSelectedCategory(Category.BUSINESS_CARD)}
                  className="text-sm font-bold text-fuchsia-600 hover:text-fuchsia-700 flex items-center gap-1 group"
                >
                  View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                 {TEMPLATE_DATA.filter(t => t.category === Category.BUSINESS_CARD).slice(0, 4).map(item => (
                  <TemplateCard key={item.id} item={item} onClick={setSelectedItem} />
                ))}
              </div>
            </section>

             {/* Social Media Section */}
             <section>
              <div className="flex justify-between items-center mb-6 px-2 border-l-4 border-amber-500 pl-4">
                 <h2 className="text-2xl font-bold text-slate-800">Social Media Templates</h2>
                 <button 
                  onClick={() => setSelectedCategory(Category.SOCIAL_MEDIA)}
                  className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 group"
                >
                  View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                 {TEMPLATE_DATA.filter(t => t.category === Category.SOCIAL_MEDIA).slice(0, 4).map(item => (
                  <TemplateCard key={item.id} item={item} onClick={setSelectedItem} />
                ))}
              </div>
            </section>

            {/* Professional Photos Section */}
            <section>
              <div className="flex justify-between items-center mb-6 px-2 border-l-4 border-indigo-500 pl-4">
                 <h2 className="text-2xl font-bold text-slate-800">Professional Photos</h2>
                 <button 
                  onClick={() => setSelectedCategory(Category.PROFESSIONAL_PHOTO)}
                  className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
                >
                  View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                 {TEMPLATE_DATA.filter(t => t.category === Category.PROFESSIONAL_PHOTO).slice(0, 4).map(item => (
                  <TemplateCard key={item.id} item={item} onClick={setSelectedItem} />
                ))}
              </div>
            </section>

          </div>
        ) : (
          /* UNIFIED GRID VIEW (Filtered) */
          <>
            <div className="flex justify-between items-center mb-6 px-2">
              <div className="flex flex-col md:flex-row md:items-baseline gap-2">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                    {selectedCategory === Category.ALL ? 'Template Library' : selectedCategory}
                </h2>
                {selectedStyle !== 'All Styles' && (
                    <span className="text-sm font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md border border-violet-100">
                        {selectedStyle}
                    </span>
                )}
              </div>
              <span className="text-xs md:text-sm font-medium px-3 py-1 bg-white/50 rounded-full text-slate-500 border border-white/50 shadow-sm">
                {filteredItems.length} results
              </span>
            </div>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 animate-in fade-in zoom-in-95 duration-500">
                {filteredItems.map(item => (
                  <TemplateCard key={item.id} item={item} onClick={setSelectedItem} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border-2 border-dashed border-white/60">
                <div className="w-16 h-16 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">No templates found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your style or category filter.</p>
                <button 
                    onClick={() => {setSearchQuery(''); setSelectedCategory(Category.ALL); setSelectedStyle('All Styles');}}
                    className="px-6 py-2 bg-white text-violet-600 font-bold rounded-full shadow-sm hover:shadow-md transition-all border border-violet-100"
                >
                    Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/40 backdrop-blur-md border-t border-white/40 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-slate-600 text-sm font-medium">© 2024 ProCraft. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-slate-500 hover:text-violet-600 transition-colors text-sm font-semibold">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-violet-600 transition-colors text-sm font-semibold">Terms</a>
            <a href="#" className="text-slate-500 hover:text-violet-600 transition-colors text-sm font-semibold">Support</a>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {selectedItem && (
        <TemplateModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
};

export default App;