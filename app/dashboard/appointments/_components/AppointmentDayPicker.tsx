"use client";
import { addDaysYMD, weekdayYMD, ymdPKT } from "@/lib/dates";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Skeleton,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useMemo, useState } from "react";
import {
  appointmentTypeOptions,
  badgeColorForAppointments,
} from "../../_components/appConstants";
import {
  useUpcomingAppointments,
  type UpcomingAppointment,
} from "./useUpcomingAppointments";

const WEEKS = 4;
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Monday on or before a "YYYY-MM-DD" date. */
const mondayOf = (ymd: string) => addDaysYMD(ymd, -((weekdayYMD(ymd) + 6) % 7));

const fmt = (ymd: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(`${ymd}T00:00:00Z`).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    ...opts,
  });

const typeColor = (type: string) => badgeColorForAppointments(type) ?? "gray";

interface Props {
  /** Selected date as "YYYY-MM-DD", or "" for none. */
  value: string;
  onChange: (ymd: string) => void;
  /** When rescheduling: leave this appointment out of the counts… */
  excludeId?: string;
  /** …and mark its current date. */
  currentDate?: string;
}

/**
 * A four-week calendar showing how many patients are already booked each
 * day (bar coloured by appointment type), with the list of patients for the
 * selected day, so a date can be picked where there's room.
 */
