// External libraries
import { Component } from "react";
import Dharma from "@dharmaprotocol/dharma.js";

// Helpers
import withDharma from "./withDharma";

import Api from "../services/api";


class LoanRequestCreator extends Component {
    constructor(props) {
        super(props);            
    
        this.createLoanRequest = this.createLoanRequest.bind(this);
        this.generateLoanRequest = this.generateLoanRequest.bind(this);
    }

    async createLoanRequest(params) {
        const api = new Api();
        const {                
            principalAmount,
            principalToken,
            collateralAmount,
            collateralToken,
            interestRate,
            termDuration,
            termUnit,
            expiresInDuration,
            expiresInUnit,
        } = params;
        
        const debtorAddress = await this.getDebtorAddress();            

        const loanRequest = await this.generateLoanRequest({
            principalAmount,
            principalToken,
            collateralAmount,
            collateralToken,
            interestRate,
            termDuration,
            termUnit,                
            expiresInDuration,
            expiresInUnit,            
            debtorAddress
        });

        await loanRequest.allowCollateralTransfer(debtorAddress);

        const id = await api.create("loanRequests", loanRequest.toJSON());

        return id;
    }

    async getDebtorAddress() {
        const { dharmaProps: { dharma }} = this.props;

        const debtorAccounts = await dharma.blockchain.getAccounts();
        return debtorAccounts[0];
    }

    async generateLoanRequest(params) {
        const { dharmaProps: { dharma }} = this.props;

        const { LoanRequest } = Dharma.Types;

        const {
            principalAmount,
            principalToken,
            collateralAmount,
            collateralToken,
            interestRate,
            termDuration,
            termUnit,                
            expiresInDuration,
            expiresInUnit,
            debtorAddress
        } = params;

        return LoanRequest.create(dharma, {
            principalAmount,
            principalToken,
            collateralAmount,
            collateralToken,
            interestRate,
            termDuration,
            termUnit,                
            expiresInDuration,
            expiresInUnit,            
            debtorAddress
        });
    }

    render() {
        const { children, dharmaProps } = this.props;
        return children(this.createLoanRequest, dharmaProps);
    }        
};


export default withDharma(LoanRequestCreator);