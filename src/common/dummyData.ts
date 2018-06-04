export const projectData = {  
	title:"Test Project to the blockchain for us to see if it works from IXO module with a truncated signature",
	ownerName:"NIC",
	ownerEmail:"test@test",
	shortDescription:"Potato",
	longDescription:"long des",
	impactAction:"Plant some trees",
	createdOn:"2018-05-31T12:42:26.816Z",
	createdBy:"did:sov:VWxSy5rb6qQYMSP9WvC26h",
	projectLocation:"CO",
	sdgs:[  
	   "12.2",
	   "3",
	   "2.4"
	],
	claims:{  
	   required:30,
	   currentSuccessful:0,
	   currentRejected:4
	},
	templates:{  
	   claim:"default"
	},
	agents:{  
	   evaluators:0,
	   evaluatorsPending:0,
	   serviceProviders:23,
	   serviceProvidersPending:0,
	   investors:6
	},
	evaluatorPayPerClaim:"15",
	socialMedia:{  
	   facebookLink:"https://www.facebook.com/ixofoundation/",
	   instagramLink:"",
	   twitterLink:"",
	   webLink:"https://ixo.foundation"
	},
	ixo:{  
	   totalStaked:200,
	   totalUsed:55
	},
	serviceEndpoint:"https://togo.pds.ixo.network",
	imageLink:"",
	founder:{  
	   name:"Nic",
		email:"nic@test.co.za",
	   countryOfOrigin:"ZA",
	   shortDescription:"primary donny",
	   websiteURL:"www.youtwitface.com",
	   logoLink:""
	}
 };

export const PDSUrl = 'http://localhost:5000/';
// export const PDSUrl = 'http://192.168.1.125:5000/';

export const signature = {
	type: 'ed25519-sha-256',
	created: '2018-06-04T10:55:33+0200',
	creator: 'did:sov:VWxSy5rb6qQYMSP9WvC26h',
	publicKey: '7UTneJkyCKSdh415zcCftRbwyU7BkmNPNwce1FQQ9pnK',
	signature: '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'}