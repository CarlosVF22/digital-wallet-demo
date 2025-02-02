import { initiatePayment, confirmPayment } from "../../services/PaymentService";

export const paymentSoapController = {
    /**
     * SOAP method to initiate a payment.
     * Expects an object with fields: document, phone, value.
     * Returns an object { success, cod_error, message, data } via callback.
     */
    initiatePayment(
        args: any,
        callback?: (result: any) => void,
        options?: any,
        extraHeaders?: any
    ): void {
        console.log("Received args in initiatePayment:", args);
        if (!args) {
            return (
                callback &&
                callback({
                    success: false,
                    cod_error: "01",
                    message: "No arguments provided",
                    data: null,
                })
            );
        }

        let payload = args;
        if (!payload.document && payload.initiatePayment) {
            payload = payload.initiatePayment;
        }

        const { document, phone, value } = payload;
        if (!document || !phone || value === undefined || value === null) {
            return (
                callback &&
                callback({
                    success: false,
                    cod_error: "02",
                    message: "All fields (document, phone, value) are required",
                    data: null,
                })
            );
        }

        const paymentValue = Number(value);
        if (isNaN(paymentValue) || paymentValue <= 0) {
            return (
                callback &&
                callback({
                    success: false,
                    cod_error: "03",
                    message: "Value must be a positive number",
                    data: null,
                })
            );
        }

        initiatePayment({ document, phone, value: paymentValue })
            .then((result) => {
                return (
                    callback &&
                    callback({
                        success: true,
                        cod_error: "00",
                        message: result.message,
                        data: result,
                    })
                );
            })
            .catch((error: any) => {
                return (
                    callback &&
                    callback({
                        success: false,
                        cod_error: "04",
                        message: error.message || "Error initiating payment",
                        data: null,
                    })
                );
            });
    },
    /**
     * SOAP method to confirm a payment.
     * Expects an object with fields: sessionId and token.
     * Returns an object { success, cod_error, message, data } via callback.
     */
    confirmPayment(
        args: any,
        callback?: (result: any) => void,
        options?: any,
        extraHeaders?: any
    ): void {
        console.log("Received args in confirmPayment:", args);
        if (!args) {
            return (
                callback &&
                callback({
                    success: false,
                    cod_error: "11",
                    message: "No arguments provided",
                    data: null,
                })
            );
        }
        let payload = args;
        if (!payload.sessionId && payload.confirmPayment) {
            payload = payload.confirmPayment;
        }
        const { sessionId, token } = payload;
        if (!sessionId || !token) {
            return (
                callback &&
                callback({
                    success: false,
                    cod_error: "12",
                    message: "Both sessionId and token are required",
                    data: null,
                })
            );
        }
        confirmPayment(sessionId, token)
            .then((result) => {
                return (
                    callback &&
                    callback({
                        success: true,
                        cod_error: "00",
                        message: result.message,
                        data: result,
                    })
                );
            })
            .catch((error: any) => {
                return (
                    callback &&
                    callback({
                        success: false,
                        cod_error: "13",
                        message: error.message || "Error confirming payment",
                        data: null,
                    })
                );
            });
    },
};
