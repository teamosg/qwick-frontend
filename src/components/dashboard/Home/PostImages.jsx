import { useState } from "react";
import { Image } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const PostImages = ({ post }) => {
  const [openImage, setOpenImage] = useState(false);
  const [index, setIndex] = useState(0); // which slide to open[web:7]

  const formattedImages =
    post?.files?.map((file) => ({
      src: file?.file,
      alt: `Post image ${file?.id}`,
    })) ?? [];

  const handleOpen = (i) => {
    setIndex(i);
    setOpenImage(true);
  };

  return (
    <>
      {post?.files?.length === 1 ? (
        <div className="mb-3 sm:mb-4 grid grid-cols-1">
          {post?.files.map((file, i) => (
            <div
              key={file?.id}
              onClick={() => handleOpen(i)}
              className="relative group cursor-pointer"
            >
              <img
                src={file?.file}
                alt="Post file"
                className="w-full h-100 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Image className="text-white w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-3 sm:mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {post?.files.map((file, i) => (
            <div
              key={file?.id}
              onClick={() => handleOpen(i)}
              className="relative group cursor-pointer"
            >
              <img
                src={file?.file}
                alt="Post file"
                className="w-full h-48 sm:h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Image className="text-white w-7 h-7" />
              </div>
            </div>
          ))}
        </div>
      )}

      <Lightbox
        open={openImage}
        close={() => setOpenImage(false)}
        slides={formattedImages}
        index={index}
        plugins={[Thumbnails]}            // enable thumbnails strip[web:1][web:12]
        thumbnails={{ position: "bottom" }} // optional config[web:1]
      />
    </>
  );
};

export default PostImages;
