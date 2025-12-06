import { motion } from "framer-motion";
import AddCommunityItem from "./AddCommunityItem";

const communityOneData = [
  { id: 1, title: "Coaching and Courses" },
  { id: 2, title: "Agency services" },
  { id: 3, title: "Paid group" },
  { id: 4, title: "Software" },
  { id: 5, title: "Events" },
  { id: 6, title: "Newsletter" },
  { id: 7, title: "Physical products" },
  { id: 8, title: "Brick and mortar" },
  { id: 9, title: "Other" },
];

const AddCommunityOne = ({ selectedId, onClick }) => {
  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid sm:grid-cols-3 sm:gap-6">
        {communityOneData.map((data, index) => (
          <motion.div
            key={data.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <AddCommunityItem
              selected={selectedId === data.id}
              onClick={() => onClick(data.id)}
              data={data}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AddCommunityOne;
