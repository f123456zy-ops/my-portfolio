import { useEffect, useState } from "react";

function observerIsAvailable() {
  return typeof window !== "undefined" && typeof window.IntersectionObserver === "function";
}

export function useSectionObserver(ids) {
  const idsKey = ids.join("\u001f");
  const [visibleIds, setVisibleIds] = useState(() =>
    observerIsAvailable() ? new Set() : new Set(ids),
  );
  const [activeId, setActiveId] = useState(ids[0] ?? null);

  useEffect(() => {
    const sectionIds = idsKey ? idsKey.split("\u001f") : [];
    if (!observerIsAvailable()) {
      setVisibleIds(new Set(sectionIds));
      setActiveId(sectionIds[0] ?? null);
      return undefined;
    }

    const targets = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (targets.length === 0) {
      return undefined;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        setVisibleIds((current) => {
          const next = new Set(current);
          for (const entry of entries) {
            if (entry.isIntersecting) {
              next.add(entry.target.id);
            }
          }
          return next;
        });

        const leadingEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (leadingEntry) {
          setActiveId(leadingEntry.target.id);
        }
      },
      { rootMargin: "-18% 0px -58%", threshold: [0.12, 0.35, 0.6] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [idsKey]);

  return { activeId, visibleIds };
}
