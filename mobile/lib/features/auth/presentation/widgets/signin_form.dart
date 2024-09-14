import 'package:expense_tracker/shared/widgets/custom_button.dart';
import 'package:expense_tracker/features/auth/presentation/widgets/form_input.dart';
import 'package:flutter/material.dart';

import 'package:expense_tracker/features/auth/repository/user_repository.dart'
    as auth_repository;
import 'package:go_router/go_router.dart';

class SignInForm extends StatefulWidget {
  const SignInForm({super.key});

  @override
  State<SignInForm> createState() => _SignInFormState();
}

class _SignInFormState extends State<SignInForm> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  late ScaffoldMessengerState _snackbar;

  bool isLoading = false;

  void signIn() {
    setState(() => isLoading = true);
    auth_repository
        .signIn(emailController.text, passwordController.text)
        .then((value) {
      setState(() => isLoading = false);
      context.go("/overview");
    }).catchError((error) {
      print(error);

      setState(() {
        isLoading = false;
      });
      _snackbar.showSnackBar(SnackBar(
          content: Text(
              error.response?.data["message"] ?? "Server connection error")));
    });
  }

  @override
  void initState() {
    super.initState();

    auth_repository.isLoggedIn().then((loggedIn) {
      if (loggedIn) {
        context.go("/overview");
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    _snackbar = ScaffoldMessenger.of(context);
    return Column(
      children: [
        FormInput(
          labelText: "Email",
          controller: emailController,
          icon: Icons.person,
          obscureText: false,
          onChanged: (value) {},
        ),
        const SizedBox(height: 16),
        FormInput(
          labelText: "Password",
          controller: passwordController,
          icon: Icons.lock,
          obscureText: true,
          onChanged: (value) {},
        ),
        const SizedBox(height: 16 * 2),
        CustomButton(
            text: isLoading ? "Signing In..." : "Sign In",
            onPressed: () {
              isLoading ? null : signIn();
            })
      ],
    );
  }
}
