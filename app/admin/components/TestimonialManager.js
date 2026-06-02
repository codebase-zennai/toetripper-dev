import { useState, useEffect } from 'react';

export default function TestimonialManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', destination: '', rating: 5, message: '', image_url: '' });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/testimonials?status=all');
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
    await fetch('/api/testimonials', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, is_published: next }) });
    await fetchItems();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await fetch('/api/testimonials', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    await fetchItems();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setForm({ name: '', destination: '', rating: 5, message: '', image_url: '' });
    await fetchItems();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Testimonials</h3>

      <form onSubmit={handleAdd} className="space-y-2">
        <div className="flex gap-2">
          <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Name" className="flex-1 p-2 border" />
          <input value={form.destination} onChange={(e)=>setForm({...form,destination:e.target.value})} placeholder="Destination" className="flex-1 p-2 border" />
        </div>
        <div className="flex gap-2">
          <input value={form.image_url} onChange={(e)=>setForm({...form,image_url:e.target.value})} placeholder="Image URL (optional)" className="flex-1 p-2 border" />
          <select value={form.rating} onChange={(e)=>setForm({...form,rating:Number(e.target.value)})} className="p-2 border">
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} stars</option>)}
          </select>
        </div>
        <textarea value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} placeholder="Message" className="w-full p-2 border" />
        <div>
          <button type="submit" className="px-3 py-2 bg-black text-white rounded">Add Testimonial</button>
        </div>
      </form>

      <div>
        {loading ? <p>Loading…</p> : (
          <ul className="space-y-2">
            {items.map(item => (
              <li key={item.id} className="p-3 bg-white border rounded flex justify-between items-start">
                <div>
                  <div className="font-semibold">{item.name} <span className="text-sm text-gray-500">{item.destination}</span></div>
                  <div className="text-sm text-gray-600">{item.message}</div>
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
