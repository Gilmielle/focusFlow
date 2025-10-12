import Logo from "@/components/logo";


export default function AuthPage({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (

  <main className="flex items-center justify-center md:h-screen">
    <div className="relative mx-auto flex w-full max-w-[400px] flex-col gap-4 p-4 md:-mt-32">
      <div className="flex h-20 w-full items-end rounded-lg bg-(--primary) p-3 md:h-36">
        <Logo />
      </div>
      {children}
    </div>
  </main>
  );
}
