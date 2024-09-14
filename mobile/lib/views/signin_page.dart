import 'package:expense_tracker/components/signin_form.dart';
import 'package:flutter/material.dart';

class SignInPage extends StatelessWidget {
  const SignInPage({super.key});

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    double screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
        body: Center(
      child: SizedBox(
        height: screenHeight,
        width: screenWidth * .93333,
        child: const Column(
          children: [
            // Label section
            Expanded(
              child: Center(
                child: Text(
                  "SIGN IN",
                  style: TextStyle(fontSize: 16 * 1.25),
                ),
              ),
            ),

            // Form Section
            Expanded(child: SignInForm()),
            SizedBox(height: 16)
          ],
        ),
      ),
    ));
  }
}
