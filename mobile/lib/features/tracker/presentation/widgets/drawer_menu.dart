import 'package:expense_tracker/shared/color/custom_color_scheme.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:expense_tracker/features/auth/repository/user_repository.dart' as auth_repository;
import "package:flutter_secure_storage/flutter_secure_storage.dart";

class DrawerMenu extends StatefulWidget {

  const DrawerMenu({super.key});

  @override
  State<DrawerMenu> createState() => _DrawerMenuState();
}

class _DrawerMenuState extends State<DrawerMenu> {

  late String? username = "";

  @override
  void initState() {
    super.initState();

    FlutterSecureStorage secureStorage = const FlutterSecureStorage();

    secureStorage.read(key: "USERNAME").then((value) {
      setState(() {
        username = value;
      });
    }).catchError((error) {
      setState(() {
        username = "";
      });
    });

  }

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    double screenWidth = MediaQuery.of(context).size.width;

    double containerWidth = (screenWidth * .93333) * .9;

    return Drawer(
      width: screenWidth * .9,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.zero),
      child: Container(
        color: CustomColorScheme.myBackground,
        child: SizedBox(
          height: screenHeight,
          child: Column(
            // crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(
                height: 100,
                width: containerWidth,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SizedBox(
                      height: 16,
                    ),
                    Text(
                      username!,
                      style: const TextStyle(fontSize: 16 * 1.15),
                    ),
                    GestureDetector(
                      onTap: () {
                        context.go("/update-profile");
                      },
                      child: const Text(
                        "Update Password",
                        style: TextStyle(fontSize: 16, color: CustomColorScheme.myPrimary),
                      ),
                    )
                  ],
                ),
              ),
              Divider(
                height: 1,
                indent: (screenWidth - (screenWidth * .93333)) / 2,
                endIndent: (screenWidth - (screenWidth * .93333)) / 2,
                color: CustomColorScheme.mySurface,
              ),
              Expanded(
                flex: 1,
                child: Column(
                  children: [
                    Expanded(
                      flex: 1,
                      child: Column(
                        children: [
                          ListTile(
                            contentPadding: const EdgeInsets.all(5),
                            leading: const Icon(Icons.dashboard),
                            title: const Text("Overview"),
                            onTap: () {
                              context.go("/overview");
                            },
                          ),
                          ListTile(
                            contentPadding: const EdgeInsets.all(5),
                            leading: const Icon(Icons.list),
                            title: const Text("Transactions"),
                            onTap: () {
                              context.go("/transactions");
                            },
                          ),
                        ],
                      ),
                    ),
                    ListTile(
                      contentPadding: const EdgeInsets.all(5),
                      leading: const Icon(FluentIcons.sign_out_20_filled),
                      title: const Text("Sign Out"),
                      onTap: () {
                        auth_repository.logOut().then((value) {
                          context.go("/");
                        });
                      },
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
