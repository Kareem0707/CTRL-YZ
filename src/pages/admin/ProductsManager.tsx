import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Plus, Trash2, Edit, X, UploadCloud, Star } from 'lucide-react';
import type { Product } from '../../types';

export default function ProductsManager() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const openModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setName(product.name);
      setPrice(product.price.toString());
      setDescription(product.description);
      setImage(product.image);
    } else {
      setEditingId(null);
      setName(`CTRL YZ #${products.length + 1}`);
      setPrice('600');
      setDescription('');
      setImage(null);
    }
    setIsModalOpen(true);
  };

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!name || !price || !description || !image) return;

    if (editingId) {
      updateProduct(editingId, {
        name,
        price: Number(price),
        description,
        image
      });
    } else {
      addProduct({
        id: Math.random().toString(36).substr(2, 9),
        name,
        price: Number(price),
        description,
        image
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-white">Products Management</h1>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl font-bold hover:bg-accent/80 transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="glass rounded-2xl overflow-hidden flex flex-col border border-white/5 relative group">
            <div className="h-48 overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              {product.isBestSeller && (
                <div className="absolute bottom-2 left-2 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Best Seller
                </div>
              )}
            </div>
            
            {/* Actions */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
              <button 
                onClick={() => openModal(product)}
                className="bg-blue-500/80 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors backdrop-blur-md"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button 
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-lg transition-colors backdrop-blur-md"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-white text-lg mb-1">{product.name}</h3>
              <p className="text-accent font-bold mb-3">{product.price} EGP</p>
              <p className="text-xs text-foreground/50 line-clamp-2 mt-auto">{product.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg glass p-8 rounded-3xl border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-foreground/50 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
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
                {editingId ? 'Save Changes' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
