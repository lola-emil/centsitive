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

  Future<void> fetchData() async {
    ExpenseModel result =
        await expense_repository.getTransactionById(widget.itemId);

    setState(() {
      expense = result;
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
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: Center(
          child: Column(
            children: [
              const SizedBox(
                height: 16,
              ),
              FractionallySizedBox(
                widthFactor: 1,
                child: Row(
                  children: [
                    const Text(
                      "Status: ",
                      style: TextStyle(fontSize: 16 * 1.5),
                    ),
                    Text(
                      expense != null ? expense!.status : "",
                      style: const TextStyle(fontSize: 16 * 1.5),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
