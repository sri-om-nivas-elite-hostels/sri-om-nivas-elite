import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-terracotta-700">Page not found</p>
      <h1 className="mt-3 text-4xl font-semibold text-forest-800">We couldn&apos;t find that page</h1>
      <p className="mt-4 text-lg text-muted">The page may have moved. Try one of the links below.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/">Go to home</ButtonLink>
        <ButtonLink href="/rooms" variant="secondary">
          View rooms
        </ButtonLink>
      </div>
    </Container>
  );
}
