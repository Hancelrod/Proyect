import React, { useState } from 'react';
import HeartBackground from './components/HeartBackground';
import TimeCounter from './components/TimeCounter';
import LoveGenerator from './components/LoveGenerator';
import { Photo } from './types';
import { Camera, Heart, Infinity, Upload, Trash2, Save, X, Copy, Check } from 'lucide-react';

// --- ZONA DE CONFIGURACIÓN DE FOTOS ---
// 1. Sube tus fotos en la página web usando el botón "Subir Foto".
// 2. Pulsa el botón "💾 Guardar Fotos en Código" que aparecerá abajo.
// 3. Copia el texto que te dará y pégalo sustituyendo TODO este bloque 'const MEMORIES = [...]'.
const MEMORIES: Photo[] = [
  { 
    id: 'static-1', 
    url: 'https://images.unsplash.com/photo-1516589178581-a81ca852adce?q=80&w=2070&auto=format&fit=crop', 
    caption: 'El inicio de nuestra aventura', 
    isStatic: true 
  },
  { 
    id: 'static-2', 
    url: 'https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=2076&auto=format&fit=crop', 
    caption: 'Momentos inolvidables', 
    isStatic: true 
  },
  { 
    id: 'static-3', 
    url: 'https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=2070&auto=format&fit=crop', 
    caption: 'Tú y yo, siempre', 
    isStatic: true 
  },
];

const App: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>(MEMORIES);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configCode, setConfigCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Función para redimensionar y convertir imagen a Base64
  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          // Redimensionamos a máximo 800px para no saturar el código
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          // Convertimos a JPEG calidad 0.7 para reducir tamaño
          resolve(canvas.toDataURL('image/jpeg', 0.7)); 
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64Url = await processImage(file);
        const newPhoto: Photo = {
          id: Date.now().toString(),
          url: base64Url,
          caption: 'Nuevo recuerdo...',
          isStatic: true // Al subirlas aquí asumimos que el usuario querrá guardarlas
        };
        setPhotos([newPhoto, ...photos]);
      } catch (error) {
        console.error("Error procesando imagen", error);
      }
    }
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== id));
  };

  const generateConfig = () => {
    const codeString = `const MEMORIES: Photo[] = ${JSON.stringify(photos, null, 2)};`;
    setConfigCode(codeString);
    setShowConfigModal(true);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(configCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative pb-20 overflow-x-hidden">
      <HeartBackground />
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 text-center">
        <div className="mb-8 relative">
           <div className="absolute -inset-4 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
           <Heart className="w-24 h-24 text-pink-500 fill-pink-500 animate-bounce relative z-10 mx-auto" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-future font-bold mb-4 neon-text text-white">
          1 AÑO <span className="text-pink-500">JUNTOS</span>
        </h1>
        <p className="text-xl md:text-2xl font-love text-gray-300 max-w-2xl mx-auto leading-relaxed">
          "Gracias por 365 días de amor, apoyo y felicidad. Eres mi presente, mi futuro y mi mejor algoritmo."
        </p>
        
        <div className="mt-12 animate-bounce">
          <p className="text-sm font-future text-pink-400 tracking-widest uppercase">Explora Nuestro Universo</p>
          <div className="w-0.5 h-16 bg-gradient-to-b from-pink-500 to-transparent mx-auto mt-4"></div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <TimeCounter />
      </section>

      {/* Gallery Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-future mb-4 text-white flex items-center justify-center gap-3">
            <Infinity className="w-8 h-8 text-purple-400" />
            Galería de Recuerdos
          </h2>
          <p className="text-gray-400 font-light">
            Sube tus fotos aquí para ver cómo quedan. Cuando te gusten, pulsa "Guardar Fotos en Código".
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-12 items-center">
           <label className="cursor-pointer group relative">
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              <div className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-full transition-all hover:scale-105 hover:neon-glow">
                <Upload className="w-5 h-5 text-pink-400" />
                <span className="font-future text-sm tracking-wide">SUBIR FOTO</span>
              </div>
           </label>

           <button 
             onClick={generateConfig}
             className="flex items-center gap-3 bg-pink-600/80 hover:bg-pink-500 border border-pink-500/50 px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-pink-500/20"
           >
              <Save className="w-5 h-5 text-white" />
              <span className="font-future text-sm tracking-wide text-white">GUARDAR FOTOS EN CÓDIGO</span>
           </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative aspect-square rounded-xl overflow-hidden glass-panel transform transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]">
              
              <button 
                onClick={() => handleDeletePhoto(photo.id)}
                className="absolute top-3 right-3 z-30 p-2 bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 shadow-lg"
                title="Eliminar recuerdo"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <img 
                src={photo.url} 
                alt="Memory" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              {/* Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                <p className="text-white font-love text-2xl">{photo.caption || 'Recuerdo eterno'}</p>
                <div className="flex items-center gap-2 text-pink-400 mt-2">
                  <Camera className="w-4 h-4" />
                  <span className="text-xs font-future tracking-wider">MOMENTO ETERNO</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Love Generator */}
      <section className="relative z-10 container mx-auto px-4 py-20 mb-20">
        <LoveGenerator />
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-10 bg-black/80 border-t border-gray-800">
        <p className="font-future text-gray-500 text-sm">
          Hecho con todo mi amor. 2024 - ∞
        </p>
        <div className="mt-4 text-pink-600 animate-pulse text-xs tracking-widest">
           TE AMO
        </div>
      </footer>

      {/* Config Export Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-[#111] border border-gray-700 rounded-2xl w-full max-w-3xl max-h-[80vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h3 className="text-xl font-future text-white flex items-center gap-2">
                <Save className="text-pink-500" />
                Guarda tus Recuerdos
              </h3>
              <button onClick={() => setShowConfigModal(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                Para que estas fotos se queden fijas para siempre, copia el código de abajo y sustituye la constante <code className="text-pink-400 bg-pink-900/20 px-1 rounded">MEMORIES</code> en el archivo <code className="text-pink-400 bg-pink-900/20 px-1 rounded">App.tsx</code>.
              </p>
              
              <div className="relative group">
                <pre className="bg-black border border-gray-800 rounded-xl p-4 text-xs text-green-400 font-mono overflow-x-auto whitespace-pre-wrap break-all max-h-[400px]">
                  {configCode}
                </pre>
                <button 
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border border-white/20"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? '¡COPIADO!' : 'COPIAR CÓDIGO'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;