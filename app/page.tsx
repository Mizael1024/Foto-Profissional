import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import hero from "/public/hero.png";

import { Button } from "@/components/ui/button";
import ExplainerSection from "@/components/ExplainerSection";
import PricingSection from "@/components/PricingSection";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/overview");
  }

  return (
    <div className="flex flex-col items-center pt-16">
      <div className="flex flex-col lg:flex-row items-center gap-8 p-8 max-w-6xl w-full">
        <div className="flex flex-col space-y-4 lg:w-3/5 w-full">
          <h1 className="text-5xl font-bold leading-tight"> {/* Adicione a classe leading aqui */}
            Foto de Perfil Profissional Gerada Por IA.
          </h1>
          <p className="text-gray-600 text-lg">
            Não perca a chance de causar impacto. 
            Uma foto de perfil profissional abre portas e te coloca em destaque.
          </p>
          <div className="flex flex-col space-y-2">
            <Link href="/login">
              <Button className="w-full lg:w-1/2">Gerar Foto Profissional</Button>
            </Link>
            <p className="text-sm text-gray-500 italic">
            Confiada por profissionais em todo o mundo. Fácil e rápido.
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span>Já tem uma conta? </span>
            <Link className="text-blue-600 hover:underline" href="/login">
              Acesse agora
            </Link>
          </div>
        </div>
        <div className="lg:w-2/5 w-full mt-8 lg:mt-0">
          <img
            src={hero.src}
            alt="AI Headshot Illustration"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>
      <ExplainerSection />
      <PricingSection />
    </div>
  );  
}
