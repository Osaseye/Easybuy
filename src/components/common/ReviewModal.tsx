import React, { useState } from 'react';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    landlordName?: string;
    landlordImage?: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ 
    isOpen, 
    onClose,
    landlordName = "James Wilson",
    landlordImage = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&h=100"
}) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transform transition-all scale-100">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Rate Your Experience</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <img 
                            src={landlordImage} 
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" 
                            alt="Landlord" 
                        />
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Rate interaction with</p>
                            <p className="font-bold text-gray-900 dark:text-white">{landlordName}</p>
                        </div>
                    </div>

                    <div className="flex justify-center gap-2 mb-8">
                        {/* Star Rating */}
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                                key={star}
                                className={`transition-transform hover:scale-110 focus:outline-none ${
                                    (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                                }`}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                            >
                                <span className={`material-symbols-outlined text-4xl ${(hoverRating || rating) >= star ? 'fill-current' : ''}`}>
                                    star
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Share your feedback
                            </label>
                            <textarea 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-gray-900 dark:text-white" 
                                rows={4} 
                                placeholder="How was your experience with this landlord?"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            // Handle submit logic here
                            console.log({ rating, feedback });
                            onClose();
                        }}
                        className="px-6 py-2 rounded-lg font-bold text-white bg-primary hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all"
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
};