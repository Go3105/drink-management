import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <div>
      <div>
        <Header_login />
      </div>
      <div className="relative mx-auto flex flex w-full max-w-[400px] flex-col items-center justify-center space-y-2.5 p-4 md:-mt-24 md:h-screen">
        <LoginForm />
      </div>
    </div>
  );
}

function Header_login() {
  return (
    <div className="">
      <h1 className="flex-1 pb-5 pt-5 text-center font-handwritten text-2xl">
        Tahara, Sei Lab
      </h1>
      <h1 className="font-family:'Yu Gothic'; flex-1 bg-cyan-600 pb-5 pt-5 text-center text-5xl text-white">
        飲み物投票サイト
      </h1>
    </div>
  );

}
