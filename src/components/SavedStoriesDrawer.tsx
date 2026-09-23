import React from 'react';
import { SavedStoryMeta } from '../utils/storage';
import { Heart, Plus, BookOpen, X, Trash2 } from 'lucide-react';

interface SavedStoriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedStories: SavedStoryMeta[];
  currentStoryId: string;
  onSelectStory: (id: string) => void;
  onCreateNew: () => void;
  onDeleteStory?: (id: string) => void;
}

export const SavedStoriesDrawer: React.FC<SavedStoriesDrawerProps> = ({
  isOpen,
  onClose,
  savedStories,
  currentStoryId,
  onSelectStory,
  onCreateNew,
  onDeleteStory
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn select-none">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col p-6 animate-slideLeft">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-100">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#c62845] fill-[#c62845]" />
            <h2 className="text-lg font-bold text-[#c62845] font-serif-romantic">
              Saved Love Stories
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-[#5a1f2d] flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stories List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {/* Create New Story Button */}
          <button
            onClick={() => {
              onCreateNew();
              onClose();
            }}
            className="w-full p-3.5 bg-rose-50 hover:bg-rose-100 text-[#c62845] border border-dashed border-[#c62845]/40 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Another Love Story</span>
          </button>

          {/* Default Template Option */}
          <div
            onClick={() => {
              onSelectStory('template-default');
              onClose();
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              currentStoryId === 'template-default'
                ? 'bg-rose-50 border-[#c62845] shadow-sm'
                : 'bg-white hover:bg-rose-50/50 border-rose-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white border border-rose-200 text-[#c62845] flex items-center justify-center font-bold text-xs shadow-sm">
                ❤️
              </div>
              <div>
                <p className="text-xs font-bold text-[#5a1f2d]">Alex & Maya</p>
                <p className="text-[10px] text-[#8c3a4f]">Original Story Template</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#c62845] px-2 py-0.5 rounded-full bg-white border border-rose-200">
              Default
            </span>
          </div>

          {/* User's saved stories */}
          {savedStories.map((s) => {
            const isSelected = currentStoryId === s.id;
            return (
              <div
                key={s.id}
                onClick={() => {
                  onSelectStory(s.id);
                  onClose();
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-rose-50 border-[#c62845] shadow-sm'
                    : 'bg-white hover:bg-rose-50/50 border-rose-100'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#c62845] to-[#ff758f] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                    {s.partnerName ? s.partnerName.charAt(0).toUpperCase() : '❤️'}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-[#5a1f2d] truncate">
                      {s.partnerName} & {s.yourName}
                    </p>
                    <p className="text-[10px] text-[#8c3a4f]">
                      Updated {new Date(s.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {onDeleteStory && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteStory(s.id);
                      }}
                      className="p-1.5 text-rose-300 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                      title="Delete story"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <BookOpen className="w-4 h-4 text-[#c62845]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-rose-100 text-center">
          <p className="text-[11px] text-[#8c3a4f] italic">
            Each story has its own separate link and data.
          </p>
        </div>
      </div>
    </div>
  );
};
