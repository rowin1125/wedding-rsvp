export class CustomDate {
    private date: Date;

    constructor(dateStr: string | Date) {
        if (typeof dateStr === 'string') {
            this.date = new Date(dateStr);
        } else {
            this.date = new Date(dateStr.getTime());
        }
    }

    /**
     * Get the date in UTC format.
     */
    toUTCString(): string {
        return this.date.toISOString();
    }

    /**
     * Convert the date to a specific timezone.
     * @param offsetMinutes Timezone offset in minutes (e.g., -240 for UTC-4)
     */
    toTimezone(offsetMinutes: number): CustomDate {
        const utcTime = this.date.getTime();
        const adjustedTime = utcTime + offsetMinutes * 60000;
        return new CustomDate(new Date(adjustedTime));
    }

    /**
     * Format the date to "yyyy-MM-ddThh:mm" format, with optional seconds and milliseconds.
     * @param includeSeconds If true, include ":ss" in the format.
     * @param includeMilliseconds If true, include ":ss.SSS" in the format.
     */
    formatForInput(
        includeSeconds = false,
        includeMilliseconds = false
    ): string {
        const year = this.date.getFullYear();
        const month = (this.date.getMonth() + 1).toString().padStart(2, '0');
        const day = this.date.getDate().toString().padStart(2, '0');
        const hours = this.date.getHours().toString().padStart(2, '0');
        const minutes = this.date.getMinutes().toString().padStart(2, '0');

        let formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

        if (includeSeconds || includeMilliseconds) {
            const seconds = this.date.getSeconds().toString().padStart(2, '0');
            formattedDate += `:${seconds}`;
        }

        if (includeMilliseconds) {
            const milliseconds = this.date
                .getMilliseconds()
                .toString()
                .padStart(3, '0');
            formattedDate += `.${milliseconds}`;
        }

        return formattedDate;
    }

    /**
     * Get the raw Date object.
     */
    getDate(): Date {
        return new Date(this.date.getTime());
    }
}
