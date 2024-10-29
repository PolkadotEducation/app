import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="text-primary">
      <LoaderCircle width={120} height={120} className="animate-spin" />
    </div>
  );
};

export default Loading;
