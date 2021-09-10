import {ISovrinDidModel} from "./models";

export const projectData = {
  "@context": "https://schema.ixo.foundation/entity:2383r9riuew",
  "@type": "Project",
  schemaVersion: "1.0.0",
  name: "Some Title",
  description: "Some Short Description",
  image: "https://pds_pandora.ixo.world/public/sbujb0xg0dgkeljwtnc",
  imageDescription: "Some Image Description",
  location: "AR",
  sdgs: ["5", "7"],
  startDate: "2020-09-17T00:00:00.000Z",
  endDate: "2020-10-23T00:00:00.000Z",
  status: "Live",
  stage: "Planning",
  relayerNode: "xxx",
  version: {
    versionNumber: "1.0.5",
    effectiveDate: "2020-09-15T00:00:00.000Z",
    notes: "Some version notes"
  },
  terms: {
    "@type": "OnceOffFee",
    paymentTemplateId: "payment:template:1234567890"
  },
  privacy: {
    pageView: "Private",
    entityView: "Visible",
    credentials: [{
      credential: "somecredential",
      issuer: "did:sov:CYCc2xaJKrp8Yt947Nc6jd99"
    }, {
      credential: "anothercredential",
      issuer: "did:sov:CYCc2xaJKrp8Yt947Nc6jd66"
    }]
  },
  creator: {
    displayName: "Creator Display Name",
    location: "AD",
    email: "ert@dfssdf.com",
    website: "https://blah.com",
    mission: "Some mission",
    id: "did:sov:CYCc2xaJKrp8Yt947Nc6jd1",
    credentialId: "did:sov:CYCc2xaJKrp8Yt947Nc6jd2",
    logo: "https://pds_pandora.ixo.world/public/8520qk1ckqvkelkjfeg"
  },
  owner: {
    displayName: "Owner Display Name",
    location: "AQ",
    email: "eeeert@dfssdf.com",
    website: "https://eerer.com",
    mission: "another mission",
    id: "did:sov:CYCc2xaJKrp8Yt947Nc6jd6",
    logo: "https://pds_pandora.ixo.world/public/9uqcsf7qsfjkelkkkt9"
  },
  ddoTags: [{
    category: "Project Type",
    tags: ["Index", "Accreditation", "Accountability", "Insurance Bond"]
  }, {
    category: "SDG",
    tags: ["SDG3 – Good Health and Well-being", "SDG15 – Life on Land", "SDG16 – Peace, Justice and Strong Institutions", "SDG17 – Partnerships for Goals"]
  }, {
    category: "Stage",
    tags: ["Planning"]
  }],
  displayCredentials: {
    "@context": "https://www.w3.org/2018/credentials/v1",
    items: [{
      credential: "somecredential1",
      badge: "https://somebadge.com"
    }, {
      credential: "somecredential2",
      badge: "https://anotherbadge.com"
    }]
  },
  page: {
    cid: "somepageid",
    version: "1.0.0"
  },
  claims: {
    "@context": "https://schema.ixo.world/claims:3r08webu2eou",
    items: [{
      "@id": "template:did:2",
      visibility: "Private",
      title: "Some Claim Title 1",
      description: "Some Claim Description 1",
      targetMin: 23,
      targetMax: 45,
      startDate: "2020-09-25T00:00:00.000Z",
      endDate: "2020-10-22T00:00:00.000Z",
      agents: [{
        role: "PO",
        credential: "Credential 1",
        autoApprove: true
      }, {
        role: "SA",
        credential: "Credential 2",
        autoApprove: false
      }, {
        role: "IA",
        credential: "Credential 3",
        autoApprove: true
      }],
      claimEvaluation: [{
        "@context": "somecontext1",
        "@id": "somelinktocontext1",
        methodology: "somemethodology1",
        attributes: ["attr1", "attr2"]
      }, {
        "@context": "somecontext2",
        "@id": "somelinktocontext2",
        methodology: "somemethodology2",
        attributes: ["attr1", "attr2", "attr3"]
      }],
      claimApproval: [{
        "@context": "somecontext1",
        "@id": "somelink1",
        condition: "somecondition1",
        attributes: ["criteria1", "criteria2", "criteria3", "criteria4"]
      }],
      claimEnrichment: [{
        "@context": "somecontext1",
        "@id": "somelink1",
        productId: "someproductid1",
        resources: ["res1", "res2", "res3"]
      }, {
        "@context": "somecontext2",
        "@id": "somelink2",
        productId: "someproductid2",
        resources: ["res1", "res2"]
      }]
    }]
  },
  linkedEntities: [{
    "@type": "Investment",
    id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdqq"
  }, {
    "@type": "Oracle",
    id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdtt"
  }],
  fees: {
    "@context": "https://schema.ixo.world/fees/ipfs3r08webu2eou",
    // items: [{
    //   "@type": "RentalFee",
    //   id: "payment:template:1234567890" // NOTE: payment template has to exist, so we leave it out in this example to not have to create it
    // }]
    items: []
  },
  stake: {
    "@context": "https://schema.ixo.world/staking/ipfs3r08webu2eou",
    items: [{
      "@type": "PerformanceGuarantee",
      id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdvv",
      denom: "IXO",
      stakeAddress: "abcccsdfsdfdsfdsfsdf",
      minStake: 12,
      slashCondition: "FailedDispute",
      slashFactor: 45,
      slashAmount: 66,
      unbondPeriod: 23
    }]
  },
  nodes: {
    "@context": "https://schema.ixo.world/nodes/ipfs3r08webu2eou",
    items: [{
      "@type": "IBCNode",
      id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdbb"
    }, {
      "@type": "CellNode",
      id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdzz"
    }]
  },
  funding: {
    "@context": "https://schema.ixo.world/funding/ipfs3r08webu2eou",
    items: [{
      "@type": "AlphaBond",
      id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz"
    }]
  },
  keys: {
    "@context": "https://www.w3.org/ns/did/v1",
    items: [{
      purpose: "Encryption",
      "@type": "JwsVerificationKey2020",
      controller: "did:sov:CYCc2xaJKrp8Yt947Nc6jdbbbbb",
      keyValue: "eEUR",
      dateCreated: "2020-09-18T00:00:00.000Z",
      dateUpdated: "2020-10-28T00:00:00.000Z",
      signature: "somesignature"
    }]
  },
  service: [{
    "@type": "DIDAgent",
    id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdbbbnn",
    serviceEndpoint: "https://someurl",
    description: "some short description",
    publicKey: "somepubkey",
    properties: "otherparams"
  }],
  data: [{
    "@type": "PersonalDataPod",
    id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdbgfd",
    serviceEndpoint: "https://blah.com",
    properties: "otherparams"
  }]
}

