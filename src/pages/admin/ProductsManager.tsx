import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Plus, Trash2, X, UploadCloud } from 'lucide-react';

export default function ProductsManager() {
  const { products, addProduct, deleteProduct } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Product Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e: any) => {
    e.preventDefault();
    if (!name || !price || !description || !image) return;

    addProduct({
      id: Math.random().toString(36).substr(2, 9),
      name,
      price: Number(price),
      description,
      image
    });

    setIsModalOpen(false);
    setName('');
    setPrice('');
    setDescription('');
    setImage(null);
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-white">Products Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl font-bold hover:bg-accent/80 transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="glass rounded-2xl overflow-hidden flex flex-col border border-white/5 relative group">
            <div className="h-48 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <button 
              onClick={() => deleteProduct(product.id)}
              className="absolute top-2 right-2 bg-red-500/80 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-white text-lg mb-1">{product.name}</h3>
              <p className="text-accent font-bold mb-3">{product.price} EGP</p>
              <p className="text-xs text-foreground/50 line-clamp-2 mt-auto">{product.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg glass p-8 rounded-3xl border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-foreground/50 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Add New Product</h2>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Product Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent text-white" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Price (EGP)</label>
                <input required type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent text-white" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea required value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent text-white h-24 resize-none" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Product Image</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-accent hover:bg-white/5 transition-all">
                  {image ? (
                    <img src={image} alt="Preview" className="h-full w-full object-cover rounded-xl" />
                  ) : (
                    <div className="flex flex-col items-center text-foreground/50">
                      <UploadCloud className="w-8 h-8 mb-2" />
                      <span className="text-sm">Click to upload image</span>
                    </div>
                  )}
                  <input required={!image} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              <button type="submit" className="w-full bg-accent hover:bg-accent/80 text-white font-bold py-4 rounded-xl transition-colors mt-4">
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
