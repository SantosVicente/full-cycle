import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/server-actions/auth.action";
import { AuthService } from "@/services/auth.service";
import { LockKeyhole } from "lucide-react";
import { redirect } from "next/navigation";

async function LoginPage({
  searchParams,
}: {
  searchParams: { redirect_to?: string };
}) {
  const { redirect_to = "/products" } = searchParams;
  const authService = new AuthService();
  const user = authService.getUser();

  if (user && !authService.isTokenExpired()) {
    redirect(redirect_to);
  }

  return (
    <div className="mt-28 flex h-full flex-col items-center">
      <div className="mb-4 rounded-full bg-primary p-3">
        <LockKeyhole className="text-zinc-50" size={28} />
      </div>
      <h1 className="text-2xl font-bold uppercase">Entre com sua conta</h1>
      <form
        className="mt-3 flex w-full flex-col gap-3 px-8 md:w-1/2 xl:w-1/3"
        action={loginAction}
      >
        <Input type="hidden" name="redirect_to" value={redirect_to} />

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            className="w-full py-5"
            required
            placeholder="E-mail"
            name="email"
            autoComplete="email"
            defaultValue={"john"}
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            className="w-full py-5"
            required
            placeholder="Senha"
            name="password"
            type="password"
            autoComplete="current-password"
            defaultValue={"john"}
          />
        </div>

        <Button type="submit" className="mb-2 mt-3 w-full font-bold uppercase">
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
