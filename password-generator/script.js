// Random character generators
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber1() {
  return Math.floor(Math.random() * 10);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/.,;:?-_+';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Fisher–Yates shuffle to avoid predictable patterns
function shuffleString(input) {
  const array = Array.from(input);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
}

// Build password string based on selected options
function buildPassword(length, uppercase, lowercase, numbers, symbols) {
  const generators = {
    uppercase: getRandomUpper,
    lowercase: getRandomLower,
    numbers: getRandomNumber,
    symbols: getRandomSymbol,
  };

  const typesArr = [
    { uppercase },
    { lowercase },
    { numbers },
    { symbols },
  ].filter(item => Object.values(item)[0]);

  if (typesArr.length === 0 || !length) return '';
  if (length < typesArr.length) {
    return 'Please change the length';
  }

  let generated = '';
  while (generated.length < length) {
    for (const type of typesArr) {
      const funcName = Object.keys(type)[0];
      generated += generators[funcName]();
      if (generated.length >= length) break;
    }
  }

  return shuffleString(generated.slice(0, length));
}

function buildPasswordPool(length, uppercase, lowercase, numbers, symbols) {
  const pools = [];
  if (uppercase) pools.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  if (lowercase) pools.push('abcdefghijklmnopqrstuvwxyz');
  if (numbers) pools.push('0123456789');
  if (symbols) pools.push('!@#$%^&*(){}[]=<>/.,;:?-_+');

  if (pools.length === 0 || !length) return '';
  if (length < pools.length) {
    return 'Please change the length';
  }

  let password = '';

  // 随机从每个pool中取一个字符
  pools.forEach(pool => {
    password += pool[Math.floor(Math.random() * pool.length)];
  });

  // 生成剩余的密码
  const allChars = pools.join('');
  for (let i = 0; i < length - pools.length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return shuffleString(password);
}

// UI Handlers
function onGenerateClick() {
  const length = parseInt(document.getElementById('length').value, 10) || 0;
  const uppercase = document.getElementById('uppercase').checked;
  const lowercase = document.getElementById('lowercase').checked;
  const numbers = document.getElementById('numbers').checked;
  const symbols = document.getElementById('symbols').checked;

  const password = buildPasswordPool(
    length,
    uppercase,
    lowercase,
    numbers,
    symbols
  );
  const outputEl = document.getElementById('password');
  outputEl.textContent = password || 'Please select at least one option';
}

async function copyToClipboard() {
  const text = document.getElementById('password').textContent || '';
  if (!text || text === 'Please select at least one option') return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // fallback below
    }
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }
  const alertEl = document.querySelector('.alert');
  if (!alertEl) return;
  alertEl.classList.add('is-visible');
  setTimeout(() => {
    alertEl.classList.remove('is-visible');
  }, 1500);
}

// print password to clipboard
async function printToClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('剪贴板内容:', text);
  } catch (err) {
    console.error('读取剪贴板失败:', err);
  }
}

// Bind events (script is loaded at end of body, so DOM is ready)
document.getElementById('generate').addEventListener('click', onGenerateClick);
document.getElementById('copy').addEventListener('click', copyToClipboard);
document.getElementById('print').addEventListener('click', printToClipboard);
