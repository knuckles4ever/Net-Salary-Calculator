import { LightningElement } from 'lwc';

export default class TickerText extends LightningElement {
  tickerText = 'This is a lightning web component I created with sample ticker text.'; // Initialize with your text
  charactersToScroll = 100; // Specify the number of characters to scroll at a time
  tickerInterval;

  connectedCallback() {
    // Start the ticker animation when the component is connected to the DOM
    this.startTicker();
  }

  startTicker() {
    this.tickerInterval = setInterval(() => {
      // Move the specified number of characters to the end to create the scrolling effect
      this.tickerText = this.tickerText.substring(this.charactersToScroll) + this.tickerText.substring(0, this.charactersToScroll);
    }, 3000); // Adjust the interval as needed
  }

  disconnectedCallback() {
    // Clear the interval when the component is disconnected
    clearInterval(this.tickerInterval);
  }
}
