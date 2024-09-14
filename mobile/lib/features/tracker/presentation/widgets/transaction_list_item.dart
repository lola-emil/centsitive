import 'package:expense_tracker/shared/color/custom_color_scheme.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:flutter/material.dart';

class TransactionListItem extends StatelessWidget {
  final String category;
  final String description;
  final String amount;
  final int itemId;
  final bool deleteButtonVisible;
  final Function(int)? onDelete;

  const TransactionListItem(
      {super.key,
      required this.category,
      required this.description,
      required this.amount,
      required this.deleteButtonVisible,
      required this.itemId,
      required this.onDelete});

  void triggerDelete() {
    if (onDelete != null) {
      onDelete!(itemId);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(8.0),
      child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(category),
            Text(
              description,
              style: const TextStyle(fontSize: 16 * .75),
            )
          ],
        ),
        Expanded(
          flex: 1,
          child: Text(
            amount,
            textAlign: TextAlign.right,
            style: const TextStyle(color: CustomColorScheme.myError, ),
          ),
        ),
        Visibility(
            visible: deleteButtonVisible,
            child: IconButton(
                onPressed: () => triggerDelete(),
                icon: const Icon(FluentIcons.delete_12_regular)))
      ]),
    );
  }
}
