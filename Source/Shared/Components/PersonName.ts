export class PersonName {
    constructor(
        public value: string
    ) {}
}

export class PersonNameValidationFailed {}

export class PersonNameRequired {}

export class PersonNameTooLong {
    constructor(
        public value: string,
        public maxLength: number
    ) {}
}

export class PersonNameMustContainFirstAndLastName {
    constructor(
        public value: string
    ) {}
}
