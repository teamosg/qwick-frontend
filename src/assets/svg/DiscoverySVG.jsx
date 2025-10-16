const DiscoverySVG = ({ color = "#202224" }) => {
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
          d="M11.9984 21.5999C17.3004 21.5999 21.5984 17.3019 21.5984 11.9999C21.5984 6.698 17.3004 2.39993 11.9984 2.39993C6.6965 2.39993 2.39844 6.698 2.39844 11.9999C2.39844 17.3019 6.6965 21.5999 11.9984 21.5999Z"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M15.496 8.50299L14.6475 14.1515L8.99898 15L9.84751 9.35152L15.496 8.50299Z"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default DiscoverySVG;
