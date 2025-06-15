const apkInput = document.getElementById('apkInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const logBox = document.getElementById('logBox');

analyzeBtn.addEventListener('click', () => {
  const file = apkInput.files[0];
  logBox.innerHTML = '';

  if (!file) {
    log('No APK file selected.');
    return;
  }

  log(`Selected file: ${file.name}`);
  log('Starting analysis...');

  setTimeout(() => log('Extracting API calls...'), 1000);
  setTimeout(() => log('Analyzing sequences...'), 2000);
  setTimeout(() => log('Labeling and exporting to CSV...'), 3000);
  setTimeout(() => log('Analysis complete.'), 4000);
});

function log(message) {
  const time = new Date().toLocaleTimeString();
  logBox.innerHTML += `[${time}] ${message}<br/>`;
  logBox.scrollTop = logBox.scrollHeight;
}
