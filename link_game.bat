
@echo off

set shelldir=%~dp0
cd %shelldir%

if [%1] == [] goto :END

set NAME=%1

set DEST1=%shelldir%src/view/game/%NAME%
set DEST2=%shelldir%laya/assets/%NAME%
set DEST3=%shelldir%laya/pages/%NAME%
set DEST4=%shelldir%bin/res/audio/%NAME%
set DEST5=%shelldir%bin/res/audioweb/%NAME%

set SRCPATH=%shelldir%../%NAME%/
set SRC1=%SRCPATH%src/
set SRC2=%SRCPATH%res/
set SRC3=%SRCPATH%page/
set SRC4=%SRCPATH%audio/
set SRC5=%SRCPATH%audioweb/

if exist "%DEST1%" (
    rmdir "%DEST1%"
)

if exist "%DEST2%" (
    rmdir "%DEST2%"
)

if exist "%DEST3%" (
    rmdir "%DEST3%"
)

if exist "%DEST4%" (
    rmdir "%DEST4%"
)

if exist "%DEST5%" (
    rmdir "%DEST5%"
)

if [%2] == [clean] goto :GOEXIT

if exist "%SRC1%" (
    mklink /D "%DEST1%" "%SRC1%"
)

if exist "%SRC2%" (
    mklink /D "%DEST2%" "%SRC2%"
)

if exist "%SRC3%" (
    mklink /D "%DEST3%" "%SRC3%"
)

if exist "%SRC4%" (
    mklink /D "%DEST4%" "%SRC4%"
)

if exist "%SRC5%" (
    mklink /D "%DEST5%" "%SRC5%"
)

goto :GOEXIT



:END
echo "USAGE: $0 GAME_NAME" 
echo " e.g.: $0 shanxi_mj" 

:GOEXIT