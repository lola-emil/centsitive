import 'dart:ui';

import 'package:expense_tracker/models/expense_model.dart';
import 'package:expense_tracker/models/overview_model.dart';
import 'package:expense_tracker/views/addrecord_page.dart';
import 'package:expense_tracker/components/category_item.dart';
import 'package:expense_tracker/components/doughtnut_chart.dart';
import 'package:expense_tracker/components/drawer_menu.dart';
import 'package:expense_tracker/components/transaction_list_item.dart';
import 'package:expense_tracker/shared/color/chart_colors.dart';
import 'package:expense_tracker/shared/color/custom_color_scheme.dart';
import 'package:expense_tracker/views/record_detail_page.dart';
import 'package:flutter/material.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:expense_tracker/repository/expense_repository.dart'
    as expense_repository;

import 'package:month_year_picker/month_year_picker.dart';

class OverviewPage extends StatefulWidget {
  const OverviewPage({super.key});

  @override
  State<OverviewPage> createState() => _OverviewPageState();
}

class _OverviewPageState extends State<OverviewPage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  bool isLoading = false;
  bool isError = false;
  bool noRecords = false;

  String currentMonthAndYear = "";

  late List<OverviewModel> overviewList;
  late List<ExpenseModel> recentTransactions;

  Future<void> fetchData() async {
    setState(() {
      isLoading = true;
      isError = false;
      noRecords = false;
    });

    try {
      final overviewValue = await expense_repository.getOverview(null);
      final recentTransactionsValue =
          await expense_repository.getRecentTransactions(null);
      final monthAndYear =
          await expense_repository.getFormattedMonthAndYear(null);

      if (overviewValue.isEmpty && recentTransactionsValue.isEmpty && mounted) {
        setState(() {
          noRecords = true;
        });
      }

      setState(() {
        overviewList = overviewValue;
        recentTransactions = recentTransactionsValue;
        currentMonthAndYear = monthAndYear;
      });
    } catch (error) {
      print(error);
      setState(
        () {
          isError = true;
        },
      );
      // Handle the error appropriately, e.g., show an error message to the user.
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> getPreviousData(DateTime? date) async {
    setState(() {
      isLoading = true;
      isError = false;
      noRecords = false;
    });

    try {
      final monthAndYear =
          await expense_repository.getFormattedMonthAndYear(date);
      final overview = await expense_repository.getOverview(date);
      final recents = await expense_repository.getRecentTransactions(date);

      if (overview.isEmpty && recents.isEmpty && mounted) {
        setState(() {
          noRecords = true;
        });
      }

      setState(() {
        currentMonthAndYear = monthAndYear;
        overviewList = overview;
        recentTransactions = recents;
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

  Future<void> showPicker() async {
    var result = await showMonthYearPicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2019),
      lastDate: DateTime.now(),
    );

    if (result != null) {
      getPreviousData(result);
    }
  }

  @override
  void initState() {
    fetchData();
    super.initState();
  }

  @override
  void setState(VoidCallback fn) {
    if (mounted) {
      super.setState(fn);
    }
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    double screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      key: _scaffoldKey,
      drawer: const DrawerMenu(),
      floatingActionButton: Visibility(
        visible: true,
        child: FloatingActionButton(
            shape: const CircleBorder(),
            elevation: 1,
            onPressed: () async {
              final result = await Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (builder) => const AddRecordPage()));

              if (result != null) {
                fetchData();
              }
            },
            child: const Center(child: Icon(Icons.add))),
      ),
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
                "Overview",
                style: TextStyle(fontSize: 16),
              ),
              elevation: 0,
            ),
          ),
        ),
      ),
      body: Builder(builder: (context) {
        if (isLoading) {
          return RefreshIndicator(
            onRefresh: () async {
              fetchData();
            },
            child: SingleChildScrollView(
              child: SizedBox(
                height: screenHeight,
                child: const Center(
                  child: CircularProgressIndicator(),
                ),
              ),
            ),
          );
        }

        if (isError) {
          return SizedBox(
            height: screenHeight,
            width: screenWidth,
            child: Column(
              children: [
                const Text("An error occured"),
                ElevatedButton(
                    onPressed: () => fetchData(), child: const Text("Refresh"))
              ],
            ),
          );
        }

        if (noRecords) {
          return RefreshIndicator(
            onRefresh: () async {
              print("Refresh triggered");
              fetchData();
            },
            child: ListView(
              physics: const AlwaysScrollableScrollPhysics(),
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
                                fontSize: 16 * 1.25,
                                fontWeight: FontWeight.w500),
                          ),
                          const Icon(
                            FluentIcons.chevron_right_12_regular,
                            color: Colors.white,
                          )
                        ],
                      ),
                    )),
                SizedBox(
                  height: screenHeight,
                  width: screenWidth,
                  child: const Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text("No transaction has been made for this month")
                    ],
                  ),
                ),
              ],
            ),
          );
        }

        return RefreshIndicator(
          onRefresh: () async {
            fetchData();
          },
          child: ListView(
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
              const SizedBox(
                height: 16,
              ),
              DoughnutChart(
                overviewList: overviewList,
              ),
              const SizedBox(
                height: 16,
              ),
              Divider(
                height: 1,
                indent: (screenWidth - (screenWidth * .93333)) / 2,
                endIndent: (screenWidth - (screenWidth * .93333)) / 2,
                color: CustomColorScheme.mySurface,
              ),
              const SizedBox(
                height: 16,
              ),
              // Categories section
              FractionallySizedBox(
                widthFactor: .9,
                child: Column(
                  children: List.generate(
                      overviewList.length,
                      (index) => CategoryItem(
                            category: overviewList[index].category,
                            percent: overviewList[index].percentage,
                            color: chartColors[index],
                          )),
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              FractionallySizedBox(
                widthFactor: .9,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text("Recent Transactions",
                        style: TextStyle(
                          fontSize: 16,
                        )),
                    Column(
                      children: List.generate(
                        recentTransactions.length,
                        (index) => TransactionListItem(
                          onTap: () async {
                            final result = await Navigator.push(context,
                                MaterialPageRoute(builder: (builder) {
                              return RecordDetailPage(
                                  itemId: recentTransactions[index].id);
                            }));
                            if (result != null) {
                              fetchData();
                            }
                          },
                          itemId: recentTransactions[index].id,
                          deleteButtonVisible: false,
                          category: recentTransactions[index].category,
                          description: recentTransactions[index].note,
                          createdAt: recentTransactions[index].createdAt,
                          amount: "Php ${recentTransactions[index].amount}",
                          status: recentTransactions[index].status,
                        ),
                      ),
                    )
                  ],
                ),
              ),

              // Scroll padding
              const SizedBox(
                height: 16 * 4,
              )
            ],
          ),
        );
      }),
    );
  }
}
