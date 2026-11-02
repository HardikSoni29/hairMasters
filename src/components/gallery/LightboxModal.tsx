import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { GalleryItem } from '../../types';
import { Button } from '../common/Button';

interface LightboxModalProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBookLook: (item: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  isOpen,
  onClose,
  onBookLook,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative max-w-4xl w-full bg-noir-800 border border-gold-500/30 overflow-hidden shadow-luxury-elevation flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-noir-900/80 border border-noir-border text-gray-300 hover:text-white"
          aria-label="Close lightbox"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Big Look Image */}
        <div className="md:w-3/5 bg-caviar flex items-center justify-center max-h-[70vh] md:max-h-[80vh] overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain filter contrast-[1.1] brightness-[0.95]"
          />
        </div>

        {/* Look details */}
        <div className="md:w-2/5 p-7 sm:p-9 flex flex-col justify-between border-t md:border-t-0 md:border-l border-noir-border">
          <div>
            <span className="text-[9px] uppercase tracking-widest-xl text-gold-muted font-medium block mb-2.5">
              {item.category} Lookbook
            </span>
            <h3 className="font-serif text-3xl font-light text-white mb-2 leading-tight">
              {item.title}
            </h3>
            <span className="text-xs text-gray-400 block mb-6">
              Master Artist: <strong className="text-gold-200 font-serif font-normal">{item.stylistName}</strong>
            </span>
            <p className="text-xs text-gray-300 font-light leading-relaxed mb-6">
              {item.description}
            </p>
          </div>

          <div className="pt-6 border-t border-noir-border">
            <Button
              variant="gold"
              size="md"
              className="w-full justify-center"
              onClick={() => {
                onClose();
                onBookLook(item);
              }}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Reserve This Look
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
