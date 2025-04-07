import { FeatureGrid } from "@/components/features";
import { Hero } from "@/components/hero";
// import { stackServerApp } from "@/stack";
// import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default async function IndexPage() {
  // const project = await stackServerApp.getProject();
  // if (!project.config.clientTeamCreationEnabled) {
  //   return (
  //     <div className="w-full min-h-96 flex items-center justify-center">
  //       <div className="max-w-xl gap-4">
  //         <p className="font-bold text-xl">Setup Required</p>
  //         <p className="">
  //           {
  //             "To start using this project, please enable client-side team creation in the Stack Auth dashboard (Project > Team Settings). This message will disappear once the feature is enabled."
  //           }
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Hero
        capsuleText="100% Open-source & Free"
        capsuleLink="https://stacktemplate.com"
        title="Build better habits, one day at a time."
        subtitle="A minimalist habit tracker built with Next.js, Supabase, and Prisma. Start tracking your daily goals and stay consistent — no fluff, just progress."
        primaryCtaText="Get Started"
        primaryCtaLink="login"
        secondaryCtaText="GitHub"
        secondaryCtaLink="https://github.com/Sham1ko/habit-tracker"
        credits={
          <>
            Crafted with ❤️ by{" "}
            <a
              href="https://github.com/Sham1ko"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Sham1ko
            </a>
          </>
        }
      />

      <FeatureGrid
        title="Features"
        subtitle="Unlock powerful capabilities for your project."
        items={[
          {
            icon: (
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
              </svg>
            ),
            title: "Next.js 14",
            description:
              "Utilize the latest features: App Router, Layouts, Suspense.",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="h-12 w-12 fill-current"
              >
                <rect width="256" height="256" fill="none"></rect>
                <line
                  x1="208"
                  y1="128"
                  x2="128"
                  y2="208"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="22"
                ></line>
                <line
                  x1="192"
                  y1="40"
                  x2="40"
                  y2="192"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="22"
                ></line>
              </svg>
            ),
            title: "Shadcn UI",
            description:
              "Modern and fully customizable UI components based on Tailwind CSS.",
          },
          {
            icon: (
              <svg
                fill="none"
                height="15"
                viewBox="0 0 15 15"
                width="15"
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 fill-current"
              >
                <path
                  d="m8 1.5c0-.21735-.14042-.40981-.34741-.47614-.20699-.066336-.43312.00865-.55945.18553l-5 7c-.10887.1524-.12342.35287-.03772.51941.0857.16653.25729.2712.44458.2712h4.5v4.5c0 .2174.14043.4098.34741.4762.20699.0663.43312-.0087.55946-.1856l5.00003-6.99998c.1088-.1524.1234-.35287.0377-.51941-.0857-.16653-.2573-.27121-.4446-.27121h-4.5zm0 5.5v4.9398l3.5284-4.9398zm-1 1v-4.93976l-3.5284 4.93976z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            ),
            title: "Supabase",
            description:
              "Open-source Firebase alternative. Auth, Database, Storage.",
          },
          {
            icon: (
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                className="w-12 h-12 fill-current"
              >
                <path d="M25.21,24.21,12.739,27.928a.525.525,0,0,1-.667-.606L16.528,5.811a.43.43,0,0,1,.809-.094l8.249,17.661A.6.6,0,0,1,25.21,24.21Zm2.139-.878L17.8,2.883h0A1.531,1.531,0,0,0,16.491,2a1.513,1.513,0,0,0-1.4.729L4.736,19.648a1.592,1.592,0,0,0,.018,1.7l5.064,7.909a1.628,1.628,0,0,0,1.83.678l14.7-4.383a1.6,1.6,0,0,0,1-2.218Z" />
              </svg>
            ),
            title: "Prisma ORM",
            description: "Type-safe database access with Prisma Client.",
          },
        ]}
      />
      {/* <PricingGrid
        title="Pricing"
        subtitle="Flexible plans for every team."
        items={[
          {
            title: "Basic",
            price: "Free",
            description: "For individuals and small projects.",
            features: [
              "Full source code",
              "100% Open-source",
              "Community support",
              "Free forever",
              "No credit card required",
            ],
            buttonText: "Get Started",
            buttonHref: "stackServerApp.urls.signUp",
          },
          {
            title: "Pro",
            price: "$0.00",
            description: "Ideal for growing teams and businesses.",
            features: [
              "Full source code",
              "100% Open-source",
              "Community support",
              "Free forever",
              "No credit card required",
            ],
            buttonText: "Upgrade to Pro",
            isPopular: true,
            buttonHref: "stackServerApp.urls.signUp",
          },
          {
            title: "Enterprise",
            price: "Still Free",
            description: "For large organizations.",
            features: [
              "Full source code",
              "100% Open-source",
              "Community support",
              "Free forever",
              "No credit card required",
            ],
            buttonText: "Contact Us",
            buttonHref: "stackServerApp.urls.signUp",
          },
        ]}
      /> */}
    </>
  );
}
