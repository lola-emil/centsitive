import 'package:expense_tracker/shared/color/custom_color_scheme.dart';
import 'package:expense_tracker/shared/widgets/custom_button.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:flutter/material.dart';
import 'package:expense_tracker/features/tracker/repository/expense_repository.dart'
    as expense_repository;

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

  String? selectedCategory;

  void submitTransaction(BuildContext context) {
    setState(() {
      isLoading = true;
    });
    if (amountController.text.isEmpty) {
      _snackbar.showSnackBar(
          const SnackBar(content: Text("`amount` is not allowed be empty")));
      setState(() {
        isLoading = false;
      });
      return;
    }
    expense_repository
        .addTransaction(selectedCategory!,
            double.parse(amountController.text), noteController.text)
        .then((value) {
      setState(() {
        isLoading = false;
      });
      _snackbar
          .showSnackBar(const SnackBar(content: Text("Added successfully")));
      Navigator.pop(context, "Added successfully");
    }).catchError((error) {
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
          child: Column(
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
                      child: Text(selectedCategory ?? "Select Category",
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
                      setState(() {
                        selectedCategory = value!;
                      });
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
                  label: Text("Note"),
                ),
              ),
              const SizedBox(
                height: 16,
              ),
              CustomButton(
                  text: isLoading ? "Loading..." : "Submit",
                  onPressed: () => submitTransaction(context))
            ],
          ),
        ),
      ),
    );
  }
}
