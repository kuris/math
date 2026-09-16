/* ============================================================
   수학아 놀자 (math) - 초등 공식 30개 (formula-el.js)
   formula-data.js 가 합쳐서 window.MathFormulaData 로 만듭니다.
   이 파일은 원소 배열만 둡니다. 직접 수정 시 관련 id 참조를 확인하세요.
   ============================================================ */
window.MathFormulaEl = [
  {
    id: "el_add_carry",
    schoolLevel: "elementary",
    gradeLevel: "elementary2",
    topic: "arithmetic",
    emoji: "➕",
    unit: "덧셈과 뺄셈",
    title: "받아올림이 있는 덧셈",
    formula: "일의 자리부터 더하고 10이 넘으면 윗자리로 받아올려요",
    latex: "27 + 15 = 42",
    shortDescription: "일의 자리 합이 10을 넘으면 십의 자리로 받아올려서 더하는 방법이에요.",
    easyExplanation: "먼저 일의 자리끼리 더해 보세요. 합이 10 이상이면 십의 자리로 10을 묶어 올려주고 남은 수만 일의 자리에 써요. 그 다음 십의 자리까지 모두 더하면 정확한 답이 나와요.",
    funExplanation: "문구점에서 연필 27자루와 지우개 15개를 산다고 생각해 보세요. 낱개가 12개가 되면 10개를 묶음 상자에 넣고 2개만 밖에 두는 것과 같아요. 이렇게 묶어 올리면 큰 수도 쉽게 더할 수 있어요.",
    memoryTip: "십 넘으면 위로 올려! 받아올림으로 해결해요.",
    useWhen: "두 자리 수의 합이 10을 넘어 윗자리로 올려야 할 때 써요.",
    commonMistakes: [
      "받아올린 1을 더하는 것을 잊지 마세요.",
      "일의 자리부터 차례대로 계산하지 않으면 자릿수가 어긋나요."
    ],
    example: {
      question: "27 + 15는 얼마인가요?",
      steps: [
        "일의 자리부터 계산해요. 7 + 5 = 12예요.",
        "12는 10과 2이므로 십의 자리로 1을 받아올려요.",
        "십의 자리는 2 + 1 + 받아올린 1 = 4예요.",
        "따라서 답은 42예요."
      ],
      answer: "42"
    },
    quickCheck: {
      question: "36 + 28은 얼마인가요?",
      answer: "64"
    },
    relatedFormulaIds: ["el_sub_borrow", "el_place_value", "el_money"]
  },
  {
    id: "el_sub_borrow",
    schoolLevel: "elementary",
    gradeLevel: "elementary2",
    topic: "arithmetic",
    emoji: "➖",
    unit: "덧셈과 뺄셈",
    title: "받아내림이 있는 뺄셈",
    formula: "윗자리가 작으면 윗자리에서 10을 빌려와 빼요",
    latex: "32 - 17 = 15",
    shortDescription: "윗자리 수가 아랫자리 수보다 작을 때 윗자리에서 10을 빌려와 빼는 방법이에요.",
    easyExplanation: "먼저 일의 자리끼리 비교해 보세요. 뺄 수 없으면 십의 자리에서 10을 빌려와 일의 자리에 더한 뒤 빼요. 그 다음 십의 자리는 하나 작아진 것으로 생각하고 계산하면 돼요.",
    funExplanation: "문구점 사탕 32개에서 친구에게 17개를 준다고 생각해 보세요. 낱개가 모자라면 묶음 하나를 풀어 10개를 가져오는 것과 같아요. 빌려온 10개 덕분에 뺄셈이 쉬워져요.",
    memoryTip: "모자라면 빌려와! 윗자리에서 십을 빌려요.",
    useWhen: "윗자리 숫자가 더 작아서 그대로 뺄 수 없을 때 써요.",
    commonMistakes: [
      "10을 빌려줬는데 십의 자리 수를 그대로 두면 답이 커져요.",
      "빌려온 뒤에는 10에 더한 수에서 빼야 해요."
    ],
    example: {
      question: "32 - 17은 얼마인가요?",
      steps: [
        "일의 자리 2 - 7은 뺄 수 없어요.",
        "십의 자리에서 10을 빌려와 12 - 7 = 5예요.",
        "십의 자리는 3이 2가 되었으므로 2 - 1 = 1이에요.",
        "따라서 답은 15예요."
      ],
      answer: "15"
    },
    quickCheck: {
      question: "41 - 26은 얼마인가요?",
      answer: "15"
    },
    relatedFormulaIds: ["el_add_carry", "el_money", "el_place_value"]
  },
  {
    id: "el_mult_table",
    schoolLevel: "elementary",
    gradeLevel: "elementary2",
    topic: "arithmetic",
    emoji: "✖️",
    unit: "곱셈구구",
    title: "구구단",
    formula: "○ × ○를 외워서 곱셈을 빨리 해요",
    latex: "7 \\times 8 = 56",
    shortDescription: "2단부터 9단까지 곱셈 결과를 외워서 빠르게 계산하는 표예요.",
    easyExplanation: "구구단은 같은 수를 여러 번 더하는 것을 짧게 나타낸 표예요. 예를 들어 7 × 8은 7을 8번 더한 것과 같아서 답은 56이에요. 외워 두면 나눗셈도 훨씬 쉬워져요.",
    funExplanation: "운동장에 줄을 선 친구들을 세어 보세요. 3명씩 4줄이면 3 × 4 = 12명이에요. 구구단은 이렇게 묶음으로 세는 것을 빠르게 해주는 마법표예요.",
    memoryTip: "구구단은 리듬으로! 매일 소리내어 외워요.",
    useWhen: "같은 수를 여러 번 더하거나 묶음 개수를 셀 때 써요.",
    commonMistakes: [
      "7 × 8과 8 × 7을 다른 것으로 생각하지 마세요. 답은 똑같이 56이에요.",
      "곱하는 순서를 바꾸어도 답이 같다는 것을 확인하세요."
    ],
    example: {
      question: "7 × 8은 얼마인가요?",
      steps: [
        "구구단 7단에서 7 × 8을 찾아요.",
        "7 × 8은 7을 8번 더한 것과 같아요.",
        "7, 14, 21, 28, 35, 42, 49, 56 순서로 커져요.",
        "따라서 답은 56이에요."
      ],
      answer: "56"
    },
    quickCheck: {
      question: "6 × 9는 얼마인가요?",
      answer: "54"
    },
    relatedFormulaIds: ["el_division", "el_order_ops", "el_pattern"]
  },
  {
    id: "el_division",
    schoolLevel: "elementary",
    gradeLevel: "elementary3",
    topic: "arithmetic",
    emoji: "➗",
    unit: "나눗셈",
    title: "나눗셈과 나머지",
    formula: "몫 × 나누는 수 + 나머지 = 나누어지는 수",
    latex: "17 \\div 5 = 3 \\cdots 2",
    shortDescription: "똑같이 나누어 주고 남는 수를 나머지로 나타내는 방법이에요.",
    easyExplanation: "나눗셈은 전체를 똑같은 크기로 나누어 주는 계산이에요. 똑같이 나누어 주고도 남는 수가 있으면 그것을 나머지라고 해요. 나머지는 나누는 수보다 항상 작아야 해요.",
    funExplanation: "사탕 17개를 친구 5명에게 똑같이 나누어 준다고 생각해 보세요. 한 명당 3개씩 주고 2개가 남아요. 남은 2개가 바로 나머지예요.",
    memoryTip: "나머지는 나누는 수보다 작게! 꼭 확인해요.",
    useWhen: "사탕이나 과자를 똑같이 나누어 주고 남는 것을 확인할 때 써요.",
    commonMistakes: [
      "나머지가 나누는 수보다 크게 남으면 한 번 더 나누어야 해요.",
      "검산식 몫 × 나누는 수 + 나머지를 확인하는 것을 잊지 마세요."
    ],
    example: {
      question: "17 ÷ 5의 몫과 나머지는?",
      steps: [
        "5의 단에서 17을 넘지 않는 가장 큰 수를 찾아요.",
        "5 × 3 = 15이므로 몫은 3이에요.",
        "17 - 15 = 2이므로 나머지는 2예요.",
        "검산하면 3 × 5 + 2 = 17로 맞아요."
      ],
      answer: "몫 3, 나머지 2"
    },
    quickCheck: {
      question: "20 ÷ 6의 몫과 나머지는?",
      answer: "몫 3, 나머지 2"
    },
    relatedFormulaIds: ["el_mult_table", "el_average", "el_fraction_mean"]
  },
  {
    id: "el_order_ops",
    schoolLevel: "elementary",
    gradeLevel: "elementary4",
    topic: "arithmetic",
    emoji: "🧮",
    unit: "혼합 계산",
    title: "계산 순서",
    formula: "괄호 → 곱 나눗셈 → 덧 뺄셈 순서로 계산해요",
    latex: "( ) \\to \\times, \\div \\to +, -",
    shortDescription: "괄호가 있는 식은 괄호부터, 곱셈과 나눗셈을 먼저 계산하는 약속이에요.",
    easyExplanation: "계산이 여러 개 섞여 있을 때는 약속된 순서가 있어요. 먼저 괄호 안을 계산하고 다음으로 곱셈과 나눗셈을 먼저 해요. 마지막으로 덧셈과 뺄셈을 앞에서부터 계산하면 돼요.",
    funExplanation: "버스 타는 순서를 생각해 보세요. 약속이 있는 사람이 먼저 타고 다음으로 급한 사람이 타요. 계산도 괄호가 VIP로 먼저이고 곱셈과 나눗셈이 그 다음 차례예요.",
    memoryTip: "괄곱덧! 괄호 곱나눗셈 덧뺄셈 순으로 해요.",
    useWhen: "덧셈 뺄셈 곱셈 나눗셈이 한 식에 섞여 있을 때 써요.",
    commonMistakes: [
      "앞에서부터 차례대로 계산하면 순서 약속을 어기게 돼요.",
      "괄호 안을 먼저 계산하지 않으면 답이 달라져요."
    ],
    example: {
      question: "3 + 2 × 4는 얼마인가요?",
      steps: [
        "곱셈이 덧셈보다 먼저예요.",
        "2 × 4 = 8을 먼저 계산해요.",
        "3 + 8 = 11이에요.",
        "따라서 답은 11이에요."
      ],
      answer: "11"
    },
    quickCheck: {
      question: "(10 - 4) ÷ 2는 얼마인가요?",
      answer: "3"
    },
    relatedFormulaIds: ["el_mult_table", "el_division", "el_pattern"]
  },
  {
    id: "el_rounding",
    schoolLevel: "elementary",
    gradeLevel: "elementary4",
    topic: "arithmetic",
    emoji: "🔢",
    unit: "어림셈",
    title: "반올림과 올림·버림",
    formula: "끝자리가 5 이상이면 올리고 4 이하면 버려요",
    latex: "4.5 \\approx 5",
    shortDescription: "수를 대략 어림하여 반올림하거나 올림과 버림으로 나타내는 방법이에요.",
    easyExplanation: "반올림은 정한 자리 다음 숫자를 보고 결정해요. 다음 숫자가 5, 6, 7, 8, 9이면 올리고 0, 1, 2, 3, 4이면 버려요. 올림은 무조건 올리고 버림은 무조건 버리는 방법이에요.",
    funExplanation: "운동회 줄 세우기를 생각해 보세요. 5번째 친구부터는 윗팀으로 올리고 4번째까지는 아랫팀에 남기는 것과 같아요. 반올림도 5를 기준으로 올릴지 버릴지를 정해요.",
    memoryTip: "오 이상은 위로! 5부터는 올려요.",
    useWhen: "큰 수를 대략 어림하거나 답을 간단히 말할 때 써요.",
    commonMistakes: [
      "어느 자리에서 반올림하는지 확인하지 않으면 답이 달라져요.",
      "올림과 반올림을 헷갈리지 마세요. 올림은 항상 올려요."
    ],
    example: {
      question: "47을 십의 자리에서 반올림하면?",
      steps: [
        "십의 자리에서 반올림하므로 일의 자리를 봐요.",
        "일의 자리는 7이에요.",
        "7은 5 이상이므로 십의 자리를 올려요.",
        "따라서 답은 50이에요."
      ],
      answer: "50"
    },
    quickCheck: {
      question: "32를 십의 자리에서 반올림하면?",
      answer: "30"
    },
    relatedFormulaIds: ["el_place_value", "el_decimal_mean", "el_money"]
  },
  {
    id: "el_place_value",
    schoolLevel: "elementary",
    gradeLevel: "elementary3",
    topic: "arithmetic",
    emoji: "💯",
    unit: "큰 수",
    title: "자리값과 큰 수",
    formula: "10000씩 묶어 만 억 조로 읽어요",
    latex: "100000000 = 10^{8}",
    shortDescription: "만과 억과 조를 이용해 큰 수를 읽고 자릿값을 이해하는 방법이에요.",
    easyExplanation: "큰 수는 네 자리씩 끊어 만, 억, 조로 읽어요. 예를 들어 100000000은 1억이라고 읽어요. 각 자리 숫자가 얼마를 나타내는지 알면 큰 수도 쉽게 읽을 수 있어요.",
    funExplanation: "색종이를 10000장씩 상자에 담는다고 생각해 보세요. 상자가 많아지면 트럭 단위로 묶는 것처럼 만 다음은 억이 나와요. 자리마다 이름이 있어서 큰 수도 정리가 돼요.",
    memoryTip: "네 자리씩 끊어! 만억조로 읽어요.",
    useWhen: "인구나 거리처럼 큰 수를 읽고 비교할 때 써요.",
    commonMistakes: [
      "0의 개수를 잘못 세면 만과 억이 바뀌어요.",
      "네 자리씩 끊지 않으면 읽는 위치가 틀려요."
    ],
    example: {
      question: "10000000은 어떻게 읽나요?",
      steps: [
        "뒤에서부터 네 자리씩 끊어요.",
        "1000만으로 나누어져요.",
        "1000만은 1천만이에요.",
        "따라서 천만이라고 읽어요."
      ],
      answer: "천만"
    },
    quickCheck: {
      question: "100000000은 어떻게 읽나요?",
      answer: "1억"
    },
    relatedFormulaIds: ["el_rounding", "el_add_carry", "el_decimal_mean"]
  },
  {
    id: "el_time_calc",
    schoolLevel: "elementary",
    gradeLevel: "elementary3",
    topic: "arithmetic",
    emoji: "⏰",
    unit: "시간",
    title: "시간 계산",
    formula: "1시간 = 60분, 1분 = 60초로 계산해요",
    latex: "1 \\text{h} = 60 \\text{min}",
    shortDescription: "시각과 시간의 차이를 구하고 60분 단위로 올림과 내림을 하는 방법이에요.",
    easyExplanation: "시간은 60분마다 1시간이 올라가요. 끝 시각에서 시작 시각을 빼면 걸린 시간을 구할 수 있어요. 분이 60분을 넘으면 시간으로 바꾸고 모자라면 시간에서 빌려와요.",
    funExplanation: "버스 약속을 생각해 보세요. 2시 50분에 타서 3시 20분에 내리면 30분이 걸려요. 분이 시를 넘어갈 때 60분 상자를 주고받는 것과 같아요.",
    memoryTip: "시간은 육십! 60분이면 한 시간이에요.",
    useWhen: "학교 간 시간이나 버스 탄 시간을 구할 때 써요.",
    commonMistakes: [
      "시간을 100분으로 계산하지 마세요. 60분이 1시간이에요.",
      "분이 모자랄 때 시간에서 1을 빌리면 60분이 돼요."
    ],
    example: {
      question: "2시 50분에서 3시 20분까지 몇 분인가요?",
      steps: [
        "3시 20분에서 2시 50분을 빼야 해요.",
        "20분에서 50분은 뺄 수 없으므로 1시간을 빌려와요.",
        "80분 - 50분 = 30분이에요.",
        "따라서 걸린 시간은 30분이에요."
      ],
      answer: "30분"
    },
    quickCheck: {
      question: "1시간 30분은 모두 몇 분인가요?",
      answer: "90분"
    },
    relatedFormulaIds: ["el_sub_borrow", "el_add_carry", "el_speed"]
  },
  {
    id: "el_fraction_mean",
    schoolLevel: "elementary",
    gradeLevel: "elementary3",
    topic: "fractions",
    emoji: "🍕",
    unit: "분수",
    title: "분수란?",
    formula: "전체를 똑같이 나누어 그 중 몇 개인지 나타내요",
    latex: "\\frac{1}{4}",
    shortDescription: "전체를 똑같이 나눈 것 중 일부를 나타내는 수가 분수예요.",
    easyExplanation: "분수는 전체를 똑같이 나눈 뒤 그 중 몇 조각인지 나타내요. 아래 수를 분모라고 하고 전체 조각 수를 말해요. 위 수를 분자라고 하고 가져간 조각 수를 말해요.",
    funExplanation: "피자 한 판을 친구 4명과 똑같이 나누어 보세요. 한 조각은 전체의 4분의 1이에요. 두 조각을 가져가면 4분의 2가 되는 것과 같아요.",
    memoryTip: "아래가 전체! 분모는 나누는 수예요.",
    useWhen: "피자나 케이크를 똑같이 나눌 때 써요.",
    commonMistakes: [
      "똑같이 나누지 않으면 분수로 나타낼 수 없어요.",
      "분모와 분자의 위치를 바꾸지 마세요."
    ],
    example: {
      question: "사과 1개를 4등분한 것 중 1조각은?",
      steps: [
        "전체를 4등분했으므로 분모는 4예요.",
        "가져간 조각은 1개이므로 분자는 1이에요.",
        "따라서 4분의 1이에요.",
        "기호로는 1/4로 써요."
      ],
      answer: "4분의 1"
    },
    quickCheck: {
      question: "초콜릿을 3등분한 것 중 2조각은?",
      answer: "3분의 2"
    },
    relatedFormulaIds: ["el_equiv_fraction", "el_decimal_mean", "el_division"]
  },
  {
    id: "el_equiv_fraction",
    schoolLevel: "elementary",
    gradeLevel: "elementary4",
    topic: "fractions",
    emoji: "🍰",
    unit: "분수",
    title: "크기가 같은 분수",
    formula: "분모와 분자에 같은 수를 곱해도 크기는 같아요",
    latex: "\\frac{2}{3} = \\frac{4}{6}",
    shortDescription: "분모와 분자에 같은 수를 곱하거나 나누어도 분수의 크기는 같아요.",
    easyExplanation: "케이크를 자르는 조각 수를 두 배로 하면 가져가는 조각도 두 배가 되어야 양이 같아요. 그래서 분모와 분자에 같은 수를 곱하면 크기가 같은 분수가 돼요. 나누어도 원리는 똑같아요.",
    funExplanation: "작은 케이크 2조각과 큰 케이크 4조각을 비교해 보세요. 자르는 크기가 달라져도 먹는 양이 같을 수 있어요. 크기가 같은 분수는 모양만 다른 쌍둥이예요.",
    memoryTip: "위아래 같이! 같은 수로 곱해요.",
    useWhen: "분수를 약분하거나 통분하여 크기를 비교할 때 써요.",
    commonMistakes: [
      "분모에만 수를 곱하면 크기가 달라져요.",
      "더하기로 크기를 맞추려고 하면 안 돼요."
    ],
    example: {
      question: "2/3와 크기가 같은 분수는?",
      steps: [
        "분모와 분자에 같은 수 2를 곱해요.",
        "분자는 2 × 2 = 4예요.",
        "분모는 3 × 2 = 6이에요.",
        "따라서 4/6이에요."
      ],
      answer: "4/6"
    },
    quickCheck: {
      question: "1/2와 크기가 같은 분수는? (분모 4로)",
      answer: "2/4"
    },
    relatedFormulaIds: ["el_fraction_mean", "el_fraction_add", "el_mixed_number"]
  },
  {
    id: "el_fraction_add",
    schoolLevel: "elementary",
    gradeLevel: "elementary4",
    topic: "fractions",
    emoji: "➕",
    unit: "분수 계산",
    title: "분모가 같은 분수의 덧셈과 뺄셈",
    formula: "분자는 더하고 분모는 그대로 두어요",
    latex: "\\frac{2}{5} + \\frac{1}{5} = \\frac{3}{5}",
    shortDescription: "분모가 같을 때는 분자끼리만 더하거나 빼는 계산이에요.",
    easyExplanation: "분모가 같다는 것은 조각 크기가 같다는 뜻이에요. 그래서 조각 개수인 분자끼리만 더하거나 빼면 돼요. 분모는 조각 크기를 나타내므로 그대로 두어요.",
    funExplanation: "피자 조각을 생각해 보세요. 5조각 중 2조각에 1조각을 더하면 3조각이 돼요. 접시 크기는 그대로이고 올라간 조각만 늘어나는 것과 같아요.",
    memoryTip: "분모는 그대로! 분자만 더해요.",
    useWhen: "똑같은 크기로 자른 분수를 합치거나 차를 구할 때 써요.",
    commonMistakes: [
      "분모까지 더하면 조각 크기가 바뀌어 틀려요.",
      "결과가 가분수가 되면 대분수로 고쳐 보세요."
    ],
    example: {
      question: "2/5 + 1/5는 얼마인가요?",
      steps: [
        "분모가 5로 같아요.",
        "분자끼리 더해요. 2 + 1 = 3이에요.",
        "분모 5는 그대로 둬요.",
        "따라서 답은 3/5예요."
      ],
      answer: "3/5"
    },
    quickCheck: {
      question: "4/7 - 2/7은 얼마인가요?",
      answer: "2/7"
    },
    relatedFormulaIds: ["el_fraction_mean", "el_equiv_fraction", "el_mixed_number"]
  },
  {
    id: "el_decimal_mean",
    schoolLevel: "elementary",
    gradeLevel: "elementary3",
    topic: "fractions",
    emoji: "💧",
    unit: "소수",
    title: "소수란?",
    formula: "0.1은 10분의 1, 0.01은 100분의 1이에요",
    latex: "0.1 = \\frac{1}{10}",
    shortDescription: "1보다 작은 양을 소수점으로 나타낸 수가 소수예요.",
    easyExplanation: "소수는 1을 10등분하거나 100등분한 양을 나타내요. 소수점 아래 첫째 자리는 10분의 몇 개인지 말해요. 둘째 자리는 100분의 몇 개인지 말해요.",
    funExplanation: "물 한 컵을 10명이 똑같이 나누어 마신다고 생각해 보세요. 한 명이 마시는 양이 바로 0.1컵이에요. 컵을 더 잘게 나누면 0.01처럼 작은 수도 나타낼 수 있어요.",
    memoryTip: "점은 경계! 왼쪽은 일, 오른쪽은 조각이에요.",
    useWhen: "키나 몸무게처럼 1보다 작은 양을 잴 때 써요.",
    commonMistakes: [
      "0.5와 0.05를 헷갈리지 마세요. 자릿값이 열 배 달라요.",
      "소수점 위치를 옮기면 수가 크게 달라져요."
    ],
    example: {
      question: "0.3은 어떤 분수인가요?",
      steps: [
        "소수 첫째 자리는 10분의 몇인지 나타내요.",
        "0.3은 10분의 3이에요.",
        "분수로 쓰면 3/10이에요.",
        "따라서 답은 10분의 3이에요."
      ],
      answer: "10분의 3"
    },
    quickCheck: {
      question: "0.7은 어떤 분수인가요?",
      answer: "10분의 7"
    },
    relatedFormulaIds: ["el_fraction_mean", "el_frac_decimal", "el_decimal_add"]
  },
  {
    id: "el_frac_decimal",
    schoolLevel: "elementary",
    gradeLevel: "elementary5",
    topic: "fractions",
    emoji: "🔄",
    unit: "분수와 소수",
    title: "분수와 소수 바꾸기",
    formula: "분자 ÷ 분모로 소수로 바꾸어요",
    latex: "\\frac{1}{2} = 0.5",
    shortDescription: "분수를 나눗셈으로 계산해 소수로 바꾸는 방법이에요.",
    easyExplanation: "분수는 분자를 분모로 나눈 것과 같아요. 그래서 분자를 분모로 나누면 소수로 바꿀 수 있어요. 나누어떨어지지 않으면 반올림하여 대략 나타내요.",
    funExplanation: "피자 반 조각을 수로 말하는 방법을 바꾸는 것과 같아요. 절반은 분수로 2분의 1이고 소수로는 0.5예요. 옷을 갈아입어도 사람은 같은 것처럼 값은 같아요.",
    memoryTip: "분수는 나누기! 위를 아래로 나눠요.",
    useWhen: "분수와 소수가 섞여 있어 비교하기 어려울 때 써요.",
    commonMistakes: [
      "분모를 분자로 나누지 마세요. 분자 ÷ 분모 순서예요.",
      "0.5를 1/5로 바꾸지 마세요. 0.5는 1/2예요."
    ],
    example: {
      question: "3/4을 소수로 바꾸면?",
      steps: [
        "분수를 나눗셈으로 바꿔요. 3 ÷ 4예요.",
        "3 ÷ 4를 계산해요.",
        "0.75가 나와요.",
        "따라서 답은 0.75예요."
      ],
      answer: "0.75"
    },
    quickCheck: {
      question: "1/4을 소수로 바꾸면?",
      answer: "0.25"
    },
    relatedFormulaIds: ["el_decimal_mean", "el_division", "el_decimal_add"]
  },
  {
    id: "el_decimal_add",
    schoolLevel: "elementary",
    gradeLevel: "elementary4",
    topic: "fractions",
    emoji: "🧾",
    unit: "소수 계산",
    title: "소수의 덧셈과 뺄셈",
    formula: "소수점을 맞추고 일의 자리부터 계산해요",
    latex: "0.45 + 0.3 = 0.75",
    shortDescription: "소수점을 세로로 맞추어 자릿값끼리 더하고 빼는 계산이에요.",
    easyExplanation: "소수 계산은 소수점 위치를 정확히 맞추는 것이 가장 중요해요. 자릿값이 같은 숫자끼리 더하거나 빼면 돼요. 답에도 같은 위치에 소수점을 찍어 주어요.",
    funExplanation: "문구점 영수증을 생각해 보세요. 0.45달러와 0.3달러를 더할 때는 동전 자리끼리 맞춰야 해요. 줄을 맞추지 않으면 거스름돈이 틀리는 것과 같아요.",
    memoryTip: "점을 맞춰! 소수점 줄세우기예요.",
    useWhen: "키나 몸무게처럼 소수가 있는 양을 더하고 뺄 때 써요.",
    commonMistakes: [
      "소수점을 맞추지 않고 끝자리에 맞추면 자릿값이 어긋나요.",
      "빈자리는 0으로 생각하고 계산해야 해요."
    ],
    example: {
      question: "0.45 + 0.3은 얼마인가요?",
      steps: [
        "소수점을 맞추어 세로로 써요.",
        "0.3을 0.30으로 생각해요.",
        "45 + 30 = 75처럼 계산해요.",
        "따라서 답은 0.75예요."
      ],
      answer: "0.75"
    },
    quickCheck: {
      question: "0.8 - 0.25는 얼마인가요?",
      answer: "0.55"
    },
    relatedFormulaIds: ["el_decimal_mean", "el_frac_decimal", "el_add_carry"]
  },
  {
    id: "el_mixed_number",
    schoolLevel: "elementary",
    gradeLevel: "elementary5",
    topic: "fractions",
    emoji: "🎁",
    unit: "분수",
    title: "대분수와 가분수",
    formula: "대분수 ↔ 가분수로 바꾸어 계산해요",
    latex: "2\\frac{1}{3} = \\frac{7}{3}",
    shortDescription: "자연수와 분수가 섞인 대분수를 가분수로 바꾸는 방법이에요.",
    easyExplanation: "대분수는 자연수와 진분수가 합쳐진 수예요. 가분수로 바꾸려면 자연수와 분모를 곱한 뒤 분자를 더해 분자로 써요. 분모는 그대로 두면 돼요.",
    funExplanation: "선물 상자를 생각해 보세요. 가득 찬 상자 2개와 반 조각 상자 1개가 있으면 모두 작은 조각으로 풀어 셀 수 있어요. 가분수는 조각을 모두 풀어 놓은 모습이에요.",
    memoryTip: "곱하고 더해! 분모는 그대로예요.",
    useWhen: "대분수끼리 더하고 빼기 어려울 때 가분수로 바꾸어 써요.",
    commonMistakes: [
      "자연수와 분모를 곱한 뒤 분자를 더하는 것을 잊지 마세요.",
      "가분수로 바꿀 때 분모까지 바꾸면 안 돼요."
    ],
    example: {
      question: "2와 1/3을 가분수로 바꾸면?",
      steps: [
        "자연수 2와 분모 3을 곱해요. 2 × 3 = 6예요.",
        "여기에 분자 1을 더해요. 6 + 1 = 7이에요.",
        "분모 3은 그대로 둬요.",
        "따라서 답은 7/3이에요."
      ],
      answer: "7/3"
    },
    quickCheck: {
      question: "1과 3/4을 가분수로 바꾸면?",
      answer: "7/4"
    },
    relatedFormulaIds: ["el_fraction_mean", "el_equiv_fraction", "el_fraction_add"]
  },
  {
    id: "el_rect_area",
    schoolLevel: "elementary",
    gradeLevel: "elementary4",
    topic: "geometry",
    emoji: "📐",
    unit: "도형의 넓이",
    title: "직사각형의 넓이",
    formula: "가로 × 세로",
    latex: "A = width \\times height",
    shortDescription: "직사각형 안에 들어가는 작은 정사각형 칸의 개수를 구하는 공식이에요.",
    easyExplanation: "직사각형의 넓이는 가로로 몇 칸, 세로로 몇 줄인지 세어서 모두 곱하면 돼요. 예를 들어 가로가 5칸이고 세로가 3줄이면 5칸짜리 줄이 3개 있는 것이므로 5 × 3 = 15칸이에요.",
    funExplanation: "초콜릿 판을 떠올려 보세요. 가로로 5조각, 세로로 3줄이면 초콜릿은 모두 몇 조각일까요? 5조각씩 3줄이니까 15조각이에요. 직사각형의 넓이도 이와 같아요.",
    memoryTip: "직사각형 넓이는 가세곱! 가로와 세로를 곱해요.",
    useWhen: "네모 모양 땅, 종이, 칠판, 방바닥의 넓이를 구할 때 써요.",
    commonMistakes: [
      "둘레와 넓이를 헷갈리지 마세요. 둘레는 바깥 길이, 넓이는 안쪽 공간이에요.",
      "단위에 ㎠처럼 제곱 표시를 붙이는 것을 잊지 마세요."
    ],
    example: {
      question: "가로가 6cm, 세로가 4cm인 직사각형의 넓이는?",
      steps: [
        "직사각형의 넓이 공식은 가로 × 세로예요.",
        "가로 6, 세로 4를 공식에 넣어요.",
        "6 × 4 = 24",
        "따라서 넓이는 24㎠예요."
      ],
      answer: "24㎠"
    },
    quickCheck: {
      question: "가로 7cm, 세로 2cm인 직사각형의 넓이는?",
      answer: "14㎠"
    },
    relatedFormulaIds: ["el_square_area", "el_rect_perimeter", "el_parallelogram_area"]
  },
  {
    id: "el_square_area",
    schoolLevel: "elementary",
    gradeLevel: "elementary4",
    topic: "geometry",
    emoji: "🟧",
    unit: "도형의 넓이",
    title: "정사각형의 넓이",
    formula: "한 변 × 한 변",
    latex: "A = side \\times side",
    shortDescription: "네 변이 모두 같은 정사각형의 안쪽 공간을 구하는 공식이에요.",
    easyExplanation: "정사각형은 가로와 세로 길이가 똑같아요. 그래서 한 변의 길이를 두 번 곱하면 넓이가 나와요. 예를 들어 한 변이 5cm이면 5 × 5 = 25㎠예요.",
    funExplanation: "색종이 한 장을 떠올려 보세요. 가로도 5칸 세로도 5칸이면 모두 25칸이에요. 정사각형은 직사각형 가족 중 쌍둥이처럼 가로와 세로가 같은 모양이에요.",
    memoryTip: "정사각형은 제곱! 한 변을 두 번 곱해요.",
    useWhen: "정사각형 모양 손수건이나 타일의 넓이를 구할 때 써요.",
    commonMistakes: [
      "한 변의 길이에 4를 곱하면 둘레가 되므로 넓이와 헷갈리지 마세요.",
      "단위는 ㎠로 쓰고 cm로 쓰지 마세요."
    ],
    example: {
      question: "한 변이 9cm인 정사각형의 넓이는?",
      steps: [
        "정사각형의 넓이는 한 변 × 한 변이에요.",
        "9 × 9를 계산해요.",
        "9 × 9 = 81이에요.",
        "따라서 넓이는 81㎠예요."
      ],
      answer: "81㎠"
    },
    quickCheck: {
      question: "한 변이 6cm인 정사각형의 넓이는?",
      answer: "36㎠"
    },
    relatedFormulaIds: ["el_rect_area", "el_rect_perimeter", "el_triangle_area"]
  },
  {
    id: "el_triangle_area",
    schoolLevel: "elementary",
    gradeLevel: "elementary5",
    topic: "geometry",
    emoji: "🔺",
    unit: "도형의 넓이",
    title: "삼각형의 넓이",
    formula: "밑변 × 높이 ÷ 2",
    latex: "A = base \\times height \\div 2",
    shortDescription: "삼각형은 같은 크기의 직사각형을 반으로 나눈 넓이와 같아요.",
    easyExplanation: "삼각형 두 개를 합치면 평행사변형이나 직사각형이 돼요. 그래서 밑변과 높이를 곱한 뒤 꼭 2로 나누어야 해요. 나누는 것을 잊으면 두 배로 커져요.",
    funExplanation: "색종이를 대각선으로 자르면 삼각형 두 장이 나와요. 직사각형 색종이 넓이의 정확히 절반이 삼각형 한 장의 넓이예요. 반으로 나누는 것이 핵심이에요.",
    memoryTip: "삼각형은 반! 곱하고 꼭 반으로 나눠요.",
    useWhen: "삼각형 모양 땅이나 깃발의 넓이를 구할 때 써요.",
    commonMistakes: [
      "2로 나누는 것을 잊으면 넓이가 두 배가 돼요.",
      "빗변이 아니라 밑변에 수직인 높이를 써야 해요."
    ],
    example: {
      question: "밑변 8cm, 높이 5cm인 삼각형의 넓이는?",
      steps: [
        "공식은 밑변 × 높이 ÷ 2예요.",
        "8 × 5 = 40이에요.",
        "40 ÷ 2 = 20이에요.",
        "따라서 넓이는 20㎠예요."
      ],
      answer: "20㎠"
    },
    quickCheck: {
      question: "밑변 6cm, 높이 4cm인 삼각형의 넓이는?",
      answer: "12㎠"
    },
    relatedFormulaIds: ["el_rect_area", "el_parallelogram_area", "el_square_area"]
  },
  {
    id: "el_parallelogram_area",
    schoolLevel: "elementary",
    gradeLevel: "elementary5",
    topic: "geometry",
    emoji: "▱",
    unit: "도형의 넓이",
    title: "평행사변형의 넓이",
    formula: "밑변 × 높이",
    latex: "A = base \\times height",
    shortDescription: "평행사변형을 잘라 직사각형으로 바꾸어 넓이를 구하는 공식이에요.",
    easyExplanation: "평행사변형의 삐딱한 조각을 잘라 반대쪽으로 옮기면 직사각형이 돼요. 그래서 밑변과 높이를 곱하면 넓이가 나와요. 이때 높이는 밑변에 수직인 길이를 써요.",
    funExplanation: "운동장에 기울어진 스펀지 매트를 떠올려 보세요. 삐져나온 부분을 잘라 빈 곳에 채우면 반듯한 직사각형이 돼요. 모양은 바뀌어도 넓이는 그대로예요.",
    memoryTip: "평행이는 밑높곱! 밑변과 높이만 곱해요.",
    useWhen: "기울어진 모양의 밭이나 타일의 넓이를 구할 때 써요.",
    commonMistakes: [
      "빗변 길이를 높이로 쓰지 마세요. 수직인 높이를 써야 해요.",
      "2로 나누지 마세요. 나누는 것은 삼각형 공식이에요."
    ],
    example: {
      question: "밑변 7cm, 높이 4cm인 평행사변형의 넓이는?",
      steps: [
        "공식은 밑변 × 높이예요.",
        "7 × 4를 계산해요.",
        "7 × 4 = 28이에요.",
        "따라서 넓이는 28㎠예요."
      ],
      answer: "28㎠"
    },
    quickCheck: {
      question: "밑변 5cm, 높이 6cm인 평행사변형의 넓이는?",
      answer: "30㎠"
    },
    relatedFormulaIds: ["el_rect_area", "el_triangle_area", "el_rect_perimeter"]
  },
  {
    id: "el_rect_perimeter",
    schoolLevel: "elementary",
    gradeLevel: "elementary4",
    topic: "geometry",
    emoji: "🏃",
    unit: "도형의 둘레",
    title: "직사각형의 둘레",
    formula: "(가로 + 세로) × 2",
    latex: "P = (width + height) \\times 2",
    shortDescription: "직사각형 바깥을 한 바퀴 돈 길이를 구하는 공식이에요.",
    easyExplanation: "직사각형은 마주 보는 변의 길이가 같아요. 그래서 가로와 세로를 더한 뒤 두 배를 하면 둘레가 나와요. 네 변을 모두 더해도 같은 답이 나와요.",
    funExplanation: "운동장 한 바퀴 달리기를 생각해 보세요. 가로 50m와 세로 30m를 더한 뒤 양쪽 길이므로 두 배를 해요. 둘레는 울타리 길이를 구할 때 필요해요.",
    memoryTip: "둘레는 더해 두 배! 가로세로 더해 곱하기 2예요.",
    useWhen: "운동장 울타리나 액자 테두리 길이를 구할 때 써요.",
    commonMistakes: [
      "넓이 공식인 가로 × 세로와 헷갈리지 마세요.",
      "단위는 cm처럼 길이 단위로 쓰고 ㎠를 쓰지 마세요."
    ],
    example: {
      question: "가로 8cm, 세로 5cm인 직사각형의 둘레는?",
      steps: [
        "공식은 (가로 + 세로) × 2예요.",
        "8 + 5 = 13이에요.",
        "13 × 2 = 26이에요.",
        "따라서 둘레는 26cm예요."
      ],
      answer: "26cm"
    },
    quickCheck: {
      question: "가로 10cm, 세로 3cm인 직사각형의 둘레는?",
      answer: "26cm"
    },
    relatedFormulaIds: ["el_rect_area", "el_square_area", "el_angle"]
  },
  {
    id: "el_circle_parts",
    schoolLevel: "elementary",
    gradeLevel: "elementary6",
    topic: "geometry",
    emoji: "⭕",
    unit: "원",
    title: "원의 지름과 반지름",
    formula: "지름 = 반지름 × 2",
    latex: "d = r \\times 2",
    shortDescription: "원의 중심을 지나는 지름은 반지름의 두 배라는 관계예요.",
    easyExplanation: "반지름은 원의 중심에서 가장자리까지의 거리예요. 지름은 중심을 지나 양쪽 가장자리를 잇는 선으로 반지름 두 개와 같아요. 그래서 지름은 반지름의 두 배예요.",
    funExplanation: "피자 한 판을 중심에서 자른다고 생각해 보세요. 중심에서 가장자리까지가 반지름 한 조각의 길이예요. 양쪽을 이으면 두 조각 길이이므로 지름은 두 배가 돼요.",
    memoryTip: "지름은 두 배! 반지름 둘을 이어요.",
    useWhen: "바퀴나 접시의 크기를 비교하고 원을 그릴 때 써요.",
    commonMistakes: [
      "반지름과 지름을 바꾸지 마세요. 지름이 더 길어요.",
      "지름은 반드시 원의 중심을 지나야 해요."
    ],
    example: {
      question: "반지름이 7cm인 원의 지름은?",
      steps: [
        "공식은 지름 = 반지름 × 2예요.",
        "7 × 2를 계산해요.",
        "7 × 2 = 14예요.",
        "따라서 지름은 14cm예요."
      ],
      answer: "14cm"
    },
    quickCheck: {
      question: "지름이 10cm인 원의 반지름은?",
      answer: "5cm"
    },
    relatedFormulaIds: ["el_rect_area", "el_box_volume", "el_angle"]
  },
  {
    id: "el_box_volume",
    schoolLevel: "elementary",
    gradeLevel: "elementary6",
    topic: "geometry",
    emoji: "📦",
    unit: "부피",
    title: "직육면체의 부피",
    formula: "가로 × 세로 × 높이",
    latex: "V = width \\times depth \\times height",
    shortDescription: "상자 안에 들어가는 작은 정육면체 개수를 구하는 공식이에요.",
    easyExplanation: "부피는 바닥 넓이에 높이를 곱한 것과 같아요. 먼저 가로와 세로를 곱해 바닥 넓이를 구해요. 그 다음 높이를 곱하면 상자에 들어가는 칸이 모두 세어져요.",
    funExplanation: "주사위 모양 젤리를 상자에 채운다고 생각해 보세요. 바닥에 깔리는 개수에 층수를 곱하면 전체 개수가 나와요. 부피는 3층 초콜릿 상자를 세는 것과 같아요.",
    memoryTip: "부피는 세 번 곱! 가로세로높이예요.",
    useWhen: "택배 상자나 어항에 들어가는 공간을 구할 때 써요.",
    commonMistakes: [
      "단위는 ㎤처럼 세제곱으로 쓰고 ㎠와 헷갈리지 마세요.",
      "길이 단위가 다르면 먼저 단위를 통일해야 해요."
    ],
    example: {
      question: "가로 4cm, 세로 3cm, 높이 5cm인 상자의 부피는?",
      steps: [
        "공식은 가로 × 세로 × 높이예요.",
        "4 × 3 = 12로 바닥 넓이를 구해요.",
        "12 × 5 = 60이에요.",
        "따라서 부피는 60㎤예요."
      ],
      answer: "60㎤"
    },
    quickCheck: {
      question: "가로 2cm, 세로 3cm, 높이 4cm인 상자의 부피는?",
      answer: "24㎤"
    },
    relatedFormulaIds: ["el_rect_area", "el_square_area", "el_circle_parts"]
  },
  {
    id: "el_angle",
    schoolLevel: "elementary",
    gradeLevel: "elementary4",
    topic: "geometry",
    emoji: "📏",
    unit: "각도",
    title: "각도와 각도기",
    formula: "직각 = 90°로 각을 재어요",
    latex: "90^{\\circ}",
    shortDescription: "벌어진 정도를 각도로 읽고 직각과 예각과 둔각을 구분하는 방법이에요.",
    easyExplanation: "각은 두 변이 벌어진 정도를 말하고 단위는 도예요. 각도기의 중심을 꼭짓점에 맞추고 한 변을 0도에 맞추면 다른 변이 가리키는 눈금을 읽어요. 90도는 직각, 그보다 작으면 예각, 크면 둔각이에요.",
    funExplanation: "책을 펼치는 모습을 생각해 보세요. 살짝 펼치면 예각, 완전히 반듯하게 펼치면 직각, 활짝 펼치면 둔각이에요. 각도기는 벌어진 책의 정도를 재는 자예요.",
    memoryTip: "구십은 직각! 작으면 예, 크면 둔이에요.",
    useWhen: "삼각자 모양을 비교하거나 시계 바늘 사이 각을 잴 때 써요.",
    commonMistakes: [
      "각도기의 안쪽 눈금과 바깥쪽 눈금을 헷갈리지 마세요.",
      "0도 선에 한 변을 맞추지 않으면 각이 틀려요."
    ],
    example: {
      question: "직각은 몇 도인가요?",
      steps: [
        "직각은 반듯하게 벌어진 각이에요.",
        "각도기로 재면 90도를 가리켜요.",
        "예각은 90도보다 작아요.",
        "따라서 직각은 90°예요."
      ],
      answer: "90°"
    },
    quickCheck: {
      question: "100°는 예각, 직각, 둔각 중 무엇인가요?",
      answer: "둔각"
    },
    relatedFormulaIds: ["el_rect_perimeter", "el_symmetry", "el_triangle_area"]
  },
  {
    id: "el_symmetry",
    schoolLevel: "elementary",
    gradeLevel: "elementary5",
    topic: "geometry",
    emoji: "🦋",
    unit: "대칭",
    title: "선대칭과 점대칭",
    formula: "접으면 포개어지면 선대칭, 돌리면 포개어지면 점대칭이에요",
    latex: "",
    shortDescription: "접거나 돌렸을 때 완전히 겹쳐지는 아름다운 도형의 성질이에요.",
    easyExplanation: "선대칭 도형은 대칭축을 따라 접으면 두 부분이 정확히 겹쳐져요. 점대칭 도형은 한 점을 중심으로 180도 돌렸을 때 원래 모양과 겹쳐져요. 나비와 태극 문양이 좋은 예예요.",
    funExplanation: "나비를 떠올려 보세요. 날개를 반으로 접으면 왼쪽과 오른쪽이 똑같이 겹쳐져요. 이것이 바로 선대칭이에요. 시소를 180도 돌려도 같은 모습이면 점대칭이에요.",
    memoryTip: "접어 겹치면 선! 돌려 겹치면 점이에요.",
    useWhen: "나비 무늬나 로고처럼 균형 잡힌 모양을 찾을 때 써요.",
    commonMistakes: [
      "대칭축을 아무 선이나 그으면 안 돼요. 접어 겹쳐지는 선이어야 해요.",
      "점대칭은 뒤집기가 아니라 180도 돌리기로 확인해요."
    ],
    example: {
      question: "하트 모양은 선대칭인가요?",
      steps: [
        "하트의 가운데에 세로선을 그어요.",
        "선을 따라 접는다고 상상해요.",
        "왼쪽과 오른쪽이 정확히 겹쳐져요.",
        "따라서 선대칭 도형이에요."
      ],
      answer: "선대칭 도형이다"
    },
    quickCheck: {
      question: "평행사변형은 선대칭인가요 점대칭인가요?",
      answer: "점대칭"
    },
    relatedFormulaIds: ["el_angle", "el_square_area", "el_rect_area"]
  },
  {
    id: "el_average",
    schoolLevel: "elementary",
    gradeLevel: "elementary5",
    topic: "ratio",
    emoji: "🍬",
    unit: "평균",
    title: "평균",
    formula: "합 ÷ 개수로 고르게 나누어요",
    latex: "avg = sum \\div count",
    shortDescription: "모두 합한 뒤 개수로 나누어 똑같이 나누는 값을 구하는 방법이에요.",
    easyExplanation: "평균은 전체 양을 똑같이 나누었을 때 한 몫을 말해요. 먼저 모든 수를 더해서 합을 구해요. 그 다음 개수로 나누면 평균이 나와요.",
    funExplanation: "사탕을 친구들과 나누는 모습을 생각해 보세요. 모두 모아 한 주머니에 넣은 뒤 똑같이 나누어 주면 모두가 같은 개수를 받아요. 그 개수가 바로 평균이에요.",
    memoryTip: "모아 나누기! 합하고 개수로 나눠요.",
    useWhen: "시험 점수나 키의 대표값을 구할 때 써요.",
    commonMistakes: [
      "개수로 나누지 않고 합만 구하면 평균이 아니에요.",
      "0점도 개수에 포함해야 정확해요."
    ],
    example: {
      question: "사탕 6개, 8개, 10개의 평균은?",
      steps: [
        "먼저 모두 더해요. 6 + 8 + 10 = 24예요.",
        "개수는 3이에요.",
        "24 ÷ 3 = 8이에요.",
        "따라서 평균은 8개예요."
      ],
      answer: "8개"
    },
    quickCheck: {
      question: "점수 70점, 80점, 90점의 평균은?",
      answer: "80점"
    },
    relatedFormulaIds: ["el_division", "el_ratio", "el_speed"]
  },
  {
    id: "el_ratio",
    schoolLevel: "elementary",
    gradeLevel: "elementary6",
    topic: "ratio",
    emoji: "⚖️",
    unit: "비와 비율",
    title: "비와 비율",
    formula: "비교하는 양 ÷ 기준량으로 비율을 구해요",
    latex: "ratio = compare \\div base",
    shortDescription: "기준량에 대한 비교하는 양의 크기를 수로 나타내는 방법이에요.",
    easyExplanation: "비는 두 양을 순서대로 비교하여 나타낸 것이에요. 비율은 기준량을 1로 볼 때 비교하는 양이 몇 배인지 말해요. 백분율은 비율에 100을 곱해 %로 나타내요.",
    funExplanation: "운동장에서 남학생과 여학생 수를 비교한다고 생각해 보세요. 전체를 기준으로 여학생이 얼마나 되는지 알면 팀 나누기가 쉬워져요. 비율은 저울처럼 두 양의 균형을 보여줘요.",
    memoryTip: "기준으로 나눠! 비교를 기준으로 나눠요.",
    useWhen: "할인율이나 득점률을 구할 때 써요.",
    commonMistakes: [
      "기준량과 비교하는 양을 바꾸면 비율이 달라져요.",
      "백분율로 바꿀 때는 100을 곱하는 것을 잊지 마세요."
    ],
    example: {
      question: "전체 25명 중 모범생 5명의 비율은?",
      steps: [
        "기준량은 전체 25명이에요.",
        "비교하는 양은 5명이에요.",
        "5 ÷ 25 = 0.2예요.",
        "따라서 비율은 0.2, 백분율로는 20%예요."
      ],
      answer: "0.2, 20%"
    },
    quickCheck: {
      question: "10문제 중 7문제를 맞혔을 때 정답률은?",
      answer: "0.7, 70%"
    },
    relatedFormulaIds: ["el_average", "el_frac_decimal", "el_speed"]
  },
  {
    id: "el_speed",
    schoolLevel: "elementary",
    gradeLevel: "elementary5",
    topic: "ratio",
    emoji: "🚗",
    unit: "속력",
    title: "속력 구하기",
    formula: "거리 ÷ 시간으로 속력을 구해요",
    latex: "speed = distance \\div time",
    shortDescription: "1시간 동안 간 거리로 얼마나 빠른지 나타내는 방법이에요.",
    easyExplanation: "속력은 일정한 시간 동안 이동한 거리로 나타내요. 전체 거리를 걸린 시간으로 나누면 1시간당 가는 거리가 나와요. 거리에 시간을 곱하면 이동한 거리를 구할 수 있어요.",
    funExplanation: "버스로 여행을 간다고 생각해 보세요. 2시간에 100km를 가면 1시간에 50km를 가는 셈이에요. 속력은 자동차의 발걸음이 얼마나 큰지 알려줘요.",
    memoryTip: "거리를 시간으로! 나누면 속력이예요.",
    useWhen: "자동차나 기차가 얼마나 빠른지 비교할 때 써요.",
    commonMistakes: [
      "시간과 거리 단위를 통일하지 않으면 답이 틀려요.",
      "속력이 아니라 거리를 구할 때는 곱해야 해요."
    ],
    example: {
      question: "2시간에 100km를 간 자동차의 속력은?",
      steps: [
        "공식은 거리 ÷ 시간이에요.",
        "100 ÷ 2를 계산해요.",
        "100 ÷ 2 = 50이에요.",
        "따라서 시속 50km예요."
      ],
      answer: "시속 50km"
    },
    quickCheck: {
      question: "3시간에 90km를 가면 속력은?",
      answer: "시속 30km"
    },
    relatedFormulaIds: ["el_division", "el_average", "el_time_calc"]
  },
  {
    id: "el_money",
    schoolLevel: "elementary",
    gradeLevel: "elementary2",
    topic: "arithmetic",
    emoji: "💰",
    unit: "돈 계산",
    title: "거스름돈 계산",
    formula: "낸 돈 − 물건값으로 거스름돈을 구해요",
    latex: "change = paid - price",
    shortDescription: "낸 돈에서 물건값을 빼서 받아야 할 거스름돈을 구하는 방법이에요.",
    easyExplanation: "물건을 살 때는 낸 돈에서 물건값을 빼야 해요. 먼저 물건값들을 모두 더해 전체 금액을 구해요. 그 다음 낸 돈에서 빼면 거스름돈이 나와요.",
    funExplanation: "문구점에서 1000원을 내고 600원짜리 지우개를 산다고 생각해 보세요. 주인이 400원을 돌려주는 것이 거스름돈이에요. 돈 계산은 작은 가게 놀이와 같아요.",
    memoryTip: "낸 돈 빼기 물건값! 거스름돈이에요.",
    useWhen: "문구점이나 매점에서 물건을 사고 거슬러 받을 때 써요.",
    commonMistakes: [
      "물건값을 먼저 합하지 않고 따로 빼면 헷갈려요.",
      "받아내림을 잊으면 거스름돈이 틀려요."
    ],
    example: {
      question: "1000원을 내고 600원짜리 지우개를 사면 거스름돈은?",
      steps: [
        "공식은 낸 돈 - 물건값이에요.",
        "1000 - 600을 계산해요.",
        "1000 - 600 = 400이에요.",
        "따라서 거스름돈은 400원이에요."
      ],
      answer: "400원"
    },
    quickCheck: {
      question: "500원을 내고 350원짜리 과자를 사면 거스름돈은?",
      answer: "150원"
    },
    relatedFormulaIds: ["el_sub_borrow", "el_add_carry", "el_decimal_add"]
  },
  {
    id: "el_probability_easy",
    schoolLevel: "elementary",
    gradeLevel: "elementary6",
    topic: "statistics",
    emoji: "🎲",
    unit: "가능성",
    title: "가능성 말하기",
    formula: "확실 불가능 가능 반반으로 가능성을 말해요",
    latex: "\\frac{1}{2}",
    shortDescription: "일이 일어날 가능성을 확실과 불가능과 반반으로 표현하는 방법이에요.",
    easyExplanation: "가능성은 앞으로 일어날 일이 얼마나 일어날 것 같은지 말하는 것이에요. 반드시 일어나면 확실, 절대 일어나지 않으면 불가능이라고 해요. 어느 쪽도 아닌 경우는 가능이나 반반으로 말해요.",
    funExplanation: "주사위 놀이를 생각해 보세요. 7이 나올 가능성은 불가능이고 짝수가 나올 가능성은 반반이에요. 내일 해가 뜨는 것은 확실이라고 말할 수 있어요.",
    memoryTip: "확불가반! 확실 불가능 가능 반반이에요.",
    useWhen: "주사위나 가위바위보의 결과를 예상할 때 써요.",
    commonMistakes: [
      "가능하다고 해서 반드시 일어나는 것은 아니에요.",
      "반반은 절반의 가능성을 말하며 확실과는 달라요."
    ],
    example: {
      question: "동전을 던져 앞면이 나올 가능성은?",
      steps: [
        "동전은 앞면과 뒷면 두 가지예요.",
        "앞면은 두 가지 중 한 가지예요.",
        "어느 쪽도 유리하지 않아요.",
        "따라서 가능성은 반반이에요."
      ],
      answer: "반반"
    },
    quickCheck: {
      question: "주머니에 빨간 공만 있을 때 빨간 공이 나올 가능성은?",
      answer: "확실"
    },
    relatedFormulaIds: ["el_ratio", "el_average", "el_pattern"]
  },
  {
    id: "el_pattern",
    schoolLevel: "elementary",
    gradeLevel: "elementary4",
    topic: "arithmetic",
    emoji: "🔍",
    unit: "규칙",
    title: "규칙 찾기",
    formula: "앞뒤 수의 차가 일정한 규칙을 찾아요",
    latex: "a_{n+1} = a_{n} + 3",
    shortDescription: "수나 모양이 어떻게 변하는지 규칙을 찾아 다음을 예상하는 방법이에요.",
    easyExplanation: "규칙 찾기는 앞뒤 수의 차이를 먼저 살펴보는 것부터 시작해요. 차이가 일정하면 그만큼 더하거나 빼서 다음 수를 구해요. 모양 규칙은 색이나 개수가 어떻게 바뀌는지 살펴보면 돼요.",
    funExplanation: "계단을 한 칸씩 오르는 모습을 생각해 보세요. 2칸씩 뛴다면 2, 4, 6처럼 일정하게 늘어나요. 규칙은 숨은 계단처럼 다음 발판이 어디인지 알려줘요.",
    memoryTip: "차이를 봐! 앞뒤 차에서 규칙 보여요.",
    useWhen: "수 배열에서 다음 수나 모양을 예상할 때 써요.",
    commonMistakes: [
      "앞의 두 수만 보고 판단하지 말고 끝까지 확인하세요.",
      "더하기 규칙과 곱하기 규칙을 헷갈리지 마세요."
    ],
    example: {
      question: "3, 6, 9, 다음 수는?",
      steps: [
        "앞뒤 수의 차이를 구해요.",
        "6 - 3 = 3, 9 - 6 = 3이에요.",
        "3씩 커지는 규칙이에요.",
        "따라서 다음 수는 12예요."
      ],
      answer: "12"
    },
    quickCheck: {
      question: "5, 10, 15, 다음 수는?",
      answer: "20"
    },
    relatedFormulaIds: ["el_mult_table", "el_order_ops", "el_average"]
  }
];