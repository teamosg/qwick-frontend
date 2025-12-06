const PostImages = ({ post }) => {
    return (
        <>
            {
                post?.files?.length === 1 ? (
                    <div className="mb-3 sm:mb-4 grid grid-cols-1">
                        {post?.files.map((file) => (
                            <img
                                key={file?.id}
                                src={file?.file}
                                alt="Post file"
                                className="w-full h-100 object-cover rounded-lg"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mb-3 sm:mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {post?.files.map((file) => (
                            <img
                                key={file?.id}
                                src={file?.file}
                                alt="Post file"
                                className="w-full h-48 sm:h-64 object-cover rounded-lg"
                            />
                        ))}
                    </div>
                )
            }
        </>
    );
};

export default PostImages;