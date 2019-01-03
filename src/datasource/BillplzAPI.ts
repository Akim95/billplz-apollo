import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

const { BILLPLZ_API_SECRET_KEY, NODE_ENV } = process.env;

class BillplzAPI extends RESTDataSource {
  constructor() {
    super();
  }

  get baseURL() {
    if (NODE_ENV === "staging") {
      return "https://billplz-staging.herokuapp.com/api/";
    }

    if (NODE_ENV === "production") {
      return "https://www.billplz.com/api/";
    }
  }

  willSendRequest(request: RequestOptions) {

    // set appikey to Authorization header
    const username = Buffer.from(`${BILLPLZ_API_SECRET_KEY}:`).toString("base64");

    request.headers.set("Authorization", `Basic ${username}`);
  }

  async getCollection(id: string) {
    return this.get(`/v4/collections/${id}`);
  }

  async createCollection(collection: any) {
    return this.post("/v4/collections", collection);
  }

  async getCollectionIndex(collection: any) {
    const collections = await this.get(
      `/v4/collections?page=${collection.page}&status=${collection.status}`
    );

    return collections.collections;
  }

  async getOpenCollection(id: string) {
    return this.get(`/v4/open_collections/${id}`);
  }

  async createOpenCollection(collection: any) {
    return this.post("/v4/open_collections", collection);
  }

  async getOpenCollectionIndex(collection: any) {
    const collections = await this.get(
      `/v4/open_collections?page=${collection.page}&status=${collection.status}`
    );

    return collections.open_collections;
  }

  collectionActivation(collection: any) {
    this.post(`/v3/collections/${collection.id}/${collection.status}`);
  }

  async createMPICollection(mpi: any) {
    return this.post("/v4/mass_payment_instruction_collections", mpi);
  }

  async getMPICollection(id: string) {
    return this.get(`/v4/mass_payment_instruction_collections/${id}`);
  }

  async createMPI(mpi: any) {
    return this.post("/v4/mass_payment_instructions", mpi);
  }

  async getMPI(id: string) {
    return this.get(`/v4/mass_payment_instructions/${id}`);
  }

  async getWebHookRank() {
    return this.get("/v4webhook_rank");
  }

  async createBill(bill: any) {
    return this.post("/v3/bills", bill);
  }

  async getBill(id: string) {
    return this.get(`/v3/bills/${id}`);
  }

  async deleteBill(id: string) {
    return this.delete(`/v3/bills/${id}`);
  }

  async registrationCheckByBankAccountNumber(BANK_ACCOUNT_NUMBER: string) {
    return this.get(`/v3/check/bank_account_number/${BANK_ACCOUNT_NUMBER}`);
  }

  async getTransactionIndex(bill_id: string, page: number, status: string) {
    return this.get(
      `/v3/bills/${bill_id}/transactions?page=${page}&status=${status}`
    );
  }

  async getPaymentMethodIndex(COLLECTION_ID: string) {
    const paymentMethods = await this.get(
      `/v3/collections/${COLLECTION_ID}/payment_methods`
    );

    return paymentMethods.payment_methods;
  }

  async updatePaymentMethods(COLLECTION_ID: string, methods: string) {
    const updatePaymentMethods = await this.put(
      `/v3/collections/${COLLECTION_ID}/payment_methods`,
      { payment_methods: methods }
    );

    return updatePaymentMethods.payment_methods;
  }

  async getBankAccount(BANK_ACCOUNT_NUMBER: string) {
    return this.get(`/v3/bank_verification_services/${BANK_ACCOUNT_NUMBER}`);
  }

  async createBankAccount(bankAccount: any) {
    return this.post("/v3/bank_verification_services", bankAccount);
  }

  async getFPXBanks() {
    const fpx = await this.get("/v3/fpx_banks");

    return fpx.banks;
  }
}

export default BillplzAPI;
