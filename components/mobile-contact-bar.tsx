import Link from "next/link";
import { MessageSquareText, Phone } from "lucide-react";
import { telHref } from "@/lib/site";

/** Fixed bottom call / enquire actions on small screens. */
export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a
          href={telHref}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest-700 font-semibold text-white"
        >
          <Phone aria-hidden="true" className="size-4" />
          Call now
        </a>
        <Link
          href="/contact#enquiry"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-forest-700/30 bg-white font-semibold text-forest-800"
        >
          <MessageSquareText aria-hidden="true" className="size-4" />
          Enquire
        </Link>
      </div>
    </div>
  );
}
