import 'dart:ui';

import 'package:expense_tracker/components/drawer_menu.dart';
import 'package:expense_tracker/shared/color/custom_color_scheme.dart';
import 'package:expense_tracker/shared/widgets/custom_button.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:flutter/material.dart';

import 'package:expense_tracker/repository/user_repository.dart'
    as auth_repository;
import 'package:go_router/go_router.dart';

class UpdateProfilePage extends StatefulWidget {
  const UpdateProfilePage({super.key});

  @override
  State<UpdateProfilePage> createState() => _UpdateProfilePageState();
}

class _UpdateProfilePageState extends State<UpdateProfilePage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  late ScaffoldMessengerState _snackbar;

  TextEditingController currentPasswordController = TextEditingController();
  TextEditingController newPasswordController = TextEditingController();

  bool isLoading = false;


  @override
  void setState(VoidCallback fn) {
    if (mounted) {
      super.setState(fn);
    }
  }

  void submitChanges() {
    setState(() {
      isLoading = true;
    });

    auth_repository
        .updatePassword(
            currentPasswordController.text, newPasswordController.text)
        .then((value) {
      setState(() {
        isLoading = false;
      });
      _snackbar.showSnackBar(SnackBar(content: Text(value)));
      context.go("/overview");
    }).catchError((error) {
      print(error);
      setState(() {
        isLoading = false;
      });
      _snackbar.showSnackBar(
          SnackBar(content: Text(error.response.data["message"])));
    });
  }

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    double screenWidth = MediaQuery.of(context).size.width;
    _snackbar = ScaffoldMessenger.of(context);

    return Scaffold(
      key: _scaffoldKey,
      drawer: const DrawerMenu(),
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(60),
        child: ClipRect(
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
            child: AppBar(
              scrolledUnderElevation: 0,
              backgroundColor: const Color.fromARGB(82, 10, 10, 10),
              bottom: PreferredSize(
                preferredSize: const Size.fromHeight(1),
                child: Container(
                  height: 1,
                  color: CustomColorScheme.mySurface,
                ),
              ),
              leading: IconButton(
                  onPressed: ()  {
                    _scaffoldKey.currentState?.openDrawer();
                  },
                  icon: const Icon(FluentIcons.list_16_regular)),
              title: const Text(
                "Overview",
                style: TextStyle(fontSize: 16),
              ),
              elevation: 0,
            ),
          ),
        ),
      ),
      body: Center(
          child: SizedBox(
        height: screenHeight,
        width: screenWidth * .9333,
        child: Column(children: [
          const SizedBox(
            height: 16,
          ),
          TextFormField(
            controller: currentPasswordController,
            obscureText: true,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              label: Text("Current Password"),
            ),
          ),
          const SizedBox(
            height: 16,
          ),
          TextFormField(
            controller: newPasswordController,
            obscureText: true,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              label: Text("New Password"),
            ),
          ),
          const SizedBox(
            height: 16,
          ),
          CustomButton(
              text: isLoading ? "Loading..." : "Update",
              onPressed: submitChanges)
        ]),
      )),
    );
  }
}
