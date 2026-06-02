import { useState, useEffect } from 'react';

export default function GalleryManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', image_url: '', tags: '' });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery?status=all');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void fetchItems(); }, []);

  const handlePublish = async (id, next) => {
    await fetch('/api/gallery', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, is_published: next }) });
    await fetchItems();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this gallery item?')) return;
    await fetch('/api/gallery', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    await fetchItems();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const payload = { ...form, tags: form.tags ? form.tags.split(',').map(s=>s.trim()) : [] };
    await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setForm({ title: '', description: '', image_url: '', tags: '' });
    await fetchItems();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Gallery</h3>

      <form onSubmit={handleAdd} className="space-y-2">
        <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} placeholder="Title" className="w-full p-2 border" />
        <input value={form.image_url} onChange={(e)=>setForm({...form,image_url:e.target.value})} placeholder="Image URL" className="w-full p-2 border" />
        <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} placeholder="Description" className="w-full p-2 border" />
        <input value={form.tags} onChange={(e)=>setForm({...form,tags:e.target.value})} placeholder="Tags comma separated" className="w-full p-2 border" />
        <div>
          <button type="submit" className="px-3 py-2 bg-black text-white rounded">Add Gallery Item</button>
        </div>
      </form>

      <div>
        {loading ? <p>Loading…</p> : (
          <ul className="grid grid-cols-1 gap-4">
            {items.map(item => (
              <li key={item.id} className="p-3 bg-white border rounded flex justify-between items-start">
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                  <div className="text-xs text-gray-500 mt-1">Published: {String(item.is_published)}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={()=>handlePublish(item.id, !item.is_published)} className="px-2 py-1 bg-green-500 text-white rounded">{item.is_published ? 'Unpublish' : 'Publish'}</button>
                  <button onClick={()=>handleDelete(item.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
