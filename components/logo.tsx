import Image from "next/image";
import {ReactNode} from "react";
import {cn} from "@/lib/utils";

interface LogoProps {
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  textSlot?: ReactNode;
}

export default function Logo({
  src = "/logo-small.png",
  width = 48,
  height = 48,
  alt = "Логотип FocusFlow - трекер привычек",
  textSlot = null,
  className = ""
}: LogoProps) {
  return (
    <div
      className={cn("flex flex-row gap-2 items-center leading-none text-white", className)}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
      />
      {!!textSlot && textSlot}
    </div>
  )
}
