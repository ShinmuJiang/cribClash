'use client';

import { useState } from 'react';
import { User as UserIcon, MessageSquare, Bookmark, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { createPortal } from 'react-dom';

// Type definitions
interface UserType {
  id: string;
  email?: string;
  displayName?: string | null;
}

interface TraitGuess {
  major: string;
  gender: string;
  race: string;
  performativeLevel: number;
}

interface CommentType {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
}

interface TraitModalProps {
  traitGuess: TraitGuess;
  setTraitGuess: (guess: TraitGuess) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  side: 'left' | 'right';
}

const TraitModal = ({ traitGuess, setTraitGuess, onSubmit, onClose, side }: TraitModalProps) => {
  return createPortal(
    <div className={`fixed inset-0 z-50 flex items-center min-h-screen ${side === 'left' ? 'justify-start' : 'justify-end'}`}>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white p-8 rounded-lg shadow-2xl w-[420px] min-h-[28rem] z-10 flex flex-col justify-center ${side === 'left' ? 'ml-[8vw]' : 'mr-[8vw]'}`}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-black">Judge the Resident</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Major</label>
            <input
              type="text"
              value={traitGuess.major}
              onChange={(e) => setTraitGuess({ ...traitGuess, major: e.target.value })}
              className="mt-1 block w-full max-w-[340px] mx-auto rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm placeholder-gray-500 text-black h-11 px-3"
              placeholder="e.g., Computer Science"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              value={traitGuess.gender}
              onChange={(e) => setTraitGuess({ ...traitGuess, gender: e.target.value })}
              className="mt-1 block w-full max-w-[340px] mx-auto rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm h-11 px-3 text-black"
            >
              <option value="" disabled hidden className="text-gray-500">Select gender</option>
              <option value="male" className="text-black">Male</option>
              <option value="female" className="text-black">Female</option>
              <option value="non-binary" className="text-black">Non-binary</option>
              <option value="prefer-not-to-say" className="text-black">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Race/Ethnicity</label>
            <input
              type="text"
              value={traitGuess.race}
              onChange={(e) => setTraitGuess({ ...traitGuess, race: e.target.value })}
              className="mt-1 block w-full max-w-[340px] mx-auto rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm placeholder-gray-500 text-black h-11 px-3"
              placeholder="e.g., Asian"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mt-6">
              Performative Level: {traitGuess.performativeLevel}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={traitGuess.performativeLevel}
              onChange={(e) => setTraitGuess({ ...traitGuess, performativeLevel: parseInt(e.target.value) })}
              className="mt-1 block w-full max-w-[340px] mx-auto"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-28 bg-blue-500 text-white py-2 px-0 rounded-md text-base hover:bg-blue-600 transition-colors"
            >
              Submit Guess
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

interface CommentDrawerProps {
  commentText: string;
  setCommentText: (text: string) => void;
  comments: CommentType[];
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  side: 'left' | 'right';
}

const CommentDrawer = ({ commentText, setCommentText, comments, onSubmit, onClose, side }: CommentDrawerProps) => {
  return createPortal(
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative h-full w-full max-w-xs bg-white p-4 rounded-${side === 'left' ? 'r' : 'l'}-lg shadow-2xl z-10 flex flex-col ${side === 'left' ? 'mr-auto' : 'ml-auto'}`}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Comments</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-3 mb-3 flex-1 overflow-y-auto">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="text-sm bg-gray-50 p-2 rounded">
                <div className="font-medium text-gray-900">{comment.userName}</div>
                <div className="text-gray-700">{comment.text}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(comment.timestamp).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No comments yet. Be the first to comment!</p>
          )}
        </div>
        <form onSubmit={onSubmit} className="flex space-x-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors"
          >
            Post
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

// Types moved to the top of the file

interface InteractionPanelProps {
  apartmentId: string;
  side: 'left' | 'right';
  onSaveToggle?: (saved: boolean) => void;
}

export function InteractionPanel({ apartmentId, side, onSaveToggle }: InteractionPanelProps) {
  const { user } = useAuth() as { user: UserType | null };
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [traitGuess, setTraitGuess] = useState<TraitGuess>({
    major: '',
    gender: '',
    race: '',
    performativeLevel: 5,
  });
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const handleTraitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to the database
    console.log('Submitted traits:', traitGuess);
    setActivePanel(null);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;
    
    const newComment: CommentType = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.displayName || 'Anonymous',
      text: commentText,
      timestamp: new Date(),
    };
    
    setComments([...comments, newComment]);
    setCommentText('');
  };

  const handleSaveToggle = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    if (onSaveToggle) {
      onSaveToggle(newSavedState);
    }
    // In a real app, this would save to the user's saved items
    console.log(newSavedState ? 'Saved apartment' : 'Unsaved apartment', apartmentId);
  };

  const handleCloseModal = () => {
    setActivePanel(null);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        onClick={() => setActivePanel(activePanel === 'traits' ? null : 'traits')}
        className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${activePanel === 'traits' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
        style={{ minWidth: 32, minHeight: 32 }}
        title="Guess resident traits"
      >
        <UserIcon size={31} />
      </button>
      <button
        onClick={() => setActivePanel(activePanel === 'comments' ? null : 'comments')}
        className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${activePanel === 'comments' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
        style={{ minWidth: 32, minHeight: 32 }}
        title="View comments"
      >
        <MessageSquare size={28} />
      </button>
      <button
        onClick={handleSaveToggle}
        className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${isSaved ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'}`}
        style={{ minWidth: 32, minHeight: 32 }}
        title={isSaved ? 'Remove from saved' : 'Save to collection'}
      >
        <Bookmark size={28} fill={isSaved ? 'currentColor' : 'none'} />
      </button>
      {activePanel === 'traits' && (
        <TraitModal
          traitGuess={traitGuess}
          setTraitGuess={setTraitGuess}
          onSubmit={handleTraitSubmit}
          onClose={handleCloseModal}
          side={side}
        />
      )}
      {activePanel === 'comments' && (
        <CommentDrawer
          commentText={commentText}
          setCommentText={setCommentText}
          comments={comments}
          onSubmit={handleCommentSubmit}
          onClose={handleCloseModal}
          side={side}
        />
      )}
    </div>
  );
}
