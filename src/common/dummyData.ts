export const projectData = {
    Title: "Clifton Beach Clean Up",
    Owner: "Donny",
    ShortDescription: "Clean up of Clifton Beach after New Years Eve Party",
    LongDescription: "Rubbish has been left everywhere after the last party of 2017. The people did their damage and had fun, now it's time to fix up the mess",
    ImpactAction: "New Year beach cleanup",
    Country: "South Africa",
    Sdgs: ["15.2","12","10.1"],
    ImpactsRequired: 100,
    ClaimTemplate: "beach_claims",
    SocialMedia:{ 
        FacebookLink: "exampleFBURL",
        InstagramLink: "exampleInstaURL",
        TwitterLink: "exampleTwitterURL"
    },
    Image: "test.png",
    autoApproveInvestmentAgent: true,
    autoApproveServiceAgent: false,
    autoApproveEvaluationAgent: true
};

export const DID = "did:sov:0x4ef229e0a3c2bcf6d0d405dd0d6ea01ae0ddfe8f";

export const signature = {  
    type:"ECDSA",
    created: new Date(),
    creator: DID,
    publicKey: "0x279291ddf089c0e07c237fa70d86691432c0441c",
    signature: "0x0dacb44285cbf3b3c96301283b63720255f4e9bf810d649aa318c4bd0ec1e3515146e44a5c3d7c6c5ecb0834578a6cf1b67c5498c1b361769f61a968631d32e800"
 }