import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth.api.getSession({headers:await headers()})
  if(session?.user) redirect('/')
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image
            src={"/assets/images/logo.png"}
            alt="Stockverse"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>
      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            minus, provident ducimus hic excepturi libero placeat aliquam sint
            qui porro tempora? Aperiam asperiores quibusdam odio!
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="auth-testimonial-author">- Marcus Aurelius</cite>
              <p className="max-md:text-xs text-gray-500">Stoicism</p>
            </div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  src={"/assets/icons/star.svg"}
                  key={star}
                  alt="Start"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
            <Image src="/assets/images/dashboard.png" alt="dashboard" width={1440} height={1150} className="auth-dashboard-preview absolute top-0"/>
        </div>
      </section>
    </main>
  );
};

export default RootLayout;
