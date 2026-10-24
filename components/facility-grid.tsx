import { facilities } from "@/lib/facilities";
import { Pending } from "./ui";
import { Reveal } from "./reveal";

export function FacilityGrid({ showPending = false }: { showPending?: boolean }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {facilities.map((facility, i) => {
        const Icon = facility.icon;
        return (
          <li key={facility.id}>
            <Reveal delay={Math.min(i, 4) * 0.05} className="h-full">
              <div className="h-full rounded-3xl border border-line bg-white p-6 transition duration-300 hover:border-forest-600/40 hover:shadow-[0_14px_32px_-24px_rgba(31,77,58,0.5)]">
                <span className="grid size-12 place-items-center rounded-2xl bg-forest-50 text-forest-700">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-forest-800">{facility.name}</h3>
                <p className="mt-2 leading-relaxed text-muted">{facility.description}</p>
                {showPending && facility.pendingDetail && (
                  <div className="mt-4 space-y-2 border-t border-line pt-4">
                    <Pending />
                    <p className="text-sm text-muted">{facility.pendingDetail}</p>
                  </div>
                )}
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
