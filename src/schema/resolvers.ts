const resolvers = {
  Query: {
    getCollection: (_source: any, { id }: any, { dataSources }: any) => {
      return dataSources.billlplz.getCollection(id);
    },
    getCollectionIndex: (_source: any, args: any, { dataSources }: any) => {
      return dataSources.billlplz.getCollectionIndex(args);
    },
    getOpenCollection: (_source: any, { id }: any, { dataSources }: any) => {
      return dataSources.billlplz.getOpenCollection(id);
    },
    getOpenCollectionIndex: (_source: any, args: any, { dataSources }: any) => {
      return dataSources.billlplz.getOpenCollectionIndex(args);
    },
    getMPICollection: (_source: any, { id }: any, { dataSources }: any) => {
      return dataSources.billlplz.getMPICollection(id);
    },
    getMPI: (_source: any, { id }: any, { dataSources }: any) => {
      return dataSources.billlplz.getMPI(id);
    },
    getWebHookRank: (_source: any, _args: any, { dataSources }: any) => {
      return dataSources.billlplz.getWebHookRank();
    },
    getBill: (_source: any, { id }: any, { dataSources }: any) => {
      return dataSources.billlplz.getBill(id);
    },
    registrationCheckByBankAccountNumber: (
      _source: any,
      { id }: any,
      { dataSources }: any
    ) => {
      return dataSources.billlplz.registrationCheckByBankAccountNumber(id);
    },
    getTransactionIndex: (
      _source: any,
      { bill_id, page, status }: any,
      { dataSources }: any
    ) => {
      return dataSources.billlplz.getTransactionIndex(bill_id, page, status);
    },
    getPaymentMethodIndex: (
      _source: any,
      { COLLECTION_ID }: any,
      { dataSources }: any
    ) => {
      return dataSources.billlplz.getPaymentMethodIndex(COLLECTION_ID);
    },
    getBankAccount: (
      _source: any,
      { BANK_ACCOUNT_NUMBER }: any,
      { dataSources }: any
    ) => {
      return dataSources.billlplz.getBankAccount(BANK_ACCOUNT_NUMBER);
    },
    getFPXBanks: (_source: any, _args: any, { dataSources }: any) => {
      return dataSources.billlplz.getFPXBanks();
    },
  },
  Mutation: {
    createCollection: (_source: any, args: any, { dataSources }: any) => {
      return dataSources.billlplz.createCollection(args);
    },
    createOpenCollection: (_source: any, args: any, { dataSources }: any) => {
      return dataSources.billlplz.createOpenCollection(args);
    },
    collectionActivation: (_source: any, args: any, { dataSources }: any) => {
      return dataSources.billlplz.collectionActivation(args);
    },
    createMPICollection: (_source: any, args: any, { dataSources }: any) => {
      return dataSources.billlplz.createMPICollection(args);
    },
    createMPI: (_source: any, args: any, { dataSources }: any) => {
      return dataSources.billlplz.createMPI(args);
    },
    createBill: (_source: any, args: any, { dataSources }: any) => {
      return dataSources.billlplz.createBill(args);
    },
    deleteBill: (_source: any, { id }: any, { dataSources }: any) => {
      dataSources.billlplz.deleteBill(id);

      return "Deleted";
    },
    updatePaymentMethods: (
      _source: any,
      { COLLECTION_ID, payment_methods }: any,
      { dataSources }: any
    ) => {
      return dataSources.billlplz.updatePaymentMethods(
        COLLECTION_ID,
        payment_methods
      );
    },
    createBankAccount: (_source: any, args: any, { dataSources }: any) => {
      return dataSources.billlplz.createBankAccount(args);
    },
  },
};

export default resolvers;
