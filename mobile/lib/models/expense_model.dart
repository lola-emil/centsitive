class ExpenseModel {
  final int id;
  final String note;
  final String category;
  final double amount;
  final int userId;
  final String createdAt;

  ExpenseModel(
    this.id,
    this.note,
    this.category,
    this.amount,
    this.userId,
    this.createdAt,
  );
}
