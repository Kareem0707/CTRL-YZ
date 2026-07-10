import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'CTRL YZ 2026') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 selection:bg-accent selection:text-background relative overflow-hidden">
      {/* Background Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="glass p-10 rounded-3xl w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-6">
            <ShieldCheck className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-wide uppercase">Admin Access</h1>
          <p className="text-foreground/50 text-sm">Enter the secret password to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-foreground/30 focus:outline-none focus:border-accent transition-colors"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs mt-2 ml-1">Incorrect password. Please try again.</p>
            )}
          </div>
          
          <button 
            type="submit"
            className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-accent/90 transition-colors shadow-[0_0_20px_rgba(var(--color-accent),0.3)]"
          >
            Authenticate
          </button>
        </form>

        <button 
          onClick={() => navigate('/')}
          className="w-full mt-6 text-foreground/50 text-sm hover:text-white transition-colors"
        >
          Return to Storefront
        </button>
      </div>
    </div>
  );
}
