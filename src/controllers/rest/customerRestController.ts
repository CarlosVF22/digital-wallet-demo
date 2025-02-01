import * as soap from "soap";

export const customerController = {
    async registerCustomer(req: any, res: any) {
        const { document, name, email, phone } = req.body;
        const url = `${process.env.SOAP_URL}?wsdl`;

        try {
            soap.createClient(url, (err: any, client: any) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        cod_error: "03",
                        message_error:
                            err.message || "Error creating SOAP client",
                        data: null,
                    });
                }
                // Llamamos al método SOAP 'registerCustomer'
                client.registerCustomer(
                    { document, name, email, phone },
                    (err: any, result: any) => {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                cod_error: "04",
                                message_error:
                                    err.message || "Error in SOAP service",
                                data: null,
                            });
                        }
                        return res.json(result);
                    }
                );
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                cod_error: "05",
                message_error: error.message || "Internal error",
                data: null,
            });
        }
    },
};
