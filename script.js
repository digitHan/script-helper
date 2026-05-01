const digits = ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
const units = ["", "십", "백", "천"];
const bigUnits = ["", "만", "억", "조"];

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

function convert(text) {
  return text.replace(/\d+/g, (match) => numberToKorean(parseInt(match)));
}

const input = document.getElementById("input");
const output = document.getElementById("output");
input.addEventListener("input", () => {
  output.textContent = convert(input.value);
});