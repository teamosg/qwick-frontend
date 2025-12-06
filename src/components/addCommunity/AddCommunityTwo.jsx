import { motion } from "framer-motion";
import AddCommunityItem from "./AddCommunityItem";

const communityTwoData = [
  { id: 1, title: "Fitness" },
  { id: 2, title: "Real estate" },
  { id: 3, title: "Business" },
  { id: 4, title: "Personal Development" },
  { id: 5, title: "Sales" },
  { id: 6, title: "Social Media" },
  { id: 7, title: "Personal finance" },
  { id: 8, title: "AI" },
  { id: 9, title: "Ecommerce" },
];

const AddCommunityTwo = ({ selectedId, onClick }) => {
  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid sm:grid-cols-3 sm:gap-6">
        {communityTwoData.map((data, index) => (
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

export default AddCommunityTwo;
