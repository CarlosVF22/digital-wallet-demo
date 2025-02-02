import * as soap from "soap";

export const walletController = {
    async rechargeWallet(req: any, res: any) {
        const { document, phone, value } = req.body;
        // Asegúrate de que SOAP_URL esté definido en tu .env (ejemplo: SOAP_URL=http://localhost:3000/soap)
        const url = `${process.env.SOAP_URL}?wsdl`;

        try {
            soap.createClient(url, (err: any, client: any) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        cod_error: "06",
                        message_error: "Error creating SOAP client",
                        data: null,
                    });
                }
                client.rechargeWallet(
                    { document, phone, value },
                    (err: any, result: any) => {
                        console.log("Result from SOAP service:", result);
                        console.log("Error from SOAP service:", err);
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                cod_error: "07",
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
                cod_error: "08",
                message_error: error.message || "Internal error",
                data: null,
            });
        }
    },
};
