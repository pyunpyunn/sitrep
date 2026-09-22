import { createFileRoute } from "@tanstack/react-router";
import {
  Archive,
  Check,
  ChevronDown,
  Download,
  FileCheck2,
  FileSpreadsheet,
  MoreHorizontal,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Situation Reporting | BDRRMC Operations" },
      {
        name: "description",
        content: "Generate, review, export, and archive official barangay disaster situation reports.",
      },
      { property: "og:title", content: "Situation Reporting | BDRRMC Operations" },
      {
        property: "og:description",
        content: "Generate, review, export, and archive official barangay disaster situation reports.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SituationReportPage,
});

const defaultEvent = { id: "typhoon", label: "Typhoon Maring — October 24, 2026", type: "Tropical cyclone", declared: "Oct 24, 2026 · 04:00", finished: "Ongoing", scope: "Puroks 1–7" };

const events = [
  defaultEvent,
  { id: "flood", label: "Flash Flood — September 18, 2026", type: "Flash flood", declared: "Sep 18, 2026 · 21:15", finished: "Sep 20, 2026 · 10:00", scope: "Puroks 3–6" },
];

const snapshots = [
  { number: "SITREP-2026-014", event: "Typhoon Maring", date: "Oct 24, 2026 · 09:14", status: "Draft" },
  { number: "SITREP-2026-013", event: "Typhoon Maring", date: "Oct 24, 2026 · 06:00", status: "Archived" },
  { number: "SITREP-2026-012", event: "Flash Flood", date: "Sep 20, 2026 · 10:20", status: "Archived" },
];

const population = [
  ["Purok 1", "142", "112", "18", "4", "8"],
  ["Purok 2", "126", "99", "21", "2", "4"],
  ["Purok 3", "168", "103", "45", "8", "12"],
  ["Purok 4", "154", "88", "51", "6", "9"],
];