const AppointmentDayPicker = ({
  value,
  onChange,
  excludeId,
  currentDate,
}: Props) => {
  const today = ymdPKT(Date.now());
  const { data, isLoading, isError } = useUpcomingAppointments();
  const [rangeStart, setRangeStart] = useState(() => mondayOf(value || today));

  const byDay = useMemo(() => {
    const map = new Map<string, UpcomingAppointment[]>();
    for (const a of data ?? []) {
      if (a.appointment_id === excludeId) continue;
      const day = ymdPKT(a.date_appointment);
      map.set(day, [...(map.get(day) ?? []), a]);
    }
    return map;
  }, [data, excludeId]);

  const days = Array.from({ length: WEEKS * 7 }, (_, i) =>
    addDaysYMD(rangeStart, i),
  );
  const busiest = Math.max(1, ...days.map((d) => byDay.get(d)?.length ?? 0));
  const canGoBack = rangeStart > mondayOf(today);
  const rangeEnd = days[days.length - 1];

  const pick = (ymd: string) => {
    if (!ymd) return;
    onChange(ymd);
    if (ymd < rangeStart || ymd > rangeEnd) setRangeStart(mondayOf(ymd));
  };

  const selected = value ? (byDay.get(value) ?? []) : [];

  return (
    <Box>
      {/* Range navigation and a free date box for dates further out */}
      <Flex justify="between" align="center" gap="2" mb="2" wrap="wrap">
        <Flex align="center" gap="2">
          <IconButton
            type="button"
            size="1"
            variant="soft"
            aria-label="Previous weeks"
            disabled={!canGoBack}
            onClick={() => setRangeStart(addDaysYMD(rangeStart, -7 * WEEKS))}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Text size="2" weight="medium">
            {fmt(rangeStart, { day: "numeric", month: "short" })} –{" "}
            {fmt(rangeEnd, { day: "numeric", month: "short", year: "numeric" })}
          </Text>
          <IconButton
            type="button"
            size="1"
            variant="soft"
            aria-label="Next weeks"
            onClick={() => setRangeStart(addDaysYMD(rangeStart, 7 * WEEKS))}
          >
            <ChevronRightIcon />
          </IconButton>
        </Flex>
        <TextField.Root
          size="1"
          type="date"
          aria-label="Appointment date"
          min={today}
          value={value}
          onChange={(e) => pick(e.target.value)}
        />
      </Flex>

      {/* Legend */}
      <Flex gap="3" mb="2" wrap="wrap">
        {appointmentTypeOptions.map((o) => (
          <Flex key={o.value} align="center" gap="1">
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: `var(--${typeColor(o.value)}-9)`,
              }}
            />
            <Text size="1" color="gray">
              {o.label}
            </Text>
          </Flex>
        ))}
        {isError && (
          <Text size="1" color="red">
            Couldn&apos;t load existing bookings
          </Text>
        )}
      </Flex>

      {/* Calendar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          gap: 4,
        }}
      >
        {WEEKDAYS.map((d) => (
          <Text key={d} size="1" color="gray" align="center">
            {d}
          </Text>
        ))}
        {days.map((day, i) => {
          const appts = byDay.get(day) ?? [];
          const isPast = day < today;
          const isSelected = day === value;
          const dayNum = Number(day.slice(8));
          const counts = appointmentTypeOptions
            .map((o) => ({
              type: o.value,
              n: appts.filter((a) => a.type === o.value).length,
            }))
            .concat({
              type: "OTHER",
              n: appts.filter(
                (a) => !appointmentTypeOptions.some((o) => o.value === a.type),
              ).length,
            })
            .filter((c) => c.n > 0);
          return (
            <button
              key={day}
              type="button"
              disabled={isPast}
              onClick={() => pick(day)}
              aria-pressed={isSelected}
              aria-label={`${fmt(day, { weekday: "long", day: "numeric", month: "long" })}: ${appts.length} booked`}
              style={{
                minWidth: 0,
                padding: "4px 4px 5px",
                borderRadius: "var(--radius-2)",
                border: isSelected
                  ? "2px solid var(--accent-9)"
                  : "1px solid var(--gray-a5)",
                background: isSelected
                  ? "var(--accent-a3)"
                  : weekdayYMD(day) === 0
                    ? "var(--gray-a2)"
                    : "var(--color-panel-solid)",
                opacity: isPast ? 0.4 : 1,
                cursor: isPast ? "default" : "pointer",
                textAlign: "left",
                color: "var(--gray-12)",
              }}
            >
              <Flex justify="between" align="baseline" gap="1">
                <Text
                  size="1"
                  weight={day === today ? "bold" : "regular"}
                  color={day === today ? undefined : "gray"}
                  style={day === today ? { color: "var(--accent-11)" } : {}}
                >
                  {dayNum === 1 || i === 0
                    ? fmt(day, { day: "numeric", month: "short" })
                    : dayNum}
                </Text>
                {day === currentDate && (
                  <Text size="1" color="orange" weight="bold">
                    now
                  </Text>
                )}
              </Flex>
              <Text as="div" size="3" weight="bold" style={{ lineHeight: 1.2 }}>
                {isLoading ? (
                  <Skeleton>0</Skeleton>
                ) : appts.length ? (
                  appts.length
                ) : (
                  <span style={{ color: "var(--gray-a8)" }}>–</span>
                )}
              </Text>
              {/* Load bar: width relative to the busiest day shown */}
              <div
                style={{
                  display: "flex",
                  height: 4,
                  marginTop: 2,
                  borderRadius: 2,
                  overflow: "hidden",
                  width: `${(appts.length / busiest) * 100}%`,
                }}
              >
                {counts.map((c) => (
                  <div
                    key={c.type}
                    style={{
                      flex: c.n,
                      background: `var(--${typeColor(c.type)}-9)`,
                    }}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Who is booked on the selected day */}
      {value && (
        <Box mt="3" p="3" className="rounded-md border">
          <Flex justify="between" align="center" gap="2" wrap="wrap" mb="2">
            <Text size="2" weight="bold">
              {fmt(value, {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>
            <Text size="2" color="gray">
              {isLoading
                ? "Loading…"
                : `${selected.length} already booked`}
            </Text>
          </Flex>
          {selected.length > 0 ? (
            <Flex
              direction="column"
              gap="1"
              style={{ maxHeight: 180, overflowY: "auto" }}
            >
              {selected.map((a, i) => (
                <Flex key={a.appointment_id} gap="2" align="center">
                  <Text size="1" color="gray" style={{ width: 18 }}>
                    {i + 1}.
                  </Text>
                  <Badge size="1" color={typeColor(a.type)}>
                    {a.type}
                  </Badge>
                  <Text size="2" weight="medium" style={{ flexShrink: 0 }}>
                    {`${a.registration.first_name} ${a.registration.last_name}`.toUpperCase()}
                  </Text>
                  <Text size="1" color="gray" truncate>
                    {a.plan}
                  </Text>
                </Flex>
              ))}
            </Flex>
          ) : (
            !isLoading && (
              <Text size="2" color="gray">
                No one is booked on this day yet.
              </Text>
            )
          )}
        </Box>
      )}
    </Box>
  );
};

export default AppointmentDayPicker;
