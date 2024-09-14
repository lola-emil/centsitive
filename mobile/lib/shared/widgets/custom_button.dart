import 'package:expense_tracker/shared/color/custom_color_scheme.dart';
import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final Function() onPressed;

  const CustomButton({
    super.key,
    required this.text,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return FractionallySizedBox(
      widthFactor: 1,
      child: ElevatedButton(
          onPressed: onPressed,
          style: ButtonStyle(
            shape: WidgetStatePropertyAll(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(5),
              ),
            ),
            backgroundColor:
                const WidgetStatePropertyAll(CustomColorScheme.myPrimary),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16 * 1.15),
            child: Text(
              text,
              style: const TextStyle(fontSize: 16, color: Colors.white),
            ),
          )),
    );
  }
}
