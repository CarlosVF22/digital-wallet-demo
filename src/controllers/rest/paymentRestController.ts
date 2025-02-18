import * as soap from "soap";

export const paymentController = {
    async initiatePayment(req: any, res: any) {
        const { document, phone, value } = req.body;
        const url = `${process.env.SOAP_URL}?wsdl`;

        try {
            soap.createClient(url, (err: any, client: any) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        cod_error: "05",
                        message: "Error creating SOAP client",
                        data: null,
                    });
                }
                client.initiatePayment(
                    { document, phone, value },
                    (err: any, result: any) => {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                cod_error: "06",
                                message: err.message || "Error in SOAP service",
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
                cod_error: "07",
                message: error.message || "Internal error",
                data: null,
            });
        }
    },

    async confirmPayment(req: any, res: any) {
        // Extraemos sessionId y token de la query (vienen desde la URL en el email)
        const { sessionId, token } = req.query;
        const url = `${process.env.SOAP_URL}?wsdl`;
        try {
            soap.createClient(url, (err: any, client: any) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        cod_error: "08",
                        message: "Error creating SOAP client",
                        data: null,
                    });
                }
                client.confirmPayment(
                    { sessionId, token },
                    (err: any, result: any) => {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                cod_error: "09",
                                message: err.message || "Error in SOAP service",
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
                cod_error: "10",
                message: error.message || "Internal error",
                data: null,
            });
        }
    },
};
