"use client";
import { Box, Dialog, IconButton, SegmentedControl } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import TodaysPatientsSideBar from "../TodaysPatientsSideBar";
import PatientBar, { type PatientBarPatient } from "./PatientBar";

type Pane = "summary" | "history";
type MobileView = "consultation" | Pane;

const QUEUE_OPEN_KEY = "consultation.queueOpen";
const LG_QUERY = "(min-width: 1024px)";

interface Props {
  consultationId: string;
  status: string;
  patient: PatientBarPatient;
  form: React.ReactNode;
  summary: React.ReactNode;
  history: React.ReactNode;
}

/**
 * Layout for the consultation page.
 * - Large screens (≥1024px): collapsible queue column | form | sticky side
 *   panel with Summary / History tabs.
 * - Smaller screens: queue in a slide-in drawer; a Consultation / Summary /
 *   History switch above full-width content.
 * Each section is rendered once and shown/hidden with CSS, so form state is
 * never duplicated. History (which calls HMIS) mounts the first time it is
 * shown.
 */
const ConsultationWorkspace = ({
  consultationId,
  status,
  patient,
  form,
  summary,
  history,
}: Props) => {
  const [queueOpen, setQueueOpen] = useState(true); // large screens
  const [drawerOpen, setDrawerOpen] = useState(false); // smaller screens
  const [mobileView, setMobileView] = useState<MobileView>("consultation");
  const [sideTab, setSideTab] = useState<Pane>("summary");
  const [historyMounted, setHistoryMounted] = useState(false);

  // Remembered per browser; storage may be unavailable (private mode etc.).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(QUEUE_OPEN_KEY);
      if (saved !== null) setQueueOpen(saved === "true");
    } catch {}
  }, []);
  const setQueueOpenRemembered = (open: boolean) => {
    setQueueOpen(open);
    try {
      localStorage.setItem(QUEUE_OPEN_KEY, String(open));
    } catch {}
  };

  useEffect(() => {
    if (sideTab === "history" || mobileView === "history")
      setHistoryMounted(true);
  }, [sideTab, mobileView]);

  const onQueueClick = () => {
    if (window.matchMedia(LG_QUERY).matches) setQueueOpenRemembered(!queueOpen);
    else setDrawerOpen(true);
  };

  // Which side pane is visible: by mobileView below lg, by sideTab at lg+.
  const paneClass = (pane: Pane) =>
    `${mobileView === pane ? "block" : "hidden"} ${sideTab === pane ? "lg:block" : "lg:hidden"}`;

  return (
    <Box>
      <PatientBar
        consultationId={consultationId}
        status={status}
        patient={patient}
        onQueueClick={onQueueClick}
      />

      {/* Smaller screens: queue drawer */}
      <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
        <Dialog.Content
          aria-describedby={undefined}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100dvh",
            maxHeight: "100dvh",
            width: "min(22rem, 88vw)",
            margin: 0,
            borderRadius: 0,
            overflowY: "auto",
          }}
        >
          <Dialog.Title className="sr-only">Today&apos;s patients</Dialog.Title>
          <Dialog.Close>
            <IconButton
              variant="ghost"
              color="gray"
              aria-label="Close"
              style={{ position: "absolute", top: 12, right: 12 }}
            >
              <Cross2Icon />
            </IconButton>
          </Dialog.Close>
          <TodaysPatientsSideBar
            id={consultationId}
            onNavigate={() => setDrawerOpen(false)}
          />
        </Dialog.Content>
      </Dialog.Root>

      {/* Smaller screens: what to show */}
      <Box mb="3" display={{ initial: "block", md: "none" }}>
        <SegmentedControl.Root
          value={mobileView}
          onValueChange={(v) => setMobileView(v as MobileView)}
          size="2"
          style={{ width: "100%" }}
        >
          <SegmentedControl.Item value="consultation">
            Consultation
          </SegmentedControl.Item>
          <SegmentedControl.Item value="summary">Summary</SegmentedControl.Item>
          <SegmentedControl.Item value="history">History</SegmentedControl.Item>
        </SegmentedControl.Root>
      </Box>

      <div className="flex gap-4">
        {/* Large screens: collapsible queue column */}
        {queueOpen && (
          <aside
            aria-label="Today's patients"
            className="consultation-sticky-pane hidden w-60 shrink-0 self-start border-r pr-3 lg:block"
          >
            <TodaysPatientsSideBar id={consultationId} />
          </aside>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-4 lg:flex-row">
          <section
            aria-label="Consultation"
            className={`${mobileView === "consultation" ? "block" : "hidden"} min-w-0 flex-1 lg:block`}
          >
            {form}
          </section>

          <aside
            aria-label="Summary and history"
            className={`consultation-sticky-pane ${mobileView === "consultation" ? "hidden" : "block"} w-full lg:block lg:w-[24rem] lg:shrink-0 lg:self-start lg:rounded-md lg:border lg:p-3 xl:w-[28rem]`}
          >
            <Box mb="3" display={{ initial: "none", md: "block" }}>
              <SegmentedControl.Root
                value={sideTab}
                onValueChange={(v) => setSideTab(v as Pane)}
                size="1"
                style={{ width: "100%" }}
              >
                <SegmentedControl.Item value="summary">
                  Summary
                </SegmentedControl.Item>
                <SegmentedControl.Item value="history">
                  History
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </Box>
            <div className={paneClass("summary")}>{summary}</div>
            <div className={paneClass("history")}>
              {historyMounted && history}
            </div>
          </aside>
        </div>
      </div>
    </Box>
  );
};

export default ConsultationWorkspace;
