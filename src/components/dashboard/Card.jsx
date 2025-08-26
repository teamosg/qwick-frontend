import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";

const Card = ({ progress = 7 }) => {
  const progressWidth = `${progress}%`;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 w-full   dark:border-zinc-700 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-between gap-3 mb-3">
          <img
            src="https://i.pravatar.cc/36"
            alt="Profile"
            className="w-9 h-9 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-[#191919] dark:text-white mb-1.5">
              Content Rewards
            </p>
            <p className="text-xs">Destroying Clips</p>
          </div>
        </div>

        <div className="text-[#003933]">48m</div>
      </div>

      {/* Title and Description */}
      <h3 className="font-semibold text-[#090003] dark:text-white text-sm mb-1">
        Destroying 1on1’s Clips
      </h3>
      <p className="text-xs dark:text-zinc-400 mb-3 leading-snug">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking...
      </p>
      <div className="flex flex-row gap-2 my-3">
        <div className="text-[#666666] text-xs rounded-full gap-1 px-3 py-2 bg-[#FDF2F8] flex flex-row items-center">
          <FaInstagram size={12} />
          <span>Instagram</span>
        </div>
        <div className="text-[#666666] text-xs rounded-full gap-1 px-3 py-2 bg-[#FDF2F8] flex flex-row items-center">
          <FaFacebook size={12} />
          <span>Facebook</span>
        </div>
        <div className="text-[#666666] text-xs rounded-full gap-1 px-3 py-2 bg-[#FDF2F8] flex flex-row items-center">
          <FaYoutube size={12} />
          <span>Youtube</span>
        </div>
      </div>

      {/* Compensation & Button */}
      <div className="flex items-center justify-between text-xs dark:text-zinc-400">
        <div>
          <p className="font-semibold text-[#090003] dark:text-white">
            Compensation
          </p>
          <p>$1 per 1k views</p>
        </div>
        <Link
          to="/apply"
          className="bg-emerald-700 hover:bg-[#003933] text-white text-sm font-semibold py-1.5 px-4 rounded-full transition duration-300"
        >
          Submission
        </Link>
      </div>
    </div>
  );
};

export default Card;
