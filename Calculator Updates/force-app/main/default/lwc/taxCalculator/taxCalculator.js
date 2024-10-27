import { LightningElement, track } from 'lwc';

const socialSecurityRate = 0.0620;
const medicareWithholdingRate = 0.0145;
const federalTaxRates = [
    { minIncome: 0, maxIncome: 10275, rate: 0.10 },
    { minIncome: 10276, maxIncome: 41775, rate: 0.12 },
    { minIncome: 41776, maxIncome: 89075, rate: 0.22 },
    { minIncome: 89076, maxIncome: 170050, rate: 0.24 },
    { minIncome: 170051, maxIncome: 215950, rate: 0.32 },
    { minIncome: 215951, maxIncome: 539900, rate: 0.35 },
    { minIncome: 539901, maxIncome: Infinity, rate: 0.37 },
];

export default class TaxCalculator extends LightningElement {
    @track salary = 0;
    @track formattedSalary = '0';
    yearlyPay = 0;
    yearlyRoundedPay = 0;
    sixMonthsPay = 0;
    monthlyPay = 0;
    biWeeklyPay = 0;
    federalWithholdings = 0;
    socialSecurityWithholdings = 0;
    medicareWitholdings = 0;

    updateSalary(event) {
        this.salary = event.target.value;
        this.formattedSalary = `${parseInt(this.salary).toLocaleString()}`;
        this.handleCalculations();
    }

    handleCalculations() {
        let federalTax = 0;
        for (const bracket of federalTaxRates) {
            if (this.salary >= bracket.minIncome && this.salary <= bracket.maxIncome) {
                federalTax = (bracket.rate * this.salary) - (bracket.minIncome * bracket.rate);
                this.federalWithholdings = federalTax.toLocaleString(undefined, { maximumFractionDigits: 2 });
                break;
            }
        }
        
        // Calculate Social Security Tax and Medicare Tax
        this.socialSecurityWithholdings = (this.salary * socialSecurityRate).toFixed(2);
        this.medicareWitholdings = (this.salary * medicareWithholdingRate).toFixed(2);
        
        // Calculate net yearly pay after deductions
        this.yearlyPay = this.salary - (federalTax + parseFloat(this.socialSecurityWithholdings) + parseFloat(this.medicareWitholdings));
        
        // Calculate other pay values
        this.yearlyRoundedPay = this.yearlyPay.toLocaleString(undefined, { maximumFractionDigits: 2 });
        this.sixMonthsPay = (this.yearlyPay / 2).toLocaleString(undefined, { maximumFractionDigits: 2 });
        this.monthlyPay = (this.yearlyPay / 12).toLocaleString(undefined, { maximumFractionDigits: 2 });
        this.biWeeklyPay = (this.yearlyPay / 26).toLocaleString(undefined, { maximumFractionDigits: 2 });
    }

    calculatePay(event) {
        const inputValue = event.target.value.trim(); // Remove leading/trailing spaces

        if (inputValue === '' && this.retrievedSalary === null) {
            // If the input is empty, reset all values to zero
            this.salary = 0;
            this.formattedSalary = '$0';
            this.yearlyPay = 0;
            this.yearlyRoundedPay = 0;
            this.sixMonthsPay = 0;
            this.monthlyPay = 0;
            this.biWeeklyPay = 0;
            this.federalWithholdings = 0;
            this.socialSecurityWithholdings = 0;
            this.medicareWitholdings = 0;
        } else if (inputValue !== '') {
            // If the input is not empty, proceed with calculations
            this.salary = parseFloat(inputValue);
            this.updateSalary(event);
        }
    }
}