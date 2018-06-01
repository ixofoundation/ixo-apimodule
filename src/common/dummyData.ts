export const projectData = {
	title: "Togo Water project",
	ownerName: "Donny",
	ownerEmail: "dono@gmail.com",
	shortDescription: "Togo provides clean water, basic toilets and good hygiene practices are essential for the survival and development of children in Uganda.",
	longDescription: "Like other rural areas in Africa, the water supply and sanitation infrastructure in Togo is poor, which in turn results in illnesses as a result of hygiene deficits. The German Red Cross is cooperating with the Togolese Red Cross (TRC) in the Maritime region to improve drinking water supplies as well as hygiene and sewage water systems.",
	impactAction: "buckets of water",
	createdOn: "2018-05-31T14:52:30.938Z",
	createdBy: "ULuWeP524szMuCjGj4MCqN",
	projectLocation: "ZA",
	sdgs: [1, 13, 14.2],
	claims: {  
		required: 30,
		currentSucessful: 0,
		currentRejected: 0
	 },
	 templates:{  
		claim: "water_default"
	 },
	agents:{  
		evaluators: 0,
		evaluatorsPending: 0,
		serviceProviders: 0,
		serviceProvidersPending: 0,
		investors: 0
	},
	evaluatorPayPerClaim: 15,
	socialMedia: {
		facebookLink: "facebook.com/togo",
		instagramLink: "instagram.com/togo",
		twitterLink: "twitter.com/togo",
		webLink: "togo.com"
	},
	ixo: {  
	   totalStaked: 0,
	   totalUsed: 0
	},
	serviceEndpoint:"https://togo.pds.ixo.network",
	imageLink:"",
	founder:{  
	   name:"Test",
	   email:"founder@email.com",
	   countryOfOrigin:"ZA",
	   shortDescription:"primarydonny",
	   websiteURL:"www.youtwitface.com",
	   logoLink:""
	}
};

export const DID = "did:sov:0x4ef229e0a3c2bcf6d0d405dd0d6ea01ae0ddfe8f";

export const PDSUrl = 'http://localhost:5000/';

export const signature = {  
    type:"ECDSA",
    created: new Date(),
    creator: DID,
    publicKey: "0x279291ddf089c0e07c237fa70d86691432c0441c",
    signature: "0x0dacb44285cbf3b3c96301283b63720255f4e9bf810d649aa318c4bd0ec1e3515146e44a5c3d7c6c5ecb0834578a6cf1b67c5498c1b361769f61a968631d32e800"
 }