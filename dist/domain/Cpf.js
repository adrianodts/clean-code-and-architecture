"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cpf {
    constructor(value) {
        this.FACTOR_DIGIT_1 = 10;
        this.FACTOR_DIGIT_2 = 11;
        this.MAX_DIGITS_1 = 9;
        this.MAX_DIGITS_2 = 10;
        if (!this.validate(value))
            throw Error('Invalid cpf');
        this.cpf = value;
    }
    validate(cpf) {
        cpf = this.extractDigits(cpf);
        if (this.isInvalidLength(cpf))
            return false;
        if (this.isBlocked(cpf))
            return false;
        const digit1 = this.calculateDigit(cpf, this.FACTOR_DIGIT_1, this.MAX_DIGITS_1);
        const digit2 = this.calculateDigit(cpf, this.FACTOR_DIGIT_2, this.MAX_DIGITS_2);
        let calculatedCheckDigit = `${digit1}${digit2}`;
        return this.getCheckDigit(cpf) == calculatedCheckDigit;
    }
    extractDigits(cpf) {
        return cpf.replace(/\D/g, "");
    }
    isInvalidLength(cpf) {
        return cpf.length !== 11;
    }
    isBlocked(cpf) {
        const [digit1] = cpf;
        return cpf.split("").every(digit => digit === digit1);
    }
    calculateDigit(cpf, factor, max) {
        let total = 0;
        for (const digit of this.toDigitArray(cpf).slice(0, max)) {
            total += digit * factor--;
        }
        return (total % 11 < 2) ? 0 : (11 - total % 11);
    }
    toDigitArray(cpf) {
        return [...cpf].map(digit => parseInt(digit));
    }
    getCheckDigit(cpf) {
        return cpf.slice(9);
    }
}
exports.default = Cpf;
