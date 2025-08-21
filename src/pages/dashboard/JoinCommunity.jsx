import { Link } from "react-router";

const JoinCommunity = () => {
  return (
    <div className="p-6">
      <div className="bg-gray-100 dark:bg-zinc-950 p-6 rounded-xl max-w-2xl items-center justify-center mx-auto">
        <img
          src="/public/join-community.png"
          alt=""
          className="max-w-full object-cover rounded-xl mb-6"
        />
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img
              src="https://i.pravatar.cc/36"
              alt="Profile"
              className="w-6 h-6 rounded-full"
            />
            <Link to="">
              <span className="text-sm font-medium text-[#717171] dark:text-white capitalize">
                Prothinidi Thomas
              </span>
            </Link>
          </div>
          <h2 className="text-2xl text-[#090003] dark:text-white font-semibold mb-6">
            It is a long established fact that a reader will be distracted by
            the
          </h2>
          <p className="text-[18px] text-[#717171] dark:text-zinc-400 mb-11">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of{" "}
          </p>
          <button className="max-w-sm w-full text-white bg-[#003933] text-[18px] font-semibold p-2.5 rounded-full cursor-pointer hover:bg-emerald-700  transition">
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunity;
