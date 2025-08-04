React Native Task List App

A simple and clean cross-platform mobile application for managing daily tasks, built with React Native. This app runs on both iOS and Android from a single JavaScript codebase.


🚀 Features

    View Tasks: See a clear list of all your tasks.

    Add Tasks: Quickly add new tasks through an input field.

    Mark as Complete: Tap on a task to toggle its completion status. Completed tasks are visually distinguished (strikethrough text).

    Cross-Platform: Built to run seamlessly on both iOS and Android devices.

    Clean UI: A minimalist and intuitive user interface.

🛠️ Technologies Used

    React Native: A framework for building native apps using React.

    JavaScript: The core language for the application logic.

    React Hooks (useState): For managing component state.

    FlatList: For efficiently displaying the scrollable list of tasks.

⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.
Prerequisites

You will need the following installed on your machine:

    Node.js

    Watchman (for macOS users)

    A code editor like VS Code

    For iOS: Xcode and CocoaPods

    For Android: Android Studio and JDK

For detailed instructions, follow the official React Native development environment setup guide: React Native Docs - Environment Setup
Installation & Setup

    Clone the repository

    git clone https://github.com/your-username/your-repository-name.git

    Navigate to the project directory

    cd your-repository-name

    Install dependencies
    This command installs all the necessary packages defined in package.json.

    npm install

    Install iOS Pods (For iOS development only)

    cd ios
    pod install
    cd ..

Running the Application

    To run on the iOS Simulator:

    npx react-native run-ios

    To run on an Android Emulator/Device:
    (Ensure you have an emulator running or a device connected)

    npx react-native run-android

