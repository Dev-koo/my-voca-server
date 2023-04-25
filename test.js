let cards = {
  1: {
    id: 1,
    user_id: 100,
    word: "apple",
    mean: "사과",
    memo: null,
    group_name: "",
    level: "어려워요",
    create_at: 100,
  },
  2: {
    id: 2,
    user_id: 100,
    word: "banana",
    mean: "바나나",
    memo: null,
    group_name: "그룹1",
    level: "애매해요",
    create_at: 101,
  },
  3: {
    id: 3,
    user_id: 100,
    word: "tomato",
    mean: "토마토",
    memo: "토뭬이",
    group_name: "",
    level: "외웠어요",
    create_at: 105,
  },
};

let sortable = [];
for (var vehicle in cards) {
  sortable.push([vehicle, cards[vehicle]]);
}
const sorted = sortable.sort((a, b) => {
  console.log(`${b[0]} 과 ${a[0]} 비교`);
  return b[0] - a[0];
});

console.log(Object.fromEntries(sorted));
