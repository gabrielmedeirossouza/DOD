export class Age {
    constructor(
        public value: number
    ) {}
}

export class AgeValidationFailed {}

export class AgeOutOfRange {
    constructor(
        public value: number,
        public min: number,
        public max: number
    ) {}
}
