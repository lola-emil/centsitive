import 'package:dio/dio.dart';
import 'package:expense_tracker/models/expense_model.dart';
import 'package:expense_tracker/models/overview_model.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

const FlutterSecureStorage secureStorage = FlutterSecureStorage();
Dio dio = Dio();

Future<List<ExpenseModel>> getTransactions() async {
  String? token = await secureStorage.read(key: "TOKEN");
  String? userId = await secureStorage.read(key: "USER_ID");
  List<ExpenseModel> list = List.of([]);
  dio.options.headers["authorization"] = "Bearer $token";

  Response response = await dio
      .get("http://localhost:5000/expense/transactions?userId=$userId");

  dynamic data = response.data["data"];
  for (int i = 0; i < data.length; i++) {
    list.add(ExpenseModel(
        data[i]["record_id"],
        data[i]["note"],
        data[i]["category"],
        data[i]["amount"].toDouble(),
        int.parse(data[i]["user_id"]),
        data[i]["created_at"]));
  }

  return list;
}

Future<List<OverviewModel>> getOverview() async {
  String? token = await secureStorage.read(key: "TOKEN");
  String? userId = await secureStorage.read(key: "USER_ID");

  List<OverviewModel> list = List.of([]);

  dio.options.headers["authorization"] = "Bearer $token";

  Response response =
      await dio.get("http://localhost:5000/expense/overview?userId=$userId");

  dynamic data = response.data["data"];

  for (int i = 0; i < data.length; i++) {
    list.add(OverviewModel(data[i]["category"],
        data[i]["total_expense"].toDouble(), data[i]["percentage"].toDouble()));
  }

  return list;
}

Future<List<ExpenseModel>> getRecentTransactions() async {
  String? token = await secureStorage.read(key: "TOKEN");
  String? userId = await secureStorage.read(key: "USER_ID");

  List<ExpenseModel> list = List.of([]);

  dio.options.headers["authorization"] = "Bearer $token";

  Response response =
      await dio.get("http://localhost:5000/expense/recent?userId=$userId");
  dynamic data = response.data["data"];

  for (int i = 0; i < data.length; i++) {
    list.add(ExpenseModel(
        data[i]["record_id"],
        data[i]["note"],
        data[i]["category"],
        data[i]["amount"].toDouble(),
        int.parse(data[i]["user_id"]),
        data[i]["created_at"]));
  }

  return list;
}

Future<void> addTransaction(String category, double amount, String note) async {
  String? token = await secureStorage.read(key: "TOKEN");
  String? userId = await secureStorage.read(key: "USER_ID");

  dio.options.headers["authorization"] = "Bearer $token";

  await dio.post("http://localhost:5000/expense/transactions", data: {
    "category": category,
    "amount": amount,
    "note": note,
    "user_id": userId
  });
}

Future<List<ExpenseModel>> searchTransaction(String query) async {
  String? token = await secureStorage.read(key: "TOKEN");
  String? userId = await secureStorage.read(key: "USER_ID");

  List<ExpenseModel> list = List.of([]);

  dio.options.headers["authorization"] = "Bearer $token";
  Response response = await dio
      .get("http://localhost:5000/expense/search?q=$query&userId=$userId");
  dynamic data = response.data["data"];

  for (int i = 0; i < data.length; i++) {
    list.add(ExpenseModel(
        data[i]["record_id"],
        data[i]["note"],
        data[i]["category"],
        data[i]["amount"].toDouble(),
        int.parse(data[i]["user_id"]),
        data[i]["created_at"]));
  }

  return list;
}

Future<String> getCurrentMonthAndYear() async {
  String? token = await secureStorage.read(key: "TOKEN");

  dio.options.headers["authorization"] = "Bearer $token";
  Response response = await dio.get("http://localhost:5000/expense/current-month-year");
  dynamic data = response.data["data"];

  return data["time"];
}


Future<String> deleteTransaction(int itemId) async {
  String? token = await secureStorage.read(key: "TOKEN");

  dio.options.headers["authorization"] = "Bearer $token";

  Response response = await dio.delete("http://localhost:5000/expense/transactions/$itemId");
  dynamic message = response.data["message"];

  return message.toString();
}