export const projectDataNew = {
  "@context": "https://schema.ixo.foundation/entity:2383r9riuew",
  "@type": "Project",
  schemaVersion: "1.0.0",
  name: "Some New Title",
  description: "Some New Short Description",
  image: "https://pds_pandora.ixo.world/public/sbujb0xg0dgkeljwtnc",
  imageDescription: "Some New Image Description",
  location: "AR",
  sdgs: ["5", "7"],
  startDate: "2020-09-17T00:00:00.000Z",
  endDate: "2020-10-23T00:00:00.000Z",
  status: "Live",
  stage: "Planning",
  relayerNode: "xxx",
  version: {
    versionNumber: "1.0.5",
    effectiveDate: "2020-09-15T00:00:00.000Z",
    notes: "Some new version notes"
  },
  terms: {
    "@type": "OnceOffFee",
    paymentTemplateId: "payment:template:1234567890"
  },
  privacy: {
    pageView: "Private",
    entityView: "Visible",
    credentials: [{
      credential: "somecredential",
      issuer: "did:sov:CYCc2xaJKrp8Yt947Nc6jd99"
    }, {
      credential: "anothercredential",
      issuer: "did:sov:CYCc2xaJKrp8Yt947Nc6jd66"
    }]
  },
  creator: {
    displayName: "Creator Display Name",
    location: "AD",
    email: "ert@dfssdf.com",
    website: "https://blah.com",
    mission: "Some mission",
    id: "did:sov:CYCc2xaJKrp8Yt947Nc6jd1",
    credentialId: "did:sov:CYCc2xaJKrp8Yt947Nc6jd2",
    logo: "https://pds_pandora.ixo.world/public/8520qk1ckqvkelkjfeg"
  },
  owner: {
    displayName: "New Owner Display Name",
    location: "AQ",
    email: "eeeert@dfssdf.com",
    website: "https://eerer.com",
    mission: "a new mission",
    id: "did:sov:CYCc2xaJKrp8Yt947Nc6jd6",
    logo: "https://pds_pandora.ixo.world/public/9uqcsf7qsfjkelkkkt9"
  },
  ddoTags: [{
    category: "Project Type",
    tags: ["Index", "Accreditation", "Accountability", "Insurance Bond"]
  }, {
    category: "SDG",
    tags: ["SDG3 – Good Health and Well-being", "SDG15 – Life on Land", "SDG16 – Peace, Justice and Strong Institutions", "SDG17 – Partnerships for Goals"]
  }, {
    category: "Stage",
    tags: ["Planning"]
  }],
  displayCredentials: {
    "@context": "https://www.w3.org/2018/credentials/v1",
    items: [{
      credential: "somecredential1",
      badge: "https://somebadge.com"
    }, {
      credential: "somecredential2",
      badge: "https://anotherbadge.com"
    }]
  },
  page: {
    cid: "somepageid",
    version: "1.0.0"
  },
  claims: {
    "@context": "https://schema.ixo.world/claims:3r08webu2eou",
    items: [{
      "@id": "template:did:2",
      visibility: "Private",
      title: "Some Claim Title 1",
      description: "Some Claim Description 1",
      targetMin: 23,
      targetMax: 45,
      startDate: "2020-09-25T00:00:00.000Z",
      endDate: "2020-10-22T00:00:00.000Z",
      agents: [{
        role: "PO",
        credential: "Credential 1",
        autoApprove: true
      }, {
        role: "SA",
        credential: "Credential 2",
        autoApprove: false
      }, {
        role: "IA",
        credential: "Credential 3",
        autoApprove: true
      }],
      claimEvaluation: [{
        "@context": "somecontext1",
        "@id": "somelinktocontext1",
        methodology: "somemethodology1",
        attributes: ["attr1", "attr2"]
      }, {
        "@context": "somecontext2",
        "@id": "somelinktocontext2",
        methodology: "somemethodology2",
        attributes: ["attr1", "attr2", "attr3"]
      }],
      claimApproval: [{
        "@context": "somecontext1",
        "@id": "somelink1",
        condition: "somecondition1",
        attributes: ["criteria1", "criteria2", "criteria3", "criteria4"]
      }],
      claimEnrichment: [{
        "@context": "somecontext1",
        "@id": "somelink1",
        productId: "someproductid1",
        resources: ["res1", "res2", "res3"]
      }, {
        "@context": "somecontext2",
        "@id": "somelink2",
        productId: "someproductid2",
        resources: ["res1", "res2"]
      }]
    }]
  },
  linkedEntities: [{
    "@type": "Investment",
    id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdqq"
  }, {
    "@type": "Oracle",
    id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdtt"
  }],
  fees: {
    "@context": "https://schema.ixo.world/fees/ipfs3r08webu2eou",
    // items: [{
    //   "@type": "RentalFee",
    //   id: "payment:template:1234567890" // NOTE: payment template has to exist, so we leave it out in this example to not have to create it
    // }]
    items: []
  },
  stake: {
    "@context": "https://schema.ixo.world/staking/ipfs3r08webu2eou",
    items: [{
      "@type": "PerformanceGuarantee",
      id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdvv",
      denom: "IXO",
      stakeAddress: "abcccsdfsdfdsfdsfsdf",
      minStake: 12,
      slashCondition: "FailedDispute",
      slashFactor: 45,
      slashAmount: 66,
      unbondPeriod: 23
    }]
  },
  nodes: {
    "@context": "https://schema.ixo.world/nodes/ipfs3r08webu2eou",
    items: [{
      "@type": "IBCNode",
      id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdbb"
    }, {
      "@type": "CellNode",
      id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdzz"
    }]
  },
  funding: {
    "@context": "https://schema.ixo.world/funding/ipfs3r08webu2eou",
    items: [{
      "@type": "AlphaBond",
      id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdzzzz"
    }]
  },
  keys: {
    "@context": "https://www.w3.org/ns/did/v1",
    items: [{
      purpose: "Encryption",
      "@type": "JwsVerificationKey2020",
      controller: "did:sov:CYCc2xaJKrp8Yt947Nc6jdbbbbb",
      keyValue: "eEUR",
      dateCreated: "2020-09-18T00:00:00.000Z",
      dateUpdated: "2020-10-28T00:00:00.000Z",
      signature: "somesignature"
    }]
  },
  service: [{
    "@type": "DIDAgent",
    id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdbbbnn",
    serviceEndpoint: "https://someurl",
    description: "some short description",
    publicKey: "somepubkey",
    properties: "otherparams"
  }],
  data: [{
    "@type": "PersonalDataPod",
    id: "did:sov:CYCc2xaJKrp8Yt947Nc6jdbgfd",
    serviceEndpoint: "https://blah.com",
    properties: "otherparams"
  }]
}

