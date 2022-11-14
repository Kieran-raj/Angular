export interface UpdateState {
  categoryUpdate: {
    newCategory: string | null;
    isUpdated: boolean | null;
  } | null;

  transactionCreateUpdate: {
    newTransaction: any | null;
    isUpdate: boolean | null;
  } | null;
}
