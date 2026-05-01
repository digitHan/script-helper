const digits = ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
const units = ["", "십", "백", "천"];
const bigUnits = ["", "만", "억", "조"];

// 훈독 (1~20까지만, 일상에서 거의 다 커버)
const native = [
  "", "한", "두", "세", "네", "다섯", "여섯", "일곱", "여덟", "아홉", "열",
  "열한", "열두", "열세", "열네", "열다섯", "열여섯", "열일곱", "열여덟", "열아홉", "스무"
];

// 이 단위들이 숫자 뒤에 붙으면 훈독으로 읽기
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
  if (num >= 1 && num <= 20 && native[num]) return native[num];
  return numberToKorean(num); // 21 이상은 그냥 음독
}

function convert(text) {
  // 숫자 + 한글단위 패턴 먼저 처리 (훈독)
  const nativePattern = new RegExp(`(\\d+)(${nativeUnits.join("|")})`, "g");
  text = text.replace(nativePattern, (match, num, unit) => {
    return numberToNative(parseInt(num)) + " " + unit;
  });
  // 나머지 숫자는 음독
  return text.replace(/\d+/g, (match) => numberToKorean(parseInt(match)));
}

const input = document.getElementById("input");
const output = document.getElementById("output");
input.addEventListener("input", () => {
  output.textContent = convert(input.value);
});