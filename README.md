# 👁️ VisionMate — Smart Blind Assistance System

VisionMate is an advanced React Native Expo application designed to assist visually impaired individuals. It integrates\
gbo primary subsystems:
1. **Interactive Voice Assistant**: A voice-controlled AI helper that performs tasks such as dialing contacts, sending WhatsApp messages, telling the time/date, checking battery status, fetching current location, initiating navigation, and performing web searches.
2. **On-Device Obstacle Detector**: A camera-based scanning system powered by an **NCNN neural network** running fully on-device to detect obstacles (potholes, speed breakers, unpaved roads, and generic items) in a user's lane in real-time, providing audio feedback.

---

## ⚠️ CRITICAL WARNING: DO NOT USE STANDARD EXPO GO
This project contains a custom native module (**`ncnn-detector`**) written in C++/Kotlin/Swift to perform fast, on-device neural network calculations. 

Because of this custom native code, **the standard Expo Go app downloaded from the Play Store or App Store will crash or fail to open this project.** 
You **must** run this project using either:
* **Workflow A: Standalone Preview Build (APK)**: An independent installation file compiled in the cloud that runs by itself.
* **Workflow B: Custom Development Client**: A developer version of the app that you install on your phone to connect to your laptop's Metro server for live editing and hot-reloading.

---

