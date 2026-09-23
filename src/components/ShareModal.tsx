import React, { useState } from 'react';
import { Heart, Copy, Check, ExternalLink, Share2, X, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  partnerName: string;
  yourName: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  shareUrl,
  partnerName,
  yourName
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const shareText = `Hey ${partnerName}! ❤️ I made a special personalized love story just for you. Open this to see your surprise:`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn select-none">
      <div className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#c62845]/20 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-[#5a1f2d] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="w-14 h-14 rounded-full bg-rose-50 text-[#c62845] flex items-center justify-center mx-auto mb-4 border border-rose-200">
          <Heart className="w-8 h-8 fill-[#c62845] animate-pulse" />
        </div>

        <h2 className="text-2xl font-bold text-[#c62845] font-serif-romantic tracking-tight">
          Your Love Story Is Ready! ❤️
        </h2>
        <p className="text-xs sm:text-sm text-[#8c3a4f] mt-1.5 leading-relaxed">
          Share this unique personal link with <strong>{partnerName}</strong>. They will see only the custom memories, photos, and letters you crafted for them!
        </p>

        {/* Share Link Box */}
        <div className="mt-6 bg-rose-50/70 border border-[#c62845]/25 rounded-2xl p-3 flex items-center gap-2 text-left">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 bg-transparent text-xs font-mono text-[#5a1f2d] focus:outline-none select-all truncate px-1"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-2 bg-[#c62845] hover:bg-[#a11c34] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-white" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Send on WhatsApp</span>
          </a>

          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-white hover:bg-rose-50 text-[#c62845] border border-[#c62845]/30 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <span>Open Link</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="mt-6 pt-4 border-t border-rose-100">
          <p className="text-[11px] text-[#8c3a4f]/80 italic">
            Tip: Your story is saved under its own unique ID and will never overwrite other stories!
          </p>
        </div>
      </div>
    </div>
  );
};
