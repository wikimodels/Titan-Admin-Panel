db.visitation_stats.aggregate([
  { $match: { page_name: "Главная" } },
  {
    $project: {
      _id: 0,
      ip: "$user_info.ip",
      page_name: "$page_name",
      date: { $toDate: "$enter_date" },
    },
  },
  {
    $group: {
      _id: { ip: "$ip", date: { $hour: { $toDate: "$date" } } },
      count: { $sum: 1 },
    },
  },
  // {
  //   $project: {
  //     "Пользователь": "$ip",
  //     "Страница": "$page_name",
  //     "Дата":"$date"
  //   }
  // }
]);
