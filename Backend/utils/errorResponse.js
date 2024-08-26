class ErrorResponse extends Error {
    constructor(message, codeStatus) {
        super(message);  //to call the constructor of parent class
        this.codeStatus = codeStatus;
    }
}

export default ErrorResponse;