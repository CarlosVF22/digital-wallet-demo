import express from "express";
import * as soap from "soap";
import fs from "fs";
import path from "path";
import { customerSoapController } from "../../controllers/soap/customerSoapController";
import { walletSoapController } from "../../controllers/soap/walletSoapController";

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
            },
        },
    };

    soap.listen(app, "/soap", serviceObject, xml, () => {
        console.log("SOAP server started on /soap");
    });
}
