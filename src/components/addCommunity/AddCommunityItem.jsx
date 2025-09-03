import Coaching from "@/assets/svg/Coaching";

const AddCommunityItem = ({ currentStep, setCurrentStep, data }) => {
  return (
    <div
      onClick={() => setCurrentStep((currentStep) => currentStep + 1)}
      className="bg-white rounded-md px-6 py-8 shadow transition border border-transparent duration-300 hover:border hover:border-[#003933] text-left cursor-pointer"
    >
      <div className="bg-[#e5fff6] p-4 flex items-center justify-center w-15 h-15 rounded-2xl mb-12">
        <Coaching />
      </div>

      <h3 className="text-xl font-semibold text-[#090003]">{data.title}</h3>
    </div>
  );
};

export default AddCommunityItem;
