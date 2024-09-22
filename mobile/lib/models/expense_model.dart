class ExpenseModel {
  final dynamic id;
  final dynamic note;
  final dynamic category;
  final dynamic amount;
  final dynamic userId;
  final dynamic status;
  final dynamic createdAt;

  ExpenseModel(
    this.id,
    this.note,
    this.category,
    this.amount,
    this.userId,
    this.createdAt, this.status,
  );
}
