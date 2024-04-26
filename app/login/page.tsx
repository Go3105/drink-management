import LoginForm from '@/app/ui/login-form';
import { Header_login } from '@/app/ui/login-form';



export default function LoginPage() {
    return (
        <div>
            <div>
                <Header_login />
            </div>
            <div className="flex items-center justify-center md:h-screen relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <LoginForm />
            </div>
        </div>
    );
}