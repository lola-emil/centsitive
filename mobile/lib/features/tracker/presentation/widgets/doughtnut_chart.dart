import 'package:expense_tracker/features/tracker/model/overview_model.dart';
import 'package:expense_tracker/shared/color/chart_colors.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class DoughnutChart extends StatefulWidget {
  final List<OverviewModel> overviewList;

  const DoughnutChart({super.key, required this.overviewList});

  @override
  State<DoughnutChart> createState() => _DoughnutChartState();
}

class _DoughnutChartState extends State<DoughnutChart> {

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 275,
      child: FractionallySizedBox(
        widthFactor: 1,
        child: PieChart(
          PieChartData(
              sections: List.generate(
            widget.overviewList.length,
            (index) => PieChartSectionData(
                color: chartColors[index],
                value: widget.overviewList[index].totalSales,
                showTitle: false,
                title: widget.overviewList[index].category,
                radius: 80),
          )),
          swapAnimationDuration: const Duration(milliseconds: 150), // Optional
          swapAnimationCurve: Curves.linear,
        ),
      ),
    );
  }
}
