import 'package:flutter/material.dart';

class FormInput extends StatefulWidget {
  final String labelText;
  final IconData icon;
  final bool obscureText;
  final Function(String) onChanged;
  final TextEditingController controller;
  
  const FormInput(
      {super.key,
      required this.labelText,
      required this.icon,
      required this.obscureText,
      required this.onChanged, required this.controller});

  @override
  State<FormInput> createState() => _FormInputState();
}

class _FormInputState extends State<FormInput> {
  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: widget.controller,
      onChanged: widget.onChanged,
      obscureText: widget.obscureText,
      decoration: InputDecoration(
        labelText: widget.labelText,
        prefixIcon: Icon(widget.icon),
        enabledBorder: const UnderlineInputBorder(),
      ),
    );
  }
}
