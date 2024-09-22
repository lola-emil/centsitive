import 'dart:io';

import 'package:expense_tracker/shared/color/custom_color_scheme.dart';
import 'package:expense_tracker/shared/widgets/custom_button.dart';
import 'package:file_picker/file_picker.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:flutter/material.dart';
import 'package:expense_tracker/repository/expense_repository.dart'
    as expense_repository;
import 'package:image_picker/image_picker.dart';

class AddRecordPage extends StatefulWidget {
  const AddRecordPage({super.key});

  @override
  State<AddRecordPage> createState() => _AddRecordPageState();
}

class _AddRecordPageState extends State<AddRecordPage> {
  late ScaffoldMessengerState _snackbar;

  List<String> list = <String>["income", "expense"];

  bool isLoading = false;

  String selectedValue = "expense";
  TextEditingController categoryController = TextEditingController();
  TextEditingController amountController = TextEditingController();
  TextEditingController noteController = TextEditingController();
  File? image;

  PlatformFile? file;

  final imagePicker = ImagePicker();

  String? selectedCategory;

  void submitTransaction(BuildContext context) {
    if (mounted) {
      setState(() {
        isLoading = true;
      });
    }
    if (amountController.text.isEmpty) {
      _snackbar.showSnackBar(
          const SnackBar(content: Text("`amount` is not allowed be empty")));
      if (mounted) {
        setState(() {
          isLoading = false;
        });
      }
      return;
    }
    expense_repository
        .addTransaction(selectedCategory!, double.parse(amountController.text),
            noteController.text, file!)
        .then((value) {
      if (mounted) {
        setState(() {
          isLoading = false;
        });
      }
      _snackbar
          .showSnackBar(const SnackBar(content: Text("Added successfully")));
      Navigator.pop(context, "Added successfully");
    }).catchError((error) {
      if (error is UnsupportedError) {
        _snackbar.showSnackBar(SnackBar(content: Text(error.message!)));
      }

      if (mounted) {
        setState(() {
          isLoading = false;
        });
      }
      _snackbar.showSnackBar(
          SnackBar(content: Text(error.response.data["message"])));
    });
  }

  @override
  void setState(VoidCallback fn) {
    if (mounted) {
      super.setState(fn);
    }
  }

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    double screenWidth = MediaQuery.of(context).size.width;

    List<String> categories =
        List.of(["Bills", "Subscription", "Utilities", "Equipment"]);

    _snackbar = ScaffoldMessenger.of(context);

    return Scaffold(
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(60),
        child: AppBar(
          backgroundColor: CustomColorScheme.myBackground,
          leading: IconButton(
              onPressed: () {
                Navigator.pop(context);
              },
              icon: const Icon(FluentIcons.chevron_left_12_regular)),
          title: const Text(
            "Add Record",
            style: TextStyle(fontSize: 16),
          ),
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(1),
            child: Container(
              height: 1,
              color: CustomColorScheme.mySurface,
            ),
          ),
        ),
      ),
      body: Center(
        child: SizedBox(
          height: screenHeight,
          width: screenWidth * .9333,
          child: ListView(
            children: [
              Column(
                children: [
                  const SizedBox(
                    height: 16,
                  ),
                  FractionallySizedBox(
                    widthFactor: 1,
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(5),
                        border: Border.all(
                          color: Colors.white, // Border color
                          width: 1, // Border width
                        ),
                      ),
                      child: DropdownButton<String>(
                        hint: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            selectedCategory ?? "Select Category",
                            style: const TextStyle(color: Colors.white),
                          ),
                        ),
                        underline: const SizedBox(),
                        items: List.generate(
                            categories.length,
                            (int index) => DropdownMenuItem(
                                  value: categories[index],
                                  child: Text(categories[index]),
                                )),
                        onChanged: (String? value) {
                          if (mounted) {
                            setState(() {
                              selectedCategory = value!;
                            });
                          }
                        },
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 16,
                  ),
                  TextFormField(
                    controller: amountController,
                    keyboardType: TextInputType.number,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      label: Text("Amount"),
                    ),
                  ),
                  const SizedBox(
                    height: 16,
                  ),
                  TextFormField(
                    controller: noteController,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      label: Text("Description"),
                    ),
                  ),
                  const SizedBox(
                    height: 16,
                  ),
                  FractionallySizedBox(
                    widthFactor: 1,
                    child: ElevatedButton(
                        onPressed: () async {
                          FilePickerResult? result =
                              await FilePicker.platform.pickFiles();

                          if (result != null) {
                            PlatformFile file = result.files.first;

                            setState(() {
                              this.file = file;
                            });
                          }
                        },
                        style: ButtonStyle(
                          shape: WidgetStatePropertyAll(
                            RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(5),
                              side: const BorderSide(
                                color: Colors
                                    .white, // Change to your desired border color
                                width: 1, // Change to your desired border width
                              ),
                            ),
                          ),
                          backgroundColor: const WidgetStatePropertyAll(
                              CustomColorScheme.mySurface),
                        ),
                        child: const Padding(
                          padding: EdgeInsets.all(16 * 1.15),
                          child: Row(
                            children: [
                              Icon(
                                FluentIcons.document_16_regular,
                                color: Colors.white,
                              ),
                              SizedBox(width: 5),
                              Text(
                                "Attach Document",
                                style: TextStyle(
                                    fontSize: 16, color: Colors.white),
                              ),
                            ],
                          ),
                        )),
                  ),
                  const SizedBox(
                    height: 16,
                  ),
                  FractionallySizedBox(
                    widthFactor: 1,
                    child: file != null
                        ? Text(file!.name)
                        : const Text("No file selected."),
                  ),
                  const SizedBox(
                    height: 16 * 2,
                  ),
                  CustomButton(
                      text: isLoading ? "Loading..." : "Submit",
                      onPressed: () => submitTransaction(context))
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
