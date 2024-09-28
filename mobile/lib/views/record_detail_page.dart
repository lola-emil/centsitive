import 'dart:ui';

import 'package:expense_tracker/models/expense_model.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:flutter/material.dart';

import 'package:expense_tracker/repository/expense_repository.dart'
    as expense_repository;

import '../components/drawer_menu.dart';
import '../shared/color/custom_color_scheme.dart';

class RecordDetailPage extends StatefulWidget {
  final int itemId;

  const RecordDetailPage({super.key, required this.itemId});

  @override
  State<RecordDetailPage> createState() => _RecordDetailPageState();
}

class _RecordDetailPageState extends State<RecordDetailPage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  ExpenseModel? expense;
    late ScaffoldMessengerState _snackbar;

  String category = "";
  String description = "";
  String status = "";
  double amount = 0;

  Future<void> fetchData() async {
    ExpenseModel result =
        await expense_repository.getTransactionById(widget.itemId);

    setState(() {
      category = result.category;
      description = result.note;
      amount = result.amount;
      status = result.status;
    });
  }

  @override
  void setState(VoidCallback fn) {
    if (mounted) {
      super.setState(fn);
    }
  }

  @override
  void initState() {
    fetchData();
    super.initState();
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
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(FluentIcons.chevron_left_12_regular)),
                title: const Text(
                  "Details",
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
            child: ListView(
              children: [
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SizedBox(
                      height: 16,
                    ),
                    Text(
                      status.toUpperCase(),
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 16 * 1.75,
                        color: status == "approved"
                            ? Colors.green
                            : status == "pending"
                                ? Colors.white
                                : CustomColorScheme.myError,
                      ),
                    ),
                    const SizedBox(
                      height: 16,
                    ),
                    Row(
                      children: [
                        const Text("Category: ",
                            style: TextStyle(fontSize: 16 * 1.15)),
                        Text(category, style: TextStyle(fontSize: 16 * 1.15))
                      ],
                    ),
                    Row(
                      children: [
                        const Text(
                          "Description: ",
                          style: TextStyle(fontSize: 16 * 1.15),
                        ),
                        Text(description, style: TextStyle(fontSize: 16 * 1.15))
                      ],
                    ),
                    const SizedBox(
                      height: 16,
                    ),
                    Row(
                      children: [
                        const Text(
                          "Amount: ",
                          style: TextStyle(fontSize: 16 * 1.15),
                        ),
                        Text("Php ${amount.toStringAsFixed(2)}",
                            style: TextStyle(fontSize: 16 * 1.15))
                      ],
                    ),
                    const SizedBox(
                      height: 16,
                    ),
                    if (status == "pending")
                      FractionallySizedBox(
                        widthFactor: 1,
                        child: ElevatedButton(
                          onPressed: () {
                            expense_repository
                                .deleteTransaction(widget.itemId)
                                .then((val) {
                                  print(val) ;
                              _snackbar.showSnackBar(const SnackBar(
                                  content: Text("Deleted Successfully")));

                                  Navigator.pop(context, "Added successfully");
                            }).catchError((error) {});
                          },
                          style: ButtonStyle(
                            backgroundColor:
                                const WidgetStatePropertyAll(Colors.red),
                            shape: WidgetStatePropertyAll(
                              RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(5),
                              ),
                            ),
                          ),
                          child: const Padding(
                            padding: EdgeInsets.all(16 * 1.15),
                            child: Row(
                              children: [
                                Icon(
                                  FluentIcons.delete_16_regular,
                                  color: Colors.white,
                                ),
                                SizedBox(width: 5),
                                Text(
                                  "Delete Transaction",
                                  style: TextStyle(
                                      fontSize: 16, color: Colors.white),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
              ],
            ),
          ),
        ));
  }
}
