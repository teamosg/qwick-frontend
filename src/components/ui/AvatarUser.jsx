import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const AvatarUser = ({ src, alt, className }) => {
  return (
    <Avatar className={cn(" rounded-full", className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{alt.slice(0, 1)}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarUser;
