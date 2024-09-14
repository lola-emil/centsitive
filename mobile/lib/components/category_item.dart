import 'package:flutter/material.dart';

class CategoryItem extends StatelessWidget {
  final String category;
  final double percent;
  final Color color;

  const CategoryItem(
      {super.key,
      required this.category,
      required this.percent, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            flex: 1,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(category),
                const SizedBox(
                  height: 5,
                ),
                SizedBox(
                  height: 10,
                  child: FractionallySizedBox(
                    widthFactor: percent / 100,
                    heightFactor: 1,
                    child: Container(
                      decoration: BoxDecoration(
                          color: color,
                          borderRadius: BorderRadius.circular(10)),
                    ),
                  ),
                )
              ],
            ),
          ),
          const SizedBox(width: 10,),
          Text("$percent%")
        ],
      ),
    );
  }
}