export const ixoDid1: ISovrinDidModel = {
  did: "did:ixo:4XJLBfGtWSGKSz4BeRxdun",
  verifyKey: "2vMHhssdhrBCRFiq9vj7TxGYDybW4yYdrYh9JG56RaAt",
  encryptionPublicKey: "6GBp8qYgjE3ducksUa9Ar26ganhDFcmYfbZE9ezFx5xS",
  secret: {
    seed: "38734eeb53b5d69177da1fa9a093f10d218b3e0f81087226be6ce0cdce478180",
    signKey: "4oMozrMR6BXRN93MDk6UYoqBVBLiPn9RnZhR3wQd6tBh",
    encryptionPrivateKey: "4oMozrMR6BXRN93MDk6UYoqBVBLiPn9RnZhR3wQd6tBh"
  }
}

export const ixoDid2: ISovrinDidModel = {
  did: "did:ixo:U4tSpzzv91HHqWW1YmFkHJ",
  verifyKey: "FkeDue5it82taeheMprdaPrctfK3DeVV9NnEPYDgwwRG",
  encryptionPublicKey: "DtdGbZB2nSQvwhs6QoN5Cd8JTxWgfVRAGVKfxj8LA15i",
  secret: {
    seed: "6ef0002659d260a0bbad194d1aa28650ccea6c6862f994dfdbd48648e1a05c5e",
    signKey: "8U474VrG2QiUFKfeNnS84CAsqHdmVRjEx4vQje122ycR",
    encryptionPrivateKey: "8U474VrG2QiUFKfeNnS84CAsqHdmVRjEx4vQje122ycR"
  }
}

export const ixoDid3: ISovrinDidModel = {
  did: "did:ixo:UKzkhVSHc3qEFva5EY2XHt",
  verifyKey: "Ftsqjc2pEvGLqBtgvVx69VXLe1dj2mFzoi4kqQNGo3Ej",
  encryptionPublicKey: "8YScf3mY4eeHoxDT9MRxiuGX5Fw7edWFnwHpgWYSn1si",
  secret: {
    seed: "94f3c48a9b19b4881e582ba80f5767cd3f3c5d7b7103cb9a50fa018f108d89de",
    signKey: "B2Svs8GoQnUJHg8W2Ch7J53Goq36AaF6C6W4PD2MCPrM",
    encryptionPrivateKey: "B2Svs8GoQnUJHg8W2Ch7J53Goq36AaF6C6W4PD2MCPrM"
  }
}

export const PDSUrl = 'https://pds_pandora.ixo.world/';
export const BLOCKSYNC_URL = 'http://172.20.1.37:80';
