import ChangePassword from "./components/ChangePassword";
import DeleteAccount from "./components/DeleteAccount";
import TwoFactorStatus from "./components/TwoFactorStatus";

const SecurityPrivacy = () => {
  return (
    <div className="md:p-6 space-y-10">
      {/* Two-factor authentication section */}
      <TwoFactorStatus />

      {/* Change Password Section */}
      <ChangePassword />

      {/* Delete Account Section */}
      <DeleteAccount />
    </div>
  );
};

export default SecurityPrivacy;
