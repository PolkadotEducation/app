import padlock from "../../public/assets/icons/padlock.svg";
import Image from "next/image";
interface AchievementProps {
  image: string;
  alt: string;
  locked: boolean;
  title: string;
}

export const Achievement = ({ image, alt, locked, title }: AchievementProps) => {
  return (
    <div className="flex flex-col items-center w-[134px] mb-4">
      <div className="relative w-full flex items-center justify-center">
        <Image src={image} alt={alt} height={160} width={134} className="md:h-[160px] md:w-[134px] h-[80px] w-[71px]" />
        {locked && (
          <div className="absolute backdrop-blur-[2px] inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full flex items-center justify-center">
            <Image src={padlock} alt="locked" />
          </div>
        )}
      </div>
      <p className="font-bold text-center pt-4">{title}</p>
    </div>
  );
};
