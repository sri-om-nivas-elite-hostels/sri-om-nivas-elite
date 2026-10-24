import { Mail, Phone } from "lucide-react";
import { mailtoHref, site, telHref } from "@/lib/site";
import { ButtonLink, Container, buttonClass } from "./ui";

export function CtaBand({
  title = "Ready to talk about a room?",
  text = "Call us or send an enquiry to check current availability, deposits and what is included.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-forest-700 px-6 py-12 text-center sm:px-12 sm:py-16">
          <div aria-hidden="true" className="absolute -right-16 -top-16 size-56 rounded-full bg-terracotta-500/25" />
          <div aria-hidden="true" className="absolute -bottom-20 -left-10 size-56 rounded-full bg-forest-600/60" />
          <div className="relative">
            <h2 id="cta-title" className="text-3xl font-semibold text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-forest-50">{text}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact#enquiry" variant="accent">
                Enquire now
              </ButtonLink>
              <a href={telHref} className={buttonClass("secondary", "!border-transparent")}>
                <Phone aria-hidden="true" className="size-4" />
                {site.phone.display}
              </a>
            </div>
            <a
              href={mailtoHref}
              className="mt-6 inline-flex items-center gap-2 break-all text-forest-50 underline underline-offset-4 hover:text-white"
            >
              <Mail aria-hidden="true" className="size-4 shrink-0" />
              {site.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
