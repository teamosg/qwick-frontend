import EmojiPicker from "emoji-picker-react";
import { Send, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CommentSection = ({ post }) => {
    const [commentText, setCommentText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiPickerRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                emojiPickerRef.current &&
                !emojiPickerRef.current.contains(event.target)
            ) {
                const emojiButton = document.querySelector(
                    `.comment-emoji-button-${post.id}`
                );
                if (!emojiButton || !emojiButton.contains(event.target)) {
                    setShowEmojiPicker(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [post.id]);


    const handleEmojiClick = (emojiData) => {
        setCommentText((prev) => prev + emojiData.emoji);
    };



    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (!commentText.trim()) return;
                console.log(commentText);
                setCommentText("");
            }}
            className="flex space-x-2"
        >
            <img
                src="https://i.pravatar.cc/150?img=5"
                alt="User"
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
            />

            <div className="flex-1 relative">
                <input
                    id={`comment-${post.id}`}
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full bg-gray-100 dark:bg-[#2E2E2E] rounded-lg py-2 px-3 sm:px-4 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary pr-20 text-sm sm:text-base"
                />

                {/* ✅ Emoji + Send Buttons */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className={`comment-emoji-button-${post.id} text-gray-400 hover:text-primary p-1`}
                    >
                        <Smile size={16} />
                    </button>

                    <button type="submit" className="text-primary p-1">
                        <Send size={16} />
                    </button>
                </div>

                {/* ✅ Emoji Picker */}
                {showEmojiPicker && (
                    <div
                        className="absolute bottom-12 right-0 z-10"
                        ref={emojiPickerRef}
                    >
                        <div className="w-[280px] sm:w-[300px]">
                            <EmojiPicker
                                onEmojiClick={handleEmojiClick}
                                width={280}
                                height={300}
                                previewConfig={{ showPreview: false }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
};

export default CommentSection;