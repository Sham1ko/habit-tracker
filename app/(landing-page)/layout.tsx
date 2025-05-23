import { ThemeProvider } from "next-themes";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen flex-col">
        <LandingHeader
          items={[
            { title: "Features", href: "/#features" },
            {
              title: "Github",
              href: "https://github.com/Sham1ko/habit-tracker",
              external: true,
            },
          ]}
        />
        <main className="flex-1">{children}</main>
        <LandingFooter
          builtBy="Sham1ko"
          builtByLink="https://github.com/Sham1ko"
          githubLink="https://github.com/Sham1ko/habit-tracker"
          linkedinLink="https://www.linkedin.com/in/sham1ko/"
        />
      </div>
    </ThemeProvider>
  );
}
