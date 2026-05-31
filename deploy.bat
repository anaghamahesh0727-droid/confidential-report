@echo off
cd /d "C:\Users\ANAGHA T M\Downloads\confidential-report"

REM Remove problematic workspace folder
rmdir /s /q .workspace

REM Stage files
git add .

REM Commit
git commit -m "Initial commit"

REM Push to GitHub
git push -u origin main
