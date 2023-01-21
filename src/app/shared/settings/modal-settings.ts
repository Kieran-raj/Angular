export const modalSettings: { [key: string]: any } = {
  newTransaction: {
    modalTitle: 'New Transaction',
    showAmount: true,
    showCategoryDropdown: true,
    showNewCategory: false,
    showDate: true,
    showDescription: true,
    okButtonText: 'Add',
    showForm: true,
  },
  newCategory: {
    modalTitle: 'New Category',
    showNewCategory: true,
    okButtonText: 'Add',
    showForm: true,
  },
  editTransaction: {
    modalTitle: 'Edit Transaction',
    showAmount: true,
    showCategoryDropdown: true,
    showNewCategory: false,
    showDate: true,
    showDescription: true,
    okButtonText: 'Edit',
    showForm: true,
  },
  deleteTransaction: {
    modalTitle: 'Delete Transaction',
    okButtonText: 'Delete',
    showForm: false,
    message: 'Are you sure you want to delete this transaction?',
  },
};
