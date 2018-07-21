const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();

const db = {
    loanRequests: [{
        "kernelVersion": "0x384cdafd4dddd1b7f9210534a16931e60809b658",
        "issuanceVersion": "0x7b79a84b92b41a4626fa85a8c2db9b09df063caf",
        "principalAmount": "1000000000000000000",
        "principalToken": "0xdff109b81a5e63c533f0b5e8696023b20b7ef1f6",
        "debtor": "0xd2f45e02ab7b190ac9a87b743eab4c8f2ed0e491",
        "debtorFee": "0",
        "creditor": "0x0000000000000000000000000000000000000000",
        "creditorFee": "0",
        "relayer": "0x0000000000000000000000000000000000000000",
        "relayerFee": "0",
        "underwriter": "0x0000000000000000000000000000000000000000",
        "underwriterFee": "0",
        "underwriterRiskRating": "0",
        "termsContract": "0x6becd1c90bb69aa36983af05d9a9bf106c33ca1d",
        "termsContractParameters": "0x04000000000de0b6b3a7640000009c40200030000000001bc16d674ec8000000",
        "expirationTimestampInSec": "1532564000",
        "salt": "71781867578874528216",
        "debtorSignature": {
            "v": 27,
            "r": "0x882d1fbb7b3f89ec5d7f460b4bc5b64105d3deb3b3311fa409e27cca5217defe",
            "s": "0x67be05da37e3515498510ef4fe64e2ff64db14176d8ef26b6dbb81848e30c5a3"
        },
        "creditorSignature": {
            "r": "",
            "s": "",
            "v": 0
        },
        "underwriterSignature": {
            "r": "",
            "s": "",
            "v": 0
        },
        "createdAt": 1532132636571,
        "id": 1
    }],
};

const router = jsonServer.router(db);

const middlewares = jsonServer.defaults({
    static: path.join(__dirname, "build"),
});

server.use(middlewares);

// Add a "createdAt" field for each new LoanRequest.
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === "POST") {
        req.body.createdAt = Date.now();
    }
    // Continue to JSON Server router
    next();
});

server.use(router);
server.listen(process.env.PORT || 5000, () => {
    console.log("JSON Server is running");
});