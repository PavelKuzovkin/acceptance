package org.providcy.acceptance.dto.search;

import lombok.Data;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

@Data
public abstract class BaseSearchDTO {
    private String timezone;

    public Map<String, String> getDateRange(String shortDate) {
        Map<String, String> range = new HashMap<>();

        LocalDateTime dateTo = LocalDateTime.ofInstant(Instant.now(), ZoneId.of(timezone));
        LocalDateTime dateFrom = LocalDateTime.ofInstant(Instant.now(), ZoneId.of(timezone));
        if (shortDate.equals("last_24_hours")) {
            dateFrom = dateFrom.minusDays(1);
        }
        if (shortDate.equals("today")) {
            dateFrom = dateFrom.withHour(0).withMinute(0).withSecond(0);
        }
        if (shortDate.equals("week")) {
            dateFrom = dateFrom.minusWeeks(1);
        }
        if (shortDate.equals("this_month")) {
            dateFrom = dateFrom.withDayOfMonth(1).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        }
        if (shortDate.equals("last_month")) {
            dateFrom = dateFrom.minusMonths(1).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
            dateTo = dateTo.withDayOfMonth(1).minusDays(1).withHour(23).withMinute(59).withSecond(59);
        }
        if (shortDate.equals("month")) {
            dateFrom = dateFrom.minusMonths(1);
        }

        range.put("from", dateFrom.format(getUtcDateFormatter()));
        range.put("to", dateTo.format(getUtcDateFormatter()));

        return range;
    }

    public Instant getDateFromString(String date) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

        TimeZone t;
        try {
            t = TimeZone.getTimeZone(timezone);
        } catch (Exception e) {
            t = TimeZone.getTimeZone("UTC");
        }

        format.setTimeZone(t);
        if (date != null && !date.isEmpty()) {
            return format.parse(date).toInstant();
        } else {
            return null;
        }
    }

    public DateTimeFormatter getUtcDateFormatter() {
        return DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
                .withZone(ZoneOffset.UTC);
    }
}
