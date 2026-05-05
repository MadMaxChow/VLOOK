/**
 * 提取并识别出 vlook.js 中所有使用、未使用的语言包 ID
 */

let fs = require('fs'),
	// 读取 vlook.js
	content = fs.readFileSync('./vlook.js', 'utf8'),
	// 匹配 V_lang_text(数字, ...)
	regex = /V_lang_text\s*\(\s*(\d+)\s*,/g,
	match,
	ids = [];

// 收集所有匹配
while ((match = regex.exec(content)) !== null)
  ids.push(Number(match[1]));


let result = [...new Set(ids)].sort((a, b) => a - b), // 去重 + 排序
	missing = [];

// ===== 找缺失的数字 =====
if (result.length > 0) {
  let min = result[0],
  	max = result[result.length - 1];

  for (let i = min; i <= max; i++)
    if (!result.includes(i))
      missing.push(i);
}

// ===== 输出 =====
console.log('[ 已使用的 textId]');
result.forEach(id => {
  console.log(id);
});

console.error('\n[ 未使用的 textId ]');
missing.forEach(id => {
  console.error(id);
});