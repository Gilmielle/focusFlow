import Image from "next/image";

export default function Logo() {
  return (
    <div
      className={"flex flex-row gap-2 items-center leading-none text-white"}
    >
      <Image
        src={"/logo-small.png"}
        width={48}
        height={48}
        alt={"Логотип FocusFlow - трекер привычек"}
      />
      <p className="text-[32px]">FocusFlow</p>
    </div>
  )
}
