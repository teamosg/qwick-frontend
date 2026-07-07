import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const AvatarUser = ({ src, alt, className }) => {
  return (
    <Avatar className={cn(" rounded-full", className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className={'bg-qwick-gray-200 dark:bg-qwick-gray-800 text-qwick-gray-900 dark:text-white'}>
        {alt?.slice(0, 1)?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarUser;
