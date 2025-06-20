# ASX: Android API Sequence Extractor

ASX is a static analysis toolkit that extracts method-level API call sequences from Android APK files. Designed for use in malware detection research, especially with attention-based multi-instance learning (MIL) models, ASX is optimized for processing large APK datasets and outputs structured, MIL-ready CSV data.

---

## 📦 Overview

ASX (API Sequence Extractor) is a malware analysis utility that statically analyzes DEX bytecode in APKs and generates method-level API call sequences. It supports class-level abstraction, noise filtering, top-N ranking, and multi-APK batch processing. The tool includes both a command-line backend and an Electron-based graphical interface.

---

## ✨ Key Features

### 🔍 API Sequence Extraction

* **Per-method granularity**: Each method’s invoke-\* instructions are parsed to generate an API call sequence.
* **Class-level abstraction**: Converts full method calls (e.g., `android.telephony.SmsManager.sendTextMessage`) to class-only abstractions (`android.telephony.SmsManager`).

### 🧹 Filtering & Preprocessing

* **Trivial method exclusion**: Filters methods by signature (e.g., `get*`, `<init>`, etc.) and class prefix (e.g., `android.view.*`).
* **Top-N sequences**: Only the top-N longest, most meaningful sequences per APK are retained (default: N=30).

### 🗂 Structured Output

* **Per-method CSV entries**: Output includes `apkname`, `class_name`, `method_name`, `api_seq`, `label`, and `year`.
* **Auto labeling**: Labels (0=benign, 1=malicious) and year information are inferred from APK file paths like `2020/benign/foo.apk`.

### 🖥 GUI Interface (Electron)

* Clean, terminal-inspired interface
* File selector + dynamic log output
* Responsive and styled with glowing borders, dark themes, and animated output simulation

---

## 🖼 GUI Design

![스크린샷 2025-06-15 164009](https://github.com/user-attachments/assets/0f38fae0-c67b-4271-bd68-96f7769bee56)

### Landing Page (`index.html`)

* Left panel: product info + "Start Analysis" button
* Right panel: terminal-style animation (typewriter effect) with glowing text
* Custom fonts: Inter, JetBrains Mono
* Theme: macOS-style terminal aesthetics with dark mode and teal glows

### Dashboard Page (`dashboard.html`)

* **"Choose File"**: white, flat rounded button for base directory selection
* **"Start Analysis"**: full-width glowing button
* **Live log**: dynamic, monospace terminal output updates
* Glowing borders to show active analysis status

### Styling and Layout

* Tailwind-like CSS
* CSS-only styling (no Tailwind dependency)
* Glow, shadow, rounded UI elements
* Separate CSS for each page (`style.css`, `dashboard.css`)

---

## 🧪 Use Case

ASX is tailored for malware detection research using attention-based multi-instance learning. Rather than aggregating one sequence per app, it extracts rich method-level sequences, allowing models to focus on fine-grained malicious behaviors. It scales well to year-separated datasets and helps structure data for reproducible experiments.

---

## 🚀 Quick Start

### 🔧 Requirements

* Python 3.8+
* Androguard (`pip install androguard`)
* Node.js & npm (for GUI)

### 🖥 CLI Usage

```bash
python multi_apk_extractor.py --input ./2016/ --output ./output/2016.csv
```

### 💻 GUI Usage

```bash
cd ui/
npm install
npm start
```

---

## 🧾 Output Format

Each line in the CSV output corresponds to one method-level API sequence.

| apkname | class\_name   | method\_name | api\_seq                         | label | year |
| ------- | ------------- | ------------ | -------------------------------- | ----- | ---- |
| foo.apk | com.example.A | sendSMS      | android.telephony.SmsManager;... | 0     | 2016 |

---

## 🗃 Project Directory Structure

```
ASX/
├── multi_apk_extractor.py       # Python extractor script
├── output/                      # Generated CSVs
├── requirements.txt             # Python dependencies
├── ui/                          # GUI root
│   ├── index.html               # Landing page
│   ├── dashboard.html           # Dashboard for analysis
│   ├── style.css                # Landing page styles
│   ├── dashboard.css            # Dashboard styles
│   ├── main.js                  # Electron logic
│   ├── package.json             # Electron config
└── README.md                    # This file
```

---

## 📜 License

MIT License. See `LICENSE` for full text.

---

## 🙋 FAQ

### Can it handle obfuscated APKs?

Partially. Heuristics filter out trivial or meaningless methods, but heavily obfuscated apps may still produce noisy sequences.

### Can it process large datasets?

Yes. It supports recursive directory traversal and batch extraction. Use the GUI or script for multi-APK extraction.

---

## 👨‍💻 Author

Developed by Kyoungmin Roh (노경민), Cybersecurity Department, DKU.
