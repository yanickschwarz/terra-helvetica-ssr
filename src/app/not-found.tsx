import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-medium">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Diese Seite wurde nicht gefunden</p>
        <Link href="/" className="text-primary underline hover:text-primary/90">
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