function SituationReportPage() {
  const [eventId, setEventId] = useState("typhoon");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState("Typhoon Maring SitRep summary loaded.");
  const event = events.find((item) => item.id === eventId) ?? defaultEvent;

  function notify(message: string) {
    setNotice(message);
    setMenuOpen(false);
  }

  return (
    <main className="sitrep-page">
      <header className="workspace-header">
        <div className="workspace-header-inner">
          <div>
            <div className="workspace-kicker"><span /> Emergency Operations Center</div>
            <h1>Situation Reporting</h1>
            <p>Official incident record and report generation</p>
          </div>
          <div className="header-actions">
            <ActionButton icon={<Download size={16} />} label="Export PDF" onClick={() => notify("SitRep PDF downloaded.")} />
            <ActionButton icon={<FileCheck2 size={16} />} label="Generate report" primary onClick={() => setModalOpen(true)} />
            <div className="action-menu">
              <button className="icon-button" aria-label="More report actions" title="More report actions" onClick={() => setMenuOpen((open) => !open)}>
                <MoreHorizontal size={19} />
              </button>
              {menuOpen && (
                <div className="action-menu-popover">
                  <MenuButton icon={<Archive size={16} />} label="Archive current SitRep" onClick={() => notify("Current SitRep is ready to archive after approval.")} />
                  <MenuButton icon={<FileSpreadsheet size={16} />} label="Export Excel" onClick={() => notify("SitRep Excel downloaded.")} />
                  <MenuButton icon={<Archive size={16} />} label="View SitRep archive" onClick={() => notify("SitRep archive selected.")} />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="workspace-shell">
        <section className="event-workspace" aria-label="Disaster event selection">
          <div className="event-selector">
            <label htmlFor="event">Disaster event log</label>
            <div className="select-wrap">
              <select id="event" value={eventId} onChange={(e) => { setEventId(e.target.value); setNotice(`${events.find((item) => item.id === e.target.value)?.label.split(" — ")[0]} SitRep summary loaded.`); }}>
                {events.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}
              </select>
              <ChevronDown size={16} aria-hidden="true" />
            </div>
          </div>
          <div className="event-context">
            <DataItem label="Disaster type" value={event.type} />
            <DataItem label="Date declared" value={event.declared} />
            <DataItem label="Date finished" value={event.finished} />
            <DataItem label="Scope" value={event.scope} />
          </div>
        </section>

        {notice && <div className="status-message"><Check size={15} /> {notice}</div>}

        <div className="document-label-row">
          <div>
            <span className="section-eyebrow">Live preview</span>
            <h2>Official situation report</h2>
          </div>
          <span className="draft-badge">Draft</span>
        </div>

        <article className="report-document" aria-label="BDRRMC situation report document preview">
          <header className="report-masthead">
            <p>Republic of the Philippines</p>
            <strong>Barangay Disaster Risk Reduction and Management Committee</strong>
            <span>Emergency Operations Center</span>
            <h2>Situation Report</h2>
            <h3>{event.label.split(" — ")[0]}</h3>
          </header>

          <div className="report-meta">
            <DataItem label="Disaster type" value={event.type} />
            <DataItem label="Date declared" value={event.declared} />
            <DataItem label="Date finished" value={event.finished} />
            <DataItem label="Alert level" value="Signal No. 3" />
            <DataItem label="Reporting period" value="Oct 24 · 06:00–12:00" />
            <DataItem label="Area coverage" value="Puroks 1–7" />
            <DataItem label="Situation status" value="Response ongoing" />
            <DataItem label="Prepared by" value="EOC Operations Desk" />
          </div>

          <ReportSection number="I" title="Situation Overview">
            <MetricGrid columns="five">
              <Metric label="Condition" value="Heavy rainfall" />
              <Metric label="Wind" value="95 km/h" />
              <Metric label="Rainfall" value="140 mm" />
              <Metric label="Temperature" value="26°C" />
              <Metric label="Source" value="PAGASA" />
            </MetricGrid>
            <p className="report-note">The BDRRMC EOC is monitoring household status, evacuation center capacity, response team movement, and resource requests linked to the declared disaster event.</p>
          </ReportSection>

          <ReportSection number="II" title="Affected Population">
            <MetricGrid>
              <Metric label="Total HH affected" value="590" />
              <Metric label="Safe total" value="402" detail="68.1%" tone="safe" />
              <Metric label="Evacuated" value="135" detail="22.9%" />
              <Metric label="Unsafe / At risk" value="20" detail="3.4%" tone="danger" />
              <Metric label="Unchecked" value="33" detail="5.6%" />
              <Metric label="Deaths" value="0" />
              <Metric label="Missing" value="2" tone="warning" />
              <Metric label="Injured" value="8" tone="warning" />
            </MetricGrid>
            <div className="progress-row"><span>Reporting progress</span><strong>94.4% checked</strong><div><i /></div></div>
            <DataTable headers={["Purok", "Households in scope", "Safe", "Evacuated", "Unsafe", "Unchecked"]} rows={population} />
          </ReportSection>

          <ReportSection number="III" title="Casualties and Immediate Needs">
            <MetricGrid>
              <Metric label="Deaths" value="0 confirmed" tone="danger" />
              <Metric label="Missing" value="2 persons" tone="warning" />
              <Metric label="Injured" value="8 persons" tone="warning" />
              <Metric label="Rescued" value="47 assisted" tone="safe" />
            </MetricGrid>
          </ReportSection>

          <ReportSection number="IV" title="Evacuation Centers">
            <DataTable headers={["Center", "Families", "Persons", "Capacity"]} rows={[["Barangay Covered Court", "48", "176", "74% occupied"], ["San Isidro Elementary School", "35", "142", "63% occupied"]]} />
          </ReportSection>

          <ReportSection number="V" title="Rescue Operations Timeline">
            <DataTable headers={["Team", "Deployed at", "Area", "HH reached", "Outcomes"]} rows={[["Alpha Rescue", "06:20", "Puroks 3–4", "42", "18 evacuated"], ["Bravo Medical", "07:05", "Puroks 5–6", "31", "8 treated"]]} />
          </ReportSection>

          <ReportSection number="VI" title="Initial Damage Assessment">
            <MetricGrid columns="three">
              <Metric label="Partially damaged houses" value="27" tone="warning" />
              <Metric label="Totally damaged houses" value="4" tone="danger" />
              <Metric label="Estimated cost" value="₱2,450,000" />
            </MetricGrid>
          </ReportSection>

          <ReportSection number="VII" title="Resources Deployed and Requests">
            <DataTable headers={["Item / request", "Quantity", "Source", "Status"]} rows={[["Family food packs", "300", "MDRRMO", "In transit"], ["Drinking water", "500 L", "Barangay reserve", "Deployed"], ["Hygiene kits", "120", "City DRRMO", "Approved"]]} />
          </ReportSection>

          <ReportSection number="VIII" title="Actions Taken and Recommendations">
            <div className="action-ledger">
              <DataItem label="Incident Command" value="Activated EOC and coordinated field teams" />
              <DataItem label="Evacuation" value="Opened two centers and assigned registration desks" />
              <DataItem label="Health" value="Deployed mobile medical team to Purok 6" />
            </div>
          </ReportSection>

          <ReportSection number="IX" title="Next Actions and Report Schedule">
            <div className="signature-grid">
              <DataItem label="Next SitRep" value="Oct 24, 2026 · 18:00" />
              <DataItem label="Submitted by" value="EOC Operations Desk" />
              <DataItem label="Reviewed by" value="BDRRMC Chairperson" />
            </div>
          </ReportSection>
        </article>

        <section className="saved-section">
          <div className="saved-heading"><div><span className="section-eyebrow">Report register</span><h2>Saved SitRep snapshots</h2></div><span>{snapshots.length} latest</span></div>
          <div className="saved-list">
            {snapshots.map((snapshot) => (
              <button key={snapshot.number} onClick={() => notify(`${snapshot.number} loaded from saved snapshots.`)}>
                <div><strong>{snapshot.number}</strong><span>{snapshot.event} · {snapshot.date}</span></div>
                <em className={snapshot.status === "Draft" ? "is-draft" : ""}>{snapshot.status}</em>
              </button>
            ))}
          </div>
        </section>
      </div>

      {modalOpen && <GenerateDialog eventName={event.label.split(" — ")[0]} onClose={() => setModalOpen(false)} onGenerate={() => { setModalOpen(false); notify("SITREP-2026-015 generated and locked."); }} onExport={() => notify("SitRep PDF downloaded.")} />}
    </main>
  );
}

function ActionButton({ icon, label, primary, onClick }: { icon: ReactNode; label: string; primary?: boolean; onClick: () => void }) {
  return <button className={primary ? "action-button primary" : "action-button"} onClick={onClick}>{icon}<span>{label}</span></button>;
}

function MenuButton({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: () => void }) {
  return <button onClick={onClick}>{icon}<span>{label}</span></button>;
}

function DataItem({ label, value }: { label: string; value: string }) {
  return <div className="data-item"><span>{label}</span><strong>{value}</strong></div>;
}

function ReportSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <section className="report-section"><div className="report-section-heading"><span>{number}</span><h4>{title}</h4></div>{children}</section>;
}

function MetricGrid({ children, columns = "four" }: { children: ReactNode; columns?: "three" | "four" | "five" }) {
  return <div className={`metric-grid columns-${columns}`}>{children}</div>;
}

function Metric({ label, value, detail, tone = "" }: { label: string; value: string; detail?: string; tone?: string }) {
  return <div className={`metric ${tone}`}><span>{label}</span><strong>{value}</strong>{detail && <small>{detail}</small>}</div>;
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return <div className="table-scroll"><table><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function GenerateDialog({ eventName, onClose, onGenerate, onExport }: { eventName: string; onClose: () => void; onGenerate: () => void; onExport: () => void }) {
  return <div className="dialog-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="generate-dialog" role="dialog" aria-modal="true" aria-labelledby="generate-title">
      <header><div><span>Generate official report</span><h2 id="generate-title">{eventName} SitRep snapshot</h2></div><button className="icon-button" onClick={onClose} aria-label="Close generator"><X size={18} /></button></header>
      <div className="dialog-body">
        <p className="dialog-guidance">Generate a locked SitRep after verifying the selected event details.</p>
        <div className="form-grid">
          <Field label="SitRep number" value="SITREP-2026-015" />
          <Field label="Selected event" value={eventName} readOnly />
          <Field label="Period start" value="2026-10-24T06:00" type="datetime-local" />
          <Field label="Period end" value="2026-10-24T12:00" type="datetime-local" />
          <Field label="Prepared by" value="EOC Operations Desk" />
          <Field label="Reviewed by" value="BDRRMC Chairperson" />
        </div>
        <div className="checklist">{["Household status verified", "Dispatch logs included", "Weather source attached", "Resources and requests included"].map((item) => <label key={item}><input type="checkbox" defaultChecked /><span><Check size={13} /></span>{item}</label>)}</div>
      </div>
      <footer><button className="action-button" onClick={onClose}>Cancel</button><button className="action-button" onClick={onExport}><Download size={16} /> Export PDF</button><button className="action-button primary" onClick={onGenerate}><FileCheck2 size={16} /> Generate &amp; lock</button></footer>
    </section>
  </div>;
}

function Field({ label, value, type = "text", readOnly = false }: { label: string; value: string; type?: string; readOnly?: boolean }) {
  return <label className="field"><span>{label}</span><input type={type} defaultValue={value} readOnly={readOnly} /></label>;
}