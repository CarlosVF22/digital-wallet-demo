import { registerCustomer } from "../../services/CustomerService";

export const customerSoapController = {
    /**
     * SOAP method to register a customer.
     * Receives an object with the fields: document, name, email, phone.
     * Returns an object with the structure { success, cod_error, message_error, data } via callback.
     *
     * Note: The callback and additional parameters are marked as optional to conform to the expected ISoapServiceMethod signature.
     */
    registryCustomer(
        args: { document: string; name: string; email: string; phone: string },
        callback?: (result: any) => void,
        options?: any,
        extraHeaders?: any
    ): void {
        const { document, name, email, phone } = args;

        // Validando datos
        if (!document || !name || !email || !phone) {
            if (callback) {
                callback({
                    success: false,
                    cod_error: "01",
                    message_error: "All fields are required",
                    data: null,
                });
            }
            return;
        }

        // llamando al servicio
        registerCustomer({ document, name, email, phone })
            .then((result) => {
                if (callback) {
                    callback({
                        success: true,
                        cod_error: "00",
                        message_error: "Customer registered successfully",
                        data: result,
                    });
                }
            })
            .catch((error: any) => {
                if (callback) {
                    callback({
                        success: false,
                        cod_error: "02",
                        message_error:
                            error.message || "Error registering customer",
                        data: null,
                    });
                }
            });
    },
};
