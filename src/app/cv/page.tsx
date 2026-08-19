import { siteConfig } from "@/site.config";
import { AcademicShell } from "@/components/academic/AcademicShell";

export default function CVPage() {
  const { cv } = siteConfig;
  return (
    <AcademicShell withSidebar={false} title="CV" subtitle={cv.headline}>
      <div className="flex flex-col gap-10">
        <p className="text-[var(--color-text)] leading-relaxed text-sm md:text-[15px]">{cv.summary}</p>

        {cv.pdfUrl && cv.pdfUrl !== "#" ? (
          <a
            href={cv.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 px-5 py-2.5 bg-[var(--color-background-strong)] hover:bg-[var(--color-background-strong-hover)] text-[var(--color-text-inverted)] rounded font-medium text-sm no-underline transition-colors"
          >
            Download CV (PDF)
          </a>
        ) : null}

        {/* Education */}
        <section>
          <h2 className="text-[14px] font-bold tracking-widest uppercase text-[var(--color-text-strong)] mb-4 border-b border-[var(--color-border-weak)] pb-2">Education</h2>
          <div className="grid gap-4">
            {cv.education.map((e) => (
              <div key={e.degree} className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[15px] font-semibold text-[var(--color-text-strong)]">{e.degree}</h3>
                  <span className="text-xs font-mono text-[var(--color-text-weak)]">{e.year}</span>
                </div>
                <p className="text-sm text-[var(--color-text)]">{e.school}</p>
                <p className="text-xs text-[var(--color-text-weak)]">{e.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-[14px] font-bold tracking-widest uppercase text-[var(--color-text-strong)] mb-4 border-b border-[var(--color-border-weak)] pb-2">Experience</h2>
          <div className="grid gap-6">
            {cv.experience.map((job) => (
              <div key={job.role + job.org} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[15px] font-semibold text-[var(--color-text-strong)]">
                    {job.role} <span className="font-normal text-[var(--color-text)]">· {job.org}</span>
                  </h3>
                  <span className="text-xs font-mono text-[var(--color-text-weak)]">{job.period}</span>
                </div>
                <ul className="list-disc pl-5 flex flex-col gap-1.5 text-sm text-[var(--color-text)] leading-relaxed">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-[14px] font-bold tracking-widest uppercase text-[var(--color-text-strong)] mb-4 border-b border-[var(--color-border-weak)] pb-2">Skills</h2>
          <div className="grid gap-3 text-sm">
            <p><strong className="text-[var(--color-text-strong)]">Programming:</strong> <span className="text-[var(--color-text)]">{cv.skills.programming.join(" · ")}</span></p>
            <p><strong className="text-[var(--color-text-strong)]">Networking:</strong> <span className="text-[var(--color-text)]">{cv.skills.networking.join(" · ")}</span></p>
            <p><strong className="text-[var(--color-text-strong)]">Infra:</strong> <span className="text-[var(--color-text)]">{cv.skills.infra.join(" · ")}</span></p>
            <p><strong className="text-[var(--color-text-strong)]">Automation:</strong> <span className="text-[var(--color-text)]">{cv.skills.automation.join(" · ")}</span></p>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-[14px] font-bold tracking-widest uppercase text-[var(--color-text-strong)] mb-4 border-b border-[var(--color-border-weak)] pb-2">Certifications</h2>
          <ul className="list-disc pl-5 flex flex-col gap-1 text-sm text-[var(--color-text)]">
            {cv.certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        {/* Interests */}
        <section>
          <h2 className="text-[14px] font-bold tracking-widest uppercase text-[var(--color-text-strong)] mb-4 border-b border-[var(--color-border-weak)] pb-2">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {cv.interests.map((i) => (
              <span key={i} className="text-xs font-mono px-2.5 py-1.5 rounded-full bg-[var(--color-background-weak)] text-[var(--color-text)] border border-[var(--color-border-weak)]">
                {i}
              </span>
            ))}
          </div>
        </section>
      </div>
    </AcademicShell>
  );
}
