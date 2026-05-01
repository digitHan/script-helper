const digits = ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
const units = ["", "십", "백", "천"];
const bigUnits = ["", "만", "억", "조"];

// 훈독 1의 자리 (1~9)
const nativeOnes = ["", "한", "두", "세", "네", "다섯", "여섯", "일곱", "여덟", "아홉"];
// 훈독 10의 자리 (10, 20, 30, ... 90)
const nativeTens = ["", "열", "스무", "서른", "마흔", "쉰", "예순", "일흔", "여든", "아흔"];

const nativeUnits = ["번째", "번", "개", "명", "사람", "마리", "살", "시간", "시", "달", "권", "장", "잔", "병", "그릇", "송이", "켤레", "벌", "채", "대"];

function numberToKorean(num) {
  if (num === 0) return "영";
  const str = String(num);
  const groups = [];
  for (let i = str.length; i > 0; i -= 4) {
    groups.unshift(str.slice(Math.max(0, i - 4), i));
  }
  let result = "";
  groups.forEach((group, idx) => {
    let groupStr = "";
    const padded = group.padStart(4, "0");
    for (let i = 0; i < 4; i++) {
      const d = parseInt(padded[i]);
      if (d !== 0) groupStr += digits[d] + units[3 - i];
    }
    if (groupStr) result += groupStr + bigUnits[groups.length - 1 - idx];
  });
  return result;
}

function numberToNative(num) {
  if (num < 1 || num > 99) return numberToKorean(num); // 1~99 외엔 음독
  const tens = Math.floor(num / 10);
  const ones = num % 10;
  // 단독 10의 자리 (10, 20, 30...)
  if (ones === 0) {
    // "스무"는 단독으론 "스물"
    if (tens === 2) return "스물";
    return nativeTens[tens];
  }
  // 1~9
  if (tens === 0) return nativeOnes[ones];
  // 11~99 조합
  return nativeTens[tens] + nativeOnes[ones];
}

function convert(text) {
  const nativePattern = new RegExp(`(\\d+)(${nativeUnits.join("|")})`, "g");
  text = text.replace(nativePattern, (match, num, unit) => {
    return numberToNative(parseInt(num)) + " " + unit;
  });
  return text.replace(/\d+/g, (match) => numberToKorean(parseInt(match)));
}

const input = document.getElementById("input");
const output = document.getElementById("output");
input.addEventListener("input", () => {
  output.textContent = convert(input.value);
});