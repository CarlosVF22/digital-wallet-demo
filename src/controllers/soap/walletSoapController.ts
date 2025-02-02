import { rechargeWallet } from "../../services/WalletService";

export const walletSoapController = {
    /**
     * SOAP method to recharge a wallet.
     * Expects an object with fields: document, phone, value.
     * Returns an object { success, cod_error, message_error, data } via callback.
     */
    rechargeWallet(
        args: any,
        callback?: (result: any) => void,
        options?: any,
        extraHeaders?: any
    ): void {
        console.log("Received args in rechargeWallet:", args);

        if (!args) {
            return (
                callback &&
                callback({
                    success: false,
                    cod_error: "01",
                    message_error: "No arguments provided",
                    data: null,
                })
            );
        }

        let payload = args;
        if (!payload.document && payload.rechargeWallet) {
            payload = payload.rechargeWallet;
        }

        if (!payload || !payload.document) {
            return (
                callback &&
                callback({
                    success: false,
                    cod_error: "02",
                    message_error: "No valid payload provided",
                    data: null,
                })
            );
        }

        const { document, phone, value } = payload;
        if (!document || !phone || value === undefined || value === null) {
            return (
                callback &&
                callback({
                    success: false,
                    cod_error: "03",
                    message_error:
                        "All fields (document, phone, value) are required",
                    data: null,
                })
            );
        }

        const rechargeValue = Number(value);
        if (isNaN(rechargeValue) || rechargeValue <= 0) {
            return (
                callback &&
                callback({
                    success: false,
                    cod_error: "04",
                    message_error: "Value must be a positive number",
                    data: null,
                })
            );
        }

        rechargeWallet({ document, phone, value: rechargeValue })
            .then((wallet) => {
                return (
                    callback &&
                    callback({
                        success: true,
                        cod_error: "00",
                        message_error: "Wallet recharged successfully",
                        data: wallet,
                    })
                );
            })
            .catch((error: any) => {
                return (
                    callback &&
                    callback({
                        success: false,
                        cod_error: "05",
                        message_error:
                            error.message || "Error recharging wallet",
                        data: null,
                    })
                );
            });
    },
};