## 📋 Table of Contents
1. [Prerequisites & System Setup](#1-prerequisites--system-setup)
2. [Phase 1: Laptop Setup & Installation](#2-phase-1-laptop-setup--installation)
3. [Phase 2: Building and Running the App](#3-phase-2-building-and-running-the-app)
   * [Option A: Standalone APK (EAS Preview Build - Recommended for Quick Testing)](#option-a-standalone-apk-eas-preview-build---recommended-for-quick-testing)
   * [Option B: Live Development Build (EAS Development + Metro - Recommended for Code Changes)](#option-b-live-development-build-eas-development--metro---recommended-for-code-changes)
4. [Phase 3: Mobile Phone Installation & Initial Configuration](#4-phase-3-mobile-phone-installation--initial-configuration)
5. [🗣️ Using the App (Voice Commands & Features)](#5-using-the-app-voice-commands--features)
6. [🛠️ Troubleshooting & Common Issues](#6-troubleshooting--common-issues)

---

## 1. Prerequisites & System Setup

Before you start, make sure you have the following installed and set up:

### On Your Laptop:
* **Node.js** (LTS version 18.x or higher) installed on your computer. Download from [nodejs.org](https://nodejs.org/).
* **Visual Studio Code (VS Code)** or **Antigravity IDE**.
* An **Expo Account**: A free account is required for building. Create one at [expo.dev](https://expo.dev/).

### On Your Mobile Phone (Android):
* An Android device.
* A QR Code scanner app (or use Google Lens / built-in camera app).
* Laptop and mobile phone must have access to the **same Wi-Fi network** (only required for live development builds).

---

## 2. Phase 1: Laptop Setup & Installation

Follow these steps directly after extracting the project ZIP file:

### Step 1: Open the Project
Open VS Code / Antigravity. Select **File -> Open Folder** and choose the extracted `VisionMate` folder. Open the terminal inside VS Code (**Ctrl + `** or **Terminal -> New Terminal**).

### Step 2: Install Node Dependencies
Run the following command in the terminal:
```bash
npm install
```
* **What happens:** Node Package Manager (NPM) reads the `package.json` file and downloads all required JavaScript packages and native libraries (such as React Native, Expo Speech, Expo Camera, React Navigation, etc.) into a folder called `node_modules`. This setup takes 1–3 minutes.

### Step 3: Install EAS CLI Globally
To trigger cloud builds, you need the Expo Application Services (EAS) command-line interface. Run:
```bash
npm install -g eas-cli
```
* **What happens:** Installs the `eas-cli` command globally on your computer so you can compile your native app configurations on Expo's remote servers.

### Step 4: Login to your Expo Account
Run this command in the terminal:
```bash
npx eas-cli login
```
* **What happens:** The terminal will prompt you to enter your Expo **Username or Email** and **Password**. Once successfully entered, your laptop is securely connected to your Expo developer account.

---

## 3. Phase 2: Building and Running the App

Choose one of the two workflows below depending on whether you want a standalone, shareable app or active live-editing environment:

---

### Option A: Standalone APK (EAS Preview Build - Recommended for Quick Testing)
This compiles an APK that installs on your Android phone and runs completely independently. You do **not** need your laptop running or connected to the phone once it is installed.

#### Step A1: Trigger the Build Command
Run the following command in your terminal:
```bash
npx eas-cli build --platform android --profile preview
```
* **What happens:** 
  1. The CLI packages your code, configuration (`app.json`), and custom C++ NCNN neural network module.
  2. It uploads this package to Expo's remote cloud builders.
  3. Expo's servers compile the Android source code, bundle the JavaScript assets, package the dependencies, and output a signed `.apk` installation file.
  4. **Duration:** This build is queued and completed in the cloud. It typically takes **5 to 15 minutes** to finish.
  5. Once finished, a **QR Code** and a **download URL** will be printed in your terminal.

#### Step A2: Scan and Download the APK
1. Open a QR code reader or Google Lens on your Android mobile phone.
2. Scan the QR code displayed in the terminal of your laptop.
3. The QR link will open a page on `expo.dev` showing your build. Click the **"Download APK"** button.
4. Alternatively, click/copy the download URL from the terminal and open it in your mobile web browser to download the file directly.

---

### Option B: Live Development Build (EAS Development + Metro - Recommended for Code Changes)
Use this option if you plan to edit the code files and want to see your changes instantly update on the phone screen without triggering another 15-minute build.

#### Step B1: Build the Custom Development Client
Run this command to compile a development launcher on the cloud:
```bash
npx eas-cli build --platform android --profile development
```
* **What happens:** Expo builds a custom developer container app containing your native modules (`ncnn-detector`, camera permissions, speech libraries, etc.).
* Once completed, a **QR Code** is printed in the terminal.
* Scan this QR code with your phone, download the compiled `.apk` file, and install it on your device.

#### Step B2: Start the Laptop Dev Server (Metro Bundler)
Ensure both your laptop and phone are connected to the **same Wi-Fi network**. Then run on your laptop terminal:
```bash
npx expo start
```
* **What happens:** This starts the React Native **Metro Bundler** on your laptop. It builds the JavaScript code bundle, hosts a local server, and displays a large QR code in the terminal.

#### Step B3: Connect the Phone to the Dev Server
1. Open the newly installed **VisionMate** app (the development client) on your phone.
2. Inside the app's initial menu, select **"Scan QR Code"**.
3. Scan the QR code currently shown in your **laptop terminal**.
4. **What happens:** The phone app connects to your laptop over Wi-Fi, downloads the JavaScript bundle, and runs the application. 
5. **Live Reloading:** Any changes you make to files like `app/index.tsx` or `app/obstacle-detector.tsx` in VS Code will immediately refresh on the mobile screen upon saving.

---

## 4. Phase 3: Mobile Phone Installation & Initial Configuration

Follow these steps once you have downloaded the APK (from Option A or Option B) to your phone:

### Step 1: Install the APK
1. Tap on the downloaded `.apk` file in your phone's notification drawer or file manager.
2. If prompted with a security warning stating **"Blocked by Play Protect"** or **"Install from unknown sources"**:
   * Tap **"More Details"** or **"Settings"**.
   * Click **"Install Anyway"** or toggle **"Allow from this source"**.
3. Wait for the installation to finish and tap **"Open"**.

### Step 2: Allow Required Permissions
When you launch the app, it will prompt you for permissions. You **must** select **"Allow"** or **"While using the app"** for the following:
1. **Audio Recording / Microphone**: Essential for speech recognition and voice commands.
2. **Camera Access**: Essential for real-time obstacle detection using the back camera.
3. **Location (Fine/Coarse Location)**: Required for the location reporter, Google Maps navigation launcher, and location sharing.
4. **Contacts**: Required to dial numbers or send WhatsApp messages by contact name.

---

## 🗣️ Using the App (Voice Commands & Features)

Once opened, the screen will turn black (designed to optimize battery life and reflect a blind-friendly UI) and say:
> *"Good [morning/afternoon/evening]! Welcome to VisionMate, the smart blind assistance system. Vision Mate is now active."*

The assistant will continually listen for voice commands. You can trigger commands either by **saying them out loud** or tapping the screen buttons if needed.

### Voice Commands Table
| Objective | What to Say (Example Command) | Action Taken by App |
| :--- | :--- | :--- |
| **Detect Obstacles** | *"Obstacle detection"* or *"Start scanning"* | Switches to the camera screen and starts scanning. |
| **Check Time** | *"What is the time?"* or *"Time"* | Speaks the current local time. |
| **Check Date** | *"What is today's date?"* or *"Date"* | Speaks the current day, month, and year. |
| **Current Location** | *"Where am I?"* or *"Current location"* | Detects GPS coordinates and speaks your street, city, and state. |
| **Check Battery** | *"Battery status"* or *"Battery level"* | Speaks your phone's current battery percentage and charging state. |
| **Call Contact** | *"Call John"* | Searches contacts and opens the native dialer calling "John". |
| **Send WhatsApp** | *"WhatsApp John message I am coming"* | Launches WhatsApp with the message text pre-filled for "John". |
| **Navigation** | *"Navigate to bus stop"* | Opens Google Maps navigating to "bus stop" in the background. |
| **Search Web** | *"Google search who is the president"* | Searches Google and reads a summary of the query. |
| **Play Music** | *"Play music Imagine"* | Launches your media player searching for "Imagine". |
| **Share Location** | *"Share location with Mary"* | Prepares a WhatsApp message containing your Google Maps GPS link to "Mary". |

---

### How the Obstacle Detector Works
1. When you say *"Obstacle detection"*, the app transitions to a camera view screen.
2. It speaks: *"Obstacle detection model successfully loaded. Scanning environment."*
3. Point the back camera towards the path ahead of you.
4. An green overlay lane is drawn on-screen (representing your walking path).
5. The neural network scans the path every **1 second**.
6. If it detects a **pothole**, **speed breaker**, **unpaved road**, or obstacles like **chairs**, **cars**, or **people**:
   * It determines the horizontal position relative to you (e.g. *slightly left*, *slightly right*, or *ahead*).
   * It alerts you via voice: *"Pothole ahead, move carefully"* or *"Chair slightly left"*.
   * It includes a built-in **6-second cooldown** to prevent speech overlap for the same detected object.
7. Say *"Go back"* or tap the red **"Exit Detection"** button at the top-right to return to the home screen.

---

## 🛠️ Troubleshooting & Common Issues

#### 1. App keeps saying "Voice recognition is not available"
* **Solution:** Ensure microphone permissions are granted. Go to your phone's **Settings -> Apps -> VisionMate -> Permissions** and enable **Microphone** (Always allow / Allow while using app).

#### 2. The app fails to load the obstacle detection model
* **Solution:** This is caused by missing binary files or using a standard Expo Go client. Ensure you installed the standalone APK (Option A) or development client (Option B). If using an emulator, note that custom native neural network architectures require actual ARM device processor capabilities to run.

#### 3. Development Client (Option B) displays "Could not connect to the development server"
* **Solution:**
  1. Confirm your laptop and phone are connected to the exact same Wi-Fi network.
  2. Verify your computer's firewall is not blocking port `8081`. (You may need to change your network profile on Windows from Public to Private).
  3. Try running `npx expo start --tunnel` which uses an ngrok tunnel to bypass Wi-Fi issues.

#### 4. Google Maps is not speaking navigation instructions in the background
* **Solution:** Ensure your device volume is turned up. The app is configured with automatic ducking settings, meaning it will lower its own speech volume whenever Google Maps issues background navigation directions.
#   V I S I O N M A T E - W E B S I T E  
 #   V I S I O N M A T E - W E B S I T E  
 