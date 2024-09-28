import 'dart:ui';

import 'package:expense_tracker/models/expense_model.dart';
import 'package:expense_tracker/components/drawer_menu.dart';
import 'package:expense_tracker/components/transaction_list_item.dart';
import 'package:expense_tracker/shared/color/custom_color_scheme.dart';
import 'package:expense_tracker/views/record_detail_page.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:flutter/material.dart';
import 'package:expense_tracker/repository/expense_repository.dart'
    as expense_repository;
import 'package:month_year_picker/month_year_picker.dart';

class RecordsPage extends StatefulWidget {
  const RecordsPage({super.key});

  @override
  State<RecordsPage> createState() => _RecordsPageState();
}

class _RecordsPageState extends State<RecordsPage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  late ScaffoldMessengerState _snackbar;

  bool isLoading = false;
  bool isError = false;
  List<ExpenseModel> expenseList = List.of([]);

  String currentMonthAndYear = "";

  DateTime? selectedMonthAndYear;

  Future<void> fetchData() async {
    setState(() {
      isLoading = true;
      isError = false;
    });

    final monthAndYear =
        await expense_repository.getFormattedMonthAndYear(null);

    expense_repository.getTransactions(null).then((list) {
      setState(() {
        expenseList = list;
        isLoading = false;
        currentMonthAndYear = monthAndYear;
      });
    }).catchError((error) {
      print(error);

      setState(() {
        isError = true;
        isLoading = false;
      });
    });
  }

  Future<void> fetchSearchedData(String query) async {
    setState(() {
      isLoading = true;
    });
    try {
      List<ExpenseModel> list = await expense_repository.searchTransaction(
          query, selectedMonthAndYear);

      setState(() {
        expenseList = list;
      });
    } catch (error) {
      print(error);
      setState(() {
        isError = true;
      });
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> deleteTransaction(int transactionId) async {
    try {
      String message =
          await expense_repository.deleteTransaction(transactionId);
      fetchData();
      _snackbar.showSnackBar(SnackBar(content: Text(message)));
    } catch (error) {
      setState(() {
        isError = true;
      });
    }
  }

  @override
  void initState() {
    fetchData();
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  void setState(VoidCallback fn) {
    if (mounted) {
      super.setState(fn);
    }
  }

  Future<void> showPicker() async {
    var result = await showMonthYearPicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2019),
      lastDate: DateTime.now(),
    );

    selectedMonthAndYear = result;

    if (result != null) {
      // getPreviousData(result);
      try {
        final results =
            await expense_repository.getTransactions(selectedMonthAndYear);
        final monthAndYear =
            await expense_repository.getFormattedMonthAndYear(result);

        if (mounted) {
          expenseList = results;
          currentMonthAndYear = monthAndYear;
        }
      } catch (error) {
        setState(() {
          isError = true;
        });
      } finally {
        setState(() {
          isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
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
                  onPressed: () => _scaffoldKey.currentState?.openDrawer(),
                  icon: const Icon(FluentIcons.list_16_regular)),
              title: const Text(
                "Transactions",
                style: TextStyle(fontSize: 16),
              ),
              elevation: 0,
            ),
          ),
        ),
      ),
      body: Center(
        child: Column(
          children: [
            const SizedBox(
              height: 10,
            ),
            FractionallySizedBox(
                widthFactor: .9,
                child: GestureDetector(
                  onTap: showPicker,
                  child: Row(
                    children: [
                      Text(
                        currentMonthAndYear,
                        style: const TextStyle(
                            fontSize: 16 * 1.25, fontWeight: FontWeight.w500),
                      ),
                      const Icon(
                        FluentIcons.chevron_right_12_regular,
                        color: Colors.white,
                      )
                    ],
                  ),
                )),
            const SizedBox(height: 16),
            FractionallySizedBox(
              widthFactor: .9,
              child: SizedBox(
                height: 45,
                child: TextFormField(
                  onChanged: (value) {
                    fetchSearchedData(value);
                  },
                  style: const TextStyle(fontSize: 16),
                  decoration: const InputDecoration(
                      border: OutlineInputBorder(), label: Text("Search")),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              flex: 1,
              child: FractionallySizedBox(
                widthFactor: .9,
                child: Builder(builder: (context) {
                  if (isLoading) {
                    return RefreshIndicator(
                      onRefresh: () async {
                        fetchData();
                      },
                      child: const SingleChildScrollView(
                        child: Center(
                          child: CircularProgressIndicator(),
                        ),
                      ),
                    );
                  }

                  if (isError) {
                    return Center(
                      child: Column(
                        children: [
                          const Text("An error occured"),
                          ElevatedButton(
                              onPressed: () => fetchData(),
                              child: const Text("Refresh"))
                        ],
                      ),
                    );
                  }

                  return RefreshIndicator(
                    onRefresh: () async {
                      fetchData();
                    },
                    child: ListView(
                      children: List.generate(
                        expenseList.length,
                        (index) => TransactionListItem(
                            onTap: () async {
                              final result = await Navigator.push(context,
                                  MaterialPageRoute(builder: (builder) {
                                return RecordDetailPage(
                                    itemId: expenseList[index].id);
                              }));

                              if (result != null) {
                                fetchData();
                              }
                            },
                            itemId: expenseList[index].id,
                            deleteButtonVisible: true,
                            category: expenseList[index].category,
                            description: expenseList[index].note,
                            createdAt: expenseList[index].createdAt,
                            amount: "Php ${expenseList[index].amount}",
                            status: expenseList[index].status),
                      ),
                    ),
                  );
                }),
              ),
            )
          ],
        ),
      ),
    );
  }
}
