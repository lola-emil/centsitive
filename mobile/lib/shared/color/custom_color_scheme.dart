import 'package:flutter/material.dart';

class CustomColorScheme extends ColorScheme {
  // Define your custom colors here
  static const Color myBackground = Color.fromRGBO(10, 10, 10, 1);
  static const Color onMyBackground = Colors.white;

  // static const Color myPrimary = Color(0x003b82f6);
  static const Color myPrimary = Color.fromRGBO(59, 130, 246, 1);
  static const Color onMyPrimary = Colors.white;

  static const Color mySecondary = Color.fromRGBO(251, 191, 36, 1);
  static const Color onMySecondary = Color(0x00171717);

  static const Color myError = Color.fromRGBO(251, 113, 133, 1);
  static const Color onMyError = Colors.white;

  static const Color mySurface = Color.fromRGBO(23, 23, 23, 1);
  static const Color onMySurface = Colors.white;

  const CustomColorScheme(
      {Color primary = myPrimary,
      Color onPrimary = onMyPrimary,
      Color background = myBackground,
      Color onBackground = onMyBackground,
      Color secondary = mySecondary,
      Color onSecondary = onMySecondary,
      Color error = myError,
      Color onError = onMyError,
      Color surface = mySurface,
      Color onSurface = onMySurface})
      : super(
            brightness: Brightness.light,
            primary: primary,
            onPrimary: onPrimary,
            secondary: secondary,
            onSecondary: onSecondary,
            error: error,
            onError: onError,
            surface: surface,
            onSurface: onSurface);
}
