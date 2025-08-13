import { Box, Button, Dialog, IconButton, SxProps, Theme, Typography } from "@mui/material";
import { DateTime, MonthNumbers } from "luxon";
import { useState } from "react";
import { COLORS } from "styling/constants";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export interface CalendarEntry {
    value: string;
    date: DateTime;
    isRecurring?: boolean; // Add this flag to identify recurring entries
}

interface CalendarProps {
    title: string;
    data: Record<string, CalendarEntry[]>;
    cellStyling?: SxProps<Theme>;
    opener?: React.ReactNode;
    closeDrawer?: () => void;
    closeOnCalendarClose?: boolean;
    ignoreOpener?: boolean;
    onClose?: () => void; // Add onClose prop for external close handling
}

export default function Calendar({
    title,
    data,
    cellStyling,
    opener,
    closeDrawer,
    closeOnCalendarClose,
    onClose
}: CalendarProps) {
    const [selectedDate, setSelectedDate] = useState(DateTime.now().toUTC());
    const [currentMonth, setCurrentMonth] = useState(selectedDate.month);
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysInMonth = DateTime.local(selectedDate.year, currentMonth).daysInMonth ?? 0;

    console.log(data)

    const handleDateChange = (date: DateTime) => {
        // Create a UTC date at the same calendar date
        // This preserves the day number regardless of timezone
        const utcDate = DateTime.utc(
            date.year,
            date.month,
            date.day,
            0, 0, 0, 0
        );

        setSelectedDate(utcDate.toUTC() as DateTime<true>);
        if (utcDate.month !== currentMonth) {
            setCurrentMonth(utcDate.month as MonthNumbers);
        }
    };

    const handleMonthChange = (newMonth: MonthNumbers) => {
        setCurrentMonth(newMonth);
        if (currentMonth === 12 && newMonth === 1) {
            setSelectedDate(DateTime.utc(selectedDate.year + 1, newMonth, selectedDate.day).toUTC() as DateTime<true>);
        } else if (currentMonth === 1 && newMonth === 12) {
            setSelectedDate(DateTime.utc(selectedDate.year - 1, newMonth, selectedDate.day).toUTC() as DateTime<true>);
        } else {
            setSelectedDate(DateTime.utc(selectedDate.year, newMonth, selectedDate.day).toUTC() as DateTime<true>);
        }
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ padding: 2, backgroundColor: COLORS.quiz.background, color: "white", borderRadius: 2 }}>
                <Typography variant="h6">{title}</Typography>
                {/* Calendar implementation goes here */}
                <Box>
                    {/* Render calendar grid here */}
                    <Box width={"100%"} display={"flex"} justifyContent={"center"} position={"relative"}>
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                            <IconButton onClick={() => handleMonthChange(currentMonth - 1 > 0 ? currentMonth - 1 as MonthNumbers : 12 as MonthNumbers)}>
                                <ArrowBackIosNewIcon sx={{ color: "white" }} fontSize="small" />
                            </IconButton>
                            <Box width={"150px"} textAlign={"center"}>{selectedDate.monthLong} {selectedDate.year}</Box>
                            <IconButton onClick={() => handleMonthChange(currentMonth + 1 <= 12 ? currentMonth + 1 as MonthNumbers : 1 as MonthNumbers)}>
                                <ArrowForwardIosIcon sx={{ color: "white" }} fontSize="small" />
                            </IconButton>
                        </Box>
                        <Button sx={{ position: "absolute", right: 0, color: "white" }} onClick={() => handleDateChange(DateTime.now().toUTC())}>
                            Today
                        </Button>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
                        {/* Render weekday headers */}
                        {weekdays.map(day => (
                            <Box key={day} sx={{ textAlign: 'center', fontWeight: 'bold', padding: 1 }}>
                                {day}
                            </Box>
                        ))}

                        {/* Calculate first day of month offset and show previous month days */}
                        {(() => {
                            const firstDayOffset = DateTime.local(selectedDate.year, currentMonth, 1).weekday % 7;
                            const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
                            const prevMonthYear = currentMonth === 1 ? selectedDate.year - 1 : selectedDate.year;
                            const daysInPrevMonth = DateTime.local(prevMonthYear, prevMonth).daysInMonth ?? 0;

                            return Array.from({ length: firstDayOffset }, (_, i) => {
                                const day = daysInPrevMonth - firstDayOffset + i + 1;
                                return (
                                    <Box
                                        key={`prev-${i}`}
                                        sx={{
                                            padding: 1,
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            color: 'text.disabled',
                                            bgcolor: 'action.hover'
                                        }}
                                        onClick={() => handleDateChange(DateTime.local(prevMonthYear, prevMonth, day))}
                                    >
                                        {day}
                                    </Box>
                                );
                            });
                        })()}

                        {/* Render current month days */}
                        {Array.from({ length: daysInMonth }, (_, i) => (
                            <Box
                                sx={{
                                    border: "1px solid white",
                                    padding: 1,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    bgcolor: selectedDate.day === i + 1 ? COLORS.quiz.secondary : 'inherit',
                                    ...cellStyling
                                }}
                                onClick={() => handleDateChange(DateTime.local(selectedDate.year, currentMonth, i + 1))}
                                key={i}
                            >
                                {i + 1}
                                <Box>
                                    <Typography fontWeight={"bold"} >
                                        {(() => {
                                            const currentDate = DateTime.local(selectedDate.year, currentMonth, i + 1, 0).toISODate() || '';
                                            // Get regular entries for this date
                                            const regularEntries = data[currentDate] || [];

                                            // Look for recurring entries (like birthdays) that match this month/day
                                            // But ONLY include recurring entries that aren't already in the regular entries for this date
                                            const recurringEntries = Object.values(data)
                                                .flat()
                                                .filter(entry =>
                                                    entry.isRecurring &&
                                                    entry.date.month === currentMonth &&
                                                    entry.date.day === (i + 1) &&
                                                    // Ensure this entry isn't already in regularEntries
                                                    !regularEntries.some(regEntry =>
                                                        regEntry.value === entry.value &&
                                                        regEntry.isRecurring
                                                    )
                                                );

                                            // Combine both types of entries
                                            const allEntries = [...regularEntries, ...recurringEntries];

                                            return allEntries.map((entry, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        fontSize: allEntries.length > 1 ? '0.75rem' : '1rem',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        color: COLORS.calendar.entryColors[index % COLORS.calendar.entryColors.length]
                                                    }}
                                                >
                                                    {entry.value}
                                                </Box>
                                            ));
                                        })()}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}

                        {/* Fill in remaining cells with next month days */}
                        {(() => {
                            const totalCellsUsed = (DateTime.local(selectedDate.year, currentMonth, 1).weekday % 7) + daysInMonth;
                            const nextMonthDays = 42 - totalCellsUsed; // 6 weeks × 7 days = 42 total cells
                            const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
                            const nextMonthYear = currentMonth === 12 ? selectedDate.year + 1 : selectedDate.year;

                            return Array.from({ length: nextMonthDays }, (_, i) => (
                                <Box
                                    key={`next-${i}`}
                                    sx={{
                                        padding: 1,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        color: 'text.disabled',
                                        bgcolor: 'action.hover'
                                    }}
                                    onClick={() => handleDateChange(DateTime.local(nextMonthYear, nextMonth, i + 1))}
                                >
                                    {i + 1}
                                </Box>
                            ));
                        })()}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}