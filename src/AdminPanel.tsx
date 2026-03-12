import React, { useState, useEffect } from 'react';
import { LogOut, Plus, Edit2, Trash2, Lock, AlertCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase, type Work } from './lib/supabase';

export default function AdminPanel() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isSupabaseConfigured = !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchWorks();
    } else {
      setLoading(false);
    }
  }, [isSupabaseConfigured]);

  const fetchWorks = async () => {
    try {
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setWorks(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (work: Work) => {
    setEditingWork(work);
    setIsEditing(true);
  };

  const handleAddNew = (groupName: string) => {
    setEditingWork({ group_name: groupName } as Work);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this work?')) return;
    try {
      const { error } = await supabase.from('works').delete().eq('id', id);
      if (error) throw error;
      fetchWorks();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (isEditing) {
    return <EditWork work={editingWork} onClose={() => { setIsEditing(false); setEditingWork(null); fetchWorks(); }} />;
  }

  // Group works by group_name
  const groupedWorks = works.reduce((acc, work) => {
    if (!acc[work.group_name]) acc[work.group_name] = [];
    acc[work.group_name].push(work);
    return acc;
  }, {} as Record<string, Work[]>);

  return (
    <div className="min-h-screen bg-white text-redd-dark font-sans pb-24">
      {/* Main Site Header (Admin Mode) */}
      <nav className="w-full flex justify-between items-center px-6 md:px-12 py-6 border-b border-gray-100">
        <div className="flex flex-col">
          <div className="text-xl font-bold tracking-tight uppercase">LORENZO PACI</div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-gray-400">CREATIVE VISIONARY</div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
          <Link to="/" className="hover:text-black transition-colors">ALL WORKS</Link>
          <Link to="/" className="hover:text-black transition-colors">GRAPHIC</Link>
          <Link to="/" className="hover:text-black transition-colors">PHOTO</Link>
          <Link to="/" className="hover:text-black transition-colors">PROJECTS</Link>
          <Link to="/" className="hover:text-black transition-colors">BIO</Link>
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
            <Lock size={14} /> ADMIN PANEL
          </button>
        </div>
      </nav>

      {/* Admin Dashboard Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-8 flex justify-between items-end border-b border-gray-200">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-bold mb-2">MANAGEMENT</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Admin Dashboard</h1>
        </div>
        <button onClick={() => navigate('/')} className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
          <LogOut size={14} /> LOGOUT
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        {!isSupabaseConfigured && (
          <div className="mb-12 bg-yellow-50 border border-yellow-200 text-yellow-800 p-6 rounded-2xl flex items-start gap-4">
            <AlertCircle className="shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">Supabase non configurato</h3>
              <p className="text-sm mb-4">
                Per rendere funzionante questo pannello, devi collegarlo al tuo database Supabase.
              </p>
              <ol className="list-decimal list-inside text-sm space-y-2 mb-4">
                <li>Vai su Supabase e crea un nuovo progetto.</li>
                <li>Esegui lo script SQL fornito nell'editor SQL di Supabase per creare le tabelle.</li>
                <li>Copia <code>Project URL</code> e <code>anon key</code> dalle impostazioni API di Supabase.</li>
                <li>Aggiungili come variabili d'ambiente <code>VITE_SUPABASE_URL</code> e <code>VITE_SUPABASE_ANON_KEY</code>.</li>
              </ol>
            </div>
          </div>
        )}

        {/* GALLERIE Section */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-tighter mb-8">GALLERIE</h2>
          
          <div className="border border-gray-200 rounded-[2rem] p-8 md:p-12">
            {['galleria 3', 'galleria 2', 'galleria 1'].map((galleryName) => (
              <div key={galleryName} className="mb-16 last:mb-0">
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-2xl font-bold">{galleryName}</h3>
                  <button className="bg-black text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                    Rinomina Galleria
                  </button>
                  <button 
                    onClick={() => handleAddNew(galleryName)}
                    className="bg-black text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <Plus size={14} /> Add New Work
                  </button>
                  <button className="ml-2">
                    <Plus size={24} className="text-black" />
                  </button>
                </div>

                {groupedWorks[galleryName] && groupedWorks[galleryName].length > 0 ? (
                  <div className="w-full">
                    <div className="grid grid-cols-12 gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">
                      <div className="col-span-2">Preview</div>
                      <div className="col-span-3">Title</div>
                      <div className="col-span-3">Category</div>
                      <div className="col-span-2">Featured</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {groupedWorks[galleryName].map((work) => (
                        <WorkRow 
                          key={work.id}
                          title={work.title} 
                          category={work.category} 
                          image={work.cover_image_url || "https://picsum.photos/seed/placeholder/100/100"} 
                          onEdit={() => handleEdit(work)} 
                          onDelete={() => handleDelete(work.id)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400 italic px-4">Nessun lavoro in questa galleria.</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SEZIONI Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-tighter mb-8">SEZIONI</h2>
          
          <div className="border border-gray-200 rounded-[2rem] p-8 md:p-12">
            {['sezione 1', 'sezione 2', 'sezione 3'].map((sectionName) => (
              <div key={sectionName} className="mb-12 last:mb-0">
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-2xl font-bold">{sectionName}</h3>
                  <button className="bg-black text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                    Rinomina Galleria
                  </button>
                  <button 
                    onClick={() => handleAddNew(sectionName)}
                    className="bg-black text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <Plus size={14} /> Add New Work
                  </button>
                </div>

                {groupedWorks[sectionName] && groupedWorks[sectionName].length > 0 ? (
                  <div className="w-full mb-8">
                    <div className="grid grid-cols-12 gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">
                      <div className="col-span-2">Preview</div>
                      <div className="col-span-3">Title</div>
                      <div className="col-span-3">Category</div>
                      <div className="col-span-2">Featured</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {groupedWorks[sectionName].map((work) => (
                        <WorkRow 
                          key={work.id}
                          title={work.title} 
                          category={work.category} 
                          image={work.cover_image_url || "https://picsum.photos/seed/placeholder/100/100"} 
                          onEdit={() => handleEdit(work)} 
                          onDelete={() => handleDelete(work.id)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400 italic px-4 mb-8">Nessun lavoro in questa sezione.</div>
                )}

                {/* Colonne (Only for Sezione 2 as an example, or you can make it dynamic) */}
                {sectionName === 'sezione 2' && (
                  <div className="flex flex-col gap-4 pl-4 border-l-2 border-gray-100 ml-4">
                    {[1, 2, 3, 4].map(col => (
                      <div key={col} className="flex items-center gap-4">
                        <h4 className="text-xl font-bold w-24">colonna {col}</h4>
                        <button 
                          onClick={() => handleAddNew(`${sectionName} - colonna ${col}`)}
                          className="bg-black text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                        >
                          Modifica
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function WorkRow({ title, category, image, onEdit, onDelete }: { title: string, category: string, image: string, onEdit: () => void, onDelete: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-4 items-center py-2 px-4 hover:bg-gray-50 rounded-xl transition-colors group">
      <div className="col-span-2">
        <img src={image} alt={title} className="w-12 h-12 rounded-lg object-cover" />
      </div>
      <div className="col-span-3 font-bold">{title}</div>
      <div className="col-span-3">
        <span className="bg-gray-100 text-gray-600 text-[10px] uppercase tracking-widest px-2 py-1 rounded font-bold">
          {category}
        </span>
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onEdit} className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800">
          <Edit2 size={14} />
        </button>
        <button onClick={onDelete} className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-100 hover:text-red-600 hover:border-red-200 transition-colors">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

function EditWork({ work, onClose }: { work: Work | null, onClose: () => void }) {
  const [formData, setFormData] = useState<Partial<Work>>(work || {});
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (work?.id) {
        const { error } = await supabase.from('works').update(formData).eq('id', work.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('works').insert([formData]);
        if (error) throw error;
      }
      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-redd-dark font-sans pb-24">
      {/* Main Site Header (Admin Mode) */}
      <nav className="w-full flex justify-between items-center px-6 md:px-12 py-6 border-b border-gray-100">
        <div className="flex flex-col">
          <div className="text-xl font-bold tracking-tight uppercase">LORENZO PACI</div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-gray-400">CREATIVE VISIONARY</div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
          <Link to="/" className="hover:text-black transition-colors">ALL WORKS</Link>
          <Link to="/" className="hover:text-black transition-colors">GRAPHIC</Link>
          <Link to="/" className="hover:text-black transition-colors">PHOTO</Link>
          <Link to="/" className="hover:text-black transition-colors">PROJECTS</Link>
          <Link to="/" className="hover:text-black transition-colors">BIO</Link>
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
            <Lock size={14} /> ADMIN PANEL
          </button>
        </div>
      </nav>

      {/* Admin Dashboard Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-8 flex justify-between items-end border-b border-gray-200">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-bold mb-2">MANAGEMENT</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{work?.id ? 'Edit Work' : 'Add New Work'}</h1>
        </div>
        <button onClick={onClose} className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
          <LogOut size={14} /> BACK
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 mt-16">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl font-bold mb-8">{work?.id ? 'Edit Work' : 'Add New Work'} - {formData.group_name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Title</label>
                <input type="text" name="title" value={formData.title || ''} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Category</label>
                <select name="category" value={formData.category || 'PROJECTS'} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors appearance-none bg-white">
                  <option value="PROJECTS">Projects</option>
                  <option value="GRAPHIC">Graphic</option>
                  <option value="PHOTO">Photo</option>
                </select>
              </div>

              <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" name="is_featured" checked={formData.is_featured || false} onChange={handleChange} className="w-4 h-4 accent-black" />
                <span className="text-sm font-bold uppercase tracking-widest">Metti in evidenza nella home page</span>
              </label>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Cover Image URL</label>
                <input type="text" name="cover_image_url" value={formData.cover_image_url || ''} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Cover Image Caption (Lightbox Only)</label>
                <input type="text" name="cover_image_caption" value={formData.cover_image_caption || ''} onChange={handleChange} placeholder="Caption for the first image in lightbox..." className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="link_label" value={formData.link_label || ''} onChange={handleChange} placeholder="Link Label (Optional)" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors" />
                <input type="text" name="link_url" value={formData.link_url || ''} onChange={handleChange} placeholder="Link URL (Optional)" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Gallery Items</label>
                  <button className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800">
                    <Plus size={14} />
                  </button>
                </div>
                <div className="border border-dashed border-gray-300 rounded-xl p-8 flex justify-center items-center text-gray-400 text-sm hover:bg-gray-50 transition-colors cursor-pointer">
                  + Add first gallery item (Coming Soon)
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description (Top)</label>
                <textarea name="description_top" value={formData.description_top || ''} onChange={handleChange} rows={5} placeholder="Main description..." className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none"></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description (Bottom - Optional)</label>
                <textarea name="description_bottom" value={formData.description_bottom || ''} onChange={handleChange} rows={5} placeholder="Secondary description under gallery..." className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none"></textarea>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">External Links</label>
                  <button className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800">
                    <Plus size={14} />
                  </button>
                </div>
                <div className="border border-dashed border-gray-300 rounded-xl p-8 flex justify-center items-center text-gray-400 text-sm hover:bg-gray-50 transition-colors cursor-pointer">
                  + Add first link (Coming Soon)
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center gap-4 mt-12 pt-8 border-t border-gray-100">
            <button onClick={onClose} className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving} className="bg-black text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50">
              <Edit2 size={16} /> {saving ? 'Saving...' : (work?.id ? 'Update Work' : 'Create Work')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
