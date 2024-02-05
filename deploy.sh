@echo off

:: abort on errors
setlocal enabledelayedexpansion
set "npm_cmd=npm"
set "git_cmd=git"

:: build
%npm_cmd% run build

:: navigate into the build output directory
cd dist

:: initialize a new git repository
%git_cmd% init
%git_cmd% add -A
%git_cmd% commit -m "deploy"

:: deploy to GitHub Pages
%git_cmd% push -f git@github.com:Tilan80/dummy-app.git main:gh-pages

cd ..
endlocal
