import 'dart:io';

import 'package:dio/dio.dart';
import 'package:expense_tracker/models/expense_model.dart';
import 'package:expense_tracker/models/overview_model.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mime/mime.dart';

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
        data[i]["created_at"],
        data[i]["status"]
        ));
  }

  return list;
}

Future<List<OverviewModel>> getOverview(DateTime? date) async {
  String? token = await secureStorage.read(key: "TOKEN");
  String? userId = await secureStorage.read(key: "USER_ID");

  String url = "http://localhost:5000/expense/overview?userId=$userId";

  if (date != null) {
    url += "&date=$date";
  }

  List<OverviewModel> list = List.of([]);

  dio.options.headers["authorization"] = "Bearer $token";

  Response response = await dio.get(url);

  dynamic data = response.data["data"];

  for (int i = 0; i < data.length; i++) {
    list.add(OverviewModel(data[i]["category"],
        data[i]["total_expense"].toDouble(), data[i]["percentage"].toDouble()));
  }

  return list;
}

Future<List<ExpenseModel>> getRecentTransactions(DateTime? date) async {
  String? token = await secureStorage.read(key: "TOKEN");
  String? userId = await secureStorage.read(key: "USER_ID");

  String url = "http://localhost:5000/expense/recent?userId=$userId";

  if (date != null) {
    url += "&date=$date";
  }

  List<ExpenseModel> list = List.of([]);

  dio.options.headers["authorization"] = "Bearer $token";

  Response response = await dio.get(url);
  dynamic data = response.data["data"];

  for (int i = 0; i < data.length; i++) {
    list.add(ExpenseModel(
        data[i]["record_id"],
        data[i]["note"],
        data[i]["category"],
        data[i]["amount"].toDouble(),
        int.parse(data[i]["user_id"]),
        data[i]["created_at"],
        
        data[i]["status"]
        ));
  }

  return list;
}

Future<void> addTransaction(
    String category, double amount, String note, PlatformFile file) async {
  String? token = await secureStorage.read(key: "TOKEN");
  String? userId = await secureStorage.read(key: "USER_ID");

  // print(image);

  dio.options.headers["authorization"] = "Bearer $token";

  FormData formData = FormData.fromMap({
    "category": category,
    "amount": amount,
    "note": note,
    "user_id": userId,
  });

  if (kIsWeb) {
    dynamic image = file.bytes;
    formData.files.add(MapEntry(
      "image",
      MultipartFile.fromBytes(image,
          filename: file.name,
          contentType: DioMediaType.parse(lookupMimeType(file.name) ?? "application/octet-stream")),
    ));
  } else {
    File image = File(file.path!);
    formData.files.add(MapEntry(
      "image",
      await MultipartFile.fromFile(image.path),
    ));
  }

  await dio.post("http://localhost:5000/expense/transactions",
      data: formData,
      options: Options(headers: {"Content-Type": "multipart/form-data"}));
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
        data[i]["created_at"],
        data[i]["status"]
        
        ));
  }

  return list;
}

Future<String> getFormattedMonthAndYear(DateTime? date) async {
  String? token = await secureStorage.read(key: "TOKEN");

  dio.options.headers["authorization"] = "Bearer $token";

  String url = "http://localhost:5000/expense/format-month-year";

  if (date != null) {
    url += "?date=$date";
  }

  Response response = await dio.get(url);
  dynamic data = response.data["data"];

  return data["time"];
}

Future<ExpenseModel> getTransactionById(int id) async {
    String? token = await secureStorage.read(key: "TOKEN");
  // String? userId = await secureStorage.read(key: "USER_ID");


    dio.options.headers["authorization"] = "Bearer $token";
  Response response = await dio
      .get("http://localhost:5000/expense/transactions/$id");

  dynamic data = response.data["data"];
  
  print(data);

  return ExpenseModel(data["record_id"], data["note"], data["category"], data["amount"], data["user_id"], data["created_at"],
        data["status"]
  );
}

Future<String> deleteTransaction(int itemId) async {
  String? token = await secureStorage.read(key: "TOKEN");

  dio.options.headers["authorization"] = "Bearer $token";

  Response response =
      await dio.delete("http://localhost:5000/expense/transactions/$itemId");
  dynamic message = response.data["message"];

  return message.toString();
}
