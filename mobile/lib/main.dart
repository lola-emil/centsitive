import 'package:expense_tracker/views/signin_page.dart';
import 'package:expense_tracker/views/overview_page.dart';
import 'package:expense_tracker/views/records_page.dart';
import 'package:expense_tracker/views/update_profile_page.dart';
import 'package:expense_tracker/shared/color/custom_color_scheme.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:month_year_picker/month_year_picker.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

void main() {
  runApp(const MyApp());
}

final router = GoRouter(routes: [
  GoRoute(path: "/", builder: (contex, state) => const SignInPage()),
  GoRoute(path: "/overview", builder: (contex, state) => const OverviewPage()),
  GoRoute(
      path: "/transactions", builder: (contex, state) => const RecordsPage()),
  GoRoute(
      path: "/update-profile",
      builder: (contex, state) => const UpdateProfilePage()),
]);

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: const CustomColorScheme(),
        useMaterial3: true,
      ),
      debugShowCheckedModeBanner: false,
      routerConfig: router,
      localizationsDelegates: const [
        GlobalWidgetsLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        MonthYearPickerLocalizations.delegate,
      ],
    );
  }
}
