export interface UpdateState {
  categoryUpdate: {
    newCategory: string | null;
    isUpdated: boolean | null;
    action: string | null;
  } | null;

  transactionCreateUpdate: {
    transaction: any | null;
    isUpdated: boolean | null;
    action: string | null;
  } | null;

  modalAction: string | null;
}
