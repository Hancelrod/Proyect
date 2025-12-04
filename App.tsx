
import React, { useState } from 'react';
import HeartBackground from './components/HeartBackground';
import TimeCounter from './components/TimeCounter';
import LoveGenerator from './components/LoveGenerator';
import { Photo } from './types';
import { GALLERY_IMAGES } from './gallery';
import { Camera, Heart, Infinity, Upload, Trash2 } from 'lucide-react';

const App: React.FC = () => {
  // Inicializamos las fotos cargando desde el archivo de configuración gallery.ts
  const initialPhotos: Photo[] = GALLERY_IMAGES.map((img, index) => {
    // Si empieza por http es una URL externa, si no, buscamos en la carpeta 'photos'
    const url = img.filename.startsWith('http') || img.filename.startsWith('data:') 
      ? img.filename 
      : `photos/${img.filename}`;
      
    return {
      id: `static-${index}`,
      url: url,
      caption: img.caption,
      isStatic: true
    };
  });

  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);

  // Función para previsualizar imágenes subidas al momento (no se guardan permanentemente)
  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
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
          caption: 'Nuevo recuerdo (temporal)...',
          isStatic: false
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
          <p className="text-gray-400 font-light max-w-xl mx-auto">
            Todas nuestras fotos guardadas se cargan automáticamente desde la carpeta. 
            También puedes subir una temporalmente aquí para ver cómo queda.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-12 items-center">
           <label className="cursor-pointer group relative">
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              <div className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-full transition-all hover:scale-105 hover:neon-glow">
                <Upload className="w-5 h-5 text-pink-400" />
                <span className="font-future text-sm tracking-wide">SUBIR FOTO TEMPORAL</span>
              </div>
           </label>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative aspect-square rounded-xl overflow-hidden glass-panel transform transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]">
              
              {!photo.isStatic && (
                <button 
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="absolute top-3 right-3 z-30 p-2 bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 shadow-lg"
                  title="Eliminar recuerdo temporal"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              {/* Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                <p className="text-white font-love text-2xl">{photo.caption || 'Recuerdo eterno'}</p>
                <div className="flex items-center gap-2 text-pink-400 mt-2">
                  <Camera className="w-4 h-4" />
                  <span className="text-xs font-future tracking-wider">
                    {photo.isStatic ? 'MOMENTO GUARDADO' : 'VISTA PREVIA'}
                  </span>
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
    </div>
  );
};

export default App;
