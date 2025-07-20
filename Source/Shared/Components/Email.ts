export class Email {
    constructor(
        public value: string
    ) {}
}

export class EmailValidationFailed {}

export class EmailRequired {}

export class EmailTooLong {
    constructor(
        public value: string,
        public maxLength: number
    ) {}
}

export class EmailMalformed {
    constructor(
        public value: string,
        public pattern: RegExp
    ) {}
}
