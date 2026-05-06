import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const PostImages = ({ post }) => {
  const [openImage, setOpenImage] = useState(false);
  const [index, setIndex] = useState(0);

  const formattedImages =
    post?.files?.map((file) => ({
      src: file?.file,
      alt: `Post image ${file?.id}`,
    })) ?? [];

  const handleOpen = (i) => {
    setIndex(i);
    setOpenImage(true);
  };

  const files = post?.files || [];
  const count = files.length;

  if (count === 0) return null;

  const renderGrid = () => {
    if (count === 1) {
      return (
        <div 
          onClick={() => handleOpen(0)} 
          className="cursor-pointer rounded-xl overflow-hidden bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800"
        >
          <img 
            src={files[0].file} 
            alt="Post image" 
            className="w-full h-auto max-h-[280px] object-contain mx-auto transition-all duration-300 hover:brightness-95" 
          />
        </div>
      );
    }

    if (count === 2) {
      return (
        <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
          {files.map((file, i) => (
            <div 
              key={file.id} 
              onClick={() => handleOpen(i)} 
              className="aspect-[21/9] cursor-pointer overflow-hidden bg-gray-50 dark:bg-zinc-900"
            >
              <img 
                src={file.file} 
                alt="" 
                className="w-full h-full object-contain transition-all duration-300 hover:brightness-95" 
              />
            </div>
          ))}
        </div>
      );
    }

    if (count === 3) {
      return (
        <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
          <div 
            onClick={() => handleOpen(0)} 
            className="col-span-2 aspect-[21/9] cursor-pointer overflow-hidden bg-gray-50 dark:bg-zinc-900"
          >
            <img 
              src={files[0].file} 
              alt="" 
              className="w-full h-full object-contain transition-all duration-300 hover:brightness-95" 
            />
          </div>
          <div 
            onClick={() => handleOpen(1)} 
            className="aspect-[16/9] cursor-pointer overflow-hidden bg-gray-50 dark:bg-zinc-900"
          >
            <img 
              src={files[1].file} 
              alt="" 
              className="w-full h-full object-contain transition-all duration-300 hover:brightness-95" 
            />
          </div>
          <div 
            onClick={() => handleOpen(2)} 
            className="aspect-[16/9] cursor-pointer overflow-hidden bg-gray-50 dark:bg-zinc-900"
          >
            <img 
              src={files[2].file} 
              alt="" 
              className="w-full h-full object-contain transition-all duration-300 hover:brightness-95" 
            />
          </div>
        </div>
      );
    }

    // 4+ images (Facebook style)
    return (
      <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
        {files.slice(0, 4).map((file, i) => (
          <div 
            key={file.id} 
            onClick={() => handleOpen(i)} 
            className="relative aspect-[16/9] cursor-pointer overflow-hidden bg-gray-50 dark:bg-zinc-900"
          >
            <img 
              src={file.file} 
              alt="" 
              className="w-full h-full object-contain transition-all duration-300 hover:brightness-95" 
            />
            {i === 3 && count > 4 && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                <span className="text-white text-2xl font-bold">+{count - 4}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mb-4">
      {renderGrid()}

      <Lightbox
        open={openImage}
        close={() => setOpenImage(false)}
        slides={formattedImages}
        index={index}
        plugins={[Thumbnails]}
        thumbnails={{ position: "bottom" }}
      />
    </div>
  );
};

export default PostImages;
