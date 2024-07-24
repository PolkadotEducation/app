import Image from 'next/image';
import logo from '@/public/assets/icons/logo.svg';
import { useRouter } from 'next/navigation';

const Logo = ({ width, height, pathToRedirect = ''}: { width: number, height: number, pathToRedirect: string }) => {
  const router = useRouter();

  return (
    <Image
      unoptimized
      src={logo}
      width={width}
      height={height}
      alt="Logo"
      onClick={() => {if (pathToRedirect) return router.push(pathToRedirect);}}
      className="cursor-pointer"
    />
  );
};

export default Logo;
