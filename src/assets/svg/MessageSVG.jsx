const MessageSVG = ({ color = "#202224" }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M7.19844 7.19999H15.5984M7.19844 12H11.9984M11.6854 16.5913L6.6767 21.6V16.5913H4.79844C3.47295 16.5913 2.39844 15.5168 2.39844 14.1913V4.79999C2.39844 3.47451 3.47295 2.39999 4.79844 2.39999H19.1984C20.5239 2.39999 21.5984 3.47451 21.5984 4.79999V14.1913C21.5984 15.5168 20.5239 16.5913 19.1984 16.5913H11.6854Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default MessageSVG;
