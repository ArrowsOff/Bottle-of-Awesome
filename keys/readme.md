
Releasing Android version

ionic browser add crosswalk

ionic build --release android

Jarsigning:
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore keys/android.keystore platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk extrema_outdoor

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore keys/android.keystore platforms/android/build/outputs/apk/android-x86-release-unsigned.apk extrema_outdoor

Zipalign:
zipalign -v 4 platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk release/ExtremaOutdoorARM.apk

zipalign -v 4 platforms/android/build/outputs/apk/android-x86-release-unsigned.apk release/ExtremaOutdoorX86.apk