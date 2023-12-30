import { LightningElement, wire } from 'lwc';

export default class DigitalClock extends LightningElement {
    currentTime = '';
    currentSeconds = '';
    currentDate = '';
    currentDay = '';

    updateClock() {
        const now = new Date();
        const optionsTime = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true, // Use 12-hour format
            timeZoneName: 'short',
        };
        
        this.currentTime = new Intl.DateTimeFormat(undefined, optionsTime).format(now);

        const optionsSeconds = {
            second: '2-digit',
        };
        this.currentSeconds = new Intl.DateTimeFormat(undefined, optionsSeconds).format(now);

        const optionsDate = {
            weekday: 'long', // Full name of the day (e.g., Monday)
            year: 'numeric',
            month: 'long', // Full name of the month (e.g., January)
            day: 'numeric',
        };
        this.currentDate = new Intl.DateTimeFormat(undefined, optionsDate).format(now);
        this.currentDay = now.toLocaleDateString(undefined, { weekday: 'long' }); // Day of the week

    }

    connectedCallback() {
        this.updateClock(); // Update the clock immediately
        setInterval(() => {
            this.updateClock(); // Update the clock every second
        }, 1000);
    }
}
