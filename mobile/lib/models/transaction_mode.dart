class TransactionModel {
  final int recordId;
  final String note;
  final String category;
  final double amount;
  final String createdAt;

  TransactionModel(this.recordId, this.note, this.category, this.amount,
      this.createdAt);
}
