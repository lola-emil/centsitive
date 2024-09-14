import "package:dio/dio.dart";
import "package:flutter_secure_storage/flutter_secure_storage.dart";

final Dio dio = Dio();
const FlutterSecureStorage secureStorage = FlutterSecureStorage();

Future<void> signIn(String email, String password) async {
  Response response = await dio.post("http://localhost:5000/auth/login",
      data: {"email": email, "password": password});

  String token = response.data["data"]["token"];
  int userId = response.data["data"]["user_id"];
  String name = response.data["data"]["name"];

  await secureStorage.write(key: "USER_ID", value: userId.toString());
  await secureStorage.write(key: "TOKEN", value: token);
  await secureStorage.write(key: "USERNAME", value: name);
}

Future<bool> isLoggedIn() async {
  String? token = await secureStorage.read(key: "TOKEN");
  String? userId = await secureStorage.read(key: "USER_ID");
  String? username = await secureStorage.read(key: "USERNAME");

  if (token != null && userId != null && username != null) {
    return true;
  }

  return false;
}

Future<void> logOut() async {
  await secureStorage.delete(key: "TOKEN");
  await secureStorage.delete(key: "USER_ID");
  await secureStorage.delete(key: "USERNAME");
}

Future<String> updatePassword(
    String currentPassword, String newPassword) async {
  String? token = await secureStorage.read(key: "TOKEN");
  String? userId = await secureStorage.read(key: "USER_ID");

  dio.options.headers["authorization"] = "Bearer $token";
  Response response = await dio.post(
      "http://localhost:5000/auth/update-password?userId=$userId",
      data: {"currentPassword": currentPassword, "newPassword": newPassword});

  dynamic data = response.data["message"];

  return data.toString();
}
