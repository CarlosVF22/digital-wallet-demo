import express from "express";
import * as soap from "soap";
import fs from "fs";
import path from "path";
import { customerSoapController } from "../../controllers/soap/customerSoapController";
import { walletSoapController } from "../../controllers/soap/walletSoapController";
import { paymentSoapController } from "../../controllers/soap/paymentSoapController";

export function initSoapServer(app: express.Application) {
    const wsdlPath = path.resolve(
        __dirname,
        "../../config/soapDefinitions.wsdl"
    );
    const xml = fs.readFileSync(wsdlPath, "utf8");

    const serviceObject = {
        MyService: {
            MyPort: {
                registerCustomer: customerSoapController.registryCustomer,
                rechargeWallet: walletSoapController.rechargeWallet,
                initiatePayment: paymentSoapController.initiatePayment,
                confirmPayment: paymentSoapController.confirmPayment,
            },
        },
    };

    soap.listen(app, "/soap", serviceObject, xml, () => {
        console.log("SOAP server started on /soap");
    });
}